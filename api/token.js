const twilio = require('twilio');

export default function handler(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
  const client = twilio(accountSid, authToken);

  if (req.method === 'POST') {
    const { phoneNumber } = req.body;
    client.verify.services(verifyServiceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' })
      .then(verification => res.status(200).json({ status: verification.status }))
      .catch(error => res.status(500).json({ error: error.message }));
  } else if (req.method === 'GET') {
    const { phoneNumber, code } = req.query;
    client.verify.services(verifyServiceSid)
      .verificationChecks
      .create({ to: phoneNumber, code: code })
      .then(verification_check => res.status(200).json({ status: verification_check.status }))
      .catch(error => res.status(500).json({ error: error.message }));
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
