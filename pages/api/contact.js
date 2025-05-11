// pages/api/contact.js
import sgMail from '@sendgrid/mail'

// Initialize SendGrid once
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { name, email, message } = req.body

  const msg = {
    to: 'nathan@lunarahq.com',        // your recipient
    from: 'noreply@lunarahq.com',     // must be a verified sender in SendGrid
    replyTo: email,                   // lets you hit “Reply” to the visitor
    subject: `New contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  }

  try {
    await sgMail.send(msg)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('SendGrid error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
