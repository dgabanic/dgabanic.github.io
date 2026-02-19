import CertificationBadges from '../certifications/CertificationBadges';
import styles from './HeroSection.module.css';


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
      I graduated from the University of Cincinnati in 2018 with a Bachelor's degree in Computer Science. Since then I have obtained full stack experience with multiple enterprise-level applications in both legacy codebases and modern cloud stacks. I have also earned multiple AWS Certifications. 
      </p>

      <p className={styles.bio}>
      Have a look around! I wanted to make this site to show my professional experiece and accomplishments, but also to give an insight into who I am as a person
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
