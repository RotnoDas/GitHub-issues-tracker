# GitHub Issues Tracker

GitHub Issues Tracker is a responsive frontend application that simulates a lightweight issue management experience. It provides login, issue discovery, status-based filtering, search, and detail inspection through a modal interface.

## Overview

This project is designed as a client-side implementation that consumes remote APIs and renders issue data in a card-based dashboard. It emphasizes clean UI, straightforward interaction, and modular JavaScript files for each feature.

## Core Capabilities

- Demo authentication and route transition from login to dashboard
- Issue listing from API with dynamic card rendering
- Status filtering across All, Open, and Closed views
- Title-based issue search
- Dynamic issue counts for each status section
- Details modal with assignee, priority, labels, and timestamps
- Responsive layout powered by TailwindCSS and DaisyUI

## Application Flow

1. User lands on login page at `index.html`.
2. Credentials are validated on the client.
3. On success, user is redirected to `home.html`.
4. Dashboard loads issues from API.
5. User can filter by status, search by title, or open an issue modal.

## Demo Access

- Username: `admin`
- Password: `admin123`

## Technology Stack

- HTML5
- CSS3
- JavaScript (ES6)
- TailwindCSS via CDN
- DaisyUI via CDN
- Font Awesome via CDN

## Project Structure

```text
github-issues-tracker/
  assets/
    Aperture.png
    Closed- Status .png
    github-logo.png
    Open-Status.png
    social.png
  scripts/
    allissues.js
    closedissues.js
    login.js
    modal.js
    openissues.js
    search.js
  styles/
    style.css
  home.html
  index.html
  tailwind.init.css
  README.md
```

## API Integration

- List all issues
  - `GET https://phi-lab-server.vercel.app/api/v1/lab/issues`
- Search issues
  - `GET https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=<term>`
- Fetch issue details by ID
  - `GET https://phi-lab-server.vercel.app/api/v1/lab/issue/<id>`

## Getting Started

1. Clone or download the repository.
2. Open the project in VS Code.
3. Start a local static server.
4. Open `index.html` in your browser.
5. Sign in with the demo credentials.

## Suggested Local Server Options

- VS Code Live Server extension
- Python:

```bash
python -m http.server 5500
```

- Node.js (if `serve` is installed):

```bash
serve .
```

## Module Responsibilities

- `scripts/login.js`: validates demo credentials and redirects to dashboard
- `scripts/allissues.js`: fetches and renders all issues, controls All tab
- `scripts/openissues.js`: filters and renders open issues, controls Open tab
- `scripts/closedissues.js`: filters and renders closed issues, controls Closed tab
- `scripts/search.js`: executes search and renders matching issue cards
- `scripts/modal.js`: fetches single issue data and renders details modal

## Operational Notes

- Authentication is frontend-only and intended for demonstration.
- The application depends on external API availability.
- No backend service is included in this repository.

## Future Enhancements

- Add robust error handling and user-friendly empty/error states
- Introduce pagination or lazy loading for large issue sets
- Support keyboard submission for login and search forms
- Add automated tests for UI interactions and API integration
