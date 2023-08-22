import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from './TodayMeal.module.css'
import React from "react";
import {Meal} from "@component/types/mealTypes";
import {useAppSelector} from "@component/hooks/hooks";

interface Props {
    onShowPopup: (e: boolean) => void
}


export const TodayMeal = ({onShowPopup}: Props) => {

    const [meals, setMeals] = React.useState<Meal[]>([])
    const todayMeals = useAppSelector(state => state.meal.todayMeals)

    const handleShowPopup = (e: boolean) => {
        onShowPopup(e)
    }

    return (
        <div className={styles.container}>
            <h5 className={styles.title}>Today&apos;s meals </h5>
            <List>
                {todayMeals?.map(meal => {
                    return (
                        <ListItem key={meal.time}>
                            {meal.foods.map((food) => {
                                return (
                                    <ListItemText key={food.food.name}
                                                  primary={food.weight}>{food.food.name}</ListItemText>
                                )
                            })}
                        </ListItem>
                    )
                })}
            </List>
            <div>
                <IconButton className={styles.addButton}
                            onClick={() => handleShowPopup(true)}
                ><AddIcon></AddIcon></IconButton>


            </div>
        </div>
    )

}