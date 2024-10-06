import dynamic from 'next/dynamic'
import Chat from '@/app/components/chatBot'

const MapWithNoSSR = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
})


export default function Home() {
  return (
    <main>
      <h1>Map Drawing App</h1>
      {/* <MapWithNoSSR /> */}
      <Chat />
    </main>
  )
}
