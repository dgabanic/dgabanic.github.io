import styles from './FavoritesList.module.css';

export interface FavoriteItem {
  image: string;
  title: string;
  description: string;
  details?: Record<string, string>;
}

export interface FavoritesListProps {
  heading: string;
  emoji?: string;
  items: FavoriteItem[];
  onBack: () => void;
}

export default function FavoritesList({ heading, emoji, items, onBack }: FavoritesListProps) {
  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <h1 className={styles.pageTitle}>
        {emoji && <span aria-hidden="true">{emoji} </span>}
        {heading}
      </h1>

      <ul className={styles.grid} role="list">
        {items.map((item, idx) => (
          <li key={idx} className={styles.card} role="listitem">
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardDescription}>{item.description}</p>
              {item.details && (
                <dl className={styles.detailList}>
                  {Object.entries(item.details).map(([key, value]) => (
                    <div key={key} className={styles.detailRow}>
                      <dt className={styles.detailKey}>{key}</dt>
                      <dd className={styles.detailValue}>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
