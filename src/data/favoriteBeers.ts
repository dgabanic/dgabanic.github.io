import type { FavoriteItem } from '../components/favorites/FavoritesList';

const favoriteBeers: FavoriteItem[] = [
  {
    image: '/images/favorites/beer-placeholder.png',
    title: 'Heady Topper',
    description: 'A world-class American Double IPA with a juicy, tropical hop character.',
    details: { Style: 'Double IPA', Brewery: 'The Alchemist', ABV: '8%', Origin: 'Vermont, USA' },
  },
  {
    image: '/images/favorites/beer-placeholder.png',
    title: 'Pliny the Elder',
    description: 'A well-balanced, bitter, and hoppy double IPA with floral and citrus notes.',
    details: { Style: 'Double IPA', Brewery: 'Russian River', ABV: '8%', Origin: 'California, USA' },
  },
  {
    image: '/images/favorites/beer-placeholder.png',
    title: 'Guinness Draught',
    description: 'The iconic Irish stout — smooth, creamy, and unmistakable.',
    details: { Style: 'Dry Stout', Brewery: 'Guinness', ABV: '4.2%', Origin: 'Dublin, Ireland' },
  },
];

export default favoriteBeers;
