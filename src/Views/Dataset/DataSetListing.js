import React, { useState } from 'react'
import DataSetCard from '../../Components/Datasets/DataSetCard'
import { Col, Row } from 'react-bootstrap'
import Button from "@mui/material/Button";
import UrlConstant from '../../Constants/UrlConstants';
import HTTPService from '../../Services/HTTPService';
import { useHistory } from 'react-router-dom';
import GetErrorHandlingRoute from '../../Utils/Common';


export default function DataSetListing(props) {

    const history = useHistory();
    const [isLoader, setIsLoader] = useState(false)

    const viewCardDetails = (id) => {
        setIsLoader(true);
        HTTPService(
        "GET",
        UrlConstant.base_url + UrlConstant.dataset+id+"/",
        "",
        false,
        true
        )
        .then((response) => {
            setIsLoader(false);
            console.log("filter response:", response);

        })
        .catch((e) => {
            setIsLoader(false);
            history.push(GetErrorHandlingRoute(e));
        });
    }

  return (
    <div>
        <Row style={{"margin-left":"-44px","width":"150%"}}>
            {
                props.datasetList && props.datasetList.map((dataset) => (
                    <DataSetCard
                        isMemberTab={props.isMemberTab}
                        orgName={dataset.organization.name}
                        ageOfData={dataset.age_of_date}
                        cropDetail={dataset.crop_detail}
                        geography={dataset.geography}
                        orgLogo={dataset.geography.logo}
                        id={dataset.id}
                        viewCardDetails={viewCardDetails}
                        margingtop={'supportcard supportcardmargintop20px'}
                    />
                ))
            }
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <DataSetCard
                margingtop={'supportcard supportcardmargintop20px'}
            />
            <Row style={{"margin-left":"40px","margin-top":"20px"}}>
                <Col xs={12} sm={12} md={6} lg={3}></Col>
                {props.isShowLoadMoreButton ? (
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <Button
                            onClick={() => props.getDatasetList()}
                            variant="outlined"
                            className="cancelbtn">
                            Load More
                        </Button>
                    </Col>
                ) : (
                    <></>
                )}
            </Row>
            
        </Row>
    </div>
  )
}
