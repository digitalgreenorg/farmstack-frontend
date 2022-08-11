import React, { useState } from 'react'
import ConnectorStatistics from '../../Components/Dashboard/ConnectorStatistics/ConnectorStatistics'
import DataExchangeTrends from '../../Components/Dashboard/DataExchangeTrends/DataExchangeTrends'
import Datasets from '../../Components/Dashboard/Datasets/Datasets'
import DatasetsCategory from '../../Components/Dashboard/DatasetsCategory/DatasetsCategory'
import SupportRequest from '../../Components/Dashboard/SupportRequest/SupportRequest'
import TodoList from '../../Components/Dashboard/TodoList/TodoList'
import Navbar from '../../Components/Navbar/Navbar'
import styles from "./dashboard.module.css"
const Dashboard = () => {
  const [allDashboardDetails, setAllDashboardDetails] = useState(null);

  
  return (
    <>
    <TodoList allDashboardDetails={allDashboardDetails}  />
    <div className={styles.fourChartParent}>
    <Datasets allDashboardDetails={allDashboardDetails}/>
    <DatasetsCategory allDashboardDetails={allDashboardDetails}/>
    <DataExchangeTrends allDashboardDetails={allDashboardDetails}/>
    <SupportRequest allDashboardDetails={allDashboardDetails}/>
    </div>
    <ConnectorStatistics allDashboardDetails={allDashboardDetails} />  
    </>
  )
}

export default Dashboard