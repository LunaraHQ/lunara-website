// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'
import { SupabaseAdapter } from '@next-auth/supabase-adapter'

// 1) Pull the vars
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// 2) Validate
console.log('→ SUPABASE_URL:', supabaseUrl)
console.log('→ SUPABASE_SERVICE_ROLE_KEY:', supabaseKey && '[REDACTED]')

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars. ' +
    'Please add them to .env.local'
  )
}

// 3) Create the Admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export default NextAuth({
  adapter: SupabaseAdapter(supabaseAdmin),
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })
        if (error || !data.user) return null
        return { id: data.user.id, email: data.user.email }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error:  '/auth/error',
  },
})
