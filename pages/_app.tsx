import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '@components/Nav/Navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { store } from '@modules/index';
import { Provider } from "react-redux";
import SideBar from '@components/SideBar';
import { login } from '@modules/user';


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const [height, setHeight] = useState("100vh");


  useEffect(() => {

    if (router.asPath === "/signup") {
      setHeight("300vh")
    } else if (router.asPath === "/") {
      setHeight("400vh")
    }

  }, []);



  return (
    <div style={{ height: `${height}` }} className={`min-w-[1250px]  w-full h-[${height}]`}>
      <Provider store={store}>
        <Navigation />
        <Component {...pageProps} />
      </Provider>
    </div>

  )
}

export default MyApp
