import { NextApiRequest, NextApiResponse } from 'next';
import emailjs from 'emailjs-com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    await emailjs.send(
        process.env.CONTACT_SERVICE_ID!,
        process.env.CONTACT_TEMPLATE_ID!,
      {
        from_name: name,
        from_email: email,
        message,
        to_email: process.env.CONTACT_EMAIL,
      },
      process.env.CONTACT_PUBLIC_KEY
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}