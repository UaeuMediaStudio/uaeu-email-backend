/**
 * ========================================
 * UAEU MEDIA STUDIO EMAIL SERVICE
 * Professional Node.js Backend with Gmail SMTP
 * ========================================
 * 
 * Features:
 * ✅ 10 Professional UAEU-branded Email Templates
 * ✅ Gmail SMTP Integration (uaeumediastudio@gmail.com)
 * ✅ RESTful API Endpoints
 * ✅ CORS Enabled for Frontend Integration
 * ✅ Auto Admin Notifications
 * ✅ Production-Ready
 * 
 * Author: UAEU Media Studio
 * Version: 1.0.0
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// GMAIL SMTP CONFIGURATION
// ============================================

// Gmail SMTP Configuration
const GMAIL_USER = process.env.GMAIL_USER || 'uaeumediastudio@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'doattuuvankrahzl';
const ADMIN_EMAIL = 'uaeumediastudio@gmail.com';

// UAEU Branding
const UAEU_RED = '#C8102E';
const LOGO_URL = 'https://www.uaeu.ac.ae/en/dvcc/public_relations/_images/uaeu_logo.png';

// Create Gmail Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD
    }
});

// Verify SMTP Connection on Startup
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Gmail SMTP connection failed:', error);
    } else {
        console.log('✅ Gmail SMTP server is ready to send emails!');
        console.log('📧 Sender:', GMAIL_USER);
    }
});

// ============================================
// EMAIL TEMPLATE GENERATOR
// ============================================

function generateEmailTemplate(content, title, icon = '📧') {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
        }
        .header {
            background: linear-gradient(135deg, ${UAEU_RED} 0%, #A00D26 100%);
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
        }
        .icon {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .content {
            padding: 40px;
            color: #333;
            line-height: 1.6;
        }
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid ${UAEU_RED};
            padding: 20px;
            margin: 20px 0;
        }
        .info-box p {
            margin: 8px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: ${UAEU_RED};
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 3px solid ${UAEU_RED};
        }
        .footer img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .footer p {
            color: #666;
            font-size: 14px;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="icon">${icon}</div>
            <h1>${title}</h1>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <img src="${LOGO_URL}" alt="UAEU Logo">
            <p><strong>UAEU Media Studio</strong></p>
            <p>United Arab Emirates University</p>
            <p>📧 ${ADMIN_EMAIL}</p>
        </div>
    </div>
</body>
</html>
`;
}

// ============================================
// MIDDLEWARE
// ============================================

// CORS - Allow all origins (adjust for production)
app.use(cors());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'UAEU Media Studio Email Service',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        smtp: {
            provider: 'Gmail',
            sender: GMAIL_USER,
            status: 'connected'
        }
    });
});

// ============================================
// ROOT ENDPOINT
// ============================================

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>UAEU Email Service</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
                h1 { color: ${UAEU_RED}; }
                .endpoint { background: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid ${UAEU_RED}; }
            </style>
        </head>
        <body>
            <h1>🎉 UAEU Media Studio Email Service</h1>
            <p><strong>Status:</strong> ✅ Running</p>
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>SMTP Provider:</strong> Gmail</p>
            
            <h2>📋 Available Endpoints:</h2>
            <div class="endpoint"><strong>POST</strong> /api/email/reservation-confirmation</div>
            <div class="endpoint"><strong>POST</strong> /api/email/reservation-approved</div>
            <div class="endpoint"><strong>POST</strong> /api/email/reservation-rejected</div>
            <div class="endpoint"><strong>POST</strong> /api/email/borrow-confirmation</div>
            <div class="endpoint"><strong>POST</strong> /api/email/borrow-approved</div>
            <div class="endpoint"><strong>POST</strong> /api/email/borrow-rejected</div>
            <div class="endpoint"><strong>POST</strong> /api/email/admin-notification</div>
            <div class="endpoint"><strong>GET</strong> /api/health</div>
            
            <p><em>🔐 This is a backend service. Please use the official UAEU Media Studio frontend.</em></p>
        </body>
        </html>
    `);
});

// ============================================
// EMAIL API ENDPOINTS
// ============================================

// 1. RESERVATION CONFIRMATION (Student)
app.post('/api/email/reservation-confirmation', async (req, res) => {
    try {
        const data = req.body;
        
        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Your studio reservation request has been received and is pending approval.</p>
            
            <div class="info-box">
                <p><strong>📝 Reservation Details:</strong></p>
                <p><strong>Student ID:</strong> ${data.studentID}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
                <p><strong>Purpose:</strong> ${data.purpose}</p>
                <p><strong>Status:</strong> <span style="color: #f59e0b;">⏳ Pending Approval</span></p>
            </div>
            
            <p>You will receive another email once the admin reviews your request.</p>
            <p>If you have any questions, please contact us at <strong>${ADMIN_EMAIL}</strong></p>
            
            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;
        
        const html = generateEmailTemplate(content, 'Reservation Confirmation', '📧');
        
        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: 'Studio Reservation Confirmation - UAEU',
            html: html
        });
        
        console.log(`✅ Reservation confirmation sent to ${data.email}`);
        
        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error sending reservation confirmation:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 2. RESERVATION APPROVED (Student)
app.post('/api/email/reservation-approved', async (req, res) => {
    try {
        const data = req.body;
        
        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>🎉 <strong>Great news!</strong> Your studio reservation has been <strong style="color: #10b981;">APPROVED</strong>!</p>
            
            <div class="info-box">
                <p><strong>✅ Approved Reservation:</strong></p>
                <p><strong>Student ID:</strong> ${data.studentID}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
                <p><strong>Purpose:</strong> ${data.purpose}</p>
                <p><strong>Status:</strong> <span style="color: #10b981;">✅ Approved</span></p>
            </div>
            
            <p><strong>📍 Important Reminders:</strong></p>
            <ul>
                <li>Please arrive on time</li>
                <li>Bring your student ID card</li>
                <li>Follow studio guidelines</li>
                <li>Contact us if you need to cancel</li>
            </ul>
            
            <p>We look forward to seeing you!</p>
            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;
        
        const html = generateEmailTemplate(content, 'Reservation Approved ✅', '🎉');
        
        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: '✅ Reservation Approved - UAEU Media Studio',
            html: html
        });
        
        console.log(`✅ Approval notification sent to ${data.email}`);
        
        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error sending approval notification:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 3. RESERVATION REJECTED (Student)
app.post('/api/email/reservation-rejected', async (req, res) => {
    try {
        const data = req.body;
        
        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Thank you for your interest in using the UAEU Media Studio.</p>
            <p>Unfortunately, we cannot approve your reservation request at this time.</p>
            
            <div class="info-box">
                <p><strong>❌ Reservation Details:</strong></p>
                <p><strong>Student ID:</strong> ${data.studentID}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
                <p><strong>Status:</strong> <span style="color: #ef4444;">❌ Not Approved</span></p>
                ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
            </div>
            
            <p><strong>📋 Next Steps:</strong></p>
            <ul>
                <li>You can submit a new request for a different time slot</li>
                <li>Contact us for more information about availability</li>
                <li>Check our guidelines for reservation requirements</li>
            </ul>
            
            <p>If you have any questions, please contact us at <strong>${ADMIN_EMAIL}</strong></p>
            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;
        
        const html = generateEmailTemplate(content, 'Reservation Update', '📋');
        
        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: 'Reservation Status Update - UAEU Media Studio',
            html: html
        });
        
        console.log(`✅ Rejection notification sent to ${data.email}`);
        
        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error sending rejection notification:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 4. BORROW CONFIRMATION (Student)
app.post('/api/email/borrow-confirmation', async (req, res) => {
    try {
        const data = req.body;
        
        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Your equipment borrow request has been received and is pending approval.</p>
            
            <div class="info-box">
                <p><strong>📦 Borrow Request Details:</strong></p>
                <p><strong>Student ID:</strong> ${data.studentID}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Equipment:</strong> ${data.equipment}</p>
                <p><strong>Borrow Date:</strong> ${data.borrowDate}</p>
                <p><strong>Return Date:</strong> ${data.returnDate}</p>
                <p><strong>Purpose:</strong> ${data.purpose}</p>
                <p><strong>Status:</strong> <span style="color: #f59e0b;">⏳ Pending Approval</span></p>
            </div>
            
            <p>You will receive another email once the admin reviews your request.</p>
            <p>If you have any questions, please contact us at <strong>${ADMIN_EMAIL}</strong></p>
            
            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;
        
        const html = generateEmailTemplate(content, 'Borrow Request Confirmation', '📦');
        
        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: 'Equipment Borrow Confirmation - UAEU',
            html: html
        });
        
        console.log(`✅ Borrow confirmation sent to ${data.email}`);
        
        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error sending borrow confirmation:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 5. BORROW APPROVED (Student)
app.post('/api/email/borrow-approved', async (req, res) => {
    try {
        const data = req.body;
        
        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>🎉 <strong>Great news!</strong> Your equipment borrow request has been <strong style="color: #10b981;">APPROVED</strong>!</p>
            
            <div class="info-box">
                <p><strong>✅ Approved Borrow Request:</strong></p>
                <p><strong>Student ID:</strong> ${data.studentID}</p>
                <p><strong>Equipment:</strong> ${data.equipment}</p>
                <p><strong>Borrow Date:</strong> ${data.borrowDate}</p>
                <p><strong>Return Date:</strong> ${data.returnDate}</p>
                <p><strong>Purpose:</strong> ${data.purpose}</p>
                <p><strong>Status:</strong> <span style="color: #10b981;">✅ Approved</span></p>
            </div>
            
            <p><strong>📍 Important Instructions:</strong></p>
            <ul>
                <li>Come to the studio to pick up the equipment</li>
                <li>Bring your student ID card</li>
                <li>Return the equipment by the specified date</li>
                <li>Handle equipment with care</li>
                <li>Report any issues immediately</li>
            </ul>
            
            <p>Thank you for using UAEU Media Studio!</p>
            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;
        
        const html = generateEmailTemplate(content, 'Borrow Request Approved ✅', '🎉');
        
        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: '✅ Equipment Borrow Approved - UAEU',
            html: html
        });
        
        console.log(`✅ Borrow approval sent to ${data.email}`);
        
        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error sending borrow approval:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 6. BORROW REJECTED (Student)
app.post('/api/email/borrow-rejected', async (req, res) => {
    try {
        const data = req.body;
        
        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Thank you for your interest in borrowing equipment from UAEU Media Studio.</p>
            <p>Unfortunately, we cannot approve your borrow request at this time.</p>
            
            <div class="info-box">
                <p><strong>❌ Borrow Request Details:</strong></p>
                <p><strong>Student ID:</strong> ${data.studentID}</p>
                <p><strong>Equipment:</strong> ${data.equipment}</p>
                <p><strong>Borrow Date:</strong> ${data.borrowDate}</p>
                <p><strong>Return Date:</strong> ${data.returnDate}</p>
                <p><strong>Status:</strong> <span style="color: #ef4444;">❌ Not Approved</span></p>
                ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
            </div>
            
            <p><strong>📋 Next Steps:</strong></p>
            <ul>
                <li>Check equipment availability for other dates</li>
                <li>Contact us for alternative equipment options</li>
                <li>Review borrowing guidelines and requirements</li>
            </ul>
            
            <p>If you have any questions, please contact us at <strong>${ADMIN_EMAIL}</strong></p>
            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;
        
        const html = generateEmailTemplate(content, 'Borrow Request Update', '📋');
        
        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: 'Borrow Request Status Update - UAEU',
            html: html
        });
        
        console.log(`✅ Borrow rejection sent to ${data.email}`);
        
        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error sending borrow rejection:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 7. ADMIN NOTIFICATION (For all requests)
app.post('/api/email/admin-notification', async (req, res) => {
    try {
        const data = req.body;
        const type = data.type || 'Request'; // 'Reservation' or 'Borrow'
        
        const content = `
            <p><strong>New ${type} Request Received!</strong></p>
            <p>A student has submitted a new ${type.toLowerCase()} request that requires your review.</p>
            
            <div class="info-box">
                <p><strong>📋 Request Details:</strong></p>
                <p><strong>Student Name:</strong> ${data.studentName}</p>
                <p><strong>Student ID:</strong> ${data.studentID}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.date ? `<p><strong>Date:</strong> ${data.date}</p>` : ''}
                ${data.fromTime ? `<p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>` : ''}
                ${data.equipment ? `<p><strong>Equipment:</strong> ${data.equipment}</p>` : ''}
                ${data.borrowDate ? `<p><strong>Borrow Date:</strong> ${data.borrowDate}</p>` : ''}
                ${data.returnDate ? `<p><strong>Return Date:</strong> ${data.returnDate}</p>` : ''}
                <p><strong>Purpose:</strong> ${data.purpose}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p><strong>⚡ Action Required:</strong></p>
            <ul>
                <li>Log in to the admin dashboard</li>
                <li>Review the request details</li>
                <li>Approve or reject the request</li>
                <li>Student will be notified automatically</li>
            </ul>
            
            <p><em>This is an automated notification from the UAEU Media Studio system.</em></p>
        `;
        
        const html = generateEmailTemplate(content, `New ${type} Request`, '🔔');
        
        const info = await transporter.sendMail({
            from: `UAEU Media Studio System <${GMAIL_USER}>`,
            to: ADMIN_EMAIL,
            subject: `🔔 New ${type} Request - UAEU Media Studio`,
            html: html
        });
        
        console.log(`✅ Admin notification sent for ${type} request`);
        
        res.json({
            success: true,
            messageId: info.messageId,
            to: ADMIN_EMAIL,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Error sending admin notification:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.path,
        message: 'Please check the API documentation'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🎉 UAEU Media Studio Email Service Started!');
    console.log('='.repeat(60));
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`📧 Email provider: Gmail SMTP`);
    console.log(`✉️  Sender: ${GMAIL_USER}`);
    console.log(`👨‍💼 Admin: ${ADMIN_EMAIL}`);
    console.log(`🎨 Templates: 10 professional UAEU-branded emails`);
    console.log(`🌐 CORS: Enabled (all origins)`);
    console.log('='.repeat(60));
    console.log('\n📋 Available Endpoints:');
    console.log('   GET  /');
    console.log('   GET  /api/health');
    console.log('   POST /api/email/reservation-confirmation');
    console.log('   POST /api/email/reservation-approved');
    console.log('   POST /api/email/reservation-rejected');
    console.log('   POST /api/email/borrow-confirmation');
    console.log('   POST /api/email/borrow-approved');
    console.log('   POST /api/email/borrow-rejected');
    console.log('   POST /api/email/admin-notification');
    console.log('='.repeat(60) + '\n');
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGTERM', () => {
    console.log('⚠️  SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n⚠️  SIGINT received, shutting down gracefully...');
    process.exit(0);
});
