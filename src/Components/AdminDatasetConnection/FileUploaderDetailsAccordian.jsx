import React from "react"
import { Avatar, Accordion, AccordionDetails, AccordionSummary, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography, Badge, LinearProgress } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Row, Col } from "react-bootstrap";

export default function FileUploaderDetailsAccordian({ data, title, deleteFunc, source, datasetname, loader, key, setKey, uploadFile, localUploaded }) {

    return ( <>
            <Col>
            {/* {(uploadFile.length != 0) && localUploaded? */}
           { uploadFile ?
            (<Accordion>
              <Row style={{ maxHeight: "200px", overflowY: "scroll", }}>
                {/* {uploadFile ? */}
                  <ol className="uploaddatasetname">
                    {uploadFile.map((item) => {
                      return (<> 
                      <Row key={key}>
                      <Col>
                        <li className="uploadList">
                          {item.name}
                        </li>
                        </Col>
                        <Col style={{marginLeft: "50px"}}>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteOutlinedIcon
                            onClick={() => (deleteFunc(datasetname, source, item.name))}
                            color='warning' />
                        </IconButton>
                        </Col>
                        </Row>
                        <LinearProgress variant="determine" value={item?.progress ? item?.progress : 0} key={key} color="success" />
                        <p>{item?.progress ? item?.progress : 0}%</p>
                      </>
                      )
                    })}
                  </ol>
              </Row>
              </Accordion> )
              : ("")}
                 
            </Col>
</>
    )
}