import React, { useState } from 'react'
import styles from "./dataExchange.module.css"
// import styles from "./connectorStatistics.module.css"
import  "../../../Assets/CSS/common.css"
import LineChartGraph from './LineChartGraph'
import SelectComponent from './SelectComponent'
import labels from '../../../Constants/labels'


const DataExchangeTrends = () => {
  const [filterPeriod, setFilterPeriod] = useState(0)
  return (
    <div style={{padding:"20px"}} className="widht640andheight368pxandborderradius10andborder1pxsolidE4E4E4">
      <div style={{display:"flex"}}>

    <div style={{flex:"3"}} className={styles.dataExchangeHeading}>{labels.en.dashboard.data_exchange_trends}</div>
   <div style={{flex:"1", width:"640px"}}>
    
     <SelectComponent filterPeriod={filterPeriod} setFilterPeriod={setFilterPeriod}/>
    </div>
      </div>
    <div>
      <LineChartGraph filterPeriod={filterPeriod}/>
    </div>
    </div>
  )
}

export default DataExchangeTrends