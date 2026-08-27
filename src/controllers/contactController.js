const nodemailer = require('nodemailer');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Contact = require('../models/Contact');

// Builds a transporter only when SMTP env vars are configured, so the
// contact form still works (message just gets stored in DB) without email set up.
const buildTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400, 'الاسم والبريد الإلكتروني والرسالة مطلوبة');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'صيغة البريد الإلكتروني غير صحيحة');
  }

  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
    ip: req.ip,
  });

  // Best-effort email notification — never block/fail the request over it.
  const transporter = buildTransporter();
  if (transporter && process.env.CONTACT_RECEIVER_EMAIL) {
    transporter
      .sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL,
        replyTo: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] رسالة جديدة من ${name}`,
        text: `الاسم: ${name}\nالبريد: ${email}\n\n${message}`,
      })
      .catch((err) => console.error('Contact email failed to send:', err.message));
  }

  res.status(201).json({
    success: true,
    message: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً',
    data: { id: contact._id },
  });
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, data: messages });
});

// @desc    Mark a message as read
// @route   PUT /api/contact/:id/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
  const message = await Contact.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!message) throw new ApiError(404, 'الرسالة غير موجودة');
  res.json({ success: true, data: message });
});

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private
const deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await Contact.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, 'الرسالة غير موجودة');
  res.json({ success: true, data: {} });
});

module.exports = {
  sendContactMessage,
  getContactMessages,
  markAsRead,
  deleteContactMessage,
};
