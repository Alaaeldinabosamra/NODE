const emailjs = require('emailjs-com');

// npm install emailjs-com

const sendEmailJS = async (options) => {
  const templateParams = {
    to_email: options.email,
    subject: options.subject,
    message: options.message,
  };

  try {
    const res = await emailjs.send(
      'YOUR_SERVICE_ID', // service ID from EmailJS
      'YOUR_TEMPLATE_ID', // template ID from EmailJS
      templateParams,
      'YOUR_USER_ID', // User ID from EmailJS
    );
    // console.log('Email successfully sent:', res);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

export default sendEmailJS;
