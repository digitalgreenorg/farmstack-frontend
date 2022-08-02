import React from 'react'
import styles from './todoListBigBox.module.css';
import Dummy from "../../../Assets/Img/dummy.png";
import labels from '../../../Constants/labels'

const TodoListBigBox = ({totalDetail}) => {
  return (
    <div className={styles.todoListEachBigBox}>

    <div className={styles.todoListBigBoxUpperPortion}>
        <span className={styles.totalDetailsTitle}>{totalDetail.title}</span>
        <img className={styles.todoListBigBoxUpperPortionImg} src={totalDetail.imgUrl}/>
        {/* <img className={styles.todoListBigBoxUpperPortionImg} src={Dummy}/> */}
        {/* <img className={styles.todoListBigBoxUpperPortionImg} src= "."/> */}
    </div>
    <div className="nodataavailable">SomeClass</div>
    <span className={styles.todoListBigBoxLowerValues}> <span> {totalDetail.value}</span> <sub style={{fontSize:"18px"}}>{totalDetail.valueUnit? totalDetail.valueUnit: null}</sub>  </span>
    </div>
  )
}

export default TodoListBigBox