import { render } from '@testing-library/react';
import fc from 'fast-check';
import HeroSection from './hero/HeroSection';
import ProfessionalSection from './ProfessionalSection';
import PersonalSection from './PersonalSection';

/**
 * Feature: angular-to-react-refactor, Property 1: Semantic HTML structure
 *
 * For any rendered section component in the Portfolio_App, paragraph text
 * content SHALL be wrapped in <p> elements (not <ul> elements), and the
 * rendered output SHALL NOT contain <html>, <body>, or <script> tags.
 *
 * Validates: Requirements 3.1, 3.2
 */

const sectionComponents = [
  { name: 'HeroSection', Component: HeroSection },
  { name: 'ProfessionalSection', Component: ProfessionalSection },
  { name: 'PersonalSection', Component: PersonalSection },
] as const;

describe('Property 1: Semantic HTML structure', () => {
  it('paragraph text is wrapped in <p> elements and forbidden tags are absent', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sectionComponents),
        ({ Component }) => {
          const { container, unmount } = render(<Component />);
          const html = container.innerHTML;

          // 1. No <ul> elements should contain paragraph text
          const ulElements = container.querySelectorAll('ul');
          ulElements.forEach((ul) => {
            // If a <ul> exists, it must not contain text that should be in a <p>
            // (i.e., paragraph-length text content directly in <li> without sub-lists)
            const textContent = ul.textContent ?? '';
            // A <ul> with substantial text suggests misuse for paragraph content
            expect(textContent.length).toBeLessThan(100);
          });

          // 2. No <html>, <body>, or <script> tags in rendered output
          expect(html).not.toMatch(/<html[\s>]/i);
          expect(html).not.toMatch(/<body[\s>]/i);
          expect(html).not.toMatch(/<script[\s>]/i);

          // 3. Text content IS wrapped in <p> elements
          const pElements = container.querySelectorAll('p');
          expect(pElements.length).toBeGreaterThan(0);

          // Verify paragraph text lives in <p> tags, not <ul>
          pElements.forEach((p) => {
            expect(p.closest('ul')).toBeNull();
          });

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
