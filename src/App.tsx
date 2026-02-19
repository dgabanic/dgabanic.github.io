import styles from './App.module.css';
import Navbar from './components/navbar/Navbar';
import HeroSection from './components/hero/HeroSection';
import ProfessionalSection from './components/professional/ProfessionalSection';
import PersonalSection from './components/personal/PersonalSection';

function App() {
  return (
    <>
      <Navbar />
      <main className={styles.mainPanel}>
        <HeroSection />
        <ProfessionalSection />
        <PersonalSection />
      </main>
    </>
  );
}

export default App;
