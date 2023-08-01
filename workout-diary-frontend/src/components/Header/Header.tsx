'use client'
import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from './Header.module.css'
import cn from "classnames";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLDivElement>{
}

export const Header = ({className, ...props}: Props) => {

    const path = usePathname().split('/');

    return (
        <header className={cn(styles.header, className)} {...props}>
            <div className={styles.navBar}>
                <h1 className={styles.title}>Training diary</h1>
                <nav>
                    <Link href={"/program/my"}
                          className={path[1] === 'program' ? styles.buttonActive : styles.navButton}>PROGRAMS</Link>
                    <Link href={"/meal"}
                          className={path[1] === 'meal' ? styles.buttonActive : styles.navButton}>MEAL PLAN</Link>
                    <Link href={"/library"}
                          className={path[1] === 'library' ? styles.buttonActive : styles.navButton}>LIBRARY</Link>
                </nav>
            </div>
        </header>
    )
}