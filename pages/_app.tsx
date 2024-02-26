import { StoreProvider } from '@/components/StoreProvider'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <StoreProvider preloadedState={pageProps.preloadedState}><Component {...pageProps} /></StoreProvider>
}

export default MyApp

