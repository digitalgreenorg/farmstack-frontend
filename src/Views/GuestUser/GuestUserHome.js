/* eslint-disable eqeqeq */
import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import GuestUserBanner from "../../Components/GuestUser/GuestUserBanner";
import GuestUserDatasets from "../../Components/GuestUser/GuestUserDatasets";
import GuestUserDescription from "../../Components/GuestUser/GuestUserDescription";
import NoDatasetGuestUserPage from "../../Components/GuestUser/NoDatasetGuestUserPage";
import Loader from "../../Components/Loader/Loader";
import GuestUserNavBar from "../../Components/Navbar/GuestUserNavbar";
import THEME_COLORS from "../../Constants/ColorConstants";
import "./GuestUserHome.css";

// const useStyles = {
//   btncolor: {
//     color: "white",
//     "border-color": THEME_COLORS.THEME_COLOR,
//     "background-color": THEME_COLORS.THEME_COLOR,
//     float: "right",
//     "border-radius": 0,
//   },
//   marginrowtop: { "margin-top": "20px" },
//   marginrowtop8px: { "margin-top": "0px" },
// };

export default function GuestUserHome(props) {
  //   loader
  const [isLoader, setIsLoader] = useState(false);
  const [noDatasetGuestUserPage, setNoDatasetGuestUserPage] = useState(false);

  return (
    <div className="center_keeping_conatiner">
      {isLoader ? <Loader /> : ""}
      <GuestUserNavBar />
      {noDatasetGuestUserPage ? (
        <>
          <NoDatasetGuestUserPage />
        </>
      ) : (
        <>
          <GuestUserBanner
            setNoDatasetGuestUserPage={setNoDatasetGuestUserPage}
          />
          <GuestUserDescription />
          <GuestUserDatasets />
        </>
      )}
      <Footer disableHomeLink={true} />
    </div>
  );
}
