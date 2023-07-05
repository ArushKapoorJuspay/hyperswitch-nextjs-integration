'use client';

import React, { useEffect, useState } from "react"
import styles from './page.module.css'
// @ts-ignore
import { loadHyper } from "@juspay-tech/hyper-js"
// @ts-ignore
import { HyperElements } from "@juspay-tech/react-hyper-js";

import CheckoutForm from "./checkout-form";

const Home: React.FC = ({ }) => {

  const [clientSecret, setClientSecret] = useState("")
  const [loadHyperValue, setLoadHyperValue] = useState()
  const [options, setOptions] = useState({})

  useEffect(() => {
    const reqBody = JSON.stringify({
      "amount": 6500,
      "business_country": "US",
      "business_label": "default",
      "currency": "USD",
      "confirm": false,
      "capture_method": "automatic",
      "authentication_type": "three_ds",
      "customer_id": "hyperswitch111",
      "email": "something@gmail.com",
      "description": "Hello this is description",
      "shipping": {
        "address": {
          "state": "zsaasdas",
          "city": "Banglore",
          "country": "US",
          "line1": "sdsdfsdf",
          "line2": "hsgdbhd",
          "line3": "alsksoe",
          "zip": "571201",
          "first_name": "Bopanna"
        },
        "phone": {
          "number": "123456789",
          "country_code": "+1"
        }
      },
      "metadata": {
        "order_details": {
          "product_name": "gillete razor",
          "quantity": 1,
          "amount": 1000
        },
        "udf1": "value1",
        "new_customer": "true",
        "login_date": "2019-09-10T10:11:12Z"
      },
      "billing": {
        "address": {
          "line1": "1467",
          "line2": "Harrison Street",
          "line3": "Harrison Street",
          "city": "San Fransico",
          "state": "California",
          "zip": "94122",
          "country": "AT",
          "first_name": "joseph",
          "last_name": "Doe"
        },
        "phone": {
          "number": "8056594427",
          "country_code": "+91"
        }
      }
    });

    const fetchData = async () => {
      try {
        const response = await fetch("https://sandbox.hyperswitch.io/payments", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "api-key": "snd_c691ade6995743bd88c166ba509ff5da"
          },
          body: reqBody
        })
        const data = await response.json();

        setClientSecret(data.client_secret)

        // Handle the fetched data
      } catch (error) {
        // Handle errors
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    setLoadHyperValue(loadHyper("pk_snd_3b33cd9404234113804aa1accaabe22f"));
  }, [])

  useEffect(() => {
    if (clientSecret !== "") {
      setOptions({
        clientSecret: clientSecret,
        appearance: {
          theme: "midnight",
        },
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap'
          },
          {
            cssSrc: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Qwitcher+Grypen:wght@400;700&display=swap'
          },
          {
            cssSrc: 'https://fonts.googleapis.com/css2?family=Combo&display=swap'
          },
          {
            family: "something",
            src: "https://fonts.gstatic.com/s/combo/v21/BXRlvF3Jh_fIhj0lDO5Q82f1.woff2",
            weight: "700",
          }
        ],
        locale: "en",
        loader: "always"
      })
    }
  }, [clientSecret])

  return (
    <main className={styles.main}>
      {Object.keys(options).length !== 0 ? <HyperElements options={options} hyper={loadHyperValue}>
        <CheckoutForm />
      </HyperElements> : <></>}
    </main>
  )
}

export default Home;