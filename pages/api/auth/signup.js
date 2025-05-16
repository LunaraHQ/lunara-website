// pages/api/auth/signup.js
import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end('Method Not Allowed')
  }
  const { email, password } = req.body
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ message: 'Signup OK. Check your email to confirm.' })
}
