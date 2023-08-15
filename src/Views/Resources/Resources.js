import React, { useEffect, useState } from "react";
import style from "./resources.module.css";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import ResourcesTitleView from "./ResourcesTitleView";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import NoData from "../../Components/NoData/NoData";
import AddDataSetCardNew from "../../Components/Datasets_New/AddDataSetCard";
import {
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";
import ResourceCard from "../../Components/Resources/ResourceCard";
import ResourceList from "../../Components/Resources/ResourceList";

const Resources = () => {
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));
  const [isGrid, setIsGrid] = useState(true);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [resources, setResources] = useState([]);
  const [user, setUser] = useState("");

  const addResource = () => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/resources/add`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/resources/add`;
    }
  };
  const getResources = (isLoadMore) => {};
  const handleCardClick = (id) => {
    if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
      return `/datahub/resources/view/${id}`;
    } else if (isLoggedInUserParticipant()) {
      return `/participant/resources/view/${id}`;
    } else if (user === "guest") {
      return `/home/resources/view/${id}`;
    }
  };
  useEffect(() => {
    let data = {
      count: 12,
      next: "https://datahubethdev.farmstack.co/be/datahub/dataset/v2/dataset_filters/?page=2",
      previous: null,
      results: [
        {
          id: "5328fcbe-665f-46b4-846a-d8032b6e86d1",
          user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
          organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
          organization: {
            org_email: "sohit@digitalgreen.org",
            org_description: "kjhkhkhkhkj",
            name: "new org",
            logo: "/media/organizations/logos/1653272245246.jpeg",
            address: {
              city: "",
              address: "org address",
              country: "India",
              pincode: "1234565432",
            },
            phone_number: "+91 23423-42343",
          },
          user: {
            last_name: "kumar",
            first_name: "sohit",
            email: "sohit@digitalgreen.org",
            on_boarded_by: null,
          },
          created_at: "2023-07-11T14:13:03.536067Z",
          updated_at: "2023-07-18T04:35:52.157756Z",
          name: "test1",
          description: "test description",
          files: ["file1.pdf", "file2.pdf"],
          user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
        },
        {
          id: "d19370cc-ef11-422d-9404-7c9ab9ab6116",
          user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
          organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
          organization: {
            org_email: "sohit@digitalgreen.org",
            org_description: "kjhkhkhkhkj",
            name: "new org",
            logo: "/media/organizations/logos/1653272245246.jpeg",
            address: {
              city: "",
              address: "org address",
              country: "India",
              pincode: "1234565432",
            },
            phone_number: "+91 23423-42343",
          },
          user: {
            last_name: "kumar",
            first_name: "sohit",
            email: "sohit@digitalgreen.org",
            on_boarded_by: null,
          },
          created_at: "2023-06-09T10:06:05.131004Z",
          updated_at: "2023-06-09T10:07:52.497909Z",
          name: "aewsdzxgvaesrdzfxgv",
          description:
            "esrdzfgxcvaerszdfgxvaersdzfxgcbaesrzdfxgcvserdzfxgcvsexdrfxgcvsexdrfxgcvsexdr.ƒð©cvaeszrds.ð©cvaesrzsdxgvaewrzsdzgxvaezrds.ð©cv as ubszrdjkfxbvjkbaszjdbfjkcbajwzsebdjfbcajkzesbdfjkbcawbeszjdzfbjkcbasezjdbfjkcb",
          files: ["file1.pdf", "file2.pdf"],
          user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
        },
        {
          id: "3f6509e8-a9d2-4839-8878-f174640f8339",
          user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
          organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
          organization: {
            org_email: "sohit@digitalgreen.org",
            org_description: "kjhkhkhkhkj",
            name: "new org",
            logo: "/media/organizations/logos/1653272245246.jpeg",
            address: {
              city: "",
              address: "org address",
              country: "India",
              pincode: "1234565432",
            },
            phone_number: "+91 23423-42343",
          },
          user: {
            last_name: "kumar",
            first_name: "sohit",
            email: "sohit@digitalgreen.org",
            on_boarded_by: null,
          },
          created_at: "2023-05-03T05:47:36.308567Z",
          updated_at: "2023-06-09T09:53:33.633430Z",
          name: "ssjdfb",
          description:
            "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less                                                                                                                               \n                                                 ble content of a page when looking at its layout. The point of using Lorem Ipsum is that it has\npage when",
          files: ["file1.pdf", "file2.pdf"],
          user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
        },
        {
          id: "7a4742f3-bff7-4612-99f8-027f56a029ff",
          user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
          organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
          organization: {
            org_email: "sohit@digitalgreen.org",
            org_description: "kjhkhkhkhkj",
            name: "new org",
            logo: "/media/organizations/logos/1653272245246.jpeg",
            address: {
              city: "",
              address: "org address",
              country: "India",
              pincode: "1234565432",
            },
            phone_number: "+91 23423-42343",
          },
          user: {
            last_name: "kumar",
            first_name: "sohit",
            email: "sohit@digitalgreen.org",
            on_boarded_by: null,
          },
          created_at: "2023-04-24T09:13:13.888082Z",
          updated_at: "2023-06-08T10:00:34.765075Z",
          name: "sohit",
          description: "sohit description",
          files: ["file1.pdf", "file2.pdf"],
          user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
        },
        {
          id: "73cab41a-49fe-4f86-ae4b-6f63876a3cb2",
          user_id: "74262a78-4b2b-4687-88ab-cba9ac641d37",
          organization_id: "ac35763e-bfce-4bf8-bb26-3c98616600b6",
          organization: {
            org_email: "sohit@digitalgreen.org",
            org_description: "kjhkhkhkhkj",
            name: "new org",
            logo: "/media/organizations/logos/1653272245246.jpeg",
            address: {
              city: "",
              address: "org address",
              country: "India",
              pincode: "1234565432",
            },
            phone_number: "+91 23423-42343",
          },
          user: {
            last_name: "kumar",
            first_name: "sohit",
            email: "sohit@digitalgreen.org",
            on_boarded_by: null,
          },
          created_at: "2023-05-01T11:04:37.974495Z",
          updated_at: "2023-05-03T05:01:20.770828Z",
          name: "abbusijke`",
          description: "nbcjdf",
          files: ["file1.pdf", "file2.pdf"],
          user_map: "206722c0-4a7e-4415-961a-8fd921eb5342",
        },
      ],
    };
    if (data?.next) {
      setShowLoadMoreBtn(true);
    }
    setResources(data.results);
  }, []);
  return (
    <Box
      sx={{
        maxWidth: "100%",
        marginLeft: mobile || tablet ? "30px" : "144px",
        marginRight: mobile || tablet ? "30px" : "144px",
      }}
    >
      <ResourcesTitleView
        title={"List of resources"}
        isGrid={isGrid}
        setIsGrid={setIsGrid}
        addResource={addResource}
        history={history}
      />
      {resources.length > 0 ? (
        <>
          <CSSTransition
            in={isGrid}
            timeout={{
              appear: 600,
              enter: 700,
              exit: 100,
            }}
            classNames="step"
            unmountOnExit={true}
          >
            <div className="datasets_card">
              {user !== "guest" ? (
                <AddDataSetCardNew
                  history={history}
                  addDataset={addResource}
                  title={"Create new resource"}
                  description={
                    "Add details about your resource and make discoverable to others."
                  }
                />
              ) : (
                ""
              )}
              {resources?.map((item, index) => (
                <ResourceCard
                  index={index}
                  id="dataset-card-in-dataset"
                  key={item?.id}
                  history={history}
                  item={item}
                  handleCardClick={handleCardClick}
                />
              ))}
            </div>
          </CSSTransition>
          <CSSTransition
            in={!isGrid}
            timeout={{
              appear: 600,
              enter: 700,
              exit: 100,
            }}
            classNames="step"
            unmountOnExit={true}
          >
            <ResourceList
              resources={resources}
              history={history}
              handleCardClick={handleCardClick}
            />
          </CSSTransition>
        </>
      ) : (
        <NoData
          title={"There is no resources"}
          subTitle={"As of now there is no resources, so add new resource!"}
          primaryButton={"Add new Resource "}
          primaryButtonOnClick={() => history.push(addResource())}
        />
      )}

      {showLoadMoreBtn ? (
        <Button
          variant="outlined"
          className={mobile || tablet ? "d_button_style_md" : "d_button_style"}
          onClick={() => getResources(true)}
          id="dataset-loadmore-btn"
          data-testid="load_more_admin"
        >
          Load more
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Resources;
