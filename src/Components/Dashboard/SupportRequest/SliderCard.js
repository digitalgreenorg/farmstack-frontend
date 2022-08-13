import React from 'react'
import styles from "./slider.module.css"
import  "../../../Assets/CSS/common.css"
import { Tooltip } from '@mui/material'
import { Zoom } from '@material-ui/core'

const SliderCard = ({supportRequestData}) => {



  return (
    <div className={styles.supportRequestDetailMain}>
        <div className={styles.supportRequestDetailTopThreeBlocks}>
            <div className={styles.supportRequestDetailTopThreeBlockEach}>
                <span className={styles.supportRequestDetailTopThreeBlockEachText}>Open Request</span>
                <Tooltip TransitionComponent={Zoom}  title={supportRequestData.openRequest}>
                <span className={styles.supportRequestDetailTopThreeBlockEachValueText + " " + "text_overflow_ellipsis_overflow_hidden width150px"}>{supportRequestData.openRequest}</span>
                </Tooltip>

                
            </div>
            <div className={styles.supportRequestDetailTopThreeBlockEach}>
                            <span className={styles.supportRequestDetailTopThreeBlockEachText}>Close Request</span>
                <Tooltip TransitionComponent={Zoom}  title={supportRequestData.closeRequest}>

                <span className={styles.supportRequestDetailTopThreeBlockEachValueText + " " + "text_overflow_ellipsis_overflow_hidden width150px"}>{supportRequestData.closeRequest}</span>
                </Tooltip>

                </div>
                <div className={styles.supportRequestDetailTopThreeBlockEach}>
                            <span className={styles.supportRequestDetailTopThreeBlockEachText}>Hold Request</span>
                <Tooltip TransitionComponent={Zoom}  title={supportRequestData.holdRequest}>

                <span className={styles.supportRequestDetailTopThreeBlockEachValueText + " " + "text_overflow_ellipsis_overflow_hidden width150px"}>{supportRequestData.holdRequest}</span>
                </Tooltip>
                
                </div>
                
        </div>
        <div>
            <span className={styles.secondHeading}>New request:</span>
            <div className={styles.supportRequestDetailBottomSixBlocksMain}>
                <div className={styles.supportRequestDetailBottomSixBlocksEach}>
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockTitleText}>Request title</span>
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockValue}>{supportRequestData.newRequestTitle}</span>
                </div>
                <div className={styles.supportRequestDetailBottomSixBlocksEach}>
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockTitleText}>Category</span>
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockValue}>{supportRequestData.newRequestCategory}</span>
                </div>
                <div className={styles.supportRequestDetailBottomSixBlocksEach}><span className={styles.supportRequestDetailBottomSixBlocksEachBlockTitleText}>Date & Time</span>
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockValue}>{supportRequestData.newRequestDateAndTime}</span></div>
                <div className={styles.supportRequestDetailBottomSixBlocksEach}><span className={styles.supportRequestDetailBottomSixBlocksEachBlockTitleText}>Name of the Participant</span>
                <Tooltip TransitionComponent={Zoom}  title={supportRequestData.newRequestNameOfParticipant}>
                
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockValue + " " + "text_overflow_ellipsis_overflow_hidden width200px"}>{supportRequestData.newRequestNameOfParticipant}</span>
                </Tooltip>
                </div>
                <div className={styles.supportRequestDetailBottomSixBlocksEach}>                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockTitleText}>Name of the Participant User</span>
                <Tooltip TransitionComponent={Zoom}  title={supportRequestData.newRequestNameOfTheParticipantUser}>
               
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockValue + " " + "text_overflow_ellipsis_overflow_hidden width200px"}>{supportRequestData.newRequestNameOfTheParticipantUser}</span>
                </Tooltip>
                
                </div>
                <div> <button className={styles.viewDetailsButton}>View Details</button> </div>
            </div>
        </div>
    </div>
  )
}

export default SliderCard