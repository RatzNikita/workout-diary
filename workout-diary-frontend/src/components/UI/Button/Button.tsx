import React from "react";
import styles from './Button.module.css'


interface Props {
    children?: React.ReactNode,
    size?: 'l' | 's',
    active?: boolean,
    onClick?: ( e : any) => void
    type?: "button" | "submit" | "reset" | undefined
}

export const Button = ({type = 'button',active,size,onClick,children}: Props) => {

    return (
        <button
            type={type}
            onClick={onClick}
            className={`
            ${styles.button} 
            ${size === 's' ? styles.sizeS : size === 'l' ? styles.sizeL : null}
            ${active ? styles.activeButton : null}`}>
            {children}
        </button>
    )
}