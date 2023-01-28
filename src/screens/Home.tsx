import { useCallback, useEffect, useMemo, useRef } from "react";

import {
    Avatar,
    Heading,
    HStack,
    Text,
    VStack,
    Box,
    Center,
    useTheme,
    Input,
    Divider,
    Switch,
    Checkbox,
    FlatList
} from "native-base";

import { TouchableOpacity } from "react-native";

import { Button } from "@components/Form/Button";

import { Plus, Tag, ArrowRight, MagnifyingGlass, Sliders, X, XCircle } from "phosphor-react-native";

import avatarDefault from "@assets/avatar.png";

import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { ProductDTO } from "src/dto/ProductDTO";
import { ProductItemCard } from "@components/ProductItemCard";

export function Home() {

    const [payments, setPayments] = useState<string[]>([]);

    const theme = useTheme();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['50%', '75%'], []);

    const { user } = useAuth();

    const [numberOfActivePosts, setNumberofActivePosts] = useState(0);
    const [products, setProducts] = useState<ProductDTO[]>([]);

    const handleOpenFilters = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleCloseFilters = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    async function loadUserProducts() {
        const { data } = await api.get<ProductDTO[]>("/users/products");
        const counter = data.filter(product => product.is_active === true).length;
        setNumberofActivePosts(counter);
    }

    async function loadProducts() {
        const { data } = await api.get<ProductDTO[]>("/products");
        setProducts(data);
    }

    useEffect(() => {
        loadUserProducts();
        loadProducts();
    }, []);


    return (
        <VStack
            flex={1}
            bg="gray.600"
            px={6}
        >
            <HStack
                pt={16}
            >
                <HStack
                    width="1/2"
                    alignItems="center"
                >
                    <Avatar
                        mr={2}
                        source={user!.avatar ? { uri: `${api.defaults.baseURL}/images/${user!.avatar}` } : avatarDefault}
                    />

                    <VStack>
                        <Text>
                            Boas vindas,
                        </Text>

                        <Heading fontSize="md">
                            {user!.name}!
                        </Heading>
                    </VStack>
                </HStack>

                <Box
                    flex={1}
                    justifyContent="center"
                >
                    <Button
                        title="Criar anúncio"
                        type="secondary"
                        icon={<Plus color={theme.colors.gray["600"]} size={16} />}
                    />
                </Box>
            </HStack>

            <Text mt={6} mb={4} color="gray.300">
                Seus produtos anunciados para venda
            </Text>

            <Box
                w="full"
                h={66}
            >

                <Box
                    bg="lightBlue.500"
                    position="absolute"
                    w="full"
                    h={66}
                    opacity={10}
                    rounded="md"
                />

                <HStack
                    flex={1}
                    px={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <HStack>
                        <Center mr={4}>
                            <Tag color={theme.colors.blue["500"]} />
                        </Center>

                        <VStack>
                            <Text fontFamily="heading" fontSize={20}>
                                {numberOfActivePosts}
                            </Text>

                            <Text>
                                anúncios ativos
                            </Text>
                        </VStack>
                    </HStack>

                    <HStack>
                        <Text mr={2} color="blue.500" fontFamily="heading" >
                            Meus anúncios
                        </Text>

                        <ArrowRight color={theme.colors.blue["500"]} />
                    </HStack>
                </HStack>
            </Box>

            <Text mt={6} mb={4} color="gray.300">
                Compre produtos variados
            </Text>

            <HStack
                alignItems="center"
                bg="gray.700"
                p={1}
                px={3}
                rounded="md"
            >
                <Input
                    placeholder="Buscar anúncio"
                    flex={1}
                    borderWidth={0}
                    _focus={{
                        bg: "gray.700"
                    }}
                />

                <MagnifyingGlass />

                <Divider
                    orientation="vertical"
                    mx={2}
                    thickness={1}
                    height={5}
                />

                <TouchableOpacity onPress={handleOpenFilters}>
                    <Sliders />
                </TouchableOpacity>


            </HStack>


            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductItemCard
                        name={item.name}
                        price={item.price}
                    />
                )}
            />

            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                >
                    <VStack flex={1} px={6} pt={6}>
                        <HStack alignItems="center" justifyContent="space-between">
                            <Heading mb={3}>
                                Filtrar anúncios
                            </Heading>

                            <TouchableOpacity onPress={handleCloseFilters}>
                                <X color={theme.colors.gray['400']} />
                            </TouchableOpacity>
                        </HStack>

                        <Text fontFamily="heading" mb={2}>
                            Condição
                        </Text>

                        <HStack mb={4}>
                            <Center
                                rounded="full"
                                bg="lightBlue.500"
                                mr={2}
                                w={24}
                            >
                                <HStack
                                    justifyContent="flex-end"
                                    px={2}
                                    alignItems="center"
                                    w="full"
                                >
                                    <Text fontFamily="heading" color="white" mr={2} >
                                        NOVO
                                    </Text>

                                    <XCircle
                                        color={theme.colors.white}
                                        weight="fill"
                                    />
                                </HStack>
                            </Center>

                            <Center p={2} rounded="full" bg="gray.500" mr={2} w={20}>
                                <Box
                                    mx={2}
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Text fontFamily="heading" color="white" >
                                        USADO
                                    </Text>
                                </Box>
                            </Center>
                        </HStack>

                        <Text fontFamily="heading">
                            Aceita troca?
                        </Text>

                        <Switch size="lg" alignSelf="flex-start" mb={4} colorScheme="lightBlue" />

                        <Text fontFamily="heading" >
                            Meios de pagamento aceitos
                        </Text>


                        <Checkbox.Group
                            onChange={setPayments}
                            value={payments}
                            accessibilityLabel="choose numbers"
                            colorScheme="lightBlue"
                        >
                            <Checkbox value="boleto" mt={2}>
                                Boleto
                            </Checkbox>

                            <Checkbox value="pix" mt={2}>
                                Pix
                            </Checkbox>

                            <Checkbox value="dinheiro" mt={2}>
                                Dinheiro
                            </Checkbox>

                            <Checkbox value="cartao_credito" mt={2}>
                                Cartão de crédito
                            </Checkbox>

                            <Checkbox value="deposito_bancario" mt={2}>
                                Depósito bancário
                            </Checkbox>
                        </Checkbox.Group>


                        <Box flex={1} justifyContent="flex-end" bg="red.500">
                            <HStack justifyContent="space-between" >
                                <Box w="48%">
                                    <Button
                                        title="Resetar filtros"
                                        type="tertiary"
                                    />
                                </Box>

                                <Box w="48%">
                                    <Button
                                        title="Aplicar filtros"
                                        type="secondary"
                                    />
                                </Box>
                            </HStack>
                        </Box>

                    </VStack>
                </BottomSheetModal>
            </BottomSheetModalProvider>

        </VStack>
    );
}