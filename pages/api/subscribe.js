// pages/api/subscribe.js
import { createClient } from '@supabase/supabase-js'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  // 1) store in Supabase
  const { error: dbError } = await supabase
    .from('waitlist')
    .insert([{ email }])

  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return res.status(500).json({ error: dbError.message })
  }

  // 2) fire-and-forget thank-you email
  const msg = {
    to: email,
    from: {
      email: process.env.EMAIL_FROM,
      name: process.env.EMAIL_FROM_NAME || 'Nathan Green',
    },
    subject: 'Thanks for Joining the Lunara Waitlist!',
    html: `
      <p>Hi there,</p>
      <p>Thank you for joining Lunara’s waitlist! I’m excited to have you on board and will keep you updated as we build out our AI-powered funnels.</p>
      <p>In the meantime, feel free to reply to this email if you have any questions or feedback.</p>
      <p>—<br/>
      Nathan Green<br/>
      CEO, Lunara HQ<br/>
      <a href="https://lunara.com">lunara.com</a>
      </p>
    `,
  }

  sgMail
    .send(msg)
    .then(() => console.log('SendGrid: email queued'))
    .catch(err => console.error('SendGrid error:', err))

  // immediate response
  return res.status(200).json({ message: 'Subscribed! Email is on its way.' })
}
