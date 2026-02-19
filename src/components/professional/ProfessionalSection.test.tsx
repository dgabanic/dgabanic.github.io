import { render, screen } from '@testing-library/react';
import ProfessionalSection from './ProfessionalSection';

describe('ProfessionalSection', () => {
  beforeEach(() => {
    render(<ProfessionalSection />);
  });

  it('renders a section with id "professional"', () => {
    const section = document.getElementById('professional');
    expect(section).toBeInTheDocument();
    expect(section!.tagName).toBe('SECTION');
  });

  it('renders the Professional heading', () => {
    expect(screen.getByRole('heading', { name: 'Professional' })).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    expect(screen.getByText(/Professional content coming soon/)).toBeInTheDocument();
  });
});
