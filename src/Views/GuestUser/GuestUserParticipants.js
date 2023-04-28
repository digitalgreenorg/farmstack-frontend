import React, { useState, useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LocalStyle from "./GuestUsetParticipants.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";

function GuestUserParticipants(props) {
  const { title, description, isCosteward } = props;
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [coStewardOrParticipantsList, setCoStewardOrParticipantsList] =
    useState([]);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [searcParticipantsName, setSearcParticipantsName] = useState();

  const getParticipants = () => {
    let url = UrlConstant.base_url + "microsite/participant/";
    let params = "";
    if (title) {
      params = { co_steward: "True" };
    }
    callLoader(true);
    HTTPService("GET", url, params, false, false)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        if (response?.data?.results)
          setCoStewardOrParticipantsList(response.data.results);
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log(e);
      });
  };

  const getListOnClickOfLoadMore = () => {
    callLoader(true);
    HTTPService("GET", loadMoreUrl, "", false, false)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        let datalist = coStewardOrParticipantsList;
        // if (response?.data?.results) {
        let finalDataList = [...datalist, ...response.data.results];
        setCoStewardOrParticipantsList(finalDataList);
        // }
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log(e);
      });
  };
  const handleSearch = (name, isLoadMore) => {
    setSearcParticipantsName(name);
    let searchTimeout;
    const DEBOUNCE_DELAY = 500;
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      // setSearcParticipantsName(name);
      if (name.trim().length > 2) {
        let data = {};
        data["name"] = name.trim();

        // setFilterState(data);
        let guestUsetFilterUrl =
          UrlConstant.base_url + UrlConstant.microsite_search_participants;
        HTTPService("GET", guestUsetFilterUrl, data, false, false)
          .then((response) => {
            if (response.data.next == null) {
              // setFilterState({});
              setLoadMoreButton(false);
            } else {
              setLoadMoreUrl(response.data.next);
              setLoadMoreButton(true);
            }
            let finalDataList = [];
            if (isLoadMore) {
              finalDataList = [
                ...coStewardOrParticipantsList,
                ...response.data.results,
              ];
            } else {
              finalDataList = [...response.data.results];
            }
            console.log(finalDataList, "fdlist");
            setCoStewardOrParticipantsList(finalDataList);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, DEBOUNCE_DELAY);
  };

  useEffect(() => {
    getParticipants();
  }, []);

  console.log("something", coStewardOrParticipantsList);

  return (
    <Container>
      <Row className={LocalStyle.titleContainer}>
        <div className={LocalStyle.title}>
          {title ?? "Participants Network"}
        </div>
        <div className="d-flex justify-content-center">
          <div
            className={LocalStyle.description}
            style={{ width: description && "74%" }}
          >
            <b style={{ fontWeight: "bold" }}>&ldquo;</b>
            {description ??
              "Meet the Change Makers: Our Community Members Who Are Transforming Agriculture."}
            <b style={{ fontWeight: "bold" }}>&rdquo;</b>
          </div>
        </div>
      </Row>
      {/* <Row className={LocalStyle.title2}>
        <Typography className={`${GlobalStyle.size24} ${GlobalStyle.bold600}`}>
          Our terms are
        </Typography>
      </Row> */}

      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#919EAB",
            },
            "&:hover fieldset": {
              borderColor: "#919EAB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#919EAB",
            },
          },
        }}
        className="input_field"
        placeholder={title ? "Search co-steward.." : "Search participant.."}
        value={searcParticipantsName}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <img
                  src={require("../../Assets/Img/input_search.svg")}
                  alt="search"
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Row className={LocalStyle.participantsContainer}>
        <CoStewardAndParticipantsCard
          guestUser={true}
          isCosteward={isCosteward ? true : false}
          title={title ?? "Our Participants are"}
          viewType={"grid"}
          // setViewType={setViewType}
          coStewardOrParticipantsList={coStewardOrParticipantsList}
          loadMoreButton={loadMoreButton}
          handleLoadMoreButton={getListOnClickOfLoadMore}
        />
      </Row>
    </Container>
  );
}

export default GuestUserParticipants;
