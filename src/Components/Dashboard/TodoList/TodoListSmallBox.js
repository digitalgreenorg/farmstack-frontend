import React, { useState } from 'react'
import styles from "./todoListSmallBox.module.css"
import Dummy from "../../../Assets/Img/dummy.png";

const TodoListSmallBox = ({todoListdata}) => {
   
  return (
    <div className={styles.positionabsoluteandwidth310andheight130andleft70andtop167}>
        <img className={styles.todoListImg} src={todoListdata.imgUrl} alt={todoListdata.title} />
        {/* <img className={styles.todoListImg} src={Dummy} alt={todoListdata.title} /> */}
        <div className={styles.todoListTitle}>{todoListdata.title}</div>
    </div>
  )
}

export default TodoListSmallBox