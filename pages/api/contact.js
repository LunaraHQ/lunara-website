// pages/api/contact.js
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  console.log('⚡️ /api/contact invoked, method:', req.method)
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    console.log('🚫 Wrong method—only POST allowed')
    return res.status(405).end('Method Not Allowed')
  }
  let payload
  try {
    payload = req.body
    console.log('📨 Payload:', payload)
  } catch (err) {
    console.error('⚠️ Error parsing body:', err)
  }

  const { name, email, message } = payload || {}
  const msg = {
    to: 'nathan@lunarahq.com',
    from: 'nathan@lunarahq.com',
    replyTo: email,
    subject: `New contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  }

  try {
    console.log('✉️  Sending to SendGrid...')
    const result = await sgMail.send(msg)
    console.log('✅ SendGrid result:', result)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('❌ SendGrid error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
