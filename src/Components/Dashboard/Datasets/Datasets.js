import React, { useState,PureComponent } from 'react'
import { useEffect } from 'react';
import styles from "./datasets.module.css"
import Example1 from './Example';
import PieChartMain from './PieChart';
import Example from './PieChart';
import PieChartsSideMenu from './PieChartsSideMenu';
import labels from '../../../Constants/labels'


const Datasets = (props) => {
  // const [radialChartDatas, setRadialChartDatas] = useState([]);
  useEffect(()=>{
    // if(allDashboardDetails){
     
      
    //   // for( var key in allDashboardDetails.categories){
    //   //   console.log(key)
    //   // }
    //   console.log()
    //   setRadialChartDatas([...allDashboardDetails])
    // }
  },[])
 
  return (
    <div className={styles.datasetsMainBox}>
      <div className={styles.datasetsHeading}>{labels.en.dashboard.datasets_title}</div>
     
      <PieChartMain colors={props.colors} dataForThePieChart={props.dataForThePieChart}/>
      {/* <Example /> */}
      {/* <Example1/> */}


       
    </div>
  )
}

export default Datasets