export type Product = {
  id: string;
  name: string;
  checked: boolean;
};

export type Subsection = {
  id: string;
  name: string;
  products: Product[];
};

export type Store = {
  id: string;
  name: string;
  subsections: Subsection[];
};

const STORAGE_KEY = "shopping-list-stores";

// The list is persisted as a single JSON file inside a secret GitHub Gist.
// Reads/writes go directly from the browser to the GitHub REST API.
//
// SECURITY NOTE: VITE_GIST_TOKEN is embedded in the public JS bundle at build
// time. Anyone viewing the deployed site can extract it. Use a fine-grained
// Personal Access Token scoped to ONLY the "Gists" permission so the blast
// radius of a leak is limited to your gists. Revoke and rotate if exposed.
const GIST_ID = import.meta.env.VITE_GIST_ID as string | undefined;
const GIST_TOKEN = import.meta.env.VITE_GIST_TOKEN as string | undefined;
const GIST_FILENAME = "shopping-list.json";
const GIST_API = "https://api.github.com";

export function getLocalStores(): Store[] {
  if (typeof window === "undefined" || !window.localStorage) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Store[];
  } catch {
    /* ignore invalid JSON */
  }
  return [];
}

export function saveLocalStores(stores: Store[]) {
  if (typeof window === "undefined" || !window.localStorage) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
}

function gistConfigured(): boolean {
  return Boolean(GIST_ID && GIST_TOKEN);
}

function authHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${GIST_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/**
 * Fetch the shopping list from the Gist. Falls back to the localStorage cache
 * if the Gist is not configured or the request fails, so the page still shows
 * the last-known list offline.
 */
export async function fetchStores(): Promise<Store[]> {
  if (!gistConfigured()) {
    return getLocalStores();
  }

  try {
    const response = await fetch(`${GIST_API}/gists/${GIST_ID}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Gist read failed with status ${response.status}`);
    }

    const gist = (await response.json()) as {
      files?: Record<string, { content?: string } | undefined>;
    };

    const file = gist.files?.[GIST_FILENAME];
    const content = file?.content?.trim();
    const stores = content ? (JSON.parse(content) as Store[]) : [];

    // Keep the local cache in sync with the remote source of truth.
    saveLocalStores(stores);
    return stores;
  } catch {
    // Network/API error: serve the cached copy rather than losing the view.
    return getLocalStores();
  }
}

/**
 * Persist the shopping list to the Gist. Always updates the localStorage cache
 * first so the latest edit survives even if the remote write fails.
 */
export async function saveStores(stores: Store[]): Promise<void> {
  saveLocalStores(stores);

  if (!gistConfigured()) {
    return;
  }

  const response = await fetch(`${GIST_API}/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(stores, null, 2),
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gist write failed with status ${response.status}`);
  }
}
