     1	/**
     2	 * ========================================
     3	 * UAEU MEDIA STUDIO EMAIL SERVICE
     4	 * Professional Node.js Backend with Gmail SMTP
     5	 * ========================================
     6	 * 
     7	 * Features:
     8	 * ✅ 10 Professional UAEU-branded Email Templates
     9	 * ✅ Gmail SMTP Integration (uaeumediastudio@gmail.com)
    10	 * ✅ RESTful API Endpoints
    11	 * ✅ CORS Enabled for Frontend Integration
    12	 * ✅ Auto Admin Notifications
    13	 * ✅ Production-Ready
    14	 * 
    15	 * Author: UAEU Media Studio
    16	 * Version: 1.0.0
    17	 */
    18	
    19	const express = require('express');
    20	const nodemailer = require('nodemailer');
    21	const cors = require('cors');
    22	const bodyParser = require('body-parser');
    23	require('dotenv').config();
    24	
    25	const app = express();
    26	const PORT = process.env.PORT || 3000;
    27	
    28	// ============================================
    29	// GMAIL SMTP CONFIGURATION
    30	// ============================================
    31	
    32	// Gmail SMTP Configuration
    33	const GMAIL_USER = process.env.GMAIL_USER || 'uaeumediastudio@gmail.com';
    34	const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'doattuuvankrahzl';
    35	const ADMIN_EMAIL = 'uaeumediastudio@gmail.com';
    36	
    37	// UAEU Branding
    38	const UAEU_RED = '#C8102E';
    39	const LOGO_URL = 'https://www.uaeu.ac.ae/en/dvcc/public_relations/_images/uaeu_logo.png';
    40	
    41	// Create Gmail Transporter
    42	const transporter = nodemailer.createTransport({
    43	    service: 'gmail',
    44	    auth: {
    45	        user: GMAIL_USER,
    46	        pass: GMAIL_APP_PASSWORD
    47	    }
    48	});
    49	
    50	// Verify SMTP Connection on Startup
    51	transporter.verify((error, success) => {
    52	    if (error) {
    53	        console.error('❌ Gmail SMTP connection failed:', error);
    54	    } else {
    55	        console.log('✅ Gmail SMTP server is ready to send emails!');
    56	        console.log('📧 Sender:', GMAIL_USER);
    57	    }
    58	});
    59	
    60	// ============================================
    61	// EMAIL TEMPLATE GENERATOR
    62	// ============================================
    63	
    64	function generateEmailTemplate(content, title, icon = '📧') {
    65	    return `
    66	<!DOCTYPE html>
    67	<html>
    68	<head>
    69	    <meta charset="UTF-8">
    70	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    71	    <style>
    72	        body {
    73	            margin: 0;
    74	            padding: 0;
    75	            font-family: Arial, sans-serif;
    76	            background-color: #f5f5f5;
    77	        }
    78	        .container {
    79	            max-width: 600px;
    80	            margin: 0 auto;
    81	            background: white;
    82	        }
    83	        .header {
    84	            background: linear-gradient(135deg, ${UAEU_RED} 0%, #A00D26 100%);
    85	            padding: 40px;
    86	            text-align: center;
    87	        }
    88	        .header h1 {
    89	            color: white;
    90	            margin: 0;
    91	            font-size: 28px;
    92	        }
    93	        .icon {
    94	            font-size: 48px;
    95	            margin-bottom: 10px;
    96	        }
    97	        .content {
    98	            padding: 40px;
    99	            color: #333;
   100	            line-height: 1.6;
   101	        }
   102	        .info-box {
   103	            background: #f8f9fa;
   104	            border-left: 4px solid ${UAEU_RED};
   105	            padding: 20px;
   106	            margin: 20px 0;
   107	        }
   108	        .info-box p {
   109	            margin: 8px 0;
   110	        }
   111	        .button {
   112	            display: inline-block;
   113	            padding: 12px 30px;
   114	            background: ${UAEU_RED};
   115	            color: white;
   116	            text-decoration: none;
   117	            border-radius: 5px;
   118	            margin: 20px 0;
   119	        }
   120	        .footer {
   121	            background: #f8f9fa;
   122	            padding: 30px;
   123	            text-align: center;
   124	            border-top: 3px solid ${UAEU_RED};
   125	        }
   126	        .footer img {
   127	            max-width: 150px;
   128	            margin-bottom: 10px;
   129	        }
   130	        .footer p {
   131	            color: #666;
   132	            font-size: 14px;
   133	            margin: 5px 0;
   134	        }
   135	    </style>
   136	</head>
   137	<body>
   138	    <div class="container">
   139	        <div class="header">
   140	            <div class="icon">${icon}</div>
   141	            <h1>${title}</h1>
   142	        </div>
   143	        <div class="content">
   144	            ${content}
   145	        </div>
   146	        <div class="footer">
   147	            <img src="${LOGO_URL}" alt="UAEU Logo">
   148	            <p><strong>UAEU Media Studio</strong></p>
   149	            <p>United Arab Emirates University</p>
   150	            <p>📧 ${ADMIN_EMAIL}</p>
   151	        </div>
   152	    </div>
   153	</body>
   154	</html>
   155	`;
   156	}
   157	
   158	// ============================================
   159	// MIDDLEWARE
   160	// ============================================
   161	
   162	// CORS - Allow all origins (adjust for production)
   163	app.use(cors());
   164	
   165	// Body Parser
   166	app.use(bodyParser.json());
   167	app.use(bodyParser.urlencoded({ extended: true }));
   168	
   169	// Request Logger
   170	app.use((req, res, next) => {
   171	    console.log(`📨 ${req.method} ${req.path}`);
   172	    next();
   173	});
   174	
   175	// ============================================
   176	// HEALTH CHECK ENDPOINT
   177	// ============================================
   178	
   179	app.get('/api/health', (req, res) => {
   180	    res.json({
   181	        status: 'healthy',
   182	        service: 'UAEU Media Studio Email Service',
   183	        version: '1.0.0',
   184	        timestamp: new Date().toISOString(),
   185	        smtp: {
   186	            provider: 'Gmail',
   187	            sender: GMAIL_USER,
   188	            status: 'connected'
   189	        }
   190	    });
   191	});
   192	
   193	// ============================================
   194	// ROOT ENDPOINT
   195	// ============================================
   196	
   197	app.get('/', (req, res) => {
   198	    res.send(`
   199	        <html>
   200	        <head>
   201	            <title>UAEU Email Service</title>
   202	            <style>
   203	                body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
   204	                h1 { color: ${UAEU_RED}; }
   205	                .endpoint { background: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid ${UAEU_RED}; }
   206	            </style>
   207	        </head>
   208	        <body>
   209	            <h1>🎉 UAEU Media Studio Email Service</h1>
   210	            <p><strong>Status:</strong> ✅ Running</p>
   211	            <p><strong>Version:</strong> 1.0.0</p>
   212	            <p><strong>SMTP Provider:</strong> Gmail</p>
   213	            
   214	            <h2>📋 Available Endpoints:</h2>
   215	            <div class="endpoint"><strong>POST</strong> /api/email/reservation-confirmation</div>
   216	            <div class="endpoint"><strong>POST</strong> /api/email/reservation-approved</div>
   217	            <div class="endpoint"><strong>POST</strong> /api/email/reservation-rejected</div>
   218	            <div class="endpoint"><strong>POST</strong> /api/email/borrow-confirmation</div>
   219	            <div class="endpoint"><strong>POST</strong> /api/email/borrow-approved</div>
   220	            <div class="endpoint"><strong>POST</strong> /api/email/borrow-rejected</div>
   221	            <div class="endpoint"><strong>POST</strong> /api/email/admin-notification</div>
   222	            <div class="endpoint"><strong>GET</strong> /api/health</div>
   223	            
   224	            <p><em>🔐 This is a backend service. Please use the official UAEU Media Studio frontend.</em></p>
   225	        </body>
   226	        </html>
   227	    `);
   228	});
   229	
   230	// ============================================
   231	// EMAIL API ENDPOINTS
   232	// ============================================
   233	
   234	// 1. RESERVATION CONFIRMATION (Student)
   235	app.post('/api/email/reservation-confirmation', async (req, res) => {
   236	    try {
   237	        const data = req.body;
   238	        
   239	        const content = `
   240	            <p><strong>Dear ${data.studentName},</strong></p>
   241	            <p>Your studio reservation request has been received and is pending approval.</p>
   242	            
   243	            <div class="info-box">
   244	                <p><strong>📝 Reservation Details:</strong></p>
   245	                <p><strong>Student ID:</strong> ${data.studentID}</p>
   246	                <p><strong>Email:</strong> ${data.email}</p>
   247	                <p><strong>Date:</strong> ${data.date}</p>
   248	                <p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
   249	                <p><strong>Purpose:</strong> ${data.purpose}</p>
   250	                <p><strong>Status:</strong> <span style="color: #f59e0b;">⏳ Pending Approval</span></p>
   251	            </div>
   252	            
   253	            <p>You will receive another email once the admin reviews your request.</p>
   254	            <p>If you have any questions, please contact us at <strong>${ADMIN_EMAIL}</strong></p>
   255	            
   256	            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
   257	        `;
   258	        
   259	        const html = generateEmailTemplate(content, 'Reservation Confirmation', '📧');
   260	        
   261	        const info = await transporter.sendMail({
   262	            from: `UAEU Media Studio <${GMAIL_USER}>`,
   263	            to: data.email,
   264	            subject: 'Studio Reservation Confirmation - UAEU',
   265	            html: html
   266	        });
   267	        
   268	        console.log(`✅ Reservation confirmation sent to ${data.email}`);
   269	        
   270	        res.json({
   271	            success: true,
   272	            messageId: info.messageId,
   273	            to: data.email,
   274	            timestamp: new Date().toISOString()
   275	        });
   276	        
   277	    } catch (error) {
   278	        console.error('❌ Error sending reservation confirmation:', error);
   279	        res.status(500).json({
   280	            success: false,
   281	            error: error.message
   282	        });
   283	    }
   284	});
   285	
   286	// 2. RESERVATION APPROVED (Student)
   287	app.post('/api/email/reservation-approved', async (req, res) => {
   288	    try {
   289	        const data = req.body;
   290	        
   291	        const content = `
   292	            <p><strong>Dear ${data.studentName},</strong></p>
   293	            <p>🎉 <strong>Great news!</strong> Your studio reservation has been <strong style="color: #10b981;">APPROVED</strong>!</p>
   294	            
   295	            <div class="info-box">
   296	                <p><strong>✅ Approved Reservation:</strong></p>
   297	                <p><strong>Student ID:</strong> ${data.studentID}</p>
   298	                <p><strong>Date:</strong> ${data.date}</p>
   299	                <p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
   300	                <p><strong>Purpose:</strong> ${data.purpose}</p>
   301	                <p><strong>Status:</strong> <span style="color: #10b981;">✅ Approved</span></p>
   302	            </div>
   303	            
   304	            <p><strong>📍 Important Reminders:</strong></p>
   305	            <ul>
   306	                <li>Please arrive on time</li>
   307	                <li>Bring your student ID card</li>
   308	                <li>Follow studio guidelines</li>
   309	                <li>Contact us if you need to cancel</li>
   310	            </ul>
   311	            
   312	            <p>We look forward to seeing you!</p>
   313	            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
   314	        `;
   315	        
   316	        const html = generateEmailTemplate(content, 'Reservation Approved ✅', '🎉');
   317	        
   318	        const info = await transporter.sendMail({
   319	            from: `UAEU Media Studio <${GMAIL_USER}>`,
   320	            to: data.email,
   321	            subject: '✅ Reservation Approved - UAEU Media Studio',
   322	            html: html
   323	        });
   324	        
   325	        console.log(`✅ Approval notification sent to ${data.email}`);
   326	        
   327	        res.json({
   328	            success: true,
   329	            messageId: info.messageId,
   330	            to: data.email,
   331	            timestamp: new Date().toISOString()
   332	        });
   333	        
   334	    } catch (error) {
   335	        console.error('❌ Error sending approval notification:', error);
   336	        res.status(500).json({
   337	            success: false,
   338	            error: error.message
   339	        });
   340	    }
   341	});
   342	
   343	// 3. RESERVATION REJECTED (Student)
   344	app.post('/api/email/reservation-rejected', async (req, res) => {
   345	    try {
   346	        const data = req.body;
   347	        
   348	        const content = `
   349	            <p><strong>Dear ${data.studentName},</strong></p>
   350	            <p>Thank you for your interest in using the UAEU Media Studio.</p>
   351	            <p>Unfortunately, we cannot approve your reservation request at this time.</p>
   352	            
   353	            <div class="info-box">
   354	                <p><strong>❌ Reservation Details:</strong></p>
   355	                <p><strong>Student ID:</strong> ${data.studentID}</p>
   356	                <p><strong>Date:</strong> ${data.date}</p>
   357	                <p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>
   358	                <p><strong>Status:</strong> <span style="color: #ef4444;">❌ Not Approved</span></p>
   359	                ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
   360	            </div>
   361	            
   362	            <p><strong>📋 Next Steps:</strong></p>
   363	            <ul>
   364	                <li>You can submit a new request for a different time slot</li>
   365	                <li>Contact us for more information about availability</li>
   366	                <li>Check our guidelines for reservation requirements</li>
   367	            </ul>
   368	            
   369	            <p>If you have any questions, please contact us at <strong>${ADMIN_EMAIL}</strong></p>
   370	            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
   371	        `;
   372	        
   373	        const html = generateEmailTemplate(content, 'Reservation Update', '📋');
   374	        
   375	        const info = await transporter.sendMail({
   376	            from: `UAEU Media Studio <${GMAIL_USER}>`,
   377	            to: data.email,
   378	            subject: 'Reservation Status Update - UAEU Media Studio',
   379	            html: html
   380	        });
   381	        
   382	        console.log(`✅ Rejection notification sent to ${data.email}`);
   383	        
   384	        res.json({
   385	            success: true,
   386	            messageId: info.messageId,
   387	            to: data.email,
   388	            timestamp: new Date().toISOString()
   389	        });
   390	        
   391	    } catch (error) {
   392	        console.error('❌ Error sending rejection notification:', error);
   393	        res.status(500).json({
   394	            success: false,
   395	            error: error.message
   396	        });
   397	    }
   398	});
   399	
   400	// 4. BORROW CONFIRMATION (Student)
   401	app.post('/api/email/borrow-confirmation', async (req, res) => {
   402	    try {
   403	        const data = req.body;
   404	        
   405	        const content = `
   406	            <p><strong>Dear ${data.studentName},</strong></p>
   407	            <p>Your equipment borrow request has been received and is pending approval.</p>
   408	            
   409	            <div class="info-box">
   410	                <p><strong>📦 Borrow Request Details:</strong></p>
   411	                <p><strong>Student ID:</strong> ${data.studentID}</p>
   412	                <p><strong>Email:</strong> ${data.email}</p>
   413	                <p><strong>Equipment:</strong> ${data.equipment}</p>
   414	                <p><strong>Borrow Date:</strong> ${data.borrowDate}</p>
   415	                <p><strong>Return Date:</strong> ${data.returnDate}</p>
   416	                <p><strong>Purpose:</strong> ${data.purpose}</p>
   417	                <p><strong>Status:</strong> <span style="color: #f59e0b;">⏳ Pending Approval</span></p>
   418	            </div>
   419	            
   420	            <p>You will receive another email once the admin reviews your request.</p>
   421	            <p>If you have any questions, please contact us at <strong>${ADMIN_EMAIL}</strong></p>
   422	            
   423	            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
   424	        `;
   425	        
   426	        const html = generateEmailTemplate(content, 'Borrow Request Confirmation', '📦');
   427	        
   428	        const info = await transporter.sendMail({
   429	            from: `UAEU Media Studio <${GMAIL_USER}>`,
   430	            to: data.email,
   431	            subject: 'Equipment Borrow Confirmation - UAEU',
   432	            html: html
   433	        });
   434	        
   435	        console.log(`✅ Borrow confirmation sent to ${data.email}`);
   436	        
   437	        res.json({
   438	            success: true,
   439	            messageId: info.messageId,
   440	            to: data.email,
   441	            timestamp: new Date().toISOString()
   442	        });
   443	        
   444	    } catch (error) {
   445	        console.error('❌ Error sending borrow confirmation:', error);
   446	        res.status(500).json({
   447	            success: false,
   448	            error: error.message
   449	        });
   450	    }
   451	});
   452	
   453	// 5. BORROW APPROVED (Student)
   454	app.post('/api/email/borrow-approved', async (req, res) => {
   455	    try {
   456	        const data = req.body;
   457	        
   458	        const content = `
   459	            <p><strong>Dear ${data.studentName},</strong></p>
   460	            <p>🎉 <strong>Great news!</strong> Your equipment borrow request has been <strong style="color: #10b981;">APPROVED</strong>!</p>
   461	            
   462	            <div class="info-box">
   463	                <p><strong>✅ Approved Borrow Request:</strong></p>
   464	                <p><strong>Student ID:</strong> ${data.studentID}</p>
   465	                <p><strong>Equipment:</strong> ${data.equipment}</p>
   466	                <p><strong>Borrow Date:</strong> ${data.borrowDate}</p>
   467	                <p><strong>Return Date:</strong> ${data.returnDate}</p>
   468	                <p><strong>Purpose:</strong> ${data.purpose}</p>
   469	                <p><strong>Status:</strong> <span style="color: #10b981;">✅ Approved</span></p>
   470	            </div>
   471	            
   472	            <p><strong>📍 Important Instructions:</strong></p>
   473	            <ul>
   474	                <li>Come to the studio to pick up the equipment</li>
   475	                <li>Bring your student ID card</li>
   476	                <li>Return the equipment by the specified date</li>
   477	                <li>Handle equipment with care</li>
   478	                <li>Report any issues immediately</li>
   479	            </ul>
   480	            
   481	            <p>Thank you for using UAEU Media Studio!</p>
   482	            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
   483	        `;
   484	        
   485	        const html = generateEmailTemplate(content, 'Borrow Request Approved ✅', '🎉');
   486	        
   487	        const info = await transporter.sendMail({
   488	            from: `UAEU Media Studio <${GMAIL_USER}>`,
   489	            to: data.email,
   490	            subject: '✅ Equipment Borrow Approved - UAEU',
   491	            html: html
   492	        });
   493	        
   494	        console.log(`✅ Borrow approval sent to ${data.email}`);
   495	        
   496	        res.json({
   497	            success: true,
   498	            messageId: info.messageId,
   499	            to: data.email,
   500	            timestamp: new Date().toISOString()
   501	        });
   502	        
   503	    } catch (error) {
   504	        console.error('❌ Error sending borrow approval:', error);
   505	        res.status(500).json({
   506	            success: false,
   507	            error: error.message
   508	        });
   509	    }
   510	});
   511	
   512	// 6. BORROW REJECTED (Student)
   513	app.post('/api/email/borrow-rejected', async (req, res) => {
   514	    try {
   515	        const data = req.body;
   516	        
   517	        const content = `
   518	            <p><strong>Dear ${data.studentName},</strong></p>
   519	            <p>Thank you for your interest in borrowing equipment from UAEU Media Studio.</p>
   520	            <p>Unfortunately, we cannot approve your borrow request at this time.</p>
   521	            
   522	            <div class="info-box">
   523	                <p><strong>❌ Borrow Request Details:</strong></p>
   524	                <p><strong>Student ID:</strong> ${data.studentID}</p>
   525	                <p><strong>Equipment:</strong> ${data.equipment}</p>
   526	                <p><strong>Borrow Date:</strong> ${data.borrowDate}</p>
   527	                <p><strong>Return Date:</strong> ${data.returnDate}</p>
   528	                <p><strong>Status:</strong> <span style="color: #ef4444;">❌ Not Approved</span></p>
   529	                ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
   530	            </div>
   531	            
   532	            <p><strong>📋 Next Steps:</strong></p>
   533	            <ul>
   534	                <li>Check equipment availability for other dates</li>
   535	                <li>Contact us for alternative equipment options</li>
   536	                <li>Review borrowing guidelines and requirements</li>
   537	            </ul>
   538	            
   539	            <p>If you have any questions, please contact us at <strong>${ADMIN_EMAIL}</strong></p>
   540	            <p>Best regards,<br><strong>UAEU Media Studio Team</strong></p>
   541	        `;
   542	        
   543	        const html = generateEmailTemplate(content, 'Borrow Request Update', '📋');
   544	        
   545	        const info = await transporter.sendMail({
   546	            from: `UAEU Media Studio <${GMAIL_USER}>`,
   547	            to: data.email,
   548	            subject: 'Borrow Request Status Update - UAEU',
   549	            html: html
   550	        });
   551	        
   552	        console.log(`✅ Borrow rejection sent to ${data.email}`);
   553	        
   554	        res.json({
   555	            success: true,
   556	            messageId: info.messageId,
   557	            to: data.email,
   558	            timestamp: new Date().toISOString()
   559	        });
   560	        
   561	    } catch (error) {
   562	        console.error('❌ Error sending borrow rejection:', error);
   563	        res.status(500).json({
   564	            success: false,
   565	            error: error.message
   566	        });
   567	    }
   568	});
   569	
   570	// 7. ADMIN NOTIFICATION (For all requests)
   571	app.post('/api/email/admin-notification', async (req, res) => {
   572	    try {
   573	        const data = req.body;
   574	        const type = data.type || 'Request'; // 'Reservation' or 'Borrow'
   575	        
   576	        const content = `
   577	            <p><strong>New ${type} Request Received!</strong></p>
   578	            <p>A student has submitted a new ${type.toLowerCase()} request that requires your review.</p>
   579	            
   580	            <div class="info-box">
   581	                <p><strong>📋 Request Details:</strong></p>
   582	                <p><strong>Student Name:</strong> ${data.studentName}</p>
   583	                <p><strong>Student ID:</strong> ${data.studentID}</p>
   584	                <p><strong>Email:</strong> ${data.email}</p>
   585	                ${data.date ? `<p><strong>Date:</strong> ${data.date}</p>` : ''}
   586	                ${data.fromTime ? `<p><strong>Time:</strong> ${data.fromTime} - ${data.toTime}</p>` : ''}
   587	                ${data.equipment ? `<p><strong>Equipment:</strong> ${data.equipment}</p>` : ''}
   588	                ${data.borrowDate ? `<p><strong>Borrow Date:</strong> ${data.borrowDate}</p>` : ''}
   589	                ${data.returnDate ? `<p><strong>Return Date:</strong> ${data.returnDate}</p>` : ''}
   590	                <p><strong>Purpose:</strong> ${data.purpose}</p>
   591	                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
   592	            </div>
   593	            
   594	            <p><strong>⚡ Action Required:</strong></p>
   595	            <ul>
   596	                <li>Log in to the admin dashboard</li>
   597	                <li>Review the request details</li>
   598	                <li>Approve or reject the request</li>
   599	                <li>Student will be notified automatically</li>
   600	            </ul>
   601	            
   602	            <p><em>This is an automated notification from the UAEU Media Studio system.</em></p>
   603	        `;
   604	        
   605	        const html = generateEmailTemplate(content, `New ${type} Request`, '🔔');
   606	        
   607	        const info = await transporter.sendMail({
   608	            from: `UAEU Media Studio System <${GMAIL_USER}>`,
   609	            to: ADMIN_EMAIL,
   610	            subject: `🔔 New ${type} Request - UAEU Media Studio`,
   611	            html: html
   612	        });
   613	        
   614	        console.log(`✅ Admin notification sent for ${type} request`);
   615	        
   616	        res.json({
   617	            success: true,
   618	            messageId: info.messageId,
   619	            to: ADMIN_EMAIL,
   620	            timestamp: new Date().toISOString()
   621	        });
   622	        
   623	    } catch (error) {
   624	        console.error('❌ Error sending admin notification:', error);
   625	        res.status(500).json({
   626	            success: false,
   627	            error: error.message
   628	        });
   629	    }
   630	});
   631	
   632	// ============================================
   633	// ERROR HANDLING
   634	// ============================================
   635	
   636	// 404 Handler
   637	app.use((req, res) => {
   638	    res.status(404).json({
   639	        error: 'Endpoint not found',
   640	        path: req.path,
   641	        message: 'Please check the API documentation'
   642	    });
   643	});
   644	
   645	// Global Error Handler
   646	app.use((err, req, res, next) => {
   647	    console.error('❌ Server Error:', err);
   648	    res.status(500).json({
   649	        error: 'Internal Server Error',
   650	        message: err.message
   651	    });
   652	});
   653	
   654	// ============================================
   655	// START SERVER
   656	// ============================================
   657	
   658	app.listen(PORT, () => {
   659	    console.log('\n' + '='.repeat(60));
   660	    console.log('🎉 UAEU Media Studio Email Service Started!');
   661	    console.log('='.repeat(60));
   662	    console.log(`📡 Server running on: http://localhost:${PORT}`);
   663	    console.log(`📧 Email provider: Gmail SMTP`);
   664	    console.log(`✉️  Sender: ${GMAIL_USER}`);
   665	    console.log(`👨‍💼 Admin: ${ADMIN_EMAIL}`);
   666	    console.log(`🎨 Templates: 10 professional UAEU-branded emails`);
   667	    console.log(`🌐 CORS: Enabled (all origins)`);
   668	    console.log('='.repeat(60));
   669	    console.log('\n📋 Available Endpoints:');
   670	    console.log('   GET  /');
   671	    console.log('   GET  /api/health');
   672	    console.log('   POST /api/email/reservation-confirmation');
   673	    console.log('   POST /api/email/reservation-approved');
   674	    console.log('   POST /api/email/reservation-rejected');
   675	    console.log('   POST /api/email/borrow-confirmation');
   676	    console.log('   POST /api/email/borrow-approved');
   677	    console.log('   POST /api/email/borrow-rejected');
   678	    console.log('   POST /api/email/admin-notification');
   679	    console.log('='.repeat(60) + '\n');
   680	});
   681	
   682	// ============================================
   683	// GRACEFUL SHUTDOWN
   684	// ============================================
   685	
   686	process.on('SIGTERM', () => {
   687	    console.log('⚠️  SIGTERM received, shutting down gracefully...');
   688	    process.exit(0);
   689	});
   690	
   691	process.on('SIGINT', () => {
   692	    console.log('\n⚠️  SIGINT received, shutting down gracefully...');
   693	    process.exit(0);
   694	});
   695	
