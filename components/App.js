import {Box, Container, useColorModeValue} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from 'next/router'
import {motion} from "framer-motion";
import Top from "./Top";

const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
};


export default function App({ Component, pageProps }) {
    const opacity = useColorModeValue(0.15, 0.35);
    const router = useRouter();

    console.log({ opacity });

    return (
        <>
            <Box position="fixed" w="100%" h="100%" opacity={opacity}>
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
        </>
    )
}