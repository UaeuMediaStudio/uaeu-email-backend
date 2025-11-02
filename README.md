# 🎉 UAEU Media Studio Email Service

Professional Node.js backend email service with Gmail SMTP integration for UAEU Media Studio.

## ✨ Features

- ✅ **10 Professional UAEU-branded Email Templates**
- ✅ **Gmail SMTP Integration** (uaeumediastudio@gmail.com)
- ✅ **RESTful API Endpoints**
- ✅ **CORS Enabled** for frontend integration
- ✅ **Auto Admin Notifications**
- ✅ **Production-Ready**
- ✅ **Deploy to Cyclic, Render, Railway, or Heroku**

## 📋 Email Templates

1. **Reservation Confirmation** - Student receives confirmation their request is pending
2. **Reservation Approved** - Student receives approval notification
3. **Reservation Rejected** - Student receives rejection with reason
4. **Borrow Confirmation** - Student receives equipment borrow confirmation
5. **Borrow Approved** - Student receives borrow approval
6. **Borrow Rejected** - Student receives borrow rejection with reason
7. **Admin Notification** - Admin receives all new requests

All emails feature:
- UAEU Red theme (#C8102E)
- Official UAEU logo
- Professional HTML design
- Mobile-responsive layout
- Clear call-to-actions

## 🚀 Quick Start

### Prerequisites

- Node.js 14.x or higher
- Gmail account with App Password enabled
- GitHub account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/UaeuMediaStudio/uaeu-email-backend.git
   cd uaeu-email-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   GMAIL_USER=uaeumediastudio@gmail.com
   GMAIL_APP_PASSWORD=doattuuvankrahzl
   PORT=3000
   ```

4. **Run the server**
   ```bash
   npm start
   ```

5. **Test the API**
   - Open: http://localhost:3000
   - Health check: http://localhost:3000/api/health

## 📡 API Endpoints

### Base URL
```
Production: https://your-app-name.cyclic.app
Local: http://localhost:3000
```

### Available Endpoints

#### 1. Health Check
```
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "service": "UAEU Media Studio Email Service",
  "version": "1.0.0",
  "timestamp": "2024-11-02T12:00:00.000Z",
  "smtp": {
    "provider": "Gmail",
    "sender": "uaeumediastudio@gmail.com",
    "status": "connected"
  }
}
```

#### 2. Send Reservation Confirmation
```
POST /api/email/reservation-confirmation
```

Request Body:
```json
{
  "studentName": "Ahmed Ali",
  "studentID": "202012345",
  "email": "ahmed@uaeu.ac.ae",
  "date": "2024-11-15",
  "fromTime": "10:00 AM",
  "toTime": "12:00 PM",
  "purpose": "Video Production Class Project"
}
```

#### 3. Send Reservation Approved
```
POST /api/email/reservation-approved
```

#### 4. Send Reservation Rejected
```
POST /api/email/reservation-rejected
```

Request Body (includes optional reason):
```json
{
  "studentName": "Ahmed Ali",
  "studentID": "202012345",
  "email": "ahmed@uaeu.ac.ae",
  "date": "2024-11-15",
  "fromTime": "10:00 AM",
  "toTime": "12:00 PM",
  "reason": "Studio already booked for that time slot"
}
```

#### 5. Send Borrow Confirmation
```
POST /api/email/borrow-confirmation
```

Request Body:
```json
{
  "studentName": "Fatima Hassan",
  "studentID": "202098765",
  "email": "fatima@uaeu.ac.ae",
  "equipment": "Canon EOS R5 Camera",
  "borrowDate": "2024-11-20",
  "returnDate": "2024-11-22",
  "purpose": "Photography Assignment"
}
```

#### 6. Send Borrow Approved
```
POST /api/email/borrow-approved
```

#### 7. Send Borrow Rejected
```
POST /api/email/borrow-rejected
```

#### 8. Send Admin Notification
```
POST /api/email/admin-notification
```

Request Body:
```json
{
  "type": "Reservation",
  "studentName": "Ahmed Ali",
  "studentID": "202012345",
  "email": "ahmed@uaeu.ac.ae",
  "date": "2024-11-15",
  "fromTime": "10:00 AM",
  "toTime": "12:00 PM",
  "purpose": "Video Production Class Project"
}
```

## 🌐 Deployment

### Option 1: Deploy to Cyclic (Recommended - 100% Free, Never Sleeps)

1. **Push code to GitHub** (already done!)
2. **Go to** [cyclic.sh](https://cyclic.sh)
3. **Sign in with GitHub**
4. **Click "Link New App"**
5. **Select repository:** `UaeuMediaStudio/uaeu-email-backend`
6. **Add Environment Variables:**
   - `GMAIL_USER` = `uaeumediastudio@gmail.com`
   - `GMAIL_APP_PASSWORD` = `doattuuvankrahzl`
   - `NODE_ENV` = `production`
7. **Deploy!**

Your backend URL will be: `https://your-app-name.cyclic.app`

