import React from "react";
import moa_kenya_logo from "../../Assets/Img/Farmstack V2.0/moa_kenya_logo.jpg";
import UrlConstant from "../../Constants/UrlConstants";

const KalroSpecificNavbar = (props) => {
  // const upperDiv = document.querySelector(".upper_navbar");
  // window.addEventListener("scroll", () => {
  //   // Get the scroll position
  //   const scrollY = window.scrollY;

  //   // Check if the scroll position is greater than a certain threshold (e.g., 100 pixels)
  //   if (scrollY > 100) {
  //     // Add a class to the lower div to hide the upper div
  //     upperDiv.classList.add("scrolled");
  //   } else {
  //     // Remove the class to show the upper div
  //     upperDiv.classList.remove("scrolled");
  //   }
  // });
  return (
    <div
      // className="upper_navbar"
      style={{
        backgroundImage: `url("https://www.kalro.org/wp-content/themes/mai-law-pro/band3.png)`,
        width: "100%",
        height: "100px",
        backgroundRepeat: "no-repeat",
        // position: "sticky",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <img
        // src={require("../../Assets/Img/footer_logo.svg")}
        style={{
          height: "auto",
          maxWidth: "300px",
          width: "auto",
          maxHeight: "100px",
        }}
        src={moa_kenya_logo}
        alt="HeaderLogo"
      />
      <img
        // src={require("../../Assets/Img/footer_logo.svg")}
        style={{
          height: "auto",
          maxWidth: "300px",
          width: "auto",
          maxHeight: "80px",
        }}
        src={UrlConstant.base_url_without_slash + props?.orgLogo}
        alt="HeaderLogo"
      />
    </div>
  );
};

export default KalroSpecificNavbar;
