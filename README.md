# Boroma Mansa

A multimedia portfolio and booking platform built with Next.js.

## Features

- 🎨 **Portfolio Gallery** - Showcase your photography work
- 📦 **Package Selection** - Business and Personal photography packages
- 📅 **Booking System** - Integrated Google Calendar booking with email confirmations
- 📱 **Responsive Design** - Beautiful UI that works on all devices

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Calendar Integration:** Google Calendar API
- **Email:** Nodemailer (Gmail SMTP)
- **Deployment:** Ready for Netlify/Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud account (for Calendar API)
- Gmail account (for email notifications)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/brahimaann/boromamansa.git
cd boromamansa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
GOOGLE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="your-private-key"
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-admin-email@gmail.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setup Instructions

See [SETUP.md](./SETUP.md) for detailed setup instructions for:
- Google Calendar API configuration
- Gmail app password setup
- Calendar sharing

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/          # API routes (booking, calendar)
│   │   ├── booking/      # Booking page
│   │   ├── gallery/      # Gallery page
│   │   ├── packages/     # Packages page
│   │   └── page.tsx      # Homepage
│   └── ...
├── public/               # Static assets
└── ...
```

## License

Private project - All rights reserved
