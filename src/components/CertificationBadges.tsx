import styles from './CertificationBadges.module.css';

const badges = [
  {
    src: '/images/aws-certified-cloud-practitioner.png',
    alt: 'AWS Certified Cloud Practitioner badge',
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
