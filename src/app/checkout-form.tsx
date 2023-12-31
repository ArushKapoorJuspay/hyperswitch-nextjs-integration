'use client';

import React, { FormEvent, useEffect, useState } from "react"
// @ts-ignore
import styles from './checkout.module.css'
// @ts-ignore
import { useHyper, useWidgets, UnifiedCheckout } from "@juspay-tech/react-hyper-js";

const CheckoutForm: React.FC = ({ }) => {

    const hyper = useHyper();
    const widgets = useWidgets();

    const [isLoading, setIsLoading] = useState(false)
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false)
    const [message, setMessage] = useState("")

    const unifiedCheckoutOptions = {
        layout: { 
            type: "tabs",
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
        },
        wallets:{
            walletReturnUrl: "http://localhost:3000/",
            style: {
                theme:"dark", 
                type: "default", 
                height: 48
              }
        }
    };

    const handlePaymentStatus = (status: string) => {
        switch (status) {
            case "succeeded":
                setMessage("Successful");
                break;
            case "processing":
                setMessage("Your payment is processing.");
                break;
            case "requires_payment_method":
                setMessage("Your payment was not successful, please try again.");
                break;
            case "":
                break;
            default:
                setMessage("Something went wrong.");
                break;
        }
    }

    useEffect(() => {
        if (!hyper) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        hyper.retrievePaymentIntent(clientSecret).then((resp: any) => {
            const status = resp?.paymentIntent?.status
            if (status) {
                handlePaymentStatus(resp?.paymentIntent?.status)
            }
        })
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        const error = await hyper.confirmPayment({
            widgets,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message)
            } else if (error.status !== undefined) {
                handlePaymentStatus(error.status)
            } else {
                setMessage("Unexpected Error Occurred");
            }
            setIsLoading(false)
            setIsPaymentCompleted(true)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <UnifiedCheckout id="unified-checkout" options={unifiedCheckoutOptions} />
            <button className={styles.button} disabled={!hyper || !widgets || isPaymentCompleted}>
                {isLoading ? <div className={styles.spinner} id="spinner"></div> : <>Pay Now</>}
            </button>
            {message !== "" ? <p className={styles.status}>Payment Status: {message}</p> : <></>}
        </form>
    )
}

export default CheckoutForm;