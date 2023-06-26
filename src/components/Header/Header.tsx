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
            <div className='flex flex-row gap-5'>
                <div className={styles.title}></div>
                <div className='grid grid-cols-6 grid-rows-1 gap-3 pt-5 '>
                    <NavButton  value='statistics' buttonText={'Statistics'}/>
                    <NavButton  value='my-program' buttonText={'My program'}/>
                    <NavButton  value='exercises' buttonText={'Exercises'}/>
                    <NavButton  value='meal' buttonText={'Meal plan'}/>
                </div>
            </div>
        </Container>
    )
}