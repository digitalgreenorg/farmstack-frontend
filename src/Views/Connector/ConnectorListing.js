import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from "@mui/material/Button";
import ConnectorCard from '../../Components/Connectors/ConnectorCard';

export default function ConnectorListing(props) {
  return (
    <div>

      <Row style={{"margin-left":"-20px","margin-top":"-20px"}}>
        <ConnectorCard
          margingtop={'supportcard supportcardmargintop20px'}
        />
        <ConnectorCard
          margingtop={'supportcard supportcardmargintop20px'}
        />
                <Col xs={12} sm={12} md={6} lg={3}></Col>
                {props.showLoadMore ? (
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <Button
                            // onClick={() => props.getConnectorList(true)}
                            variant="outlined"
                            className="cancelbtn">
                            Load More
                        </Button>
                    </Col>
                ) : (
                    <></>
                )}
            </Row>
    </div>
  )
}
