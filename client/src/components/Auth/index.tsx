import React from "react";

/**
 * @description && @todo 身份验证
 */

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  return <>{ children }</>;
};

export default Auth;
