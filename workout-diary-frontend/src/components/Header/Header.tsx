'use client'
import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from './Header.module.css'
import cn from "classnames";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Button from "@component/styles/Button";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLDivElement> {
}

export const Header = ({className, ...props}: Props) => {

    const path = usePathname().split('/');

    return (
        <header className={cn(styles.header, className)} {...props}>
            <div className={styles.navBar}>
                <h1 className={styles.title}>Training diary</h1>
                <nav>
                    <Link href={"/program/my"}>
                        <Button active={path[1] === 'program'}>
                            PROGRAMS
                        </Button>
                    </Link>
                    <Link href={"/meal"}>
                        <Button active={path[1] === 'meal'}>
                            MEAL PLAN
                        </Button>
                    </Link>
                    <Link href={"/library"}>
                        <Button active={path[1] === 'library'}>
                            LIBRARY
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}