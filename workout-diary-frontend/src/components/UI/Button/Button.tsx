import React from "react";
import styles from './Button.module.css'
import styled from "styled-components";


interface Props {
    children?: React.ReactNode,
    size?: 'l' | 's',
    active?: boolean,
    onClick?: ( e : any) => void
    type?: "button" | "submit" | "reset" | undefined
}

const StyledButton = styled.button<Props>`
  background-color: inherit;
  max-height: 40px;
  font-weight: 600;
  font-size: 1vh;
  padding: 5px;
  margin: 10px;
  transition: scale .2s linear;
`

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