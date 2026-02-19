# Implementation Plan: Angular to React Refactor

## Overview

Refactor the "about-me" Angular 14 portfolio site to React 18 + TypeScript + Vite. Preserve all content and dark theme styling while fixing semantic HTML issues and improving layout. Tasks are ordered so each step builds on the previous, with no orphaned code.

## Tasks

- [x] 1. Initialize React project with Vite and TypeScript
  - Create a new Vite + React + TypeScript project in the repo root (replacing Angular config files)
  - Set up `package.json` with React 18, TypeScript, Vite dependencies
  - Set up `tsconfig.json` for React JSX
  - Create `vite.config.ts`
  - Create `index.html` with proper `<head>` (title "David Gabanic", charset, viewport meta)
  - Create `src/main.tsx` entry point rendering `<App />`
  - Remove Angular-specific files (`angular.json`, `karma.conf.js`, `tsconfig.app.json`, `tsconfig.spec.json`, `src/polyfills.ts`, `src/test.ts`, `src/app/` directory)
  - Move static assets from `src/assets/` to `public/images/` and `public/pdf/`
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Create global styles and App root component
  - [x] 2.1 Create `src/index.css` with CSS reset, body background (#161616), background image (underConstruction.png with cover sizing, fixed attachment), white text color, and font setup
    - _Requirements: 4.1, 7.1, 7.2_
  - [x] 2.2 Create `src/App.tsx` and `src/App.module.css`
    - App renders Navbar, HeroSection, ProfessionalSection, PersonalSection inside a `<main>` element
    - App.module.css defines the main content panel with #1c1c1c background, 0.85 opacity, flexbox layout (centered, vertical)
    - _Requirements: 4.2, 4.5, 6.1_

- [x] 3. Implement Navbar component
  - [x] 3.1 Create `src/components/Navbar.tsx` and `src/components/Navbar.module.css`
    - Render a `<nav>` element with three `<a>` links: Home (`#home`), Professional (`#professional`), Personal (`#personal`)
    - Implement smooth scroll on click using `element.scrollIntoView({ behavior: 'smooth' })`
    - Style with sticky positioning, #282828 background, white text
    - _Requirements: 3.4, 4.4, 5.1, 5.2_

- [x] 4. Implement HeroSection component
  - [x] 4.1 Create `src/components/HeroSection.tsx` and `src/components/HeroSection.module.css`
    - Render a `<section id="home">` with:
      - `<h1>` with "Welcome!"
      - `<h2>` with name, role, and location
      - Bio text in `<p>` elements (not `<ul>`) covering: UC graduation 2018, CS degree, full stack experience, AWS certifications
      - LinkedIn link as `<a href="https://www.linkedin.com/in/dgabanic" target="_blank" rel="noopener noreferrer">`
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.3_
  - [x] 4.2 Create `src/components/CertificationBadges.tsx` (rendered inside HeroSection)
    - Render AWS Cloud Practitioner and Solutions Architect Associate badge images
    - Each `<img>` has descriptive alt text (e.g., "AWS Certified Cloud Practitioner badge")
    - Center-aligned with flexbox
    - _Requirements: 2.4, 2.5, 3.5_

- [x] 5. Implement placeholder sections
  - [x] 5.1 Create `src/components/ProfessionalSection.tsx` and `src/components/ProfessionalSection.module.css`
    - Render `<section id="professional">` with a heading and placeholder text indicating future content
    - _Requirements: 5.3_
  - [x] 5.2 Create `src/components/PersonalSection.tsx` and `src/components/PersonalSection.module.css`
    - Render `<section id="personal">` with a heading and placeholder text indicating future content
    - _Requirements: 5.3_

- [x] 6. Checkpoint - Verify build and visual output
  - Ensure the app builds without errors (`npm run build`)
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Set up testing framework and write tests
  - [x] 7.1 Install Vitest, React Testing Library, jsdom, and fast-check as dev dependencies
    - Configure Vitest in `vite.config.ts` with jsdom environment
    - _Requirements: 1.1_
  - [x] 7.2 Write unit tests for content preservation
    - Test that HeroSection renders name, bio text, LinkedIn link
    - Test that CertificationBadges renders both badge images with correct src
    - Test that Navbar renders three links with correct labels
    - Test that placeholder sections render placeholder text
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.2, 5.3_
  - [x] 7.3 Write property test for semantic HTML structure
    - **Property 1: Semantic HTML structure**
    - **Validates: Requirements 3.1, 3.2**
  - [x] 7.4 Write property test for certification image alt text
    - **Property 2: Certification images have alt text**
    - **Validates: Requirements 3.5**

- [x] 8. Clean up Angular artifacts and finalize
  - Remove any remaining Angular files (if not already removed in task 1)
  - Update `.gitignore` for Vite project (add `dist/`, remove Angular-specific entries)
  - Verify `public/` directory contains all images and PDFs from original `src/assets/`
  - _Requirements: 2.6, 6.3_

- [x] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
