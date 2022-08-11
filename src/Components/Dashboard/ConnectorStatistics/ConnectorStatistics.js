import React, { useState } from 'react'
import styles from "./connectorStatistics.module.css"
import  "../../../Assets/CSS/common.css"

const ConnectorStatistics = () => {
  const [connectorData, setConnectorData] = useState([
    {"connectorName" : "Guntur Connector", "datasets" : "5", "activity" : "Recently active", "date" : "22-02-2022" },
    {"connectorName" : "Guntur Connector", "datasets" : "5", "activity" : "Recently active", "date" : "22-02-2022" },
    {"connectorName" : "Guntur Connector", "datasets" : "5", "activity" : "Recently active", "date" : "22-02-2022" },
    {"connectorName" : "Guntur Connector", "datasets" : "5", "activity" : "Recently active", "date" : "22-02-2022" },
    {"connectorName" : "Guntur Connector", "datasets" : "5", "activity" : "Recently active", "date" : "22-02-2022" },
    {"connectorName" : "Guntur Connector", "datasets" : "5", "activity" : "Recently active", "date" : "22-02-2022" },
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
            <td>{eachConnector.connectorName}</td>
            <td>{eachConnector.datasets}</td>
            <td>{eachConnector.activity}</td>
            <td>{eachConnector.date}</td>
          </tr> 

)

)}
</tbody>
          
        </table>
      
    </div>
  )
}

export default ConnectorStatistics