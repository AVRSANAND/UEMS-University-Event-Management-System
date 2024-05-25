import React from "react";
import img1 from "../../assets/images/img1.jpg";
function Herosection() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
      }}
    >
      <img src={img1} alt="img1" />
    </div>
  );
}

export default Herosection;
