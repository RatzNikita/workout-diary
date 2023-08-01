'use client'
import React from "react";
import {useAppSelector} from "@component/hooks/hooks";
import styles from "@component/app/styles.module.css";



export default function Home() {

    const activeMenu = useAppSelector(state => state.main.activeMenu)


    return (
        <div className={styles.container}>
            Hello
        </div>
    )
}
