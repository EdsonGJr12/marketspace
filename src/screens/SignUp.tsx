import { Avatar, Heading, ScrollView, Text, useTheme, VStack } from "native-base";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";

import { PencilLine } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import avatarDefault from "@assets/avatar.png";

export function SignUp() {

    const theme = useTheme();

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <VStack
                bg="gray.600"
                alignItems="center"
                p={12}
                pt={24}
            >
                <LogoSvg height={40} width={60} />

                <Heading mt={4} mb={2}>
                    Boas vindas!
                </Heading>

                <Text
                    fontSize="sm"
                    color="gray.300"
                    mb={8}
                    textAlign="center"
                >
                    Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
                </Text>

                <Avatar
                    size="xl"
                    borderColor="lightBlue.500"
                    source={avatarDefault}
                >
                    <Avatar.Badge
                        bg="lightBlue.500"
                        borderWidth={0}
                        bottom={-4}
                        right={-4}
                        size={10}
                        alignItems="center"
                        justifyContent="center"
                    >

                        <PencilLine
                            size={16}
                            color={theme.colors.gray['600']}
                        />

                    </Avatar.Badge>

                </Avatar>

                <Input placeholder="Nome" />

                <Input placeholder="E-mail" />

                <Input placeholder="Senha" />

                <Input placeholder="Confirmar senha" />

                <Input placeholder="Confirmar senha" />

                <Input placeholder="Confirmar senha" />

                <Button title="Entrar" type="secondary" />

                <Text fontSize="sm" color="gray.200" mt={8}>
                    Já tem uma conta?
                </Text>

                <Button
                    title="Ir para login"
                    type="tertiary"
                    onPress={handleGoBack}
                />
            </VStack>
        </ScrollView>

    );
}