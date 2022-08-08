import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from "@mui/material/Button";
import ConnectorCard from '../../Components/Connectors/ConnectorCard';
import NoConnectorCard from '../../Components/Connectors/NoConnectorCard';
import ConfigureConnectorCard from '../../Components/Connectors/ConfigureConnectorCard';

export default function ConnectorListing(props) {
  return (
    <div>

      <Row style={{"margin-left":"-20px","margin-top":"-20px"}}>
        <ConfigureConnectorCard/>
        <ConnectorCard
          margingtop={'supportcard supportcardmargintop20px'}
          getImageName={props.getImageName}
        />
        <ConnectorCard
          margingtop={'supportcard supportcardmargintop20px'}
          getImageName={props.getImageName}
        />
        <NoConnectorCard/>
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
