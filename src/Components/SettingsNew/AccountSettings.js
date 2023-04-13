import React from "react";
import ProfileDetails from "../NewOnboarding/ProfileDetails";

const AccountSetting = () => {
  return (
    <>
      <ProfileDetails isAccountSetting={true} />
    </>
  );
};

export default AccountSetting;

// export default function AccountSetting(props) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
//   const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
//   const [emailErrorMessage, setEmailErrorMessage] = useState("");
//   const [contacNumberErrorMessage, setContactNumberErrorMessage] = useState("");

//   const handleFirstName = (e) => {
//     console.log(e.target.value);
//     setFirstName(e.target.value);
//   };
//   const handleLastName = (e) => {
//     console.log(e.target.value);
//     setLastName(e.target.value);
//   };
//   const handleEmail = (e) => {
//     console.log(e.target.value);
//     setContactNumber(e.target.value);
//   };
//   const handleContactNumber = (e) => {
//     console.log(e.target.value);
//     setContactNumber(e.target.value);
//   };
//   return (
//     <div>
//       <Row>
//         <Typography
//           style={{
//             fontFamily: "Montserrat",
//             fontStyle: "normal",
//             fontWeight: "600",
//             fontSize: "32px",
//             lineHeight: "39px",
//           }}
//         >
//           Account settings
//         </Typography>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="firstName_account"
//             label="First Name"
//             variant="outlined"
//             required
//             value={firstName}
//             onChange={handleFirstName}
//             style={{ width: "95%", margin: "20px" }}
//           />
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="lastName_account"
//             label="Last Name"
//             variant="outlined"
//             value={lastName}
//             onChange={handleLastName}
//             style={{ width: "95%", margin: "20px" }}
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="mailid_account"
//             label="Enter mail id"
//             variant="outlined"
//             required
//             value={email}
//             onChange={handleEmail}
//             style={{ width: "95%", margin: "20px" }}
//           />
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <TextField
//             id="contactnumber_account"
//             label="Contact Number"
//             variant="outlined"
//             required
//             value={contactNumber}
//             onChange={handleContactNumber}
//             style={{ width: "95%", margin: "20px" }}
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col style={{ textAlign: "right", margin: "20px" }}>
//           <Button
//             id="cancelbutton_account"
//             variant="outlined"
//             style={{ margin: "20px" }}
//             className="button"
//           >
//             Cancel
//           </Button>
//           <Button
//             id="submitbutton_account"
//             variant="outlined"
//             className="button"
//           >
//             Submit
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// }
