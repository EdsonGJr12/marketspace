import { Input as InputNativeBase, IInputProps } from "native-base";

type InputProps = IInputProps & {

};

export function Input({ ...rest }: InputProps) {
    return (
        <InputNativeBase
            width="full"
            bg="gray.700"
            rounded="md"
            mt={4}
            h={14}
            placeholderTextColor="gray.400"
            fontFamily="body"
            fontSize="md"
            _focus={{
                bg: "gray.700",
                borderColor: "lightBlue.500"
            }}
            {...rest}
        />
    );
}