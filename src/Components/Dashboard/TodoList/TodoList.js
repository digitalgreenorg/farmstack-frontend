import React, { useEffect, useState } from 'react'
import labels from '../../../Constants/labels'
import TodoListSmallBox from './TodoListSmallBox'
import styles from "./todoList.module.css"
import TodoListBigBox from './TodoListBigBox'
import Dummy from "../../../Assets/Img/dummy.png";
import addTeamMembers from "../../../Assets/Img/add_team_members.svg";
import inviteMembers from "../../../Assets/Img/Invite_members_icon.svg";
import organizationDetails from "../../../Assets/Img/organization_details.svg";
import totalAmountOfDataExchange from "../../../Assets/Img/Total amount of data exchange icon.svg";
import totalNoOfActiveConnectors from "../../../Assets/Img/Total no.of active connectors icon.svg";
import totalNoOfDatasets from "../../../Assets/Img/Total no.of datasets icon.svg";
import totalNoOfParticipants from "../../../Assets/Img/Total no.of participants icon.svg";
import updateBrandingDetails from "../../../Assets/Img/Update branding details icon.svg";


const TodoList = ({allDashboardDetails}) => {
  const [todoListSmallBoxData, setTodoListSmallBoxData] = useState([{imgUrl:organizationDetails, title:labels.en.dashboard.organisation_details},{imgUrl:addTeamMembers, title:labels.en.dashboard.add_team_members},{imgUrl:inviteMembers, title:labels.en.dashboard.invite_members},{imgUrl:updateBrandingDetails, title:labels.en.dashboard.update_branding_details}])
  
  const [totalListDetails, setTotalListDetails] = useState([{imgUrl:totalNoOfParticipants, title:labels.en.dashboard.total_no_of_participants,value:15},{imgUrl:totalNoOfDatasets, title:labels.en.dashboard.total_no_of_datasets,value:5012},{imgUrl:totalNoOfActiveConnectors, title:labels.en.dashboard.total_no_of_active_connectors,value:193},{imgUrl:totalAmountOfDataExchange, title:labels.en.dashboard.total_amount_of_data_exchange,value:50,valueUnit:"Gbs"}])
  const {to_do_list} = labels.en.dashboard;
  useEffect(()=>{
    if(allDashboardDetails!==null){
       const {totalNoOfParticipants, totalNoOfDatasets, totalNoOfActiveConnectors, totalAmountOfDataExchange} = allDashboardDetails;
       setTotalListDetails([totalNoOfParticipants, totalNoOfDatasets, totalNoOfActiveConnectors, totalAmountOfDataExchange]);

    }else{
      console.log("problem in fetching Dashboard data from backend")
    }
  },[])
  return (
    <div>
    <div className={styles.todoListMain}>
     <span className={styles.todoListTextBox}>
     {to_do_list}
      </span> 
      <div className={styles.todoListSmallBoxContainer}>

     { todoListSmallBoxData.map((todoListdata)=> (
       <TodoListSmallBox todoListdata={todoListdata} />
       )
       )}

       </div>

    </div >
    <div className={styles.totalListContainerMain}>

       {totalListDetails.map((totalDetail)=>(
         <TodoListBigBox totalDetail={totalDetail}/>
         ))}
         </div>

    </div>

  )
}

export default TodoList