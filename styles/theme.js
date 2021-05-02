import { extendTheme } from "@chakra-ui/react"

const extensions = {
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === "dark" ? "gray.900" : "gray.100",
            }
        })
    },
}

const theme = extendTheme(extensions);

export default theme;