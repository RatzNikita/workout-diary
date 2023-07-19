'use client'
import {Container} from "@mui/material";
import React from "react";
import {NavButton} from "@component/components/Header/NavButton/NavButton";
import {useAppSelector} from "@component/hooks/hooks";
import styles from './Header.module.css'


export const Header = () => {

    const activeMenu = useAppSelector(state => state.main.activeMenu)


    return (
        <Container className={styles.header}>
            <div className={styles.navBar}>
                <div className={styles.title}>Training diary</div>
                <div>
                    <NavButton value='statistics' buttonText={'STATISTICS'}/>
                    <NavButton value='my-program' buttonText={'MY PROGRAM'}/>
                    <NavButton value='exercises' buttonText={'EXERCISES'}/>
                    <NavButton value='meal' buttonText={'MEAL PLAN'}/>
                </div>
            </div>
        </Container>
    )
}