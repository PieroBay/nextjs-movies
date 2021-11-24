import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import ButtonAppBar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <CssBaseline />
    <ButtonAppBar title="Login"/>
    <Component {...pageProps} />
  </>
}

export default MyApp
