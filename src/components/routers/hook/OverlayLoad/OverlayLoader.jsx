import React from "react";
import "./loader.scss";

const OvelayLoader = () => {
  return (
    <>
      <div className='OvelayLoader'>
        <div className='container2'>
          <div className='loader'></div>
          Aguarde, Por Favor!
        </div>
      </div>
      <div className='ovelay'></div>
    </>
  );
};

export default OvelayLoader;
