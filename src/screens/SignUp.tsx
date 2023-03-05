import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Avatar, Heading, ScrollView, Text, useTheme, useToast, VStack } from "native-base";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";

import { PencilLine } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import avatarDefault from "@assets/avatar.png";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";

import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

interface FormProps {
    name: string;
    email: string;
    tel: string;
    password: string;
    password_confirm: string;
};

interface PhotoFileProps {
    name: string;
    uri: string;
    type: string;
    extension: string;
}

const signUpSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string()
        .required("E-mail é obrigatório")
        .email("Informe um e-mail válido"),
    password: yup.string().required("Senha é obrigatória"),
    password_confirm: yup.string()
        .required("Confirmação da senha é obrigatória")
        .oneOf([yup.ref("password")], "Senhas não conferem")
});

export function SignUp() {

    const theme = useTheme();

    const navigation = useNavigation();

    const { signIn } = useAuth();

    const toast = useToast();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<FormProps>({
        resolver: yupResolver(signUpSchema)
    });

    const [photoFile, setPhotoFile] = useState<PhotoFileProps>();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSelectPhoto() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true
        });

        if (result.canceled) {
            return;
        }

        const photoUri = result.assets[0].uri;
        const photoType = result.assets[0].type;

        const photoInfo = await FileSystem.getInfoAsync(photoUri);
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 3) {
            return toast.show({
                title: "Essa imagem é muito grande",
                description: "Escolha uma imagem com tamanho menor",
                placement: "top",
                bgColor: "red.500"
            });
        }

        const fileExtension = photoUri.split(".")[1];

        const photoFile = {
            name: "avatar",
            uri: photoUri,
            type: `${photoType}/${fileExtension}`,
            extension: fileExtension
        };

        setPhotoFile(photoFile);

    }

    async function handleSignUp({ name, email, tel, password }: FormProps) {
        try {

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("tel", tel);
            formData.append("password", password);

            if (photoFile) {
                const { uri, type, extension } = photoFile;
                const avatar = {
                    name: `${name}.${extension}`,
                    uri,
                    type
                } as any;

                formData.append("avatar", avatar);
            }

            await api.post("/users", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            await signIn(email, password);

            toast.show({
                title: "Cadastro realizado com sucesso",
                placement: "top",
                bgColor: "green.500"
            });

        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : "Falha ao realizar operação. Tente novamente mais tarde";

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            });
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1
            }}
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

                <TouchableOpacity onPress={handleSelectPhoto}>
                    <Avatar
                        size="xl"
                        borderColor="lightBlue.500"
                        source={photoFile?.uri ? { uri: photoFile.uri } : avatarDefault}
                        mb={4}
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
                </TouchableOpacity>

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Nome"
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.name?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="E-mail"
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                            errorMessage={errors.email?.message}
                            keyboardType="email-address"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="tel"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Telefone"
                            onChangeText={onChange}
                            value={value}
                            autoCapitalize="none"
                            errorMessage={errors.tel?.message}
                            keyboardType="number-pad"
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

                <Controller
                    control={control}
                    name="password_confirm"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Confirmar senha"
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.password_confirm?.message}
                        />
                    )}
                />

                <Button
                    title="Entrar"
                    type="secondary"
                    onPress={handleSubmit(handleSignUp)}
                    isLoading={isSubmitting}
                />

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