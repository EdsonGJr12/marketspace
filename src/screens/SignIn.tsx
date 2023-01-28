import { Heading, ScrollView, Text, useToast, VStack } from "native-base";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AppError } from "@utils/AppError";

type FormData = {
    email: string;
    password: string;
}

const signInSchema = yup.object({
    email: yup.string().required("E-mail é obrigatório"),
    password: yup.string().required("Senha é obrigatória")
});

export function SignIn() {

    const navigation = useNavigation<AuthNavigatorRouteProps>();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<FormData>({
        resolver: yupResolver(signInSchema)
    });

    const { signIn } = useAuth();

    const toast = useToast();

    async function handleSignIn({ email, password }: FormData) {
        try {
            await signIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        }
    }

    function handleSignUp() {
        navigation.navigate("SignUp");
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1
            }}
            showsVerticalScrollIndicator={false}
        >
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

                    <Text fontSize="sm" color="gray.200" mb={4}>
                        Acesse sua conta
                    </Text>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        title="Entrar"
                        onPress={handleSubmit(handleSignIn)}
                        isLoading={isSubmitting}
                    />
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

                    <Button
                        title="Criar uma conta"
                        type="tertiary"
                        onPress={handleSignUp}
                    />

                </VStack>

            </VStack>
        </ScrollView>
    );
}