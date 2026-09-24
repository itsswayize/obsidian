# Obsidian Grooming Co.

Obsidian Grooming Co. is a premium barber shop website built around an editorial, cinematic visual identity. It provides a complete customer journey from discovering the studio and its artisans to selecting a service, barber, date, time, and appointment details.

## Features

- Responsive home, services, about, contact, booking, and terms pages
- Premium service menu with prices, durations, and direct booking links
- Barber profiles with portrait imagery and specialties
- Multi-step booking flow with service, barber, availability, and customer details
- Google Calendar event creation
- Apple Calendar-compatible `.ics` download
- Purposeful first-visit promotion modal
- Responsive navigation with mobile menu
- Contact details, opening hours, social links, and legal navigation

## Tech Stack

- Angular 20
- TypeScript
- RxJS
- Bootstrap 5
- SCSS
- Google Fonts: Cinzel and Manrope

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open `http://localhost:4200/` in a browser.

## Available Commands

```bash
npm start                 # Start the development server
npm run build             # Create a production build in dist/
npm test                  # Run the Angular unit tests
npx ng test --watch=false # Run tests once
```

## Main Routes

| Route       | Purpose                                      |
| ----------- | -------------------------------------------- |
| `/`         | Brand homepage and studio story              |
| `/services` | Service menu and pricing                     |
| `/about`    | Brand philosophy and artisans                |
| `/contact`  | Location, contact details, and opening hours |
| `/booking`  | Appointment booking flow                     |
| `/terms`    | Terms and conditions                         |

## Project Structure

```text
src/app/
├── core/                 # Models and business services
├── features/             # Route-level pages and booking flow
└── shared/               # Header, footer, and promotion modal
```

The booking data and availability service are currently local application data intended for demonstration and assessment use.
