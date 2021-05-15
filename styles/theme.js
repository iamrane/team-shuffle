import { extendTheme } from "@chakra-ui/react";


const extensions = {
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    colors: {
        brand: {
            200: '#004A71',
        },
        cta: {
            200: '#FFCC00',
        }
    },
    components: {
        Divider: {

        }
    },
    styles: {
        global: (props) => ({
            "*, *::before, &::after": {
                borderColor: "whiteAlpha.700",
            },
            body: {
                bg: 'black',
            },
        }),
    },
}

const theme = extendTheme(extensions);

export default theme;