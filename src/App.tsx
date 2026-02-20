

import { useState, useEffect } from 'react';
import styles from './App.module.css';
import Navbar from './components/navbar/Navbar';
import HeroSection from './components/hero/HeroSection';
import ProfessionalSection from './components/professional/ProfessionalSection';
import PersonalSection from './components/personal/PersonalSection';

type Theme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <Navbar>
        <button
          style={{
            marginLeft: 'clamp(0.5rem, 5vw, 2rem)',
            padding: '0.4rem 1rem',
            borderRadius: '1rem',
            border: 'none',
            background: theme === 'dark' ? '#444' : '#eee',
            color: theme === 'dark' ? '#fff' : '#222',
            cursor: 'pointer',
            fontSize: '0.875rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </Navbar>
      <main className={styles.mainPanel}>
        <HeroSection />
        <ProfessionalSection />
        <PersonalSection />
      </main>
    </>
  );
}

export default App;
