import dynamic from 'next/dynamic'

const MapWithNoSSR = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
})

export default function Home() {
  return (
    <main>
      <h1>Map Drawing App</h1>
      <MapWithNoSSR />
    </main>
  )
}
