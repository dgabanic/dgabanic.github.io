import styles from './HeroSection.module.css';

import CertificationBadges from './CertificationBadges';

export default function HeroSection() {
  return (
    <section id="home" className={styles.heroSection}>
      <img
        src="/images/headshot.png"
        alt="David Gabanic"
        className={styles.headshot}
      />
      <h1 className={styles.heading}>Welcome!</h1>
      <h2 className={styles.subheading}>
        David Gabanic — Software Engineer, Cleveland, OH
      </h2>

      <p className={styles.bio}>
        I graduated from the University of Cincinnati in 2018 with a degree in
        Computer Science. Since then, I have been working as a full stack
        software engineer, building and maintaining web applications across the
        entire stack.
      </p>

      <p className={styles.bio}>
        I hold multiple AWS certifications and enjoy leveraging cloud services
        to build scalable, reliable solutions.
      </p>

      <p className={styles.bio}>
        Feel free to connect with me on{' '}
        <a
          href="https://www.linkedin.com/in/dgabanic"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkedinLink}
        >
          LinkedIn
        </a>
        .
      </p>

      <CertificationBadges />
    </section>
  );
}
