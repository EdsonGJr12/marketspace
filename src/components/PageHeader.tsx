import { Box, Heading, Icon, useTheme } from "native-base";
import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";

import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native";

type PageHeaderProps = {
    hasBackButton?: boolean;
    title?: string;
    hasEditButton?: boolean;
};

export function PageHeader({ hasBackButton = true, title, hasEditButton }: PageHeaderProps) {

    const theme = useTheme();

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <Box mt={12} w="full" justifyContent="center" alignItems="center">
            {hasBackButton ? (
                <Box position="absolute" left={6}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <ArrowLeft color={theme.colors.gray["100"]} />
                    </TouchableOpacity>
                </Box>
            ) : null}
            <Heading fontSize="xl">
                {title}
            </Heading>
            {hasEditButton ? (
                <Box position="absolute" right={6}>
                    <PencilSimpleLine color={theme.colors.gray["100"]} />
                </Box>
            ) : null}
        </Box>
    );
}