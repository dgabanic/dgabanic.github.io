import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  beforeEach(() => {
    render(<HeroSection />);
  });

  it('renders the name, role, and location', () => {
    expect(screen.getByText(/David Gabanic/)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/Cleveland, OH/)).toBeInTheDocument();
  });

  it('renders bio text with university, graduation year, and degree', () => {
    expect(screen.getByText(/University of Cincinnati/)).toBeInTheDocument();
    expect(screen.getByText(/2018/)).toBeInTheDocument();
    expect(screen.getByText(/Computer Science/)).toBeInTheDocument();
  });

  it('renders bio text mentioning full stack and AWS certifications', () => {
    expect(screen.getByText(/full stack/)).toBeInTheDocument();
    expect(screen.getByText(/AWS certifications/)).toBeInTheDocument();
  });

  it('renders a LinkedIn link with correct href and target', () => {
    const link = screen.getByRole('link', { name: /LinkedIn/i });
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/dgabanic');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('includes the banner image instead of a headshot', () => {
    const img = screen.getByRole('img', { name: /banner/i });
    expect(img).toHaveAttribute('src', '/images/banner.jpeg');
  });
});
