import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '@components/Nav/Navigation'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className="min-w-[1250px]  w-full h-full">
    <Navigation />
    <Component {...pageProps} />
  </div>
}

export default MyApp
