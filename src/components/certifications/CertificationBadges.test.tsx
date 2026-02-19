import { render, screen } from '@testing-library/react';
import CertificationBadges from './CertificationBadges';

describe('CertificationBadges', () => {
  beforeEach(() => {
    render(<CertificationBadges />);
  });

  it('renders the AWS Certified Developer badge with correct src and alt', () => {
    const img = screen.getByAltText('AWS Certified Developer badge');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/aws-certified-developer-associate.png');
  });

  it('renders the AWS Solutions Architect Associate badge with correct src and alt', () => {
    const img = screen.getByAltText('AWS Certified Solutions Architect Associate badge');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/aws-certified-solutions-architect-associate.png');
  });

  it('renders exactly two badge images', () => {
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });
});
