import React from "react";
import loader from '@/assets/loader.gif'

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const Loading: React.FC<LoadingProps> = ({ children, isLoading }) => {
  return <>{isLoading ? <img src={loader} alt="loading" /> : children}</>;
};