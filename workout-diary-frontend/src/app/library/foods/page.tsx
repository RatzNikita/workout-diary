'use client'
import {SubmitHandler, useForm} from "react-hook-form";
import {
    Button,
    createTheme,
    IconButton,
    Input,
    List,
    ListItem,
    MenuItem,
    Select,
    ThemeProvider,
    Typography
} from "@mui/material";
import {Food, FoodGroup} from "@component/types/mealTypes";
import {Done} from "@mui/icons-material";
import React from "react";
import {computeEnergyValue} from "@component/utils/helpFunctions";
import styles from './styles.module.css'
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import MUIDataTable, {MUIDataTableMeta, MUIDataTableOptions} from "mui-datatables";
import {createFood, deleteFood, getFoods} from "@component/store/reducers/food/foodThunks";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Foods() {

    const foods = useAppSelector(state => state.food.foods)
    const {register, handleSubmit, formState, reset, watch, setValue} = useForm<Food>()
    const [energyValue, setEnergyValue] = React.useState(0)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(getFoods())
    }, [])

    React.useEffect(() => {
        setEnergyValue(computeEnergyValue(watch('proteins'), watch('carbs'), watch('fats')))
        setValue('energy', energyValue)
    }, [formState])

    React.useEffect(() => {
        reset();
    }, [formState.isSubmitSuccessful])

    const onFormSubmit: SubmitHandler<Food> = (data) => {
        dispatch(createFood(data))
    }

    const onFoodDelete = (id: string) => {
        dispatch(deleteFood(id))
    }

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        pagination: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        selectToolbarPlacement: "none",
        selectableRows: 'none',
    };
    const columns = [
        {
            name: "",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (_: any, tableMeta: MUIDataTableMeta, __: any) => {
                    return (
                        <IconButton onClick={() => onFoodDelete(tableMeta.rowData[1])}><DeleteIcon/></IconButton>
                    );
                }
            }
        },
        {
            name: "_id",
            label: "ID",
            options: {
                display: false,
            }
        },
        {
            name: "name",
            label: "NAME",
            options: {
                filter: true,
                sort: true,

            }
        },
        {
            name: "group",
            label: "GROUP",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "proteins",
            label: "PROTEINS",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
        {
            name: "carbs",
            label: "CARBS",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
        {
            name: "fats",
            label: "FATS",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
        {
            name: "energy",
            label: "ENERGY",
            options: {
                filter: true,
                sort: false,
                searchable: false,
            }
        },
    ];

    const getMuiTheme = () =>
        createTheme({
            components: {
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "#c9c9c9",
                        },
                    },
                },
                MuiTableCell: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "#c9c9c9",
                            borderTop: 'none',
                            borderBottom: '1px  #989898 solid'
                        },
                    },
                },
                MuiTypography: {
                    styleOverrides: {
                        root: {
                            fontSize: "24px",
                            fontWeight: "700",
                        },
                    },
                }
            },
        });

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
                <h4>Add food</h4>
                <Input  {...register('name')} placeholder='Food name'></Input>
                <Input {...register('proteins')} placeholder='Proteins'></Input>
                <Input {...register('carbs')} placeholder='Carbohydrates'></Input>
                <Input {...register('fats')} placeholder='Fats'></Input>
                <Typography>{`Energy value : ${energyValue}`}</Typography>
                <Select
                    size='small'
                    {...register('group')}
                    label=""
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {Object.keys(FoodGroup).map(group => {
                        return (
                            <MenuItem key={group} value={group}>{group}</MenuItem>
                        )
                    })}
                </Select>
                <Button type='submit' variant='outlined' endIcon={<Done/>}>CREATE</Button>
            </form>
            <div className={styles.table}>
                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable data={foods} columns={columns} options={options} title={'FOODS LIST'}/>
                </ThemeProvider>
            </div>
        </div>
    )
}