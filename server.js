// UAEU Media Studio - Node.js Backend Email Service
// Professional Gmail SMTP Email Server
// Run with: node server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Gmail SMTP Configuration
const GMAIL_USER = process.env.GMAIL_USER || 'uaeumediastudio@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'doattuuvankrahzl';
const ADMIN_EMAIL = 'uaeumediastudio@gmail.com';

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

// UAEU Branding Constants
const UAEU_RED = '#C8102E';
const LOGO_URL = 'https://page.gensparksite.com/v1/base64_upload/9e0d42123b3d2cf388ffa66a64c534b7';

// HTML Email Template Generator
function generateEmailTemplate(content, title, icon = '📧') {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light only">
    <style>
        body { 
            margin: 0 !important; 
            padding: 0 !important; 
            font-family: Arial, sans-serif !important; 
            background-color: #f5f5f5 !important; 
        }
        .container { 
            max-width: 600px !important; 
            margin: 0 auto !important; 
            background: white !important; 
        }
        .header { 
            background: linear-gradient(135deg, ${UAEU_RED} 0%, #A00D26 100%) !important; 
            padding: 40px !important; 
            text-align: center !important; 
        }
        .header h1 { 
            color: white !important; 
            margin: 0 !important; 
            font-size: 28px !important; 
        }
        .icon { 
            font-size: 48px !important; 
            margin-bottom: 10px !important; 
        }
        .content { 
            padding: 30px !important; 
            background: white !important;
        }
        .content p {
            color: #333333 !important;
            line-height: 1.6 !important;
            margin: 10px 0 !important;
        }
        .content strong {
            color: #000000 !important;
        }
        .info-box {
            background: #fff5f7 !important;
            border-left: 4px solid ${UAEU_RED} !important;
            padding: 20px !important;
            margin: 20px 0 !important;
        }
        .footer { 
            background: #f8f9fa !important; 
            padding: 20px !important; 
            text-align: center !important; 
            border-top: 3px solid ${UAEU_RED} !important; 
        }
        .footer img { 
            height: 40px !important; 
            margin-bottom: 10px !important; 
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
            <p style="margin: 10px 0; font-weight: 600; color: #333;">UAEU Media Studio</p>
            <p style="margin: 5px 0; color: #666;">College of Humanities and Social Sciences</p>
            <p style="margin: 5px 0; color: #666;">United Arab Emirates University</p>
        </div>
    </div>
</body>
</html>
    `;
}

// =====================================================
// API ROUTES
// =====================================================

// Health Check
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        service: 'UAEU Media Studio Email Service',
        version: '1.0.0',
        emailProvider: 'Gmail SMTP',
        sender: GMAIL_USER
    });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        gmailConnected: true
    });
});

// =====================================================
// SEND EMAIL ENDPOINT (Generic)
// =====================================================
app.post('/api/send-email', async (req, res) => {
    try {
        const { to, subject, html } = req.body;

        // Validate required fields
        if (!to || !subject || !html) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: to, subject, html'
            });
        }

        // Send email
        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: to,
            subject: subject,
            html: html
        });

        console.log(`✅ Email sent to ${to}: ${subject}`);

        res.json({
            success: true,
            messageId: info.messageId,
            to: to,
            subject: subject,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Email error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// =====================================================
// TEMPLATE 1: Reservation Confirmation
// =====================================================
app.post('/api/email/reservation-confirmation', async (req, res) => {
    try {
        const data = req.body;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Your studio reservation request has been received and is pending approval.</p>
            
            <div class="info-box">
                <h3 style="color: ${UAEU_RED}; margin-top: 0;">📋 Student Information</h3>
                <p><strong>Name:</strong> ${data.studentName}</p>
                <p><strong>Student ID:</strong> ${data.studentId || data.studentID}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>College:</strong> ${data.college || 'N/A'}</p>
                <p><strong>Department:</strong> ${data.department || 'N/A'}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">🎬 Reservation Details</h3>
                <p><strong>Studio Type:</strong> ${data.studioType || 'Media Studio'}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
                <p><strong>Duration:</strong> ${data.duration || 'N/A'} hours</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📝 Project Information</h3>
                <p><strong>Project Name:</strong> ${data.projectName || 'N/A'}</p>
                <p><strong>Project Description:</strong> ${data.projectDescription || 'N/A'}</p>
                <p><strong>Supervisor:</strong> ${data.supervisor || 'N/A'}</p>
                
                <p style="margin-top: 20px;"><strong>Status:</strong> <span style="color: #f59e0b;">⏳ Pending Approval</span></p>
            </div>
            
            <p>You will receive an email notification once your request is reviewed by our team.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
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
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 2: Reservation Approved
// =====================================================
app.post('/api/email/reservation-approved', async (req, res) => {
    try {
        const data = req.body;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Great news! Your studio reservation has been <strong style="color: #28a745;">APPROVED</strong>!</p>
            
            <div style="background: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 20px 0;">
                <h3 style="color: ${UAEU_RED}; margin-top: 0;">📋 Student Information</h3>
                <p style="color: #333;"><strong>Name:</strong> ${data.studentName}</p>
                <p style="color: #333;"><strong>Student ID:</strong> ${data.studentId || data.studentID}</p>
                <p style="color: #333;"><strong>Email:</strong> ${data.email}</p>
                <p style="color: #333;"><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p style="color: #333;"><strong>College:</strong> ${data.college || 'N/A'}</p>
                <p style="color: #333;"><strong>Department:</strong> ${data.department || 'N/A'}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">🎬 Reservation Details</h3>
                <p style="color: #333;"><strong>Studio Type:</strong> ${data.studioType || 'Media Studio'}</p>
                <p style="color: #333;"><strong>Date:</strong> ${data.date}</p>
                <p style="color: #333;"><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
                <p style="color: #333;"><strong>Duration:</strong> ${data.duration || 'N/A'} hours</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📝 Project Information</h3>
                <p style="color: #333;"><strong>Project Name:</strong> ${data.projectName || 'N/A'}</p>
                <p style="color: #333;"><strong>Project Description:</strong> ${data.projectDescription || 'N/A'}</p>
                <p style="color: #333;"><strong>Supervisor:</strong> ${data.supervisor || 'N/A'}</p>
                
                ${data.notes ? `<p style="color: #333; margin-top: 15px;"><strong>Admin Notes:</strong> ${data.notes}</p>` : ''}
                
                <p style="color: #333; margin-top: 20px;"><strong>Status:</strong> <span style="color: #28a745; font-weight: 600;">✅ APPROVED</span></p>
            </div>
            
            <p><strong>Important:</strong> Please arrive on time and bring your student ID. Contact us if you need to make any changes.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;

        const html = generateEmailTemplate(content, 'Reservation Approved', '🎉');

        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: '🎉 Reservation Approved - UAEU Media Studio',
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
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 3: Reservation Rejected
// =====================================================
app.post('/api/email/reservation-rejected', async (req, res) => {
    try {
        const data = req.body;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Unfortunately, we cannot approve your studio reservation at this time.</p>
            
            <div style="background: #f8d7da; border-left: 4px solid #dc3545; padding: 20px; margin: 20px 0;">
                <h3 style="color: ${UAEU_RED}; margin-top: 0;">📋 Student Information</h3>
                <p style="color: #333;"><strong>Name:</strong> ${data.studentName}</p>
                <p style="color: #333;"><strong>Student ID:</strong> ${data.studentId || data.studentID}</p>
                <p style="color: #333;"><strong>Email:</strong> ${data.email}</p>
                <p style="color: #333;"><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">🎬 Reservation Details</h3>
                <p style="color: #333;"><strong>Studio Type:</strong> ${data.studioType || 'Media Studio'}</p>
                <p style="color: #333;"><strong>Date:</strong> ${data.date}</p>
                <p style="color: #333;"><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
                <p style="color: #333;"><strong>Project Name:</strong> ${data.projectName || 'N/A'}</p>
                
                ${data.rejectionReason || data.notes ? `<h3 style="color: ${UAEU_RED}; margin-top: 20px;">📝 Rejection Reason</h3><p style="color: #721c24; background: #f5c6cb; padding: 10px; border-radius: 5px;"><strong>${data.rejectionReason || data.notes}</strong></p>` : ''}
                
                <p style="color: #333; margin-top: 20px;"><strong>Status:</strong> <span style="color: #dc3545; font-weight: 600;">❌ NOT APPROVED</span></p>
            </div>
            
            <p>You can submit a new reservation request at any time. Please contact us if you have any questions.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;

        const html = generateEmailTemplate(content, 'Reservation Status Update', '❌');

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
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 4: Equipment Borrow Confirmation
// =====================================================
app.post('/api/email/equipment-confirmation', async (req, res) => {
    try {
        const data = req.body;

        // Build equipment list
        let equipmentList = [];
        if (data.camera && data.camera !== 'None') equipmentList.push(`📷 Camera: ${data.camera}`);
        if (data.memoryCard && data.memoryCard !== 'None') equipmentList.push(`💾 Memory Card: ${data.memoryCard}`);
        if (data.tripod && data.tripod !== 'None') equipmentList.push(`📐 Tripod: ${data.tripod}`);
        if (data.lights && data.lights !== 'None') equipmentList.push(`💡 Lights: ${data.lights}`);
        if (data.microphone && data.microphone !== 'None') equipmentList.push(`🎤 Microphone: ${data.microphone}`);
        if (data.otherEquipment && data.otherEquipment !== 'None') equipmentList.push(`📦 Other: ${data.otherEquipment}`);
        
        const equipmentHtml = equipmentList.length > 0 
            ? equipmentList.map(item => `<p style="margin: 5px 0;">• ${item}</p>`).join('')
            : `<p><strong>Equipment:</strong> ${data.equipmentName || 'Various items'}</p>`;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Your equipment borrowing request has been received and is pending approval.</p>
            
            <div class="info-box">
                <h3 style="color: ${UAEU_RED}; margin-top: 0;">📋 Student Information</h3>
                <p><strong>Name:</strong> ${data.studentName}</p>
                <p><strong>Student ID:</strong> ${data.studentId || data.studentID}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>College:</strong> ${data.college || 'N/A'}</p>
                <p><strong>Department:</strong> ${data.department || 'N/A'}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📦 Equipment Requested</h3>
                ${equipmentHtml}
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📅 Borrowing Period</h3>
                <p><strong>Borrow Date:</strong> ${data.borrowDate}</p>
                <p><strong>Return Date:</strong> ${data.returnDate}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📝 Project Information</h3>
                <p><strong>Class Type:</strong> ${data.classType || 'N/A'}</p>
                <p><strong>DR Number:</strong> ${data.dr || 'N/A'}</p>
                <p><strong>Project Name:</strong> ${data.projectName || 'N/A'}</p>
                <p><strong>Project Description:</strong> ${data.projectDescription || 'N/A'}</p>
                <p><strong>Supervisor:</strong> ${data.supervisor || 'N/A'}</p>
                
                <p style="margin-top: 20px;"><strong>Status:</strong> <span style="color: #f59e0b;">⏳ Pending Approval</span></p>
            </div>
            
            <p>You will receive an email notification once your request is reviewed by our team.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;

        const html = generateEmailTemplate(content, 'Equipment Borrow Request', '📦');

        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: 'Equipment Borrow Request - UAEU Media Studio',
            html: html
        });

        console.log(`✅ Equipment confirmation sent to ${data.email}`);

        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 5: Equipment Return Reminder
// =====================================================
app.post('/api/email/equipment-reminder', async (req, res) => {
    try {
        const data = req.body;
        
        // Support both studentID and studentId
        const studentId = data.studentId || data.studentID;
        
        // Build equipment list from all equipment fields
        let equipmentList = [];
        if (data.camera && data.camera !== 'None') equipmentList.push(`Camera: ${data.camera}`);
        if (data.memoryCard && data.memoryCard !== 'None') equipmentList.push(`Memory Card: ${data.memoryCard}`);
        if (data.tripod && data.tripod !== 'None') equipmentList.push(`Tripod: ${data.tripod}`);
        if (data.lights && data.lights !== 'None') equipmentList.push(`Lights: ${data.lights}`);
        if (data.microphone && data.microphone !== 'None') equipmentList.push(`Microphone: ${data.microphone}`);
        if (data.otherEquipment && data.otherEquipment !== 'None') equipmentList.push(`Other: ${data.otherEquipment}`);
        
        const equipmentHtml = equipmentList.length > 0 
            ? equipmentList.map(item => `<p style="color: #333; margin: 5px 0;">• ${item}</p>`).join('')
            : `<p style="color: #333;"><strong>Equipment:</strong> ${data.equipmentName || 'Various items'}</p>`;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>This is a friendly reminder that your borrowed equipment is due for return soon.</p>
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0;">
                <p style="color: #333;"><strong>Student ID:</strong> ${studentId}</p>
                <p style="color: #333; margin-bottom: 10px;"><strong>Borrowed Equipment:</strong></p>
                ${equipmentHtml}
                <p style="color: #333; margin-top: 10px;"><strong>Borrow Date:</strong> ${data.borrowDate}</p>
                <p style="color: #333;"><strong>Return Date:</strong> ${data.returnDate}</p>
                <p style="color: #856404; margin-top: 15px;">⚠️ <strong>Please return the equipment on time to avoid late fees.</strong></p>
            </div>
            <p>If you need an extension, please contact us before the due date.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;

        const html = generateEmailTemplate(content, 'Equipment Return Reminder', '⏰');

        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: '⏰ Equipment Return Reminder - UAEU Media Studio',
            html: html
        });

        console.log(`✅ Reminder sent to ${data.email}`);

        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 6: Equipment Overdue Notice
// =====================================================
app.post('/api/email/equipment-overdue', async (req, res) => {
    try {
        const data = req.body;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Your borrowed equipment is now overdue. Please return it immediately.</p>
            <div style="background: #f8d7da; border-left: 4px solid #dc3545; padding: 20px; margin: 20px 0;">
                <p style="color: #333;"><strong>Student ID:</strong> ${data.studentID}</p>
                <p style="color: #333;"><strong>Equipment:</strong> ${data.equipmentName}</p>
                <p style="color: #333;"><strong>Was Due:</strong> ${data.returnDate}</p>
                <p style="color: #333;"><strong>Days Overdue:</strong> ${data.daysOverdue}</p>
                <p style="color: #721c24;">🚨 <strong>OVERDUE - Late fees may apply!</strong></p>
            </div>
            <p>Please return the equipment as soon as possible to avoid additional charges.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;

        const html = generateEmailTemplate(content, 'OVERDUE: Equipment Return', '🚨');

        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: '🚨 OVERDUE: Equipment Return Required - UAEU Media Studio',
            html: html
        });

        console.log(`✅ Overdue notice sent to ${data.email}`);

        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 6B: Equipment Borrow Approved
// =====================================================
app.post('/api/email/borrow-approved', async (req, res) => {
    try {
        const data = req.body;
        
        // Build equipment list
        let equipmentList = [];
        if (data.camera && data.camera !== 'None') equipmentList.push(`📷 Camera: ${data.camera}`);
        if (data.memoryCard && data.memoryCard !== 'None') equipmentList.push(`💾 Memory Card: ${data.memoryCard}`);
        if (data.tripod && data.tripod !== 'None') equipmentList.push(`📐 Tripod: ${data.tripod}`);
        if (data.lights && data.lights !== 'None') equipmentList.push(`💡 Lights: ${data.lights}`);
        if (data.microphone && data.microphone !== 'None') equipmentList.push(`🎤 Microphone: ${data.microphone}`);
        if (data.otherEquipment && data.otherEquipment !== 'None') equipmentList.push(`📦 Other: ${data.otherEquipment}`);
        
        const equipmentHtml = equipmentList.length > 0 
            ? equipmentList.map(item => `<p style="margin: 5px 0;">• ${item}</p>`).join('')
            : `<p><strong>Equipment:</strong> ${data.equipmentName || 'Various items'}</p>`;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Great news! Your equipment borrowing request has been <strong style="color: #28a745;">APPROVED</strong>!</p>
            
            <div style="background: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 20px 0;">
                <h3 style="color: ${UAEU_RED}; margin-top: 0;">📋 Student Information</h3>
                <p style="color: #333;"><strong>Name:</strong> ${data.studentName}</p>
                <p style="color: #333;"><strong>Student ID:</strong> ${data.studentId || data.studentID}</p>
                <p style="color: #333;"><strong>Email:</strong> ${data.email}</p>
                <p style="color: #333;"><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p style="color: #333;"><strong>College:</strong> ${data.college || 'N/A'}</p>
                <p style="color: #333;"><strong>Department:</strong> ${data.department || 'N/A'}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📦 Approved Equipment</h3>
                ${equipmentHtml}
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📅 Borrowing Period</h3>
                <p style="color: #333;"><strong>Pickup Date:</strong> ${data.borrowDate}</p>
                <p style="color: #333;"><strong>Return Date:</strong> ${data.returnDate}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📝 Project Information</h3>
                <p style="color: #333;"><strong>Class Type:</strong> ${data.classType || 'N/A'}</p>
                <p style="color: #333;"><strong>DR Number:</strong> ${data.dr || 'N/A'}</p>
                <p style="color: #333;"><strong>Project Name:</strong> ${data.projectName || 'N/A'}</p>
                <p style="color: #333;"><strong>Supervisor:</strong> ${data.supervisor || 'N/A'}</p>
                
                ${data.notes ? `<p style="color: #333; margin-top: 15px;"><strong>Admin Notes:</strong> ${data.notes}</p>` : ''}
                
                <p style="color: #333; margin-top: 20px;"><strong>Status:</strong> <span style="color: #28a745; font-weight: 600;">✅ APPROVED</span></p>
            </div>
            
            <p><strong>Important:</strong> Please pick up the equipment on time and return it by the due date. Bring your student ID for verification.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;

        const html = generateEmailTemplate(content, 'Equipment Borrow Approved', '🎉');

        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: '🎉 Equipment Borrow Approved - UAEU Media Studio',
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
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 6C: Equipment Borrow Rejected
// =====================================================
app.post('/api/email/borrow-rejected', async (req, res) => {
    try {
        const data = req.body;
        
        // Build equipment list
        let equipmentList = [];
        if (data.camera && data.camera !== 'None') equipmentList.push(`📷 Camera: ${data.camera}`);
        if (data.memoryCard && data.memoryCard !== 'None') equipmentList.push(`💾 Memory Card: ${data.memoryCard}`);
        if (data.tripod && data.tripod !== 'None') equipmentList.push(`📐 Tripod: ${data.tripod}`);
        if (data.lights && data.lights !== 'None') equipmentList.push(`💡 Lights: ${data.lights}`);
        if (data.microphone && data.microphone !== 'None') equipmentList.push(`🎤 Microphone: ${data.microphone}`);
        if (data.otherEquipment && data.otherEquipment !== 'None') equipmentList.push(`📦 Other: ${data.otherEquipment}`);
        
        const equipmentHtml = equipmentList.length > 0 
            ? equipmentList.map(item => `<p style="margin: 5px 0;">• ${item}</p>`).join('')
            : `<p><strong>Equipment:</strong> ${data.equipmentName || 'Various items'}</p>`;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>Unfortunately, we cannot approve your equipment borrowing request at this time.</p>
            
            <div style="background: #f8d7da; border-left: 4px solid #dc3545; padding: 20px; margin: 20px 0;">
                <h3 style="color: ${UAEU_RED}; margin-top: 0;">📋 Student Information</h3>
                <p style="color: #333;"><strong>Name:</strong> ${data.studentName}</p>
                <p style="color: #333;"><strong>Student ID:</strong> ${data.studentId || data.studentID}</p>
                <p style="color: #333;"><strong>Email:</strong> ${data.email}</p>
                <p style="color: #333;"><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📦 Requested Equipment</h3>
                ${equipmentHtml}
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📅 Requested Period</h3>
                <p style="color: #333;"><strong>Borrow Date:</strong> ${data.borrowDate}</p>
                <p style="color: #333;"><strong>Return Date:</strong> ${data.returnDate}</p>
                
                ${data.rejectionReason || data.notes ? `<h3 style="color: ${UAEU_RED}; margin-top: 20px;">📝 Rejection Reason</h3><p style="color: #721c24; background: #f5c6cb; padding: 10px; border-radius: 5px;"><strong>${data.rejectionReason || data.notes}</strong></p>` : ''}
                
                <p style="color: #333; margin-top: 20px;"><strong>Status:</strong> <span style="color: #dc3545; font-weight: 600;">❌ NOT APPROVED</span></p>
            </div>
            
            <p>You can submit a new request at any time. Please contact us if you have any questions.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;

        const html = generateEmailTemplate(content, 'Equipment Borrow Not Approved', '❌');

        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: 'Equipment Borrow Request - UAEU Media Studio',
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
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 7: Reservation Reminder
// =====================================================
app.post('/api/email/reservation-reminder', async (req, res) => {
    try {
        const data = req.body;

        const content = `
            <p><strong>Dear ${data.studentName},</strong></p>
            <p>This is a friendly reminder about your upcoming studio reservation.</p>
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0;">
                <p style="color: #333;"><strong>Student ID:</strong> ${data.studentId}</p>
                <p style="color: #333;"><strong>Studio:</strong> ${data.studioName || 'Media Studio'}</p>
                <p style="color: #333;"><strong>Date:</strong> ${data.date}</p>
                <p style="color: #333;"><strong>Time Slot:</strong> ${data.timeSlot}</p>
                ${data.notes ? `<p style="color: #333;"><strong>Notes:</strong> ${data.notes}</p>` : ''}
                <p style="color: #856404;">⚠️ <strong>Please arrive on time and bring your student ID.</strong></p>
            </div>
            <p>If you need to cancel or reschedule, please contact us as soon as possible.</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>UAEU Media Studio Team</strong></p>
        `;

        const html = generateEmailTemplate(content, 'Studio Reservation Reminder', '⏰');

        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: data.email,
            subject: '⏰ Reservation Reminder - UAEU Media Studio',
            html: html
        });

        console.log(`✅ Reservation reminder sent to ${data.email}`);

        res.json({
            success: true,
            messageId: info.messageId,
            to: data.email,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// TEMPLATE 8: Admin Notification
// =====================================================
app.post('/api/email/admin-notification', async (req, res) => {
    try {
        const data = req.body;
        
        // Detect if it's equipment borrow (has camera/tripod fields) or reservation (has studioType)
        const isEquipment = data.camera || data.tripod || data.microphone || data.lights || data.borrowDate;
        const type = isEquipment ? 'Equipment Borrowing' : 'Studio Reservation';

        let detailsHtml = '';
        if (isEquipment) {
            // Build equipment list
            let equipmentList = [];
            if (data.camera && data.camera !== 'None') equipmentList.push(`📷 Camera: ${data.camera}`);
            if (data.memoryCard && data.memoryCard !== 'None') equipmentList.push(`💾 Memory Card: ${data.memoryCard}`);
            if (data.tripod && data.tripod !== 'None') equipmentList.push(`📐 Tripod: ${data.tripod}`);
            if (data.lights && data.lights !== 'None') equipmentList.push(`💡 Lights: ${data.lights}`);
            if (data.microphone && data.microphone !== 'None') equipmentList.push(`🎤 Microphone: ${data.microphone}`);
            if (data.otherEquipment && data.otherEquipment !== 'None') equipmentList.push(`📦 Other: ${data.otherEquipment}`);
            
            const equipmentHtml = equipmentList.length > 0 
                ? equipmentList.map(item => `<p style="margin: 5px 0;">• ${item}</p>`).join('')
                : `<p><strong>Equipment:</strong> ${data.equipmentName || 'Various items'}</p>`;
            
            detailsHtml = `
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📦 Equipment Requested</h3>
                ${equipmentHtml}
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📅 Borrowing Period</h3>
                <p style="color: #333;"><strong>Borrow Date:</strong> ${data.borrowDate}</p>
                <p style="color: #333;"><strong>Return Date:</strong> ${data.returnDate}</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📝 Project Information</h3>
                <p style="color: #333;"><strong>Class Type:</strong> ${data.classType || 'N/A'}</p>
                <p style="color: #333;"><strong>DR Number:</strong> ${data.dr || 'N/A'}</p>
                <p style="color: #333;"><strong>Project Name:</strong> ${data.projectName || 'N/A'}</p>
                <p style="color: #333;"><strong>Project Description:</strong> ${data.projectDescription || 'N/A'}</p>
                <p style="color: #333;"><strong>Supervisor:</strong> ${data.supervisor || 'N/A'}</p>
            `;
        } else {
            detailsHtml = `
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">🎬 Reservation Details</h3>
                <p style="color: #333;"><strong>Studio Type:</strong> ${data.studioType || 'Media Studio'}</p>
                <p style="color: #333;"><strong>Date:</strong> ${data.date}</p>
                <p style="color: #333;"><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
                <p style="color: #333;"><strong>Duration:</strong> ${data.duration || 'N/A'} hours</p>
                
                <h3 style="color: ${UAEU_RED}; margin-top: 20px;">📝 Project Information</h3>
                <p style="color: #333;"><strong>Project Name:</strong> ${data.projectName || 'N/A'}</p>
                <p style="color: #333;"><strong>Project Description:</strong> ${data.projectDescription || 'N/A'}</p>
                <p style="color: #333;"><strong>Supervisor:</strong> ${data.supervisor || 'N/A'}</p>
            `;
        }

        const content = `
            <p><strong>New ${type} Request Received</strong></p>
            <div class="info-box">
                <h3 style="color: ${UAEU_RED}; margin-top: 0;">📋 Student Information</h3>
                <p style="color: #333;"><strong>Name:</strong> ${data.studentName}</p>
                <p style="color: #333;"><strong>Student ID:</strong> ${data.studentId || data.studentID}</p>
                <p style="color: #333;"><strong>Email:</strong> ${data.email}</p>
                <p style="color: #333;"><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p style="color: #333;"><strong>College:</strong> ${data.college || 'N/A'}</p>
                <p style="color: #333;"><strong>Department:</strong> ${data.department || 'N/A'}</p>
                ${detailsHtml}
            </div>
            <div style="background: #fffbeb; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                <p style="color: #333;">⚠️ <strong>Action Required:</strong> Please review and approve/reject this request in the admin dashboard.</p>
                <p style="color: #333; margin-top: 10px;"><strong>📍 Admin Dashboard:</strong> <a href="https://zulrunnh.gensparkspace.com/admin.html" style="color: ${UAEU_RED};">Click here to manage requests</a></p>
            </div>
        `;

        const html = generateEmailTemplate(content, `New ${type} Request`, '🔔');

        const info = await transporter.sendMail({
            from: `UAEU Media Studio <${GMAIL_USER}>`,
            to: ADMIN_EMAIL,
            subject: `🔔 New ${type} Request - Action Required`,
            html: html
        });

        console.log(`✅ Admin notification sent`);

        res.json({
            success: true,
            messageId: info.messageId,
            to: ADMIN_EMAIL,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// =====================================================
// START SERVER
// =====================================================
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🎉 UAEU Media Studio Email Service Started!');
    console.log('='.repeat(60));
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`📧 Email provider: Gmail SMTP`);
    console.log(`✉️  Sender: ${GMAIL_USER}`);
    console.log(`🎨 Templates: 10 professional UAEU-branded emails`);
    console.log('='.repeat(60) + '\n');
    console.log('Available endpoints:');
    console.log('  GET  /                                  - Health check');
    console.log('  GET  /api/health                        - Service status');
    console.log('  POST /api/send-email                    - Send generic email');
    console.log('  POST /api/email/reservation-confirmation');
    console.log('  POST /api/email/reservation-approved');
    console.log('  POST /api/email/reservation-rejected');
    console.log('  POST /api/email/equipment-confirmation');
    console.log('  POST /api/email/equipment-reminder');
    console.log('  POST /api/email/equipment-overdue');
    console.log('  POST /api/email/admin-notification');
    console.log('\n' + '='.repeat(60) + '\n');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n👋 SIGINT received, shutting down gracefully...');
    process.exit(0);
});
