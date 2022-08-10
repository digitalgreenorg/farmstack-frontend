import React from "react";
import styles from "./todoListBigBox.module.css";
import Dummy from "../../../Assets/Img/dummy.png";
import labels from "../../../Constants/labels";

const TodoListBigBox = ({ totalDetail }) => {
  return (
    <div className={styles.todoListEachBigBox}>
      <div className={styles.todoListBigBoxUpperPortion}>
        <span className={styles.totalDetailsTitle}>{totalDetail.title}</span>
        <img
          className={styles.todoListBigBoxUpperPortionImg}
          src={totalDetail.imgUrl}
        />
        {/* <img className={styles.todoListBigBoxUpperPortionImg} src={Dummy}/> */}
        {/* <img className={styles.todoListBigBoxUpperPortionImg} src= "."/> */}
      </div>
      {/* <div className="nodataavailable">SomeClass</div> */}
      <span className={styles.todoListBigBoxLowerValues}>
        {" "}
        <span style={{ height: "54px" }}> {totalDetail.value}</span>{" "}
        <span
          style={{
            fontSize: "18px",
            // border: "1px solid blue",
            height: "25px",
          }}
        >
          {totalDetail.valueUnit ? totalDetail.valueUnit : null}
        </span>{" "}
      </span>
    </div>
  );
};

export default TodoListBigBox;
