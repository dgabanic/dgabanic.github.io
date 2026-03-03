import type { FavoriteItem } from '../components/favorites/FavoritesList';

const favoriteJerseys: FavoriteItem[] = [
  {
    image: '/images/favorites/jersey-placeholder.png',
    title: 'Barcelona 2008-09 Home',
    description: 'The treble-winning kit worn during one of the greatest club seasons ever.',
    details: { Team: 'FC Barcelona', Season: '2008-09', Brand: 'Nike', Player: 'Messi #10' },
  },
  {
    image: '/images/favorites/jersey-placeholder.png',
    title: 'AC Milan 2006-07 Home',
    description: 'Classic red and black stripes from the Champions League winning campaign.',
    details: { Team: 'AC Milan', Season: '2006-07', Brand: 'Adidas', Player: 'Kaká #22' },
  },
  {
    image: '/images/favorites/jersey-placeholder.png',
    title: 'Brazil 2002 Home',
    description: 'The iconic yellow worn by Ronaldo and Ronaldinho at the World Cup in Korea/Japan.',
    details: { Team: 'Brazil', Season: '2002', Brand: 'Nike', Player: 'Ronaldo #9' },
  },
];

export default favoriteJerseys;
