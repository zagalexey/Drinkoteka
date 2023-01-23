import React, { useRef } from "react";
import { Button } from "@mui/material";

interface ILoginPageProps {
  login: (password: string) => void;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = ({ login }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <form
        className={
          "w-1/3 h-1/3 flex flex-col items-center justify-evenly rounded backdrop-blur-[10px] border-2 border-main"
        }
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) {
            login(ref.current.value);
            ref.current.value = "";
          }
        }}
      >
        <h1 className={"font-bold text-4xl text-main"}>Log in</h1>
        <input
          className={"text-black w-2/3 h-[40px] rounded px-2"}
          placeholder={"Enter your pin"}
          ref={ref}
          type="password"
        />
        <button
          id={"loginBtn"}
          className={
            "w-2/3 h-[50px] bg-main text-white border rounded hover:bg-white hover:text-main active:translate-y-1"
          }
          type={"submit"}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
