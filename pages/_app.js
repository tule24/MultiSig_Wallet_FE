import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { MSFactoryProvider } from '@/Context/MSFactoryContext'
import { Navbar, Footer } from '@/components/home'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <MSFactoryProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </MSFactoryProvider>
    </ThemeProvider>
  )
}
