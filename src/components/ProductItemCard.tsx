import { api } from "@services/api";
import { Avatar, Box, Heading, Image, Text, VStack } from "native-base";

import avatarDefault from "@assets/avatar.png";

type ProductItemCardProps = {
    name: string;
    price: number;
    productImage: string | undefined;
    avatarImage: string | undefined;
    isNew: boolean;
}
export function ProductItemCard({ name, price, productImage, avatarImage, isNew }: ProductItemCardProps) {

    return (
        <VStack mb={4}>
            <Box h={24} w={40} >
                <Box flex={1} position="absolute" w="full" h="full" rounded="lg">
                    <Image
                        source={!productImage ? avatarDefault : { uri: `${api.defaults.baseURL}/images/${productImage}` }}
                        alt="Imagem do produto"
                        flex={1}
                        w="full"
                    />
                </Box>

                <Avatar
                    position="absolute"
                    source={{
                        uri: `${api.defaults.baseURL}/images/${avatarImage}`
                    }}
                    w={8}
                    h={8}
                    left={2}
                    top={2}
                    borderWidth={2}
                    borderColor="gray.700"
                />

                <Box
                    position="absolute"
                    top={2}
                    right={2}
                    bg={isNew ? "blue.500" : "gray.200"}
                    rounded="full"
                >
                    <Text color="white" fontFamily="heading" px={3} py={1}>
                        {isNew ? "NOVO" : "USADO"}
                    </Text>
                </Box>

            </Box>

            <Text color="gray.200">
                {name}
            </Text>

            <Heading color="gray.100">
                {price}
            </Heading>
        </VStack>
    );
}