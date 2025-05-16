// pages/auth/signup.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { supabase } from '../../utils/supabaseClient'

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password2: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.password2) {
      return setError('Passwords do not match.')
    }

    setLoading(true)
    const { user, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Create initial profiles row
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, name: form.name, email: form.email, features: [] }])

    if (profileError) {
      console.error('Profile creation failed:', profileError)
    }

    setLoading(false)
    setSuccess(true)
    setTimeout(() => router.push('/auth/signin?newaccount=true'), 2500)
  }

  return (
    <>
      <Head>
        <title>Sign Up | Lunara</title>
      </Head>
      {/* ...existing JSX... */}
    </>
  )
}
