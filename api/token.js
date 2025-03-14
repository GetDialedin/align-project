const twilio = require('twilio');

export default function handler(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const token = new twilio.jwt.AccessToken(
    accountSid,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  const videoGrant = new twilio.jwt.AccessToken.VideoGrant();
  token.addGrant(videoGrant);

  res.status(200).json({ token: token.toJwt() });
}
