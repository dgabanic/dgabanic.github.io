import { render, screen, within } from '@testing-library/react';
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

  it('renders a grid container for links', () => {
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    // should have at least one visible link item
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(3);
    const linkedin = screen.getByRole('link', { name: /connect on linkedin/i });
    expect(linkedin).toBeInTheDocument();
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/yourprofile');
    const awsDev = screen.getByRole('link', { name: /aws developer cert/i });
    expect(awsDev).toBeInTheDocument();
    expect(awsDev).toHaveAttribute('href', '/pdf/AWS Certified Developer - Associate certificate.pdf');
    // also verify the badge image is in the link
    const devImg = within(awsDev).getByAltText('AWS Certified Developer badge');
    expect(devImg).toBeInTheDocument();

    const awsSol = screen.getByRole('link', { name: /aws solutions cert/i });
    expect(awsSol).toBeInTheDocument();
    expect(awsSol).toHaveAttribute('href', '/pdf/AWS Certified Solutions Architect - Associate certificate.pdf');
    const solImg = within(awsSol).getByAltText('AWS Certified Solutions Architect badge');
    expect(solImg).toBeInTheDocument();
  });
});
