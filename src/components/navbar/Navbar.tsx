import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', targetId: 'home' },
  { label: 'Professional', targetId: 'professional' },
  { label: 'Personal', targetId: 'personal' },
];

interface NavbarProps {
  children?: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      {navLinks.map((link) => (
        <a
          key={link.targetId}
          href={`#${link.targetId}`}
          className={styles.navLink}
          onClick={(e) => handleClick(e, link.targetId)}
        >
          {link.label}
        </a>
      ))}
      {children}
    </nav>
  );
}
