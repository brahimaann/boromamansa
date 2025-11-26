# Deployment Guide

## 🚀 Free Hosting Options for Next.js

### 1. **Vercel** (⭐ RECOMMENDED - Best for Next.js)
- **Why:** Made by the Next.js team, zero-config deployment
- **Free Tier:** 
  - Unlimited personal projects
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Serverless functions included
- **Setup:** 
  1. Push code to GitHub
  2. Go to [vercel.com](https://vercel.com)
  3. Import your GitHub repo
  4. Add environment variables
  5. Deploy!

### 2. **Netlify**
- **Why:** Great free tier, easy setup
- **Free Tier:**
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Automatic HTTPS
- **Setup:**
  1. Push code to GitHub
  2. Go to [netlify.com](https://netlify.com)
  3. Connect GitHub repo
  4. Build settings: `npm run build`, Publish: `.next`
  5. Add environment variables
  6. Deploy!

### 3. **Railway**
- **Why:** Good for full-stack apps with databases
- **Free Tier:** $5 credit/month (enough for small projects)

## 📋 Pre-Deployment Checklist

✅ Code pushed to GitHub  
✅ Environment variables documented  
✅ `.env.local` NOT committed (already in .gitignore)  
✅ Service account JSON NOT committed (already in .gitignore)  

## 🔐 Setting Up Environment Variables

### For Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.local`:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (keep the quotes and \n)
   - `GOOGLE_CALENDAR_ID`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `ADMIN_EMAIL`

### For Netlify:
1. Go to Site settings
2. Navigate to "Environment variables"
3. Add all variables (same as above)

## 🚨 Important Notes

1. **Google Calendar Sharing:** Make sure you've shared your calendar with the service account email: `boromamansa@boromamansa.iam.gserviceaccount.com`

2. **Gmail App Password:** Use the 16-character password without spaces: `hsownpjlvcdguyxf`

3. **Private Key:** When adding `GOOGLE_PRIVATE_KEY` to hosting platform, keep the quotes and `\n` characters exactly as they are.

4. **API Routes:** Your booking and calendar API routes will work automatically on both Vercel and Netlify.

## 📝 Next Steps

1. Configure git user (if not done):
```bash
git config --global user.email "brahimaann3@gmail.com"
git config --global user.name "Brahima Ann"
```

2. Commit and push:
```bash
git commit -m "Initial commit: Boroma Mansa portfolio and booking platform"
git push -u origin main
```

3. Deploy to Vercel or Netlify using the steps above!

