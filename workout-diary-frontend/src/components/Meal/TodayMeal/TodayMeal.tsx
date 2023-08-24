import {Button, IconButton, List, ListItem, ListItemText} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from './TodayMeal.module.css'
import React from "react";
import {Meal} from "@component/types/mealTypes";
import {useAppSelector} from "@component/hooks/hooks";
import {getNutrientSum, getTotalNutrientSum} from "@component/utils/helpFunctions";
import {Undo} from "@mui/icons-material";

interface Props {
    onShowPopup: (e: boolean) => void
}

interface Nutrition {
    energy: string,
    fats: string,
    carbs: string,
    proteins: string,
}


export const TodayMeal = ({onShowPopup}: Props) => {


    const [meals, setMeals] = React.useState<Meal[]>([])
    const todayMeals = useAppSelector(state => state.meal.todayMeals)
    const [currentMeal, setCurrentMeal] = React.useState<Meal>();
    const [nutrition, setNutrition] = React.useState<Nutrition>(getTotalNutrientSum(todayMeals))

    const handleShowPopup = (e: boolean) => {
        onShowPopup(e)
    }

    const onMealClick = (meal: Meal) => {
        setCurrentMeal(meal)
    }

    const onBack = () => {
        setCurrentMeal(undefined)
    }

    React.useEffect(() => {
        if (currentMeal) {
            setNutrition(getNutrientSum(currentMeal))
        } else {
            setNutrition(getTotalNutrientSum(todayMeals))
        }
    }, [currentMeal])

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h5 className={styles.title}>TODAY&apos;S MEALS</h5>
                <Button className={styles.addButton} variant='outlined' onClick={() => handleShowPopup(true)}
                        endIcon={<AddIcon/>}>ADD MEAL</Button>
            </div>
            <div className={styles.content}>
                {currentMeal ?
                    <div>
                        <Button variant='text' onClick={onBack} startIcon={<Undo/>}>BACK</Button>
                        {currentMeal.foods.map(food => {
                                return (
                                    <List key={food.food.name}>
                                        <ListItem sx={{m:0,p:0}}>
                                            <ListItemText secondary={food.weight} sx={{m: 0}}>
                                                {food.food.name}
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                )
                            }
                        )}
                    </div>
                    : <List className={styles.meals}>
                        {todayMeals?.map(meal => {
                            return (
                                <ListItem key={meal.time} onClick={() => onMealClick(meal)} className={styles.meal}>
                                    {meal.time.split(' ')[1] + ' meal'}
                                </ListItem>
                            )
                        })}
                    </List>
                }
                <div className={styles.infoBlock}>
                    <div className={styles.nutrition}>
                        <p className={styles.nutritionTitle}>NUTRITIONAL VALUE</p>
                        <p className={styles.nutritionItem}>{`Proteins: ${nutrition.proteins}`}</p>
                        <p className={styles.nutritionItem}>{`Carbs: ${nutrition.carbs}`}</p>
                        <p className={styles.nutritionItem}>{`Fats: ${nutrition.fats}`}</p>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </section>
    )

}