import { VStack } from "native-base";

import { useRoute } from "@react-navigation/native"

type RouteParams = {

}

export function NewPostPreview() {

    const route = useRoute();
    const { } = route.params as RouteParams;

    return (
        <VStack>

        </VStack>
    );
}