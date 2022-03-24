import React from "react";
import Loader from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <div
      style={{
        display: " flex",
        textAlign: "center",
        justifyContent: "center",
        marginTop: "20%",
      }}
    >
      <Loader type="ThreeDots" color="#495057" height={200} width={200} />
    </div>
  );
};

export default LoaderComponent;
