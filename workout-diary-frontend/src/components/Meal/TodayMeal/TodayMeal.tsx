import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from './TodayMeal.module.css'
import React from "react";
import {Meal} from "@component/types/mealTypes";

interface Props {
    onShowPopup: (e: boolean) => void
}


export  const TodayMeal = ({onShowPopup} : Props) => {

    const [meals,setMeals] = React.useState<Meal[]>([])

    const handleShowPopup = (e: boolean) => {
        onShowPopup(e)
    }

    return (
        <div className={styles.container}>
            <h5 className={styles.title}>Today&apos;s meals </h5>
            <div>
                <IconButton className={styles.addButton}
                            onClick={() => handleShowPopup(true)}
                ><AddIcon></AddIcon></IconButton>


            </div>
        </div>
    )

}