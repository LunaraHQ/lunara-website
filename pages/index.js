import Head from 'next/head'
import dynamic from 'next/dynamic'

// Client-only import so Framer Motion hooks don’t run on the server
const HomeContent = dynamic(() => import('../components/HomeContent'), {
  ssr: false,
})

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Lunara · Space-Age Funnels</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      {/* Everything else lives in HomeContent */}
      <HomeContent />
    </>
  )
}
