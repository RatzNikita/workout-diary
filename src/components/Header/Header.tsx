'use client'
import {Container} from "@mui/material";
import React from "react";
import {NavButton} from "@component/components/Header/NavButton/NavButton";
import {useAppSelector} from "@component/hooks/hooks";
import styles from './Header.module.css'


export const Header   = () => {

    const activeMenu = useAppSelector(state => state.main.activeMenu)



    return (
        <Container className='p-0 min-h-[25%]'>
            <div className={styles.navBar}>
                <div className={styles.title}></div>
                    <NavButton  value='statistics' buttonText={'Statistics'}/>
                    <NavButton  value='my-program' buttonText={'My program'}/>
                    <NavButton  value='exercises' buttonText={'Exercises'}/>
                    <NavButton  value='meal' buttonText={'Meal plan'}/>
            </div>
        </Container>
    )
}