import { Heading, Image, Text, VStack } from "native-base";

type ProductItemCardProps = {
    name: string;
    price: number;
}
export function ProductItemCard({ name, price }: ProductItemCardProps) {

    console.log("opa")

    return (
        <VStack>
            {/* <Image /> */}

            <Text>
                {name}
            </Text>

            <Heading>
                {price}
            </Heading>
        </VStack>
    );
}