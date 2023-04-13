import React from "react";
import OrganizationDetails from "../NewOnboarding/OrganizationDetails";


const OrganisationSettings = () => {
  return (
    <>
      <OrganizationDetails isOrgSetting={true} />
    </>
  );
};

export default OrganisationSettings;

// import { Typography } from "@mui/material";
// import React, { useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
// import "./AccountSettings.css";

// export default function OrganisationSettings(props) {
//   const [orgName, setOrgName] = useState("");
//   const [orgMailId, setOrgMailId] = useState("");
//   const [orgWebsite, setOrgWebsite] = useState("");
//   const [orgContactNumber, setOrgContactNumber] = useState("");
//   const [orgAddress, setOrgAddress] = useState("");
//   const [orgCountry, setOrgCountry] = useState("")
//   return (
//     <div className="widthandheight">
//       <Row>
//         <Typography style={{fontFamily: "Montserrat", fontStyle: "normal", fontWeight: "600", fontSize: "32px", lineHeight: "39px"}}>Organisations settings</Typography>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="name_org"
//             label="Organisation Name"
//             variant="outlined"
//             required
//             style={{width: "95%", margin: "20px"}}
//             />
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="mailid_org"
//             label="Organisation mail id"
//             variant="outlined"
//             required
//             style={{width: "95%", margin: "20px"}}
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="website_org"
//             label="Website Link"
//             variant="outlined"
//             required
//             style={{width: "95%", margin: "20px"}}
//           />
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="contactnum_org"
//             label="Organisation Contact Number"
//             variant="outlined"
//             required
//             style={{width: "95%", margin: "20px"}}
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={12} lg={12}>
//           <TextField
//             id="address_org"
//             label="Organisation Address"
//             variant="outlined"
//             required
//             style={{width: "98%", margin: "20px"}}
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="country_org"
//             label="Country"
//             variant="outlined"
//             required
//             style={{width: "95%", margin: "20px"}}
//           />
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="pincode_org"
//             label="PIN Code"
//             variant="outlined"
//             required
//             style={{width: "95%", margin: "20px"}}
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={12} lg={12}>
//             <TextField
//             id="description_org"
//             label="Organisation Description"
//             variant="outlined"
//             required
//             multiline
//             rows={4}
//             style={{width: "98%", margin: "20px"}}
//             />
//         </Col>
//       </Row>
//       <Row>
//         {/* file uploader component */}
//       </Row>
//       <Row>
//       <Col style={{textAlign: "right", margin: "20px"}}>
//           <Button id="cancelbutton_account" variant="outlined" style={{margin: "20px"}} className="button">
//             Cancel
//           </Button>
//           <Button id="submitbutton_account" variant="outlined" className="button">
//             Submit
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// }
