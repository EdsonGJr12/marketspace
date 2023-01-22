import { Heading, Text, VStack } from "native-base";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";

export function SignIn() {
    return (
        <VStack flex={1} bg="gray.700">
            <VStack
                height="3/4"
                bg="gray.600"
                rounded="3xl"
                alignItems="center"
                p={12}
                pt={24}
            >
                <LogoSvg height={64} width={95} />

                <Heading fontSize="4xl" mt={4}>
                    marketspace
                </Heading>

                <Text
                    fontSize="sm"
                    color="gray.300"
                    mb={20}
                >
                    Seu espaço de compra e venda
                </Text>

                <Text fontSize="sm" color="gray.200">
                    Acesse sua conta
                </Text>

                <Input placeholder="E-mail" />

                <Input placeholder="Senha" />

                <Button title="Entrar" />
            </VStack>

            <VStack
                flex={1}
                justifyContent="center"
                alignItems="center"
                px={12}
            >

                <Text fontSize="sm" color="gray.200">
                    Ainda não tem acesso?
                </Text>

                <Button title="Criar uma conta" type="tertiary" />

            </VStack>

        </VStack>
    );
}