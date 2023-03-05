import { Checkbox, FormControl, ICheckboxGroupProps, Text } from "native-base";

type PaymentOptionsProps = ICheckboxGroupProps & {
    isInvalid?: boolean;
    errorMessage?: string;
};

export function PaymentOptions({ isInvalid, errorMessage, ...rest }: PaymentOptionsProps) {

    const isCheckboxInvalid = !!errorMessage || isInvalid;

    return (
        <>
            <Text fontFamily="heading" >
                Meios de pagamento aceitos
            </Text>

            <FormControl isInvalid={isCheckboxInvalid}>
                <Checkbox.Group
                    accessibilityLabel="choose numbers"
                    colorScheme="lightBlue"
                    {...rest}

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

                <FormControl.ErrorMessage _text={{
                    color: "lightRed.500"
                }}>
                    {errorMessage}
                </FormControl.ErrorMessage>
            </FormControl>

        </>
    );
}