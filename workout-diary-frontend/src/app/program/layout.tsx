'use client'
import React from "react";
import styles from "@component/app/program/style.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";


export default function ProgramLayout({children,}: { children: React.ReactNode }) {


    const path = usePathname()

    return (
        <div className={styles.container}>
            <div className={styles.actionBar}>
                <Link href={"/program/my"} className={path === '/program/my' ? styles.buttonActive : styles.navButton}>ТЕКУЩАЯ
                    ПРОГРАММА</Link>
                <Link href={"/program/list"}
                      className={path === '/program/list' ? styles.buttonActive : styles.navButton}>ДОСТУПНЫЕ
                    ПРОГРАММЫ</Link>
                <Link href={"/program/create"}
                      className={path === '/program/create' ? styles.buttonActive : styles.navButton}>ДОБАВИТЬ</Link>
            </div>
            {children}
        </div>

    )
}
