
import Head from 'next/head'
import Game from '../components/Game'

export default function Home() {
  return (
    <main>

      <Head>
        <title>Tunnel Fighterz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Game/>

    </main>
  )
}
