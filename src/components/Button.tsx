import React from "react";

import "../styles/Button.css";

interface IButtonProps {
  data?: {
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
  return (
    <button onClick={onClick} className={"btn"}>
      {data ? (
        <>
          <span>{data && data.name}</span>
          <span>{data && data.price}</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
