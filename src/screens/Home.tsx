import { Button } from "@components/Form/Button";
import { Avatar, Heading, HStack, Text, VStack } from "native-base";

export function Home() {
    return (
        <VStack
            flex={1}
            bg="gray.600"
        >
            <HStack pt={16}>
                <Avatar />
                <VStack>
                    <Text>
                        Boas vindas,
                    </Text>

                    <Heading>
                        Maria!
                    </Heading>
                </VStack>

                <Button title="Criar anúncio" />
            </HStack>

        </VStack>
    );
}