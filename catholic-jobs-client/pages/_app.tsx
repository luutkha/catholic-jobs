import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import MasterLayout from '../components/commons/templates/master-layout/MasterLayout'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

import store from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.pathname.includes('/admin'))
  return (
    <Provider store={store}>
      <MasterLayout header={<Header />} footer={<Footer />}>
        <Component {...pageProps} />
      </MasterLayout>

    </Provider>
  )

}

export default MyApp
