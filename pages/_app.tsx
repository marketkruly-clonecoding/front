import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '@components/Nav/Navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { store } from '@modules/index';
import { Provider } from "react-redux";
import { SWRConfig } from 'swr';
import Cookies from "universal-cookie";
import SideBar from '@components/SideBar';
import { login } from '@modules/user';

const cookies = new Cookies();

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const [height, setHeight] = useState("100vh");


  useEffect(() => {

    if (router.asPath === "/signup") {
      setHeight("300vh")
    } else if (router.asPath === "/") {
      setHeight("450vh")
    } else if (router.pathname === "/product/[id]") {
      setHeight("200vh");
    } else if (router.pathname === "/category/[id]") {
      setHeight("900vh")
    } else if (router.pathname === "/order") {
      setHeight("330vh");
    }

  }, []);



  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url, { headers: { "x-access-token": cookies.get("weKurly_access_token") } }).then(response => response.json()) }}>
      <div style={{ height: `${height}` }} className={`min-w-[1250px]  w-full h-[${height}]`}>
        <Provider store={store}>
          <Navigation />
          <Component {...pageProps} />
        </Provider>
      </div>
    </SWRConfig>

  )
}

export default MyApp
