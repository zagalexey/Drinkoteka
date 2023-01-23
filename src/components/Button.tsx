import React from "react";

import "../styles/Button.css";

interface IButtonProps {
  data: {
    name: string;
    price: number;
  };
  onClick: () => void;
  text?: string;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  data,
  onClick,
  text,
}) => {
  const priceInCZK = data.price / 100;

  return (
    <button
      onClick={onClick}
      className={"btn flex flex-col justify-center items-center gap-8"}
    >
      <span className={"text-6xl font-bold"}>{data.name}</span>
      <span className={"text-3xl font-bold"}>{`${priceInCZK} CZK`}</span>
    </button>
  );
};

export default Button;
