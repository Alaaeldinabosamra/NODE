const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE,
);

// npm install node-mailjet

const sendEmailJet = async (options) => {
  try {
    await mailjet.post('send').request({
      Messages: [
        {
          From: {
            Email: 'alaaeldinabosamra@gmail.com',
            Name: 'Alaaeldin Abousamra',
          },
          To: [
            {
              Email: options.email,
            },
          ],
          Subject: options.subject,
          TextPart: options.message,
        },
      ],
    });
  } catch (err) {
    console.error('Error sending email: ', err);
    throw new Error('There was an error sending the email.');
  }
};

module.exports = sendEmailJet;
