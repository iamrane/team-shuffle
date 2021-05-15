import {ChakraProvider, Container, Box} from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { RecoilRoot } from 'recoil';
import Top from "../components/Top";
import theme from '../styles/theme';
import '../styles/globals.css';
import Image from "next/image";

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
              <Box position="fixed" w="100%" h="100%" opacity={0.35}>
                  <Image src="/padel-background-mobile.jpeg" layout="fill" objectFit="cover" />
              </Box>
              <Top />
              <Container
                  maxW="lg"
                  h="100%"
                  py={4}
                  mt="60px"
                  position="relative"
              >
                  <motion.div key={router.route} initial="initial" animate="animate" variants={variants}>
                      <Component {...pageProps} />
                  </motion.div>
              </Container>
          </ChakraProvider>
      </RecoilRoot>
  );
}

export default MyApp
