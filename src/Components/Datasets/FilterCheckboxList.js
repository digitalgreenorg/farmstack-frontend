import React from 'react'
import { Row } from 'react-bootstrap'

export default function FilterCheckboxList(props) {

    const checkList = ["Wheat","Maize","Rice","Sugarcane"]
  return (
    <>
    <Row>
        {checkList &&
            checkList.map((item,index) => (
                <div key={index}>
                    <input value={item} type="checkbox"/>
                    <span>item</span>
                </div>             
            ))
        
        }
    </Row>
    </>
  )
}
