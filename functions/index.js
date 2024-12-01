/* eslint-disable no-unused-vars */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";

import { database } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
import { createTransport } from 'nodemailer';

initializeApp();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

export const sendFeedbackEmail = database.ref('/feedback/{feedbackId}')
  .onCreate((snapshot, context) => {
    const feedback = snapshot.val();
    const mailOptions = {
      from: feedback.email, // Use the sender's email from the form input
      to: 'chanyalew21@gmail.com',
      subject: 'New Feedback Received',
      text: `Name: ${feedback.name}\nEmail: ${feedback.email}\nMessage: ${feedback.message}\nDate: ${feedback.date}`,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
