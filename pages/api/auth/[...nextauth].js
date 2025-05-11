// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export default NextAuth({
  // 1. Register your auth providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // …add more providers here if you wish…
  ],

  // 2. Use JSON Web Tokens for session instead of database sessions
  session: {
    strategy: 'jwt',
  },

  // 3. Secure your NextAuth with a secret
  secret: process.env.NEXTAUTH_SECRET,

  // 4. Point NextAuth to your custom sign-in/sign-out pages
  pages: {
    signIn: '/auth/signin',    // Users will be redirected here to log in
    signOut: '/auth/signout',  // Optional: custom sign-out page
    error:  '/auth/error',     // Optional: custom error page
  },

  // 5. Optional callbacks to include user ID in the token/session
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
})
