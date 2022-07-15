import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import React from 'react'
import { Col, Row } from "react-bootstrap";

import LinearProgress from '@mui/material/LinearProgress'

const DisabledBackground = styled(Box)({
    width: '500%',
    height: '500%',
    position: 'fixed',
    background: '#777',
    opacity: 0.8,
    zIndex: 100,
    margin: '-100%'
  })

const Loader = (props) => (
    <>
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 200,
          textAlign: 'center'
        }}
      >
        <LinearProgress color="primary" /> <br />
        <span className="mainheading" style={{'color' : 'white'}}>
          Please wait while the request is being processed
        </span>
      </div>
      <DisabledBackground />
    </>
  )

  export default Loader;