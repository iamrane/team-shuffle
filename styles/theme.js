import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


const extensions = {
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    colors: {
        primary: {
            50: '#ffcf0f',
            100: '#ffce08',
            200: '#ffcc00',
            300: '#f7c600',
            400: '#f0c000',
            500: '#e8ba00',
            600: '#e0b400',
            700: '#d9ad00',
            800: '#d1a700',
            900: '#c9a100',
        },
        secondary: {
            50: '#195c7f',
            100: '#0d5378',
            200: '#004a71',
            300: '#00466b',
            400: '#004366',
            500: '#003f60',
            600: '#003b5a',
            700: '#003855',
            800: '#00344f',
            900: '#003049',
        },
    },
    styles: {
        global: (props) => ({
            "*, *::before, &::after": {
                borderColor: mode("blackAlpha.700", "whiteAlpha.700")(props),
            },
            body: {
                bg: mode("white", "black")(props),
            },
        }),
    },
}

const theme = extendTheme(extensions);

export default theme;