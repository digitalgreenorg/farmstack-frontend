import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from "../dataset_integration.module.css"
import downloadIcon from "../../../../Assets/Img/download_btn_white.svg";
import { DataGrid } from '@mui/x-data-grid';
import NoDataAvailable from '../../../Dashboard/NoDataAvailable/NoDataAvailable';


function NoResultsOverlay() {
    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            No results in DataGrid
            {/* <pre>(rows=&#123;rowData&#125;)</pre> */}
            {/* But local filter returns no result */}
        </Stack>
    );
}
function NoRowsOverlay() {
    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            {/* No data available for preview */}
            <NoDataAvailable />
            {/* <pre>(rows=&#123;[]&#125;)</pre> */}
        </Stack>
    );
}
const Preview = (props) => {

    const { finalDatasetAfterIntegration, downloadDocument } = props
    const [col, setCol] = useState([])
    const [row, setRow] = useState([])
    useEffect(() => {
        // console.log(finalDatasetAfterIntegration)



        if (finalDatasetAfterIntegration.length > 0) {
            // console.log(arr)
            let val = []

            for (let key in finalDatasetAfterIntegration[0]) {
                let obj = { field: key, headerName: key, width: 300 }
                val.push(obj)
            }
            let rowArr = []
            for (let i = 0; i < finalDatasetAfterIntegration.length; i++) {
                let obj1 = { "id": i, ...finalDatasetAfterIntegration[i] }
                console.log(obj1)
                rowArr.push(obj1)
            }
            console.log(val, rowArr)
            setCol([...val])
            setRow([...rowArr])
        }
    }, [finalDatasetAfterIntegration])

    return (
        <Container className='dataset_selector_in_integration'>
            <Row>
                <Col className={styles.select_dataset_logo} lg={8} sm={12} sx={12}>
                    <span >Preview</span>
                </Col>
            </Row>
            { }
            <Row>
                <Col lg={12} sm={12}>
                    <div style={{ height: 700, width: '100%' }}>
                        <DataGrid
                            rows={row}
                            columns={col}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            // disableColumnFilter
                            // disableColumnMenu
                            // disableColumnSelector
                            // disableSelectionOnClick
                            // disableDensitySelector
                            components={{ NoRowsOverlay, NoResultsOverlay }}


                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} sm={12} className={styles.generate_btn_parent_col}>
                    <Button id='download_button' disabled={Object.keys(finalDatasetAfterIntegration).length > 0 ? false : true} className={Object.keys(finalDatasetAfterIntegration).length > 0 ? styles.generate_data_btn : styles.generate_data_btn_dis} onClick={() => downloadDocument()}>
                        <img src={downloadIcon} alt="Download" className={styles.download_btn} /> <span>Download CSV file</span>
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Preview