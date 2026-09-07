<<<<<<< HEAD
# Wissensbuddy

Wissensbuddy is an interactive prototype for capturing, sharing, and finding team knowledge. It supports employees who are learning a process as well as experienced colleagues who want to pass on their knowledge in a clear, reusable format.

This project was created for the **Innovation Challenge Dresden** on **03.09.2026 and 05.-09.09.2026**.

## What it demonstrates

- Role-based entry point for knowledge seekers, knowledge providers, and team leads
- Guided documentation with chat support, suggestions, dictation, and information extraction
- Knowledge-provider workflow for reviewing and improving contributions
- Buddy-Check for submitting process knowledge for review
- Team dashboard with documentation progress and overview metrics
- Simulated handoff states for Confluence and KIM

## Project status

This is a front-end MVP and design-thinking prototype. It uses local mock data and simulated responses to demonstrate the intended user experience. There is currently no backend, authentication, persistent storage, or live connection to Confluence, an intranet, or KIM.

## Tech stack

- React 19
- Vite
- JavaScript (ES modules)
- CSS

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite in your browser.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Repository structure

```text
src/
├── components/       # Role views and workflow components
├── data/              # Mock content used by the prototype
├── App.jsx            # View routing and shared application state
└── App.css            # Application styling
```

## Why Wissensbuddy?

Important process knowledge is often shared informally and becomes difficult to find later. Wissensbuddy explores how a lightweight assistant can make knowledge capture part of everyday work while keeping the experience approachable for both learners and experts.

## License

This project is presented as a portfolio and Innovation Challenge prototype.
=======
# wissensbuddy
>>>>>>> origin/main
