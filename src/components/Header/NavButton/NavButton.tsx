import {Button} from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {setActiveMenu} from "@component/store/reducers/mainSlice";
import styles from './NavButton.module.css'


interface NavButtonProps {
    value: string;
    buttonText: string;
}

export const NavButton = ({value, buttonText}: NavButtonProps) => {

    const activeMenu = useAppSelector(state => state.main.activeMenu)
    const dispatch = useAppDispatch()

    const handleActiveMenu = () => {
        dispatch(setActiveMenu(value))
    }


    return (
        <Button
            className={`${styles.button} ${activeMenu === value && styles.activeButton}`}
            onClick={handleActiveMenu}
            value={value}>{buttonText}
        </Button>
    )
}