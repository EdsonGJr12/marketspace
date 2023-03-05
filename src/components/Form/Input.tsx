import { ReactNode } from "react";
import { Input as InputNativeBase, IInputProps, FormControl } from "native-base";

type InputProps = IInputProps & {
    LeftComponent?: ReactNode;
    errorMessage?: string;
};

export function Input({
    errorMessage,
    isInvalid,
    ...rest
}: InputProps) {

    const isInputInvalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={isInputInvalid} mb={4}>
            <InputNativeBase
                width="full"
                bg="gray.700"
                borderWidth={0}
                rounded="md"
                placeholderTextColor="gray.400"
                fontFamily="body"
                fontSize="md"
                _focus={{
                    bg: "gray.700",
                    borderColor: "lightBlue.500"
                }}
                {...rest}
            />
            <FormControl.ErrorMessage _text={{
                color: "lightRed.500"
            }}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}