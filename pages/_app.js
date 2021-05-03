import { ChakraProvider } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { RecoilRoot } from 'recoil';
import Top from "../components/Top";
import theme from '../styles/theme';
import '../styles/globals.css';

const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
};

function MyApp({ Component, pageProps, router }) {
  return (
      <RecoilRoot>
          <ChakraProvider theme={theme}>
              <Top />
              <motion.div key={router.route} initial="initial" animate="animate" variants={variants}>
                  <Component {...pageProps} />
              </motion.div>
          </ChakraProvider>
      </RecoilRoot>
  );
}

export default MyApp
