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
const API_PATH = import.meta.env.VITE_SHOPPING_LIST_API_URL || "/api/shopping-list";

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

async function request(method: string, body?: unknown) {
  const response = await fetch(API_PATH, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function fetchStores(): Promise<Store[]> {
  return request("GET");
}

export async function saveStores(stores: Store[]): Promise<void> {
  await request("PUT", stores);
}
