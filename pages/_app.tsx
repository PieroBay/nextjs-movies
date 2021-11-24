import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { GlobalStateContext } from '../states/global.state';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  
  const tokenStorage = window.localStorage.getItem('token');

  const [globalState, setGlobalState] = useState({
    token: tokenStorage,
    update
  });

  function update(data: any) {
    setGlobalState(Object.assign({}, globalState, data));
  }

  return <GlobalStateContext.Provider value={globalState}>
    <CssBaseline />
    <Component {...pageProps} />
  </GlobalStateContext.Provider>
}

export default MyApp
