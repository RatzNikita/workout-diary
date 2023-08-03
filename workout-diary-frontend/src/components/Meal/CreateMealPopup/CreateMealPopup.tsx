import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";
import {Food, FoodGroup} from "@component/types/mealTypes";
import React from "react";
import PopupWithForm from "@component/components/PopupWithForm/PopupWithForm";
import styles from './CreateMealPopup.module.css'
import AddIcon from "@mui/icons-material/Add";
import {IconButton} from "@mui/material";
import Image from "next/image";


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
    const [selectedFoods, setSelectedFoods] = React.useState<Food[]>()

    const onSubmit = () => {
        console.log(selectedFoods)
    }
    const onSelectChange = (currentRowsSelected: any[], allRowsSelected: any[]) => {
        console.log(allRowsSelected)
        const foods: Food[] = allRowsSelected.map((row) => {
            return originalFoods[row.index]
        })
        setSelectedFoods(foods)
    }

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        pagination: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        selectToolbarPlacement: "none",
        selectableRowsHeader: false,
        selectableRowsOnClick: true,
        selectableRowsHideCheckboxes: true,
        onRowSelectionChange: onSelectChange,
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

    return (
        <PopupWithForm title={'Create meal'}
                       name={'createMeal'}
                       isOpen={isOpen}
                       onSubmit={onSubmit}
                       onClose={onClose}>
            <div className={styles.container}>
                <div className={styles.items}>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/garnish.jpg"
                               alt='Garnish image'
                               fill
                               />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/meat.png"
                               alt='Meat image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/vegetables.png"
                               alt='Vegetables image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/fruits.png"
                               alt='Fruits image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/coffee.png"
                               alt='Coffee image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/sportmeal.png"
                               alt='Sportmeal image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/sauce.png"
                               alt='Sauces image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/chocolate.png"
                               alt='Chocolate image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/milk.png"
                               alt='Milk image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/bakery.png"
                               alt='Bakery image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                    <IconButton className={styles.imageContainer}>
                        <Image className={styles.image} src="/alcohol.png"
                               alt='Alcohol image'
                               fill
                        />
                        <AddIcon className={styles.addIcon}/>
                    </IconButton>
                </div>
                <MUIDataTable
                    title={"Foods, 100g"}
                    data={originalFoods}
                    columns={columns}
                    options={options}
                />
                <ul>
                    {selectedFoods?.map(food => {
                        return (
                            <li key={food.name}>{food.name}</li>
                        )
                    })}
                </ul>
            </div>
        </PopupWithForm>
    )
}