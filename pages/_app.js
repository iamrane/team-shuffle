import {ChakraProvider} from "@chakra-ui/react";
import { RecoilRoot } from 'recoil';
import App from "../components/App";
import theme from '../styles/theme';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
    return (
      <RecoilRoot>
          <ChakraProvider theme={theme}>
             <App Component={Component} pageProps={pageProps} />
          </ChakraProvider>
      </RecoilRoot>
  );
}

export default MyApp
