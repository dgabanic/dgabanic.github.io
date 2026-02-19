import styles from './CertificationBadges.module.css';

const badges = [
  {
    src: '/images/aws-certified-developer-associate.png',
    alt: 'AWS Certified Developer badge',
  },
  {
    src: '/images/aws-certified-solutions-architect-associate.png',
    alt: 'AWS Certified Solutions Architect Associate badge',
  },
];

export default function CertificationBadges() {
  return (
    <div className={styles.badgesContainer}>
      {badges.map((badge) => (
        <img
          key={badge.src}
          src={badge.src}
          alt={badge.alt}
          className={styles.badge}
        />
      ))}
    </div>
  );
}
