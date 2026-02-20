import styles from './ReadingList.module.css';

interface Book {
  date: string;
  title: string;
  author: string;
  note?: string;
}

const BOOKS: Book[] = [
  { date: 'December 2018', title: 'What If?', author: 'Randall Munroe' },
  { date: 'January 2019', title: '1984', author: 'George Orwell' },
  { date: 'March 2019', title: 'The Defining Decade', author: 'Meg Jay' },
  { date: 'March 2019', title: 'The Book of Basketball', author: 'Bill Simmons' },
  { date: 'April 2019', title: 'A Game of Thrones', author: 'George R.R. Martin' },
  { date: 'July 2019', title: 'Access All Areas', author: 'Scott Ian' },
  { date: 'August 2019', title: 'A Clash of Kings', author: 'George R.R. Martin' },
  { date: 'January 2020', title: 'Conquest of Bread', author: 'Peter Kropotkin' },
  { date: 'February 2020', title: 'A Storm of Swords', author: 'George R.R. Martin' },
  { date: 'May 2020', title: 'A Feast for Crows', author: 'George R.R. Martin' },
  { date: 'July 2020', title: 'A Dance With Dragons', author: 'George R.R. Martin' },
  { date: 'September 2020', title: 'Dune', author: 'Frank Herbert' },
  { date: 'November 2020', title: 'The Communist Manifesto', author: 'Karl Marx & Friedrich Engels' },
  { date: 'November 2020', title: 'Dune Messiah', author: 'Frank Herbert' },
  { date: 'December 2020', title: 'Behind Her Eyes', author: 'Sarah Pinborough' },
  { date: 'January 2021', title: 'Children of Dune', author: 'Frank Herbert' },
  { date: 'January 2021', title: 'Manufacturing Consent', author: 'Noam Chomsky & Edward S. Herman' },
  { date: 'February 2021', title: 'The Sunflower', author: 'Simon Wiesenthal' },
  { date: 'February 2021', title: 'God Emperor of Dune', author: 'Frank Herbert' },
  { date: 'March 2021', title: 'Why I\'m No Longer Talking to White People About Race', author: 'Reni Eddo-Lodge' },
  { date: 'March 2021', title: 'Heretics of Dune', author: 'Frank Herbert' },
  { date: 'April 2021', title: 'Antifa: The Antifascist Handbook', author: 'Mark Bray' },
  { date: 'May 2021', title: 'Beowulf', author: 'Unknown (Seamus Heaney translation)' },
  { date: 'May 2021', title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
  { date: 'June 2021', title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez' },
  { date: 'October 2021', title: 'The Hidden Life of Trees', author: 'Peter Wohlleben' },
  { date: 'January 2022', title: 'Chapterhouse: Dune', author: 'Frank Herbert' },
  { date: 'March 2022', title: 'So You\'ve Been Publicly Shamed', author: 'Jon Ronson' },
  { date: 'April 2022', title: 'Ball Four', author: 'Jim Bouton' },
  { date: 'May 2022', title: 'Fire and Blood', author: 'George R.R. Martin' },
  { date: 'August 2022', title: 'A Short History of Nearly Everything', author: 'Bill Bryson' },
  { date: 'January 2023', title: 'Kitchen Confidential', author: 'Anthony Bourdain' },
  { date: 'March 2023', title: 'The Silk Roads', author: 'Peter Frankopan' },
  { date: 'July 2023', title: 'Fahrenheit 451', author: 'Ray Bradbury' },
  { date: 'August 2023', title: 'One Nation Under God', author: 'Kevin M. Kruse' },
  { date: 'October 2023', title: 'Moneyball', author: 'Michael Lewis' },
  { date: 'November 2023', title: 'Bullshit Jobs', author: 'David Graeber' },
  { date: 'January 2024', title: 'A History of the Cuban Revolution', author: 'Aviva Chomsky' },
  { date: 'May 2024', title: 'The World of Ice and Fire', author: 'George R.R. Martin', note: "didn't finish" },
  { date: 'November 2024', title: 'American Rule', author: 'Jared Yates Sexton' },
  { date: 'January 2025', title: 'That All Shall Be Saved', author: 'David Bentley Hart' },
  { date: 'April 2025', title: 'Walden', author: 'Henry David Thoreau', note: "didn't finish" },
  { date: 'July 2025', title: 'The Way of Kings', author: 'Brandon Sanderson' },
  { date: 'October 2025', title: 'The Deficit Myth', author: 'Stephanie Kelton' },
  { date: 'November 2025', title: 'Words of Radiance', author: 'Brandon Sanderson' },
  { date: 'January 2026', title: 'Project Hail Mary', author: 'Andy Weir' },
  { date: 'February 2026', title: 'Edgedancer', author: 'Brandon Sanderson' },
  { date: 'February 2026', title: 'Oathbringer', author: 'Brandon Sanderson' },
];

const currentlyReading = BOOKS[BOOKS.length - 1];
const pastBooks = [...BOOKS].reverse().slice(1);

interface ReadingListProps {
  onBack: () => void;
}

export default function ReadingList({ onBack }: ReadingListProps) {
  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <h1 className={styles.pageTitle}>Reading List</h1>

      <section className={styles.currentlyReading}>
        <h2 className={styles.currentLabel}>Currently Reading</h2>
        <p className={styles.currentTitle}>{currentlyReading.title}</p>
        <p className={styles.currentAuthor}>by {currentlyReading.author}</p>
        <p className={styles.currentDate}>{currentlyReading.date}</p>
      </section>

      <section className={styles.historySection}>
        <h2 className={styles.historyHeading}>Reading History</h2>
        <ul className={styles.bookList}>
          {pastBooks.map((book, idx) => (
            <li key={idx} className={styles.bookItem}>
              <span className={styles.bookDate}>{book.date}</span>
              <span className={styles.bookInfo}>
                <span className={styles.bookTitle}>{book.title}</span>
                {book.note && <span className={styles.bookNote}> ({book.note})</span>}
                <span className={styles.bookAuthor}> — {book.author}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
