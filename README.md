# 🎉 UAEU Media Studio Email Service

Professional Node.js backend email service with Gmail SMTP integration for UAEU Media Studio.

## ✨ Features

- ✅ 10 Professional UAEU-branded Email Templates
- ✅ Gmail SMTP Integration (uaeumediastudio@gmail.com)
- ✅ RESTful API Endpoints
- ✅ CORS Enabled for frontend integration
- ✅ Auto Admin Notifications
- ✅ Production-Ready
- ✅ Deploy to Koyeb, Render, Railway, or Heroku

## 📡 API Endpoints

### Base URL
```
Production: https://your-app-name.koyeb.app
Local: http://localhost:3000
```

### Available Endpoints

1. **GET /api/health** - Health check
2. **POST /api/email/reservation-confirmation** - Send reservation confirmation
3. **POST /api/email/reservation-approved** - Send approval notification
4. **POST /api/email/reservation-rejected** - Send rejection notification
5. **POST /api/email/borrow-confirmation** - Send borrow confirmation
6. **POST /api/email/borrow-approved** - Send borrow approval
7. **POST /api/email/borrow-rejected** - Send borrow rejection
8. **POST /api/email/admin-notification** - Send admin notification

## 🚀 Deployment

### Environment Variables (Add in Koyeb/Render/Railway)

```
GMAIL_USER=uaeumediastudio@gmail.com
GMAIL_APP_PASSWORD=doattuuvankrahzl
NODE_ENV=production
```

### Deploy to Koyeb (Recommended - 100% Free, Never Sleeps)

1. Go to https://koyeb.com
2. Sign in with GitHub
3. Link repository: `UaeuMediaStudio/uaeu-email-backend`
4. Add environment variables
5. Deploy!

## 📝 License

MIT License

---

**Made with ❤️ for UAEU Media Studio**
