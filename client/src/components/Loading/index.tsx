import React from "react";
import loader from "@/assets/loader.gif";

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  LoadingFC?: React.FC;
}

export const Loading: React.FC<LoadingProps> = ({
  children,
  isLoading,
  LoadingFC,
}) => {

  return (
    <>
      {isLoading ? (
        LoadingFC ? (<LoadingFC />) : (<img src={loader} alt="loading" />)
      ) : (
        children
      )}
    </>
  );
};
