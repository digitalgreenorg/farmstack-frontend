import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import labels from '../../Constants/labels';

export default function DataSetFilter() {
  const [screenlabels, setscreenlabels] = useState(labels['en']);

  const filterObject = props.filterObject
  return (
    <div>
        <Row className="supportfilterfirstrow">
            <Col className='supportfiltertext'>
            <span className="fontweight600andfontsize14pxandcolor3A3A3A" >{screenlabels.support.filter}</span>
            </Col>
            
            <Col className='supportfiltertext'>
            <span className="fontweight600andfontsize14pxandcolor3A3A3A" >{screenlabels.support.filter}</span>
            </Col>
        </Row>
        {filterObject.all ? <Row onClick={() => filterRow('all', false, 'all')} className="supportfiltersecondrow">
                                <span className="supportallicon">
                                    <img
                                        src={require('../../Assets/Img/filter.svg')}
                                        alt="new"
                                    />
                                </span>
                                <span className="fontweight600andfontsize14pxandcolorFFFFFF supportalltexticon">{screenlabels.support.all}</span>
                            </Row> :
                                <Row onClick={() => filterRow('all', true, 'all')} className="supportfiltersecondrowbold">
                                    <span className="supportallicon">
                                        <img
                                            src={require('../../Assets/Img/filter_bold.svg')}
                                            alt="new"
                                        />
                                    </span>
                                    <span className="fontweight600andfontsize14pxandcolor3D4A52 supportalltexticon">{screenlabels.support.all}</span>
          </Row>}
    </div>
  )
}
