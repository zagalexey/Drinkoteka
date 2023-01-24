import "./styles/App.css";
import "./styles/index.css";
import Button from "./components/Button";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  IPaymentCancel,
  IPaymentConfirm,
  IPaymentCreate,
  IPaymentResponse,
  Status,
} from "./models";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import { Alert } from "@mui/material";
import Wrapper from "./components/Wrapper";

const App = () => {
  const [payment, setPayment] = useState<IPaymentCreate | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);

  useEffect(() => {
    if (payment) {
      postPayment();
    }
  }, [payment]);

  const createPayment = (price: number) => {
    const requestBody: IPaymentCreate = {
      secureString: "27924505",
      request: {
        amount: price,
        currencyCode: "203",
        invoiceNumber: "",
        transactionId: v4(),
        daughterCompanyId: "",
      },
    };
    setPayment(requestBody);
  };

  const postPayment = () => {
    axios
      .post("http://192.168.1.112:33350/paya/payment", payment)
      .then((res: AxiosResponse<IPaymentResponse>) => {
        checkForPaymentStatus();
      })
      .catch((e) => console.log(e));
  };

  const cancelOnWFC = () => {
    const cancelBody: IPaymentCancel = {
      secureString: `${payment?.secureString}`,
      transactionId: `${payment?.request.transactionId}`,
    };

    axios
      .post("http://192.168.1.112:33350/paya/cancel", cancelBody)
      .then((res) => {
        setPayment(null);
      })
      .catch((e) => console.log(e.code));
  };

  const confirmPayment = () => {
    const confirmBody: IPaymentConfirm = {
      secureString: `${payment?.secureString}`,
      transactionId: `${payment?.request.transactionId}`,
      confirm: true,
    };

    axios
      .post("http://192.168.1.112:33350/paya/confirm", confirmBody)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));

    paymentResult();
  };

  const checkForPaymentStatus = () => {
    const body: IPaymentCancel = {
      transactionId: `${payment?.request.transactionId}`,
      secureString: `${payment?.secureString}`,
    };

    const interval = setInterval(() => {
      axios
        .post("http://192.168.1.112:33350/paya/status", body)
        .then((res) => {
          if (res.data.status === Status.FINISHED) {
            console.log(res.data);
            clearInterval(interval);
            clearTimeout(timeout);
            confirmPayment();
            setPayment(null);
          } else {
            console.log(res.data);
          }
        })
        .catch((e) => console.log(e));
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 60000);
  };

  const paymentResult = () => {
    const resultBody: IPaymentCancel = {
      transactionId: `${payment?.request.transactionId}`,
      secureString: `${payment?.secureString}`,
    };
    axios
      .post("http://192.168.1.112:33350/paya/result", resultBody)
      .then((res) => console.log("Result: ", res.data))
      .catch((e) => console.log(e));
  };

  const btn1 = {
    name: "Kozel",
    price: 3299,
  };
  const btn2 = {
    name: "Plzen",
    price: 2499,
  };

  const login = (password: string) => {
    if (password === import.meta.env.VITE_PIN_CODE) {
      setIsLoggedIn(true);
    } else if (password.length) {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 3000);
    }
  };

  return (
    <Wrapper>
      {!isLoggedIn ? (
        <>
          <LoginPage login={login} />
          {loginError && (
            <Alert className={"fixed right-0 top-0"} severity={"error"}>
              Wrong pin. Try again!
            </Alert>
          )}
        </>
      ) : (
        <div
          className={
            "w-screen h-screen flex flex-col justify-evenly items-center"
          }
        >
          <h1 className={"text-main font-bold text-8xl text-center"}>
            Drinkøtéka
          </h1>
          <div className={"container grid grid-rows-2 grid-cols-3 gap-6"}>
            <Button data={btn1} onClick={() => createPayment(btn1.price)} />
            <Button data={btn2} onClick={() => createPayment(btn2.price)} />
            {/*<button*/}
            {/*  className={"text-black bg-white px-5 py-2"}*/}
            {/*  onClick={cancelOnWFC}*/}
            {/*>*/}
            {/*  Cancel WFC*/}
            {/*</button>*/}
          </div>
          {/*<div>*/}
          {/*  /!*<Button data={btn1} onClick={test} />*!/*/}
          {/*  Cancel WFC*/}
          {/*</div>*/}
        </div>
      )}
    </Wrapper>
  );
};

export default App;
