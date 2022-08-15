import React, { useState } from 'react'
import styles from "./connectorStatistics.module.css"
import  "../../../Assets/CSS/common.css"
import { Tooltip } from '@mui/material'
import { Zoom } from '@material-ui/core'

const ConnectorStatistics = () => {
  const [connectorData, setConnectorData] = useState([
    {"connectorName" : "Guntur Connector", "datasets" : "5", "activity" : "Recently active", "date" : "11-02-2021" },
    {"connectorName" : "Bangalore Connector", "datasets" : "8", "activity" : "Recently active", "date" : "19-02-2021" },
    {"connectorName" : "Udaipur Connector", "datasets" : "19", "activity" : "Recently active", "date" : "20-02-2022" },
    {"connectorName" : "Bhilwara Connector", "datasets" : "11", "activity" : "Recently active", "date" : "02-03-2022" },
    {"connectorName" : "Pune Connector", "datasets" : "1", "activity" : "Recently active", "date" : "30-05-2022" },
    {"connectorName" : "Galyawari Connector", "datasets" : "21", "activity" : "Recently active", "date" : "01-05-2022" },
  ])
  console.log(connectorData)
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

          {connectorData.map((eachConnector)=>(<tr className={styles.tableConnectortrtd}>
            <Tooltip placement='bottom-start' TransitionComponent={Zoom} title={eachConnector.connectorName}>
               <td className='text-truncate width300px'>{eachConnector.connectorName}</td>
            </Tooltip>
            <Tooltip placement='bottom-start' TransitionComponent={Zoom} title={eachConnector.datasets}> 
            <td className='text-truncate width300px'>{eachConnector.datasets}</td>
            </Tooltip>
            <Tooltip placement='bottom-start' TransitionComponent={Zoom} title={eachConnector.activity}>
              <td className='text-truncate width300px'>{eachConnector.activity}</td>
              </Tooltip>
            <Tooltip placement='bottom-start'  TransitionComponent={Zoom} title={eachConnector.date}> 
            <td className='text-truncate width300px'>{eachConnector.date}</td>
            </Tooltip>
           
           
            
           
          </tr> 

)

)}
</tbody>
          
        </table>
      
    </div>
  )
}

export default ConnectorStatistics