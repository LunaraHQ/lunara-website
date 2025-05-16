// pages/api/auth/signup.js

import { supabase } from '../../../utils/supabaseClient'
import { sendConfirmationEmail } from '../../../utils/emailService'
import { createConfirmationToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end('Method Not Allowed')
  }

  const { email, password } = req.body

  // 1) Create the user in Supabase
  const {
    data: { user } = {},
    error: signUpError
  } = await supabase.auth.signUp({ email, password })

  if (signUpError) {
    return res.status(400).json({ error: signUpError.message })
  }

  // 2) Generate a confirmation token
  const token = await createConfirmationToken(user.id)

  // 3) Send the confirmation email with detailed error handling
  try {
    await sendConfirmationEmail(user.email, token)
  } catch (err) {
    console.error('🛑 Email send error:', err)
    return res.status(500).json({ error: err.message })
  }

  // 4) Respond success
  return res.status(200).json({ message: 'Signup OK, confirmation email sent' })
}