### Option 2: Deploy to Render (100% Free, Sleeps after 15 min)

1. **Go to** [render.com](https://render.com)
2. **Sign in with GitHub**
3. **New → Web Service**
4. **Connect repository:** `UaeuMediaStudio/uaeu-email-backend`
5. **Configure:**
   - Name: `uaeu-email-service`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. **Add Environment Variables:**
   - `GMAIL_USER` = `uaeumediastudio@gmail.com`
   - `GMAIL_APP_PASSWORD` = `doattuuvankrahzl`
   - `NODE_ENV` = `production`
7. **Create Web Service**

### Option 3: Deploy to Railway ($5 credit/month)

1. **Go to** [railway.app](https://railway.app)
2. **Sign in with GitHub**
3. **New Project → Deploy from GitHub repo**
4. **Select:** `UaeuMediaStudio/uaeu-email-backend`
5. **Add Environment Variables** (same as above)
6. **Deploy**

### Option 4: Deploy to Heroku (550 hrs/month free)

1. **Go to** [heroku.com](https://heroku.com)
2. **Create new app**
3. **Connect to GitHub**
4. **Select repository**
5. **Add Config Vars** (Environment Variables)
6. **Deploy**

## 🔐 Environment Variables

Create a `.env` file (local development only):

```env
# Gmail SMTP Configuration
GMAIL_USER=uaeumediastudio@gmail.com
GMAIL_APP_PASSWORD=doattuuvankrahzl

# Server Configuration
PORT=3000
NODE_ENV=development
```

⚠️ **IMPORTANT:** Never commit `.env` file to GitHub! It's already in `.gitignore`.

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "nodemailer": "^6.9.7",
  "cors": "^2.8.5",
  "body-parser": "^1.20.2",
  "dotenv": "^16.3.1"
}
```

## 🧪 Testing

### Test Health Endpoint
```bash
curl https://your-app-name.cyclic.app/api/health
```

### Test Email Sending
```bash
curl -X POST https://your-app-name.cyclic.app/api/email/reservation-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Test Student",
    "studentID": "202099999",
    "email": "your-email@gmail.com",
    "date": "2024-11-20",
    "fromTime": "10:00 AM",
    "toTime": "12:00 PM",
    "purpose": "Testing Email System"
  }'
```

## 🔧 Frontend Integration

Update your frontend `js/email-service-backend.js`:

```javascript
class EmailServiceBackend {
    // Update this URL after deployment
    static API_BASE_URL = 'https://your-app-name.cyclic.app/api';
    
    static async sendReservationConfirmation(data) {
        const response = await fetch(`${this.API_BASE_URL}/email/reservation-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}
```

## 📝 Project Structure

```
uaeu-email-backend/
├── server.js           # Main application file (570 lines)
├── package.json        # Node.js dependencies
├── .gitignore         # Git ignore rules
├── Procfile           # Heroku configuration
├── railway.json       # Railway configuration
├── render.yaml        # Render configuration
├── README.md          # This file
└── .env               # Environment variables (LOCAL ONLY - DO NOT COMMIT)
```

## 🎨 Email Branding

- **Primary Color:** UAEU Red (#C8102E)
- **Logo:** Official UAEU logo from uaeu.ac.ae
- **Typography:** Arial, sans-serif
- **Layout:** Professional, mobile-responsive HTML emails

## 📞 Support

- **Email:** uaeumediastudio@gmail.com
- **GitHub:** https://github.com/UaeuMediaStudio/uaeu-email-backend

## 📄 License

MIT License - feel free to use and modify for your needs.

## 🏆 Version

**v1.0.0** - Production Ready

---

**Made with ❤️ for UAEU Media Studio**
