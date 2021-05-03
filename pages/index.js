import { Container } from "@chakra-ui/react";
import PlayerForm from '../components/PlayerForm';

export default function HomePage() {
    return (
        <Container maxW="lg" py={4} mt="60px">
           <PlayerForm />
        </Container>
    )
}
