import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { Navbar, Footer } from '@/components/home'
import { store } from '@/redux/configStore'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </ThemeProvider>
  )
}
