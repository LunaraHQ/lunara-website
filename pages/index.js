import Head from 'next/head'
import dynamic from 'next/dynamic'

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
      <HomeContent />
    </>
  )
}
