import '+props from '../../Assets/Img/'+props.imgname+'.svg';
import React, { useState, useMemo } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function FilterRow(props) {
    return (
            <Row onClick={() => props.supportFilter()} className={props.firstcss}>
                <span className={props.secondcss}>
                    <img  src={'+props} 
                        alt="new"
                    />
                </span>
                <span className={props.thirdcss}>{props.label}</span>
            </Row>
    );
}
