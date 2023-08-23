import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Paypal({amount}) {
    // const clientId = 'AbncT2gTxHZ-M81tlSkjLhR02HvVCToAKIlj_l9ndO4DBctoBePKAciJ8Vdka-wn_0pVGeqKA2CMicuh'
    const initialOptions = {
        clientId: 'CLIENT_ID',
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons style={{ layout: "vertical" }} createOrder={async (data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={async function (data, actions) {
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order
                    });
                }} />
        </PayPalScriptProvider>
    )
}

export default Paypal