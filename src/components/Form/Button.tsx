import { Button as NativeBaseButton, HStack, IButtonProps, Text, useTheme } from "native-base";
import { ReactNode } from "react";

type ButtonProps = IButtonProps & {
    title: string;
    type?: "primary" | "secondary" | "tertiary";
    icon?: ReactNode;
};

export function Button({ title, type = "primary", icon, ...rest }: ButtonProps) {

    const theme = useTheme();

    const bgColor = {
        primary: {
            default: theme.colors.lightBlue['500'],
            pressed: theme.colors.blue['500'],
        },
        secondary: {
            default: theme.colors.gray['100'],
            pressed: theme.colors.gray['200'],
        },
        tertiary: {
            default: theme.colors.gray['500'],
            pressed: theme.colors.gray['400'],
        }
    };

    return (
        <NativeBaseButton
            w="full"
            h={14}
            variant="solid"
            bg={bgColor[type].default}
            // mt={4}
            _pressed={{
                bg: bgColor[type].pressed
            }}
            {...rest}
        >
            <HStack alignItems="center">

                {icon}


                <Text
                    color={type === "primary" || type === "secondary" ? "gray.700" : "gray.200"}
                    fontFamily="heading"
                    fontSize="sm"
                    ml={2}
                >
                    {title}
                </Text>
            </HStack>
        </NativeBaseButton>
    );
}