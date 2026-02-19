import styles from './PersonalSection.module.css';

export default function PersonalSection() {
  return (
    <section id="personal" className={styles.personalSection}>
      <h2 className={styles.heading}>Personal</h2>
      <p className={styles.placeholder}>Personal content coming soon.</p>

      {/* placeholder grid so future personal links/cards follow same responsive behavior */}
      <div className={styles.linkGrid} role="list" />
    </section>
  );
}
