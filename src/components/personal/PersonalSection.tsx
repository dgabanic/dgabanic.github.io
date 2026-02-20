import styles from './PersonalSection.module.css';

// each entry in this list will become a grid item; 9 slots reserved
const ITEMS: Array<{ href: string; label: string; icon?: JSX.Element }> = [
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

export default function PersonalSection() {
  return (
    <section id="personal" className={styles.personalSection}>
      <h2 className={styles.heading}>Personal</h2>

      <div className={styles.linkGrid} role="list">
        {ITEMS.map(({ href, label, icon }, idx) => (
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
        {/* fill out remaining cells with invisible placeholders */}
        {Array.from({ length: Math.max(0, 9 - ITEMS.length) }).map((_, i) => (
          <div key={`empty-${i}`} className={styles.emptyCell} aria-hidden="true" />
        ))}
      </div>
    </section>
  );
}
