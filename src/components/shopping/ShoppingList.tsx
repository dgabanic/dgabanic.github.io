import { useState, useEffect, useRef } from "react";
import styles from "./ShoppingList.module.css";

interface Product {
  id: string;
  name: string;
  checked: boolean;
}

interface Subsection {
  id: string;
  name: string;
  products: Product[];
}

interface Store {
  id: string;
  name: string;
  subsections: Subsection[];
}

const STORAGE_KEY = "shopping-list-stores";

function generateId(): string {
  return crypto.randomUUID();
}

function loadStores(): Store[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [];
}

interface ShoppingListProps {
  onBack: () => void;
}

export default function ShoppingList({ onBack }: ShoppingListProps) {
  const [stores, setStores] = useState<Store[]>(loadStores);
  const [newStoreName, setNewStoreName] = useState("");
  const [newSubsectionNames, setNewSubsectionNames] = useState<
    Record<string, string>
  >({});
  const [newProductNames, setNewProductNames] = useState<
    Record<string, string>
  >({});
  const newStoreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
  }, [stores]);

  // --- Store actions ---
  const addStore = () => {
    const name = newStoreName.trim();
    if (!name) return;
    setStores((prev) => [...prev, { id: generateId(), name, subsections: [] }]);
    setNewStoreName("");
    newStoreInputRef.current?.focus();
  };

  const removeStore = (storeId: string) => {
    setStores((prev) => prev.filter((s) => s.id !== storeId));
  };

  // --- Subsection actions ---
  const addSubsection = (storeId: string) => {
    const name = (newSubsectionNames[storeId] || "").trim();
    if (!name) return;
    setStores((prev) =>
      prev.map((s) =>
        s.id === storeId
          ? {
              ...s,
              subsections: [
                ...s.subsections,
                { id: generateId(), name, products: [] },
              ],
            }
          : s,
      ),
    );
    setNewSubsectionNames((prev) => ({ ...prev, [storeId]: "" }));
  };

  const removeSubsection = (storeId: string, subsectionId: string) => {
    setStores((prev) =>
      prev.map((s) =>
        s.id === storeId
          ? {
              ...s,
              subsections: s.subsections.filter((ss) => ss.id !== subsectionId),
            }
          : s,
      ),
    );
  };

  // --- Product actions ---
  const addProduct = (storeId: string, subsectionId: string) => {
    const key = `${storeId}-${subsectionId}`;
    const name = (newProductNames[key] || "").trim();
    if (!name) return;
    setStores((prev) =>
      prev.map((s) =>
        s.id === storeId
          ? {
              ...s,
              subsections: s.subsections.map((ss) =>
                ss.id === subsectionId
                  ? {
                      ...ss,
                      products: [
                        ...ss.products,
                        { id: generateId(), name, checked: false },
                      ],
                    }
                  : ss,
              ),
            }
          : s,
      ),
    );
    setNewProductNames((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleProduct = (
    storeId: string,
    subsectionId: string,
    productId: string,
  ) => {
    setStores((prev) =>
      prev.map((s) =>
        s.id === storeId
          ? {
              ...s,
              subsections: s.subsections.map((ss) =>
                ss.id === subsectionId
                  ? {
                      ...ss,
                      products: ss.products.map((p) =>
                        p.id === productId ? { ...p, checked: !p.checked } : p,
                      ),
                    }
                  : ss,
              ),
            }
          : s,
      ),
    );
  };

  const removeProduct = (
    storeId: string,
    subsectionId: string,
    productId: string,
  ) => {
    setStores((prev) =>
      prev.map((s) =>
        s.id === storeId
          ? {
              ...s,
              subsections: s.subsections.map((ss) =>
                ss.id === subsectionId
                  ? {
                      ...ss,
                      products: ss.products.filter((p) => p.id !== productId),
                    }
                  : ss,
              ),
            }
          : s,
      ),
    );
  };

  const clearChecked = () => {
    setStores((prev) =>
      prev.map((s) => ({
        ...s,
        subsections: s.subsections.map((ss) => ({
          ...ss,
          products: ss.products.filter((p) => !p.checked),
        })),
      })),
    );
  };

  const totalItems = stores.reduce(
    (sum, s) =>
      sum + s.subsections.reduce((ss, sub) => ss + sub.products.length, 0),
    0,
  );
  const checkedItems = stores.reduce(
    (sum, s) =>
      sum +
      s.subsections.reduce(
        (ss, sub) => ss + sub.products.filter((p) => p.checked).length,
        0,
      ),
    0,
  );

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <h1 className={styles.pageTitle}>🛒 Shopping List</h1>
      <p className={styles.subtitle}>
        {totalItems === 0
          ? "Add a store to get started"
          : `${checkedItems} of ${totalItems} items checked`}
      </p>

      {checkedItems > 0 && (
        <button className={styles.clearCheckedButton} onClick={clearChecked}>
          Remove checked items ({checkedItems})
        </button>
      )}

      {/* Add store form */}
      <div className={styles.addForm}>
        <input
          ref={newStoreInputRef}
          className={styles.input}
          type="text"
          placeholder="New store name…"
          value={newStoreName}
          onChange={(e) => setNewStoreName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addStore()}
          aria-label="New store name"
        />
        <button
          className={styles.addButton}
          onClick={addStore}
          disabled={!newStoreName.trim()}
        >
          + Store
        </button>
      </div>

      {/* Stores */}
      <div className={styles.storeList}>
        {stores.map((store) => (
          <details key={store.id} className={styles.storeCard} open>
            <summary className={styles.storeSummary}>
              <span className={styles.storeName}>🏪 {store.name}</span>
              <button
                className={styles.removeButton}
                onClick={(e) => {
                  e.preventDefault();
                  removeStore(store.id);
                }}
                aria-label={`Remove store ${store.name}`}
              >
                ✕
              </button>
            </summary>

            {/* Add subsection form */}
            <div className={styles.addForm}>
              <input
                className={styles.input}
                type="text"
                placeholder="New section (e.g. Produce, Dairy)…"
                value={newSubsectionNames[store.id] || ""}
                onChange={(e) =>
                  setNewSubsectionNames((prev) => ({
                    ...prev,
                    [store.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => e.key === "Enter" && addSubsection(store.id)}
                aria-label={`New section for ${store.name}`}
              />
              <button
                className={styles.addButton}
                onClick={() => addSubsection(store.id)}
                disabled={!(newSubsectionNames[store.id] || "").trim()}
              >
                + Section
              </button>
            </div>

            {/* Subsections */}
            {store.subsections.map((subsection) => {
              const productKey = `${store.id}-${subsection.id}`;
              return (
                <div key={subsection.id} className={styles.subsection}>
                  <div className={styles.subsectionHeader}>
                    <h3 className={styles.subsectionName}>{subsection.name}</h3>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeSubsection(store.id, subsection.id)}
                      aria-label={`Remove section ${subsection.name}`}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Products */}
                  <ul className={styles.productList}>
                    {subsection.products.map((product) => (
                      <li key={product.id} className={styles.productItem}>
                        <label
                          className={`${styles.productLabel} ${product.checked ? styles.checked : ""}`}
                        >
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={product.checked}
                            onChange={() =>
                              toggleProduct(store.id, subsection.id, product.id)
                            }
                          />
                          <span className={styles.productName}>
                            {product.name}
                          </span>
                        </label>
                        <button
                          className={styles.removeButtonSmall}
                          onClick={() =>
                            removeProduct(store.id, subsection.id, product.id)
                          }
                          aria-label={`Remove ${product.name}`}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Add product form */}
                  <div className={styles.addFormInline}>
                    <input
                      className={styles.inputSmall}
                      type="text"
                      placeholder="Add item…"
                      value={newProductNames[productKey] || ""}
                      onChange={(e) =>
                        setNewProductNames((prev) => ({
                          ...prev,
                          [productKey]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && addProduct(store.id, subsection.id)
                      }
                      aria-label={`Add item to ${subsection.name}`}
                    />
                    <button
                      className={styles.addButtonSmall}
                      onClick={() => addProduct(store.id, subsection.id)}
                      disabled={!(newProductNames[productKey] || "").trim()}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </details>
        ))}
      </div>
    </div>
  );
}
