import { render } from '@testing-library/react';
import fc from 'fast-check';
import CertificationBadges from './CertificationBadges';

/**
 * Feature: angular-to-react-refactor, Property 2: Certification images have alt text
 *
 * For any image rendered in the Certification_Section, the image element
 * SHALL have a non-empty `alt` attribute containing descriptive text.
 *
 * Validates: Requirements 3.5
 */

// Arbitrary that generates a non-empty badge array with random src/alt strings
const badgeArbitrary = fc
  .array(
    fc.record({
      src: fc.stringMatching(/^\/images\/[a-z0-9-]+\.png$/).filter((s) => s.length > 12),
      alt: fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{2,49}$/).filter((s) => s.trim().length > 0),
    }),
    { minLength: 1, maxLength: 6 }
  );

// A minimal component that renders badges the same way CertificationBadges does
function BadgesUnderTest({ badges }: { badges: { src: string; alt: string }[] }) {
  return (
    <div>
      {badges.map((badge) => (
        <img key={badge.src} src={badge.src} alt={badge.alt} />
      ))}
    </div>
  );
}

describe('Property 2: Certification images have alt text', () => {
  it('all certification images have a non-empty alt attribute for any badge data', () => {
    fc.assert(
      fc.property(badgeArbitrary, (badges) => {
        const { container, unmount } = render(<BadgesUnderTest badges={badges} />);

        const images = container.querySelectorAll('img');

        // Every generated badge should produce an image
        expect(images.length).toBe(badges.length);

        // Every image must have a non-empty alt attribute
        images.forEach((img) => {
          const alt = img.getAttribute('alt');
          expect(alt).not.toBeNull();
          expect(alt!.trim().length).toBeGreaterThan(0);
        });

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('the actual CertificationBadges component has non-empty alt text on all images', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<CertificationBadges />);

        const images = container.querySelectorAll('img');
        expect(images.length).toBeGreaterThan(0);

        images.forEach((img) => {
          const alt = img.getAttribute('alt');
          expect(alt).not.toBeNull();
          expect(alt!.trim().length).toBeGreaterThan(0);
        });

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
