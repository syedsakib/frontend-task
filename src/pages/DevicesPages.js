import React from "react";

const DevicesPages = () => {
  return (
    <div>
      <h3> Devices Online:3</h3>
      <div>Circles goes here</div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => console.log("NOTIFY")}
        >
          NOTIFY
        </button>
        <button
          className="btn btn-info mx-4"
          onClick={() => console.log("LOG OUT")}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default DevicesPages;
