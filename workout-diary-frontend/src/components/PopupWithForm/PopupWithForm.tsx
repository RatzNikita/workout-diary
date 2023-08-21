import React, {ReactNode} from "react";
import cn from "classnames";
import styles from './styles.module.css'

interface Props {
    title: string,
    name: string,
    children: ReactNode,
    isOpen: boolean,
    onSubmit: () => void,
    onClose: () => void,
}

export const PopupWithForm = ({title, name, children, isOpen, onSubmit, onClose}: Props) => {

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        onSubmit();
        onClose();
    }


    return (
        <div className={cn(styles.popup, {[styles.popupOpened]: isOpen})}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <form className={styles.form} id="card-form" name={name} onSubmit={handleSubmit}>
                    {children}
                    <button className={styles.submitBtn} type="submit">{'Save'}</button>
                </form>
                <button className={styles.closeBtn} type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm