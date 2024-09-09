
import * as React from "react";
import Box from "@mui/material/Box";
import style from "./CustomCard.module.css";
import CustomText from "../../CustomText/CustomText"


const CustomCard = (props) => {
  let colours = ["#F5B406", "#00AB55", "#0050D6", "#FF780A"];
  const { dotColor, title, value, icon } = props;

  let formattedValue = value ? value : 0;
  if (typeof value == "number") {
    formattedValue = parseFloat(value.toFixed(0));
  } else {
    formattedValue = value
  }

  return (
    <>
      <Box className={style.container}>
        <div className={style.textContainer}>
          {icon && <img src={icon} />}
          <CustomText
            size={"16px"}
            weight={400}
            value={title}
            color={"#000000"}
            className={style.title}
          />
          {dotColor ? (
            <span
              className={style.colorBox}
              style={{ backgroundColor: dotColor }}
            ></span>
          ) : null}
          <CustomText
            size={"18px"}
            weight={600}
            value={formattedValue}
            color={"#000000"}
            className={style.value}
            parentClassName={style.valueContainer}
          />
        </div>
      </Box>
    </>
  );
};
export default CustomCard;
