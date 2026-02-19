import { render, screen } from '@testing-library/react';
import PersonalSection from './PersonalSection';

describe('PersonalSection', () => {
  beforeEach(() => {
    render(<PersonalSection />);
  });

  it('renders a section with id "personal"', () => {
    const section = document.getElementById('personal');
    expect(section).toBeInTheDocument();
    expect(section!.tagName).toBe('SECTION');
  });

  it('renders the Personal heading', () => {
    expect(screen.getByRole('heading', { name: 'Personal' })).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    expect(screen.getByText(/Personal content coming soon/)).toBeInTheDocument();
  });
});
