import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {Food, FoodGroup, FoodServing} from "@component/types/mealTypes";
import React from "react";
import PopupWithForm from "@component/components/PopupWithForm/PopupWithForm";
import styles from './CreateMealPopup.module.css'
import {Button, IconButton, Input, List, ListItem, ListItemText} from "@mui/material";
import MealGroupImage from "@component/styles/MealGroupImage";
import {ArrowLeft} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "@component/hooks/hooks";
import {addMeal, addServing, setCurrentMeal} from "@component/store/reducers/meal/mealSlice";

interface Props {
    isOpen: boolean,
    onClose: () => void,
}

export const CreateMealPopup = ({onClose, isOpen}: Props) => {

    const originalFoods: Food[] = [
        {
            name: 'Boiled chicken breast ',
            group: FoodGroup.meat,
            carbs: 0.5,
            fats: 1.8,
            proteins: 29.8,
            energy: 137,
        },
        {
            name: 'Boiled buckwheat ',
            group: FoodGroup.garnish,
            carbs: 21,
            fats: 1,
            proteins: 4,
            energy: 110,

        },
        {
            name: 'Cottage cheese 5%',
            group: FoodGroup.milk,
            carbs: 3,
            fats: 5,
            proteins: 21,
            energy: 110,
        },
    ]
    const [foods, setFoods] = React.useState(originalFoods);
    const [groupSelected, setGroupSelected] = React.useState(false);
    const [chosenFood, setChosenFood] = React.useState<Food[]>([]);
    const [nutrition, setNutrition] = React.useState({
        proteins: 0,
        fats: 0,
        carbs: 0,
        energy: 0,
    })

    const dispatch  = useAppDispatch();

    const onSubmit = () => {
        const values = getValues()
        const foods: FoodServing[] = []
        for (const food in values) {
            const newFood = originalFoods.find(orig => orig.name === food)
            if (newFood !== undefined) {
                foods.push({
                    food: newFood,
                    weight: values[food]
                })
            }
        }
        dispatch(addMeal(foods))
    }

    const onRowClick = (data, meta) => {
        if (!chosenFood.find(food => food.name === data[0])) {
            setChosenFood(prevState => [...prevState, originalFoods.find(food => food.name === data[0])])
        }
    }

    const {register, handleSubmit, watch, formState, getValues} = useForm();

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        pagination: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        selectToolbarPlacement: "none",
        selectableRowsHeader: false,
        selectableRowsOnClick: false,
        selectableRowsHideCheckboxes: true,
        onRowClick: onRowClick,
    };
    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "energy",
            label: "Energy",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
        {
            name: "fats",
            label: "Fats",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
        {
            name: "carbs",
            label: "Carbs",
            options: {
                filter: false,
                sort: true,
                searchable: false,
            }
        },
        {
            name: "proteins",
            label: "Proteins",
            options: {
                filter: false,
                sort: true,
                searchable: false,
            }
        },
    ];

    const choseGroup = (group?: FoodGroup) => {
        if (!groupSelected && group) {
            setFoods(prevState => prevState.filter(food => food.group === group));
            setGroupSelected(true)
        } else {
            setGroupSelected(false)
            setFoods(originalFoods)
        }
    }

    return (
        <PopupWithForm title={'Create meal'}
                       name={'createMeal'}
                       isOpen={isOpen}
                       onSubmit={onSubmit}
                       onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.foodSelector}>
                    {groupSelected
                        ? <div>
                            <Button startIcon={<ArrowLeft/>} onClick={() => choseGroup()}>Back</Button>
                            <MUIDataTable
                                title={"Foods, 100g"}
                                data={foods}
                                columns={columns}
                                options={options}
                            />
                        </div>
                        :
                        <div className={styles.items}>
                            {Object.values(FoodGroup).map(group => {
                                return (
                                    <IconButton key={group} className={styles.imageContainer}
                                                onClick={() => choseGroup(group)}>
                                        <MealGroupImage name={group}/>
                                    </IconButton>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className={styles.nutrition}>
                    <h5 className={styles.chosenFoodsTitle}>Chosen foods, g</h5>
                    <List>
                        {chosenFood?.map((food) => {
                            return (
                                <ListItem className={styles.listItem} key={food.name}>
                                    <ListItemText className={styles.listItemName}>{food.name}</ListItemText>
                                    <Input inputMode="numeric" className={styles.input} {...register(food.name)}
                                           defaultValue={0}></Input>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>

            </div>
        </PopupWithForm>
    )
}