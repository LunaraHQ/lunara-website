// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth'
import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

export default NextAuth({
  adapter: SupabaseAdapter(supabaseAdmin),
  providers: [
    // If you want email magic link sign-in, you can add:
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM
    // })
    // Otherwise, users sign in via your frontend using supabase.auth.signInWithPassword
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error:  '/auth/error',
  },
})
