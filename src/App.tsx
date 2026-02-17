import styles from './App.module.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProfessionalSection from './components/ProfessionalSection';
import PersonalSection from './components/PersonalSection';

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
