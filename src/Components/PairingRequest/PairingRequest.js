import { Box } from "@mui/material";
import React from "react";
import styles from "./pairiing.module.css";
import donestatusicon from "../../Assets/Img/donestatusicon.svg";
const PairingRequest = (props) => {
//   props = {
//     connector_name: "Agnext - 1",
//     connector_type: "Provider",
//     org_name: "Agnext",
//     hash: "476a7175bfe907acd0b936e735700f67cd9bb48e226e32763a6727707f2516b6",
//     docker_img_url: "farmstack/kde-app:latest",
//     org_web: "www.agnext.in",
//     certificate_status: "Agnext Certificate.p12",
//     dataset_name: "Soil Data",
//     department_name: "Default",
//     port_number: "1044",
//     project_name: "Default",
//   };
  return (
    <div style={{}} className={styles.mainPairRequest}>
      <Box
        sx={{
          //   border: "1px solid #D8AF28",

          padding: "30px 109px 0px 110px",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "left",
        }}
        className={styles.PairingRequestMainBox}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            //   marginRight: "114px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>Consumer Connector Name</div>
            <div className={styles.propsValue}>{props.data['connector_details']?props.data['connector_details']['connector_name']:''}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>
              Certificate Status{" "}
              <img
                style={{ marginLeft: "11px" }}
                src={donestatusicon}
                alt="done"
              />
            </div>
            <div className={styles.propsValue}>{props.data['connector_details']?props.data['connector_details']['certificate']:''}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>
              Participant Organization Name
            </div>
            <div className={styles.propsValue}>{props.data['organization_details']?props.data['organization_details']['name']:''}</div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>Dataset Name</div>
            <div className={styles.propsValue}>{props.data['dataset_details']?props.data['dataset_details']['name']:''}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className={styles.labelHead}>Docker image url</div>
            <div className={styles.propsValue}>{props.data['connector_details']?props.data['connector_details']['docker_image_url']:''}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>
              Participant Organization Website
            </div>
            <div className={styles.propsValue}>{props.data['organization_details']?props.data['organization_details']['website']:''}</div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>Department Name</div>
            <div className={styles.propsValue}>{props.data['department_details']?props.data['department_details']['department_name']:''}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>Port Number</div>
            <div className={styles.propsValue}>{props.data['connector_details']?props.data['connector_details']['application_port']:''}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>Status</div>
            <div className={styles.propsValue}>{props.data['connector_pair_status']?props.data['connector_pair_status']:''}</div>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.labelHead}>Project Name</div>
            <div className={styles.propsValue}>{props.data['project_details']?props.data['project_details']['project_name']:''}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "256px",
            }}
          >
            <div className={styles.labelHead}>Hash (Usage Policy)</div>
            <div className={styles.propsValue}>{props.data['connector_details']?props.data['connector_details']['usage_policy']:''}</div>
          </div>
        </div>
      </Box>

      {props.data['connector_pair_status']=='awaiting for approval'?<div>
        <button className={styles.rejectbtn} onClick={()=>props.approveReject(props.data['id'],'rejected')}>Reject</button>
        <button className={styles.approvebutton} onClick={()=>props.approveReject(props.data['id'],'paired')}>Approve and Pair</button>
      </div>:<></>}
      {props.data['connector_pair_status']=='paired'?<div>
        <button className={styles.approvebutton} onClick={()=>props.approveReject(props.data['id'],'unpaired')}>Unpair</button>
      </div>:<></>}
    </div>
  );
};

export default PairingRequest;