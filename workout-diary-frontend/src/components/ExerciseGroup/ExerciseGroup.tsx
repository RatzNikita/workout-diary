import styles from "./ExerciseGroup.module.css";
import {Collapse, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import React, {ReactElement} from "react";

interface ExerciseGroupProps {
    value: string,
    children: ReactElement,
}


export const ExerciseGroup = ({value, children}: ExerciseGroupProps) => {

    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
            setOpen(!open)
    }
    return (
        <div className={styles.groupContainer}>
            <ListItemButton onClick={handleOpen} className={styles.listItem}>
                <ListItemText primary={value}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit orientation="vertical">
                {children}
            </Collapse>
        </div>


    )
}