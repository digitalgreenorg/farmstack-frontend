import React, { useEffect, useMemo, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Drawer, Dropdown, Space } from "antd";
import { Button, Checkbox } from "@mui/material";
import global_styles from "../../Assets/CSS/global.module.css";
import local_style from "./table_with_filtering_for_api.module.css";
import CloseIcon from "@mui/icons-material/Close";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import TableForRequestForApiOrDatasetFileConsumption from "../Datasets_New/TableForRequestForApiOrDatasetFileConsumption";
import { getUserMapId } from "../../Utils/Common";
import TableForApiRequest from "../Datasets_New/TableForApiRequest";
const TableWithFilteringForApi = (props) => {
  const [filterByOption, setFilterByOption] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const allFilters = ["pending", "approved", "rejected"];
  const [reRun, setReRun] = useState(0);
  const [filterPayload, setFilterPayload] = useState({
    pending: true,
    approved: true,
    rejected: true,
  });
  const [
    listOfAllRequestReceivedForSelectedFile,
    setListOfAllRequestReceivedForSelectedFile,
  ] = useState([]);
  const heading = "List of requests";
  const data = {
    id: "074a16f7-9886-4461-ab7f-96efc77f17cb",
    name: "Americ data check",
    user_map: "a4afc139-5829-49a4-8131-9021eceb4dd6",
    description: "Americ data check desc",
    category: {
      Horticulture: ["GDHFDHGDFHGF"],
    },
    geography: {
      city: {
        name: "Codrington",
        latitude: "17.63333000",
        longitude: "-61.83333000",
        stateCode: "10",
        countryCode: "AG",
      },
      state: {
        name: "Barbuda",
        isoCode: "10",
        latitude: "17.62662420",
        longitude: "-61.77130280",
        countryCode: "AG",
      },
      country: {
        flag: "🇦🇬",
        name: "Antigua And Barbuda",
        isoCode: "AG",
        currency: "XCD",
        latitude: "17.05000000",
        longitude: "-61.80000000",
        phonecode: "+1-268",
        timezones: [
          {
            tzName: "Atlantic Standard Time",
            zoneName: "America/Antigua",
            gmtOffset: -14400,
            abbreviation: "AST",
            gmtOffsetName: "UTC-04:00",
          },
        ],
      },
    },
    constantly_update: false,
    data_capture_start: "2023-06-05T18:30:00Z",
    data_capture_end: "2023-06-12T18:30:00Z",
    organization: {
      org_email: "digitalgreen@digitalgreen.com",
      org_description:
        "Digital Green is a non-profit organization that was founded in 2006 and is based in Koramangala, Bangalore. The organization uses technology to empower smallholder farmers in developing countries by sharing agricultural knowledge and practices.",
      name: "Digital green",
      logo: "https://datahubethdev.farmstack.co/media/organizations/logos/KALRO_PcWNbzH.png",
      phone_number: "+91 97380-39097",
      address: {
        city: "",
        address: "4th block, Koramangala, New Hp Petrol pump, Bangalore",
        country: "Argentina",
        pincode: "12345678654321",
      },
    },
    user: {
      id: "0f76cb90-2394-499b-9b60-bf4cad3751a4",
      first_name: "asdfg",
      last_name: "",
      email: "kanhaiya@digitalgreen.org",
      on_boarded_by: null,
    },
    datasets: [
      {
        id: "6bfc4ae4-f0cd-4dc3-acf6-c385cec47dcc",
        content: [
          {
            SN: 1,
            Name: "የሺአረግ",
            "Father Name": "ዘነበ",
            "Grand Father Name": "ብዙነህ",
            Sex: "Female",
            "Birth Month": 12.0,
            "Birth Year": 1976.0,
            "Maritial Status": "ያላገባ",
            "Phone No": 921744060,
            "Alternate Phone No (Optional)": "",
            Email: "",
            "Education Level": "ድግሪ",
            Specialization: "እንሰሳትሳይንስ",
            "Specialization (Other)": "",
            Position: "እንሰሳትእርባታ",
            "Employment Month (Ethiopian Calendar)": 1,
            "Employment Year (Ethiopian Calendar)": 1997,
            "Assignment Month at Kebele (Ethiopian Calendar)": 1,
            "Assignment Year at Kebele (Ethiopian Calendar)": 1997,
            "Pension Number": "",
            Region: "Amhara",
            Zone: "North Shewa",
            Woreda: "Basona Worena",
            Kebele: "ሳሪያ",
            "Kebele (Translated)": "Sariya",
            "CIAT Equivalent Kebele": "Sariya",
            "Similarity Index (Confidence)": 100,
            "COCO Equivalent Kebele": "metkoriya",
            "Similarity Index": 60,
          },
          {
            SN: 2,
            Name: "አበራ",
            "Father Name": "አበበ",
            "Grand Father Name": "ያግቡ",
            Sex: "Male",
            "Birth Month": 2.0,
            "Birth Year": 1968.0,
            "Maritial Status": "ያላገባ",
            "Phone No": 912907732,
            "Alternate Phone No (Optional)": "",
            Email: "",
            "Education Level": "ድግሪ",
            Specialization: "እንሰሳትሳይንስ",
            "Specialization (Other)": "",
            Position: "እንሰሳትእርባታ",
            "Employment Month (Ethiopian Calendar)": 11,
            "Employment Year (Ethiopian Calendar)": 1992,
            "Assignment Month at Kebele (Ethiopian Calendar)": 11,
            "Assignment Year at Kebele (Ethiopian Calendar)": 1992,
            "Pension Number": "",
            Region: "Amhara",
            Zone: "North Shewa",
            Woreda: "Basona Worena",
            Kebele: "ባቄሎ",
            "Kebele (Translated)": "Bakelo",
            "CIAT Equivalent Kebele": "Bakelo",
            "Similarity Index (Confidence)": 100,
            "COCO Equivalent Kebele": "bakilo",
            "Similarity Index": 83,
          },
        ],
        file: "protected/datasets/Americ data check/file/DA_List_-_D1_1.xlsx",
        source: "file",
        file_size: 46467,
        accessibility: "registered",
        standardised_file:
          "protected/datasets/Americ data check/file/DA_List_-_D1_1.xlsx",
        standardisation_config: {},
        usage_policy: [],
      },
      {
        id: "c8f2c9ba-7648-4b0f-a71d-e06cbb202113",
        content: [],
        file: "protected/datasets/Americ data check/file/Adoption_1.png",
        source: "file",
        file_size: 1322416,
        accessibility: "private",
        standardised_file:
          "protected/datasets/Americ data check/file/Adoption_1.png",
        standardisation_config: {},
        usage_policy: [
          {
            id: "1ff95b4e-90eb-4963-97bd-be214ec58026",
            organization: {
              org_email: "orgemail@mail.com",
              org_description: "asdfghjhgrfewqwefr",
              name: "Orgname",
              logo: "/media/organizations/logos/d2fo-home-img_DjWEIqN_pN8GdTR.jpeg",
              address: {
                city: "",
                address: "awesdfgbwqed",
                country: "Argentina",
                pincode: "1234567865",
              },
              phone_number: "+91 12345-67543",
            },
            user: {
              last_name: "pariticipant",
              first_name: "kanhaiya",
              email: "kanhaiya+participant@digitalgreen.org",
              on_boarded_by: null,
            },
            created_at: "2023-06-27T11:17:52.054118Z",
            updated_at: "2023-06-27T11:17:52.054148Z",
            approval_status: "requested",
            accessibility_time: null,
            user_organization_map: "2792a53d-fdcf-4199-b647-6c159a41d4dc",
            dataset_file: "c8f2c9ba-7648-4b0f-a71d-e06cbb202113",
          },
        ],
      },
      {
        id: "652f49e4-17b2-416d-9828-247d38f53cb5",
        content: [],
        file: "protected/datasets/Americ data check/file/how_is_the_interest_calculated_2.pdf",
        source: "file",
        file_size: 790724,
        accessibility: "public",
        standardised_file:
          "protected/datasets/Americ data check/file/how_is_the_interest_calculated_2.pdf",
        standardisation_config: {},
        usage_policy: [],
      },
      {
        id: "e5d1b43a-b4a4-4fa3-9c9d-d45205358482",
        content: [],
        file: "protected/datasets/Americ data check/file/Invitation_Mr._Ugesh_Basa.pdf",
        source: "file",
        file_size: 264410,
        accessibility: "public",
        standardised_file:
          "protected/datasets/Americ data check/file/Invitation_Mr._Ugesh_Basa.pdf",
        standardisation_config: {},
        usage_policy: [],
      },
      {
        id: "77d679e9-fa49-42fd-9bfa-c427e5a01fb7",
        content: [],
        file: "protected/datasets/Americ data check/file/Dissemination.png",
        source: "file",
        file_size: 702941,
        accessibility: "public",
        standardised_file:
          "protected/datasets/Americ data check/file/Dissemination.png",
        standardisation_config: {},
        usage_policy: [],
      },
      {
        id: "be103f8c-a760-4cd5-8924-0d6394a7612f",
        content: [],
        file: "protected/datasets/Americ data check/file/CIAT_Location_Specific_Fertilizer_Recommendation_-_D2_1_1_1.xlsx",
        source: "file",
        file_size: 168186,
        accessibility: "public",
        standardised_file:
          "protected/datasets/Americ data check/file/CIAT_Location_Specific_Fertilizer_Recommendation_-_D2_1_1_1.xlsx",
        standardisation_config: {},
        usage_policy: [],
      },
      {
        id: "589e0eab-a989-4bf9-863f-b3a60d397b11",
        content: [],
        file: "protected/datasets/Americ data check/file/Claim_form_Part_A-B_1_1.pdf",
        source: "file",
        file_size: 849276,
        accessibility: "public",
        standardised_file:
          "protected/datasets/Americ data check/file/Claim_form_Part_A-B_1_1.pdf",
        standardisation_config: {},
        usage_policy: [],
      },
      {
        id: "eefb6042-9749-45b2-a5e0-fbd7512cd7b5",
        content: [],
        file: "protected/datasets/Americ data check/file/Adoption_1_1.png",
        source: "file",
        file_size: 1322416,
        accessibility: "public",
        standardised_file:
          "protected/datasets/Americ data check/file/Adoption_1_1.png",
        standardisation_config: {},
        usage_policy: [],
      },
      {
        id: "fc10b04f-2ecc-41ec-94a3-de034bcd29bf",
        content: [
          {
            Name: "የሺአረግ",
            Sex: "Female",
            "Phone No": 921744060.0,
            Email: "",
            Kebele: "ሳሪያ",
            "CIAT Equivalent Kebele": "Sariya",
            R_NAME: "Amhara",
            Z_NAME: "North Shewa",
            W_NAME: "Basona Werana",
            KEBELE_NAM: "Sariya",
            average_elevation: 2654.92,
            n: 170,
            p: 33,
            "kg/ha": 369.57,
            "In Organic_dict":
              '{"Inorganic NPS with Urea NPS(kg\\/ha)":199,"Inorganic NPS with Urea(kg\\/ha)":287,"Inorganic NPS with Urea NPSB(kg\\/ha)":200,"Inorganic NPSB with Urea(kg\\/ha)":287,"Inorganic NPS with Urea NPSBZn(kg\\/ha)":224,"Inorganic NPSBZn with Urea(kg\\/ha)":287}',
            Organic_dict:
              '{"Organic NPS and Urea with FYM NPS(kg\\/ha)":99.0,"Organic NPS and Urea with FYM Urea(kg\\/ha)":144.0,"Organic NPS and Urea with FYM FYM(t\\/ha)":13.08,"Organic NPSB and UREA with FYM Urea(kg\\/ha)":144.0,"Organic NPSB and UREA with FYM FYM(t\\/ha)":13.08,"Organic NPSBZn and Urea with FYM NPSBZn(kg\\/ha)":112.0,"Organic NPSBZn and Urea with FYM Urea(kg\\/ha)":144.0,"Organic NPSBZn and Urea with FYM FYM(t\\/ha)":13.08,"Organic NPS and Urea with Compost NPS(kg\\/ha)":99.0,"Organic NPS and Urea with Compost Urea(kg\\/ha)":144.0,"Organic NPS and Urea with Compost Compost(t\\/ha)":10.63,"Organic NPSB and UREA with Compost Urea(kg\\/ha)":144.0,"Organic NPSB and UREA with Compost Compost(t\\/ha)":10.63,"Organic NPS and Urea with Vermicompost NPS(kg\\/ha)":99.0,"Organic NPS and Urea with Vermicompost Urea(kg\\/ha)":144.0,"Organic NPS and Urea with Vermicompost Vermicompost(t\\/ha)":8.5,"Organic NPSB and UREA with Vermicompost NPSB(kg\\/ha)":100.0,"Organic NPSB and UREA with Vermicompost Urea(kg\\/ha)":144.0,"Organic NPSB and UREA with Vermicompost Vermicompost(t\\/ha)":8.5,"Organic NPSBZn and Urea with Vermicompost NPSBZn(kg\\/ha)":111.82,"Organic NPSBZn and Urea with Vermicompost Urea(kg\\/ha)":143.7,"Organic NPSBZn and Urea with Vermicompost Vermicompost(t\\/ha)":8.5,"Organic NPS and Urea with Bio-slurry NPS(kg\\/ha)":99.46,"Organic NPS and Urea with Bio-slurry Urea(kg\\/ha)":143.7,"Organic NPS and Urea with Bio-slurry Bio-slurry(t\\/ha)":7.08,"Organic NPSB and UREA with Bio-slurry NPSB(kg\\/ha)":100.24,"Organic NPSB and UREA with Bio-slurry Urea(kg\\/ha)":143.6,"Organic NPSB and UREA with Bio-slurry Bio-slurry(t\\/ha)":7.08,"Organic NPSBZn and Urea with Bio-slurry NPSBZn(kg\\/ha)":111.82,"Organic NPSBZn and Urea with Bio-slurry Urea(kg\\/ha)":143.7,"Organic NPSBZn and Urea with Bio-slurry Bio-slurry(t\\/ha)":7.08}',
            "Complete Organic_dict":
              '{"Complete Organic FYM (t\\/ha)":26.15,"Complete Organic Compost (t\\/ha)":21.25,"Complete Organic Vermicompost(t\\/ha)":17.0,"Complete Organic Bio-slurry (t\\/ha)":14.17}',
          },
          {
            Name: "የሺአረግ",
            Sex: "Female",
            "Phone No": 921744060.0,
            Email: "",
            Kebele: "ሳሪያ",
            "CIAT Equivalent Kebele": "Sariya",
            R_NAME: "Amhara",
            Z_NAME: "North Shewa",
            W_NAME: "Basona Werana",
            KEBELE_NAM: "Sariya",
            average_elevation: 2815.67,
            n: 190,
            p: 33,
            "kg/ha": 413.04,
            "In Organic_dict":
              '{"Inorganic NPS with Urea NPS(kg\\/ha)":199,"Inorganic NPS with Urea(kg\\/ha)":331,"Inorganic NPS with Urea NPSB(kg\\/ha)":200,"Inorganic NPSB with Urea(kg\\/ha)":331,"Inorganic NPS with Urea NPSBZn(kg\\/ha)":224,"Inorganic NPSBZn with Urea(kg\\/ha)":331}',
            Organic_dict:
              '{"Organic NPS and Urea with FYM NPS(kg\\/ha)":99.0,"Organic NPS and Urea with FYM Urea(kg\\/ha)":165.0,"Organic NPS and Urea with FYM FYM(t\\/ha)":14.62,"Organic NPSB and UREA with FYM Urea(kg\\/ha)":165.0,"Organic NPSB and UREA with FYM FYM(t\\/ha)":14.62,"Organic NPSBZn and Urea with FYM NPSBZn(kg\\/ha)":112.0,"Organic NPSBZn and Urea with FYM Urea(kg\\/ha)":165.0,"Organic NPSBZn and Urea with FYM FYM(t\\/ha)":14.62,"Organic NPS and Urea with Compost NPS(kg\\/ha)":99.0,"Organic NPS and Urea with Compost Urea(kg\\/ha)":165.0,"Organic NPS and Urea with Compost Compost(t\\/ha)":11.88,"Organic NPSB and UREA with Compost Urea(kg\\/ha)":165.0,"Organic NPSB and UREA with Compost Compost(t\\/ha)":11.88,"Organic NPS and Urea with Vermicompost NPS(kg\\/ha)":99.0,"Organic NPS and Urea with Vermicompost Urea(kg\\/ha)":165.0,"Organic NPS and Urea with Vermicompost Vermicompost(t\\/ha)":9.5,"Organic NPSB and UREA with Vermicompost NPSB(kg\\/ha)":100.0,"Organic NPSB and UREA with Vermicompost Urea(kg\\/ha)":165.0,"Organic NPSB and UREA with Vermicompost Vermicompost(t\\/ha)":9.5,"Organic NPSBZn and Urea with Vermicompost NPSBZn(kg\\/ha)":111.82,"Organic NPSBZn and Urea with Vermicompost Urea(kg\\/ha)":165.44,"Organic NPSBZn and Urea with Vermicompost Vermicompost(t\\/ha)":9.5,"Organic NPS and Urea with Bio-slurry NPS(kg\\/ha)":99.46,"Organic NPS and Urea with Bio-slurry Urea(kg\\/ha)":165.44,"Organic NPS and Urea with Bio-slurry Bio-slurry(t\\/ha)":7.92,"Organic NPSB and UREA with Bio-slurry NPSB(kg\\/ha)":100.24,"Organic NPSB and UREA with Bio-slurry Urea(kg\\/ha)":165.33,"Organic NPSB and UREA with Bio-slurry Bio-slurry(t\\/ha)":7.92,"Organic NPSBZn and Urea with Bio-slurry NPSBZn(kg\\/ha)":111.82,"Organic NPSBZn and Urea with Bio-slurry Urea(kg\\/ha)":165.44,"Organic NPSBZn and Urea with Bio-slurry Bio-slurry(t\\/ha)":7.92}',
            "Complete Organic_dict":
              '{"Complete Organic FYM (t\\/ha)":29.23,"Complete Organic Compost (t\\/ha)":23.75,"Complete Organic Vermicompost(t\\/ha)":19.0,"Complete Organic Bio-slurry (t\\/ha)":15.83}',
          },
        ],
        file: "protected/datasets/Americ data check/file/Ciat_and_DA_integrated_dataset_2_2.csv",
        source: "file",
        file_size: 2310215,
        accessibility: "public",
        standardised_file:
          "protected/datasets/Americ data check/file/Ciat_and_DA_integrated_dataset_2_2.csv",
        standardisation_config: {},
        usage_policy: [],
      },
      {
        id: "16139153-0c85-4bfa-a982-cf2edca70374",
        content: [],
        file: "protected/datasets/Americ data check/file/Dissemination.png",
        source: "file",
        file_size: 702941,
        accessibility: "private",
        standardised_file:
          "protected/datasets/Americ data check/file/Dissemination.png",
        standardisation_config: {},
        usage_policy: [],
      },
    ],
  };
  //get all api reuqest for the provider to give or deny the request for access
  const getAllApiRequestList = () => {
    console.log(props, "props");
    let method = "POST";
    let url =
      UrlConstant.base_url + "datahub/new_dataset_v2/requested_datasets/";
    let payload = {
      user_map: getUserMapId(),
      type: "api",
      dataset_file: props.data[props.selectedFile].id,
    };
    HTTPService(method, url, payload, false, true, false)
      .then((response) => {
        setListOfAllRequestReceivedForSelectedFile([...response.data.recieved]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilterChange = (e, index) => {
    let key = allFilters[index];
    setFilterPayload({ ...filterPayload, [key]: e.target.checked });
    setFilterByOption(true);
    setReRun((prev) => prev + 1);
  };

  const handleChangeStatus = (status) => {
    console.log(status);
  };

  //filter function
  const filterData = () => {
    console.log(filterPayload, "filterPayload");
    if (filterByOption)
      setRows(
        data.filter((each) => {
          console.log(filterPayload[each.status], "filterPayload");
          return filterPayload[each.status];
        })
      );
    else setRows(data);
  };

  const getButtons = (status) => {
    if (status) {
      return (
        <span
          span
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <div style={{ width: "120px" }}>
            <Button
              onClick={() => handleChangeStatus(status)}
              disabled={status == "rejected" ? true : false}
              className={
                status == "rejected" ? local_style.rejected : local_style.reject
              }
            >
              {status == "rejected"
                ? "Rejected"
                : status == "approved"
                ? "Recall"
                : "Reject"}
            </Button>
          </div>
          {status !== "rejected" && (
            <div>
              <Button
                onClick={() => handleChangeStatus(status)}
                disabled={status == "rejected" ? true : false}
                className={
                  status == "approved"
                    ? local_style.approved
                    : local_style.approve
                }
              >
                {status == "approved" ? "Approved" : "Approve"}
              </Button>
            </div>
          )}
        </span>
      );
    }
  };

  useEffect(() => {
    //initial column setting once
    // setColumns(Object.keys(data[0]));
    // getAllApiRequestList();
    setListOfAllRequestReceivedForSelectedFile(props.data);
  }, [props.data]);
  //   heading = "List of requests";
  React.useEffect(() => {
    //setting the rows data as per filter
    // filterData();
  }, [reRun]);

  return (
    <>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
        className={local_style.main_table_div + " main_table_req_api"}
      >
        <div
          style={{
            fontSize: "20px",
            fontFamily: "Montserrat",
            lineHeight: "24px",
            fontWeight: "600",
          }}
        >
          {heading}
        </div>
        <div
          style={{
            border: "0.5px solid grey",
            padding: "3px 5px",
            borderRadius: "8px",
          }}
        >
          <Space
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setIsFilterSideDrawer(true)}
          >
            <FilterListIcon
              sx={{
                color: "grey !important",
              }}
              fontSize="small"
              color="grey"
            />
            Filter
          </Space>
        </div>
      </div> */}
      {/* <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((eachCol, indexCol) => {
                return (
                  <TableCell
                    key={eachCol}
                    data-testid={eachCol + indexCol}
                    align="left"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {eachCol.split("_").join(" ")}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                data-testid={"eachRow" + rowIndex}
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((eachCol, index) => {
                  return (
                    <TableCell
                      key={rowIndex + "-" + index}
                      data-testid={rowIndex + "-" + index}
                      component="th"
                      scope="row"
                      align="left"
                      style={{
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    >
                      {eachCol == "status"
                        ? getButtons(row[eachCol])
                        : row[eachCol]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <TableForApiRequest
        selectedFile={props.selectedFile}
        dataForSelectedFile={props.data}
        refetcher={props.refetcher}
        setRefetcher={props.setRefetcher}
        data={listOfAllRequestReceivedForSelectedFile}
        setApprovalStatus={setApprovalStatus}
        approvalStatus={approvalStatus}
      />
      {/* <div style={{ zIndex: "100 !important" }}>
        <Drawer
          className="ant_drawer_in_req_api"
          title="Filter by"
          placement={"right"}
          width={500}
          onClose={() => setIsFilterSideDrawer(false)}
          open={isFilterSideDrawer}
          closeIcon={false}
          extra={
            <Space>
              <Button
                type="primary"
                onClick={() => setIsFilterSideDrawer(false)}
              >
                <CloseIcon sx={{ color: "grey !important" }} />
              </Button>
            </Space>
          }
        >
          <div>
            {allFilters.map((eachFilter, index) => {
              return (
                <>
                  <div
                    style={{
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontWeight: 350,
                      fontSize: "16px",
                      lineHeight: "22px",
                    }}
                  >
                    <span>{eachFilter}</span>
                    <span>
                      <Checkbox
                        defaultChecked={filterPayload[eachFilter]}
                        onChange={(e) => handleFilterChange(e, index)}
                        sx={{ color: "grey !important" }}
                      />{" "}
                    </span>
                  </div>

                  <hr style={{ color: "#D9DFE7" }} />
                </>
              );
            })}
          </div>
        </Drawer>
      </div> */}
    </>
  );
};

export default TableWithFilteringForApi;
