import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it('renders a nav element', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders three links with correct labels', () => {
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Professional' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Personal' })).toBeInTheDocument();
  });

  it('links have correct href anchors', () => {
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#home');
    expect(screen.getByRole('link', { name: 'Professional' })).toHaveAttribute('href', '#professional');
    expect(screen.getByRole('link', { name: 'Personal' })).toHaveAttribute('href', '#personal');
  });

  it('renders exactly three links', () => {
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
