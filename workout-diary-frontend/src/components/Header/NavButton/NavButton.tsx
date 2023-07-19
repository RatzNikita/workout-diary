import React from "react";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {setActiveMenu} from "@component/store/reducers/mainSlice";
import {Button} from "@component/components/UI/Button/Button";


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
            onClick={handleActiveMenu}
            active={activeMenu === value}
            size='l'
        >{buttonText}
        </Button>
    )
}