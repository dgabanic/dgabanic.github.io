import styles from './ProfessionalSection.module.css';

// each entry in this list will become a grid item; 9 slots reserved
const ITEMS: Array<{ href: string; label: string; icon?: JSX.Element }> = [
  {
    href: 'https://www.linkedin.com/in/dgabanic',
    label: 'Connect on LinkedIn',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* official LinkedIn “in” logo */}
        <path d="M100.28 448H7.4V149.6h92.88zm-46.44-338C24 110 0 86 0 56.6 0 26.3 24.06 0 53.62 0s53.63 26.3 53.63 56.6c0 29.4-24 53.4-53.7 53.4zm394.52 338h-92.7V302c0-34.7-12.4-58.3-43.3-58.3-23.6 0-37.6 15.9-43.8 31.3-2.3 5.7-2.9 13.6-2.9 21.4v151.6h-92.7V149.6h92.7v40.9c12.3-19 34.4-46.1 83.6-46.1 61.1 0 106.9 39.9 106.9 125.6z" />
      </svg>
    ),
  },
  {
    href: '/pdf/AWS Certified Developer - Associate certificate.pdf',
    label: 'AWS Developer - Associate certificate',
    icon: (
      <img
        src="/images/aws-certified-developer-associate.png"
        alt="AWS Certified Developer badge"
        className={styles.badgeIcon}
      />
    ),
  },
  {
    href: '/pdf/AWS Certified Solutions Architect - Associate certificate.pdf',
    label: 'AWS Solutions Architect - Associate certificate',
    icon: (
      <img
        src="/images/aws-certified-solutions-architect-associate.png"
        alt="AWS Certified Solutions Architect badge"
        className={styles.badgeIcon}
      />
    ),
  }
];

export default function ProfessionalSection() {
  return (
    <section id="professional" className={styles.professionalSection}>
      <h2 className={styles.heading}>Professional</h2>

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
