// pages/api/contact.js
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }
  const { name, email, message } = req.body

  try {
    await sgMail.send({
      to: 'nathan@lunarahq.com',
      from: 'nathan@lunarahq.com', // your newly-verified sender
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('SendGrid error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
