'use client';

import React, { useEffect, useState } from "react"
// @ts-ignore
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
      "amount": 650000,
      "business_country": "US",
      "business_label": "Default",
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
          "country": "US",
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
            "api-key": "snd_veraxauEuta29wKncXVASQThIcLUZDVenRDCbXT9isGPfLMqHMvJUTuOo3qg5r2B"
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
    setLoadHyperValue(loadHyper("pk_snd_9a92bd166cde4889b478d2a8150b3d72"));
  }, [])

  useEffect(() => {
    if (clientSecret !== "") {
      setOptions({
        clientSecret: clientSecret,
        appearance: {
          theme: "default",
          variables: {
            colorText: "#002e73",
            colorPrimary: "#002e73",
            borderRadius:"10px",
            backgroundColor:"#ffffff"
          },
          rules:{
            ".Input":{
              border:"1px solid #cacdd1",
              backgroundColor:"#ffffff",
              borderRadius:"10px"
            },
            ".Tab":{
              fontSize:"15px",
              gap: "8px",
              background:"#ffffff",
              border: "1px solid transparent",
              borderRadius:"10px",
            },
            ".Tab:hover":{
              fontSize:"15px",
              gap: "8px",
              background:"#ffffff",
              border: "1px solid transparent",
              borderRadius:"10px",
            },
            ".TabMore":{
              backgroundColor:"#ffffff",
              border: "1px solid transparent",
              borderRadius:"10px",
            },
            ".Tab--selected":{
              backgroundColor:"#ffffff",
              color:"#002e73",
              border: "1px solid #002e73"
            },
            ".Tab:focus":{
              border:"1px solid #002e73",
              boxShadow: "#002e734c 0px 0px 0px 3px"
            },
            ".Label":{
              color:"#6b7686"
            },
            ".Tab--selected:hover":{
              background:"#ffffff",
              color:"#002e73",
              border:"1px solid #002e73"
            }
          }
        },
        fonts: [
          {
            cssSrc: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800&display=swap'
          },],
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