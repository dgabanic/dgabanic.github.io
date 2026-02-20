import styles from './ProfessionalSection.module.css';

// each entry in this list will become a grid item; 9 slots reserved
const ITEMS: Array<{ href: string; label: string; icon?: JSX.Element }> = [
  {
    href: 'https://www.linkedin.com/in/dgabanic',
    label: 'Connect on LinkedIn',
    icon: (
      <img
        src="/images/linkedinlogo.png"
        alt="LinkedIn logo"
        className={styles.badgeIcon}
      />
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
