import React, { useEffect, useState } from 'react'
import styles from "./connectorStatistics.module.css"
import  "../../../Assets/CSS/common.css"
import { Tooltip } from '@mui/material'
import { Zoom } from '@material-ui/core'
import { dateTimeFormat } from '../../../Utils/Common'

const ConnectorStatistics = ({additionalConnectorData}) => {
  const [connectorData, setConnectorData] = useState([])
  useEffect(()=>{
    console.log(additionalConnectorData)
    if(additionalConnectorData){

      setConnectorData([...additionalConnectorData.results])
    }else{
      return
    }
  },[additionalConnectorData])
  return (
    <div className={styles.connectorStatisticsMainBox}>

      <div className={styles.connectorStatisticsHeading}>ConnectorStatistics</div>
      
        <table className={styles.tableConnector}>
          <thead className={styles.thead}>

          <tr className={styles.tableConnectortrth}>
            <th>Connector Name</th>
            <th>Datasets</th>
            <th>Activity</th>
            <th>Date</th>
          </tr>
          </thead>
            <tbody>

          { additionalConnectorData ? connectorData.map((eachConnector)=>(<tr className={styles.tableConnectortrtd}>
            {/* <Tooltip placement='bottom-start' TransitionComponent={Zoom} title={eachConnector.connector_name}> */}
               <td >{eachConnector.connector_name}</td>
            {/* </Tooltip> */}
            {/* <Tooltip placement='bottom-start' TransitionComponent={Zoom} title={eachConnector.dataset_count}>  */}
            <td>{eachConnector.dataset_count}</td>
            {/* </Tooltip> */}
            {/* <Tooltip placement='bottom-start' TransitionComponent={Zoom} title={eachConnector.activity}> */}
              <td >{eachConnector.activity}</td>
              {/* </Tooltip> */}
            {/* <Tooltip placement='bottom-start'  TransitionComponent={Zoom} title={eachConnector.updated_at}>  */}
            <td >{dateTimeFormat(eachConnector.updated_at, false)}</td>
            {/* </Tooltip> */}
           
           
            
           
          </tr> 

)

)  : ""}
</tbody>
          
        </table>
      
    </div>
  )
}

export default ConnectorStatistics