import styles from './PersonalSection.module.css';

// each entry in this list will become a grid item; 9 slots reserved
const EXTERNAL_ITEMS: Array<{ href: string; label: string; icon?: JSX.Element }> = [
  {
    href: 'https://www.chess.com/member/dgabanic',
    label: 'Play me in Chess!',
    icon: (
      <img
        src="/images/chesslogo.png"
        alt="Chess.com logo"
        className={styles.badgeIcon}
      />
    ),
  },
];

interface PersonalSectionProps {
  onNavigate?: (page: string) => void;
}

const INTERNAL_ITEMS: Array<{ page: string; label: string }> = [
  { page: 'books', label: '📚 Reading List' },
];

export default function PersonalSection({ onNavigate }: PersonalSectionProps) {
  return (
    <section id="personal" className={styles.personalSection}>
      <h2 className={styles.heading}>Personal</h2>

      <div className={styles.linkGrid} role="list">
        {EXTERNAL_ITEMS.map(({ href, label, icon }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkItem}
            role="listitem"
          >
            {icon && <span className={styles.iconWrapper}>{icon}</span>}
            <span className={styles.linkLabel}>{label}</span>
          </a>
        ))}
        {INTERNAL_ITEMS.map(({ page, label }) => (
          <button
            key={page}
            className={styles.linkItem}
            role="listitem"
            onClick={() => onNavigate?.(page)}
          >
            <span className={styles.linkLabel}>{label}</span>
          </button>
        ))}
        {/* fill out remaining cells with invisible placeholders */}
        {Array.from({ length: Math.max(0, 9 - EXTERNAL_ITEMS.length - INTERNAL_ITEMS.length) }).map((_, i) => (
          <div key={`empty-${i}`} className={styles.emptyCell} aria-hidden="true" />
        ))}
      </div>
    </section>
  );
}
