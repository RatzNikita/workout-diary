'use client'
import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from './Header.module.css'
import cn from "classnames";
import Link from "next/link";
import {usePathname} from "next/navigation";
import Button from "@component/components/Button/Button";
import {useAppDispatch, useAppSelector} from "@component/hooks/hooks";
import {getUserInfo} from "@component/store/reducers/auth/authThunks";
import $api from "@component/service/api/api";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
}

export const Header = ({className, ...props}: Props) => {

    const path = usePathname().split('/');

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.main.isLoggedIn)
    const username = useAppSelector(state => state.main.username)
    const token = useAppSelector(state => state.main.token)

    React.useEffect(() => {
        if (isLoggedIn) {
            $api.setToken(token)
        }
        if (!username) {
            dispatch(getUserInfo())
        }
    }, [isLoggedIn])

    return (
        <header className={cn(styles.header, className)} {...props}>
            <div className={styles.navBar}>
                <h1 className={styles.title}>Training diary</h1>
                {isLoggedIn ?
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
                    : <nav>
                        <Link href={"/signin"}>
                            <Button active={path[1] === 'signin'}>
                                LOGIN
                            </Button>
                        </Link>
                        <Link href={"/signup"}>
                            <Button active={path[1] === 'signup'}>
                                REGISTRATION
                            </Button>
                        </Link>
                    </nav>
                }
            </div>
        </header>
    )
}