import styles from './Schedules.module.css';

interface Team {
  name: string;
  emoji: string;
  league: string;
  scheduleUrl: string;
}

const TEAMS: Team[] = [
  {
    name: 'Cleveland Guardians',
    emoji: '⚾',
    league: 'MLB',
    scheduleUrl: 'https://www.espn.com/mlb/team/schedule/_/name/cle',
  },
  {
    name: 'FC Cincinnati',
    emoji: '⚽',
    league: 'MLS',
    scheduleUrl: 'https://www.espn.com/soccer/team/fixtures/_/id/18267/fc-cincinnati',
  },
  {
    name: 'Calgary Flames',
    emoji: '🏒',
    league: 'NHL',
    scheduleUrl: 'https://www.espn.com/nhl/team/schedule/_/name/cgy',
  },
  {
    name: 'Formula 1',
    emoji: '🏎️',
    league: 'F1',
    scheduleUrl: 'https://www.espn.com/f1/schedule',
  },
  {
    name: 'IndyCar',
    emoji: '🏁',
    league: 'IndyCar',
    scheduleUrl: 'https://www.espn.com/racing/schedule/_/series/indycar',
  },
];

interface SchedulesProps {
  onBack: () => void;
}

export default function Schedules({ onBack }: SchedulesProps) {
  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back
      </button>

      <h1 className={styles.pageTitle}>Sports Schedules</h1>
      <p className={styles.subtitle}>Live schedules via ESPN — always up to date</p>

      <div className={styles.grid} role="list">
        {TEAMS.map((team) => (
          <a
            key={team.name}
            href={team.scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            role="listitem"
          >
            <span className={styles.emoji} aria-hidden="true">{team.emoji}</span>
            <span className={styles.teamName}>{team.name}</span>
            <span className={styles.league}>{team.league}</span>
            <span className={styles.linkHint}>View schedule ↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
