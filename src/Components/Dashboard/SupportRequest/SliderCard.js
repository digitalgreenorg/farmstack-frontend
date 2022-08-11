import React from 'react'
import styles from "./slider.module.css"
import  "../../../Assets/CSS/common.css"

const SliderCard = ({supportRequestData}) => {



  return (
    <div className={styles.supportRequestDetailMain}>
        <div className={styles.supportRequestDetailTopThreeBlocks}>
            <div className={styles.supportRequestDetailTopThreeBlockEach}>
                <span className={styles.supportRequestDetailTopThreeBlockEachText}>Open Request</span>
                <span className={styles.supportRequestDetailTopThreeBlockEachValueText}>{supportRequestData.openRequest}</span>

                
            </div>
            <div className={styles.supportRequestDetailTopThreeBlockEach}>
                            <span className={styles.supportRequestDetailTopThreeBlockEachText}>Close Request</span>
                <span className={styles.supportRequestDetailTopThreeBlockEachValueText}>{supportRequestData.closeRequest}</span>
                </div>
                <div className={styles.supportRequestDetailTopThreeBlockEach}>
                            <span className={styles.supportRequestDetailTopThreeBlockEachText}>Hold Request</span>
                <span className={styles.supportRequestDetailTopThreeBlockEachValueText}>{supportRequestData.holdRequest}</span></div>
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
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockValue}>{supportRequestData.newRequestNameOfParticipant}</span></div>
                <div className={styles.supportRequestDetailBottomSixBlocksEach}>                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockTitleText}>Name of the Participant User</span>
                <span className={styles.supportRequestDetailBottomSixBlocksEachBlockValue}>{supportRequestData.newRequestNameOfTheParticipantUser}</span></div>
                <div> <button className={styles.viewDetailsButton}>View Details</button> </div>
            </div>
        </div>
    </div>
  )
}

export default SliderCard