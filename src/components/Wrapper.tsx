import React from "react";

import "../styles/Wrapper.css";

interface IWrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FunctionComponent<IWrapperProps> = ({ children }) => {
  return <div className={"bg-image"}>{children}</div>;
};

export default Wrapper;
