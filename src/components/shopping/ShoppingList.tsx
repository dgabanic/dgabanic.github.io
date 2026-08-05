import { useState, useEffect, useRef } from "react";
import styles from "./ShoppingList.module.css";
import type { Product, Subsection, Store } from "../../api/shoppingListApi";
import {
  fetchStores,
  getLocalStores,
  saveLocalStores,
  saveStores,
} from "../../api/shoppingListApi";

function generateId(): string {
  return crypto.randomUUID();
}

interface ShoppingListProps {
  onBack: () => void;
}

export default function ShoppingList({ onBack }: ShoppingListProps) {
  const [stores, setStores] = useState<Store[]>(getLocalStores());
  const [remoteAvailable, setRemoteAvailable] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [newStoreName, setNewStoreName] = useState("");
  const [newSubsectionNames, setNewSubsectionNames] = useState<
    Record<string, string>
  >({});
  const [newProductNames, setNewProductNames] = useState<
    Record<string, string>
  >({});
  const newStoreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveLocalStores(stores);
    if (!remoteAvailable) return;

    saveStores(stores).catch(() => {
      setRemoteAvailable(false);
      setSyncError("Unable to sync changes to shared list.");
    });
  }, [stores, remoteAvailable]);

  useEffect(() => {
    let mounted = true;

    fetchStores()
      .then((remoteStores) => {
        if (!mounted) return;
        setStores(remoteStores);
        saveLocalStores(remoteStores);
        setRemoteAvailable(true);
        setSyncError(null);
      })
      .catch(() => {
        if (!mounted) return;
        setSyncError("Shared list unavailable. Working locally.");
      });

    return () => {
      mounted = false;
    };
  }, []);

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

  const moveSubsection = (
    storeId: string,
    subsectionId: string,
    direction: number,
  ) => {
    setStores((prev) =>
      prev.map((s) => {
        if (s.id !== storeId) return s;
        const index = s.subsections.findIndex((ss) => ss.id === subsectionId);
        const nextIndex = index + direction;
        if (index < 0 || nextIndex < 0 || nextIndex >= s.subsections.length)
          return s;

        const subsections = [...s.subsections];
        [subsections[index], subsections[nextIndex]] =
          [subsections[nextIndex], subsections[index]];

        return { ...s, subsections };
      }),
    );
  };

  // --- Product actions ---
  const moveProduct = (
    storeId: string,
    subsectionId: string,
    productId: string,
    direction: number,
  ) => {
    setStores((prev) =>
      prev.map((s) =>
        s.id === storeId
          ? {
              ...s,
              subsections: s.subsections.map((ss) => {
                if (ss.id !== subsectionId) return ss;
                const index = ss.products.findIndex((p) => p.id === productId);
                const nextIndex = index + direction;
                if (index < 0 || nextIndex < 0 || nextIndex >= ss.products.length)
                  return ss;

                const products = [...ss.products];
                [products[index], products[nextIndex]] =
                  [products[nextIndex], products[index]];

                return { ...ss, products };
              }),
            }
          : s,
      ),
    );
  };

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
      {syncError && <p className={styles.syncMessage}>{syncError}</p>}

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
            {store.subsections.map((subsection, subsectionIndex) => {
              const productKey = `${store.id}-${subsection.id}`;
              return (
                <div key={subsection.id} className={styles.subsection}>
                  <div className={styles.subsectionHeader}>
                    <h3 className={styles.subsectionName}>{subsection.name}</h3>
                    <div className={styles.subsectionHeaderActions}>
                      <button
                        className={styles.reorderButtonSmall}
                        type="button"
                        onClick={() =>
                          moveSubsection(store.id, subsection.id, -1)
                        }
                        disabled={subsectionIndex === 0}
                        aria-label={`Move section ${subsection.name} up`}
                      >
                        ↑
                      </button>
                      <button
                        className={styles.reorderButtonSmall}
                        type="button"
                        onClick={() =>
                          moveSubsection(store.id, subsection.id, 1)
                        }
                        disabled={subsectionIndex === store.subsections.length - 1}
                        aria-label={`Move section ${subsection.name} down`}
                      >
                        ↓
                      </button>
                      <button
                        className={styles.removeButton}
                        type="button"
                        onClick={() => removeSubsection(store.id, subsection.id)}
                        aria-label={`Remove section ${subsection.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Products */}
                  <ul className={styles.productList}>
                    {subsection.products.map((product, productIndex) => (
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
                        <div className={styles.productControls}>
                          <button
                            className={styles.reorderButtonSmall}
                            type="button"
                            onClick={() =>
                              moveProduct(
                                store.id,
                                subsection.id,
                                product.id,
                                -1,
                              )
                            }
                            disabled={productIndex === 0}
                            aria-label={`Move ${product.name} up`}
                          >
                            ↑
                          </button>
                          <button
                            className={styles.reorderButtonSmall}
                            type="button"
                            onClick={() =>
                              moveProduct(
                                store.id,
                                subsection.id,
                                product.id,
                                1,
                              )
                            }
                            disabled={productIndex === subsection.products.length - 1}
                            aria-label={`Move ${product.name} down`}
                          >
                            ↓
                          </button>
                          <button
                            className={styles.removeButtonSmall}
                            type="button"
                            onClick={() =>
                              removeProduct(store.id, subsection.id, product.id)
                            }
                            aria-label={`Remove ${product.name}`}
                          >
                            ✕
                          </button>
                        </div>
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
