import React, { useEffect } from "react";
import { Box } from "@mui/material";
// @ts-ignore
import style from "./FemaleMaleCard.module.css";
import CustomText from "Farmer-Registry/CustomText/CustomText";
import { Row, Col } from "react-bootstrap";

// @ts-ignore
const LocationCard = (props) => {
  // @ts-ignore
  let colours = ["#F5B406", "#00AB55", "#0050D6", "#FF780A"];
  let { title, data } = props;
  useEffect(() => {}, []);

  return (
    <>
      <Box className={style.containerLocation}>
        <div className={`${style.locationTextContainer} `}>
          <CustomText
            size={"16px"}
            weight={400}
            value={"Location stats"}
            color={"#000000"}
            className={style.title}
          />
          <Row>
            {Object.entries(data).map(([key, value], index) => (
              <Col
                lg={6}
                md={6}
                sm={6}
                className={style.labelRow}
                key={`label-${index}`}>
                <span
                  className={style.colorBox}
                  style={{ backgroundColor: colours[index] }}></span>
                <span className={style.labelText}>{key}</span>
                <span className={style.percentageText + ' ms-auto'}>{value.toLocaleString()}</span>
              </Col>
            ))}
          </Row>
        </div>
      </Box>
    </>
  );
};

export default LocationCard;
