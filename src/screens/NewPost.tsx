import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { Box, Heading, HStack, Radio, Switch, Text, useTheme, VStack, Image } from "native-base";

import { Plus, XCircle } from "phosphor-react-native";

import { PaymentOptions } from "@components/PaymentOptions";
import { PageHeader } from "@components/PageHeader";
import { Input } from "@components/Form/Input";
import { Button } from "@components/Form/Button";
import { Loading } from "@components/Loading";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as ImagePicker from 'expo-image-picker';

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRouteProps } from "@routes/app.routes";
import { TextInputMask } from "react-native-masked-text";

type FormData = {
    name: string;
    description: string;
    is_new: boolean;
    accept_trade: boolean;
    payment_methods: string[];
    price: string;
    images: string[];
}

const newProductSchema = yup.object({
    name: yup.string().required("Título é obrigatório"),
    description: yup.string().required("Descrição é obrigatória"),
    is_new: yup.boolean(),
    accept_trade: yup.boolean(),
    payment_methods: yup.array()
        .of(yup.string())
        .required("Informe uma forma de pagamento")
        .min(1, "Pelo menos um meio de pagamento deve ser informado"),
    price: yup.number()
        .typeError("Informe um valor")
        .required("Valor deve ser informado")
        .positive("Valor deve ser maior que 0")
        .default(0),
});

export function NewPost() {

    const theme = useTheme();

    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const navigation = useNavigation<AppNavigatorRouteProps>();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<FormData>({
        resolver: yupResolver(newProductSchema),
        defaultValues: {
            is_new: false,
            price: "0",
            payment_methods: []
        }
    });

    function handleNext(data: FormData) {
        if (images.length >= 3) {
            // navigation.navigate("NewPostPreview", { ...data, images })
        }
    }

    async function handleAddImages() {
        try {
            setIsLoadingImages(true);
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const uris = result.assets.map(asset => asset.uri);
                setImages([...images, ...uris]);
            }
        } finally {
            setIsLoadingImages(false);
        }
    }

    function handleRemoveImage(uriToRemove: String) {
        setImages(images.filter(uri => uri !== uriToRemove));
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1
            }}
        >
            <VStack flex={1} bg="gray.600">
                <PageHeader
                    title="Criar anúncio"
                />

                <VStack
                    flex={1}
                    paddingX={6}
                    mt={6}
                >
                    <Heading
                        fontSize="lg"
                        w="full"
                    >
                        Imagens
                    </Heading>

                    <Text
                        color="gray.300"
                        w="full"
                        mb={2}
                    >
                        Escolha 3 imagens para mostrar o quanto seu produto é incrível
                    </Text>

                    {isLoadingImages ? (
                        <Loading />
                    ) : (
                        <>
                            <HStack flexWrap="wrap">
                                {images.map(image => (
                                    <Box
                                        w={24}
                                        h={24}
                                        justifyContent="center"
                                        alignItems="center"
                                        mr={2}
                                        mt={2}
                                    >
                                        <Box
                                            position="absolute"
                                            top={1}
                                            right={1}
                                            zIndex={5}
                                        >
                                            <TouchableOpacity onPress={() => handleRemoveImage(image)}>
                                                <XCircle
                                                    weight="fill"
                                                    color={theme.colors.gray['200']}
                                                />
                                            </TouchableOpacity>
                                        </Box>

                                        <Image
                                            source={{
                                                uri: image
                                            }}
                                            w={24}
                                            h={24}
                                            rounded="md"
                                            alt="Imagem selecionada"
                                        />
                                    </Box>
                                ))}

                                <TouchableOpacity onPress={handleAddImages}>
                                    <Box
                                        mt={2}
                                        w={24}
                                        h={24}
                                        bg="gray.500"
                                        justifyContent="center"
                                        alignItems="center"
                                        rounded="md"
                                    >
                                        <Plus color={theme.colors.gray['400']} />
                                    </Box>
                                </TouchableOpacity>
                            </HStack>

                            <Text color="lightRed.500" fontSize="xs">
                                {images.length < 3 && "Escolha pelo menos 3 imagens"}
                            </Text>
                        </>
                    )}


                    <Heading fontSize="lg" w="full" mt={6} mb={4}>
                        Sobre o produto
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Título do anúncio"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Descrição do produto"
                                numberOfLines={5}
                                multiline
                                textAlign="left"
                                textAlignVertical="top"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.description?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="is_new"
                        render={({ field: { onChange, value } }) => (
                            <Radio.Group
                                name="myRadioGroup"
                                accessibilityLabel="Escolha se o produto é novo ou usado"
                                w="full"
                                colorScheme="lightBlue"
                                mb={4}
                                onChange={onChange}
                                value={String(value)}
                            >
                                <HStack w="full" >
                                    <Box mr={6}>
                                        <Radio value="false" my={1}>
                                            Produto usado
                                        </Radio>
                                    </Box>

                                    <Box mr={2}>
                                        <Radio value="true" my={1}>
                                            Produto novo
                                        </Radio>
                                    </Box>

                                </HStack>
                            </Radio.Group>
                        )}
                    />

                    <Heading fontSize="lg" w="full" mt={4} mb={4}>
                        Venda
                    </Heading>

                    <Controller
                        control={control}
                        name="price"
                        render={({ field: { onChange, value } }) => (
                            <TextInputMask
                                type={'money'}
                                options={{
                                    unit: ""
                                }}
                                value={value}
                                onChangeText={onChange}
                                customTextInput={Input}
                                customTextInputProps={{
                                    placeholder: "Valor do produto",
                                    leftElement: (<Text fontSize="md" color="gray.100" p={2}>R$</Text>),
                                    onChangeText: onChange,
                                    value: value,
                                    errorMessage: errors.price?.message,
                                    keyboardType: "number-pad"
                                }}
                            />
                        )}
                    />

                    <Heading fontSize="md" w="full" mt={4}>
                        Aceita troca?
                    </Heading>

                    <Controller
                        control={control}
                        name="accept_trade"
                        render={({ field: { onChange, value } }) => (
                            <Switch
                                size="lg"
                                alignSelf="flex-start"
                                colorScheme="lightBlue"
                                isChecked={value}
                                onToggle={onChange}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="payment_methods"
                        render={({ field: { onChange, value } }) => (
                            <PaymentOptions
                                value={value}
                                onChange={onChange}
                                errorMessage={errors.payment_methods?.message}
                            />
                        )}
                    />

                    <Box flex={1} justifyContent="flex-end" mt={8} mb={2}>
                        <HStack justifyContent="space-between" >
                            <Box w="48%">
                                <Button
                                    title="Cancelar"
                                    type="tertiary"
                                />
                            </Box>

                            <Box w="48%">
                                <Button
                                    title="Avançar"
                                    type="secondary"
                                    onPress={handleSubmit(handleNext)}
                                    isLoading={isSubmitting}
                                />
                            </Box>
                        </HStack>
                    </Box>

                </VStack>

            </VStack>
        </ScrollView>
    );
}