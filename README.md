## About

This Next.js project is a web application for managing and displaying events. Users can view featured events, explore event details, register for newsletters, and search for events based on specific criteria. The project includes various components, pages, API routes, and helper functions to provide a seamless user experience.

## Project Structure

The project structure includes the following components:

- `components`: Contains reusable UI components for event details, event lists, newsletter registration, etc.
- `pages`: Contains different pages of the application, including event detail pages, index page, events page, API routes, etc.
- `helpers`: Contains utility functions for fetching events, filtering events, and interacting with the database.
- `layout`: Contains the layout component for the application.

## Code Overview

The project includes code snippets for various components and pages:

- `EventList`: Renders a list of events using the `EventItem` component.
- `EventItem`: Displays individual event details like title, date, location, and explore link.
- `NewsletterRegistration`: Component for users to register for the newsletter.
- `API routes`: Handles newsletter registration through a POST request.
- `ResultsTitle`: Displays a title for events based on a specific date.
- `EventDetailPage`: Displays detailed information about a specific event.
- `Layout`: Main layout component for the application.
- `AllEventsPage`: Shows all events with a search functionality.
- `API Util`: Contains functions for fetching, filtering, and getting event details.
- `HomePage`: Displays featured events and a newsletter registration form.
- `_app.js` and `_document.js`: Next.js specific files for customizing the app.

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js/)

## Deployment

To deploy your Next.js app, consider using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## API Routes

API routes in the `pages/api` directory are treated as API endpoints instead of React pages.

## Font Optimization

The project uses `next/font` for optimizing and loading the Inter font.
