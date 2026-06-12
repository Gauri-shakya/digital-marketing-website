const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const nodemailer = require('nodemailer');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// POST /api/leads - Save lead, Generate AI Summary, Send Email
router.post('/', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    try {
        // Step 1: Generate AI Summary of the customer inquiry
        let aiSummary = 'No detailed summary available.';
        if (message && message.length > 5) {
            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `You are an automated assistant. Summarize the following client inquiry in exactly 1 concise sentence for a sales team. Lead Name: ${name}, Service Requested: ${service}. Client Message: "${message}"`
                });
                aiSummary = response.text;
            } catch (aiErr) {
                console.error("AI Summarization failed:", aiErr);
            }
        }

        // Step 2: Store Information in MySQL
        const query = 'INSERT INTO leads (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)';
        pool.query(query, [name, email, phone, service, message], async (err, results) => {
            if (err) {
                console.error('Error inserting lead:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            // Step 3: Send Email Notification using Ethereal (Free test SMTP)
            try {
                // Create a testing account automatically
                let testAccount = await nodemailer.createTestAccount();

                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass,
                    },
                });

                let info = await transporter.sendMail({
                    from: '"Tech Digi Automation" <system@techdigi.com>',
                    to: "admin@techdigi.com", // Send to admin
                    subject: `New Lead Generated: ${name}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                            <h2 style="color: #6366F1;">New Lead Notification</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                            <p><strong>Service Requested:</strong> ${service}</p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                            
                            <h3 style="color: #4F46E5;">🤖 AI Generated Summary</h3>
                            <div style="background-color: #F8FAFC; padding: 15px; border-left: 4px solid #6366F1; border-radius: 4px;">
                                <em>${aiSummary}</em>
                            </div>
                            
                            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                            <h4>Original Message:</h4>
                            <p>${message || 'No message provided.'}</p>
                        </div>
                    `
                });

                // Get the preview URL
                const previewUrl = nodemailer.getTestMessageUrl(info);
                console.log("Automated Email Sent! Preview URL: %s", previewUrl);

                // Step 4: Return success to frontend with the preview URL
                return res.status(201).json({ 
                    message: 'Lead saved successfully', 
                    leadId: results.insertId,
                    previewUrl: previewUrl
                });

            } catch (mailErr) {
                console.error("Email workflow failed:", mailErr);
                // Return success anyway since DB insert worked
                return res.status(201).json({ message: 'Lead saved but email failed', leadId: results.insertId });
            }
        });
    } catch (e) {
        console.error("Workflow error:", e);
        res.status(500).json({ error: 'Server error during automation workflow' });
    }
});

// GET /api/leads - Return all leads (for admin)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM leads ORDER BY created_at DESC';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching leads:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

module.exports = router;
