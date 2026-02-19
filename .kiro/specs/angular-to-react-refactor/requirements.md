# Requirements Document

## Introduction

This document defines the requirements for refactoring the "about-me" personal portfolio website from Angular 14 to React. The refactor preserves all existing content and visual design (dark theme) while fixing HTML semantic issues, removing outdated dependencies, improving layout, and establishing a modern React project structure. The site is a single-page personal portfolio for David Gabanic, a software engineer based in Cleveland, OH.

## Glossary

- **Portfolio_App**: The React single-page application that serves as the personal portfolio website
- **Navbar**: The top navigation bar component containing section links
- **Welcome_Section**: The main content area displaying the owner's name, bio, and professional summary
- **Certification_Section**: The area displaying AWS certification badge images
- **Theme_System**: The styling system that manages the dark theme color scheme and layout
- **Asset_Manager**: The system responsible for serving static images and PDF files

## Requirements

### Requirement 1: React Project Initialization

**User Story:** As a developer, I want the Angular project replaced with a React project, so that the portfolio uses a modern, maintainable framework.

#### Acceptance Criteria

1. THE Portfolio_App SHALL be built using React 18 with functional components and hooks
2. THE Portfolio_App SHALL use TypeScript for type safety
3. THE Portfolio_App SHALL use a CSS-based styling approach (CSS Modules or plain CSS/SCSS) without depending on Bootstrap or jQuery
4. WHEN the Portfolio_App is built, THE build system SHALL produce a static bundle suitable for deployment

### Requirement 2: Content Preservation

**User Story:** As the site owner, I want all existing content preserved in the new React app, so that visitors see the same information.

#### Acceptance Criteria

1. THE Welcome_Section SHALL display the owner's name, location (Cleveland, OH), and role (software engineer)
2. THE Welcome_Section SHALL display the bio text including university graduation (University of Cincinnati, 2018), degree (Computer Science), full stack experience, and AWS certifications mention
3. THE Welcome_Section SHALL display a clickable LinkedIn link that opens https://www.linkedin.com/in/dgabanic
4. THE Certification_Section SHALL display the AWS Certified Cloud Practitioner badge image
5. THE Certification_Section SHALL display the AWS Certified Solutions Architect Associate badge image
6. THE Portfolio_App SHALL preserve all static assets (images and PDFs) in the public or assets directory

### Requirement 3: Semantic HTML Fixes

**User Story:** As a developer, I want the HTML to use proper semantic elements, so that the page is accessible and well-structured.

#### Acceptance Criteria

1. THE Portfolio_App SHALL use paragraph elements (`<p>`) for paragraph text instead of list elements (`<ul>`)
2. THE Portfolio_App SHALL not include `<html>`, `<body>`, or `<script>` tags inside React component templates
3. THE Portfolio_App SHALL use semantic HTML5 elements (such as `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`) to structure page content
4. THE Navbar SHALL use a `<nav>` element containing accessible link elements
5. WHEN certification badges are displayed, THE Certification_Section SHALL include descriptive alt text on each image

### Requirement 4: Layout and Styling Improvements

**User Story:** As the site owner, I want the layout to be robust and responsive, so that the site displays correctly across screen sizes without positioning hacks.

#### Acceptance Criteria

1. THE Theme_System SHALL apply a dark color scheme with background color #161616, panel color #1c1c1c, navbar color #282828, and white text
2. THE Portfolio_App SHALL use flexbox or CSS grid for layout instead of absolute positioning with translateY transforms
3. THE Portfolio_App SHALL be responsive, adjusting content layout for mobile, tablet, and desktop viewports
4. THE Navbar SHALL be visually consistent with the dark theme and remain fixed or sticky at the top of the page
5. THE Portfolio_App SHALL maintain the panel opacity of 0.85 for the main content area over the background

### Requirement 5: Navigation

**User Story:** As a visitor, I want the navigation links to scroll to the corresponding sections, so that I can navigate the page content.

#### Acceptance Criteria

1. WHEN a visitor clicks a navigation link, THE Navbar SHALL scroll the page smoothly to the corresponding section
2. THE Navbar SHALL contain links for "Home", "Professional", and "Personal" sections
3. WHEN the page has insufficient content for a section, THE Portfolio_App SHALL display a placeholder indicating future content

### Requirement 6: Component Architecture

**User Story:** As a developer, I want the React app organized into reusable components, so that the codebase is maintainable and extensible.

#### Acceptance Criteria

1. THE Portfolio_App SHALL separate the page into distinct React components (Navbar, Welcome Section, Certification Section, and a root App component at minimum)
2. WHEN new sections are added in the future, THE Portfolio_App component structure SHALL allow adding new section components without modifying existing ones
3. THE Portfolio_App SHALL keep styling scoped to individual components using CSS Modules or equivalent scoping mechanism

### Requirement 7: Background Image

**User Story:** As the site owner, I want the background image preserved with proper cover sizing, so that the visual aesthetic is maintained.

#### Acceptance Criteria

1. THE Theme_System SHALL display the underConstruction.png image as a fixed, full-cover background
2. WHEN the viewport is resized, THE Theme_System SHALL scale the background image to cover the entire viewport without distortion
