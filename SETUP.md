# Booking System Setup

## ✅ Fully Open Source & Free

This setup uses **100% open source** technologies:
- ✅ **Next.js** - Open source framework
- ✅ **Nodemailer** - Open source email library
- ✅ **googleapis** - Open source Google API client
- ✅ **No authentication required** - Simple form-based booking

**Free Services:**
- ✅ **Google Calendar API** - Free (1M queries/day)
- ✅ **Gmail SMTP** - Free for sending emails

## Required Environment Variables

Add these to your `.env.local` file:

### Google Calendar Integration
```
GOOGLE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=your-private-key
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

### Email Configuration (for confirmations)
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=your-admin-email@gmail.com
```

## Google Calendar Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API
4. Create a Service Account
5. Download the JSON key file
6. Extract `client_email` and `private_key` from the JSON
7. **IMPORTANT: Share your calendar with the service account email**
   - Go to [Google Calendar](https://calendar.google.com/)
   - Click on your calendar settings (⚙️ → Settings)
   - Find "Share with specific people" or "Integrate calendar"
   - Add the service account email: `boromamansa@boromamansa.iam.gserviceaccount.com`
   - Give it "Make changes to events" permission
8. Your calendar ID is: `brahimaann3@gmail.com` (already configured)

## Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use the app password as `EMAIL_PASSWORD` (remove spaces: `hsownpjlvcdguyxf`)
4. Your email is already configured: `brahimaann3@gmail.com`


