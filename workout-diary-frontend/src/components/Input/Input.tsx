import './Input.css'
import React, {DetailedHTMLProps, HTMLAttributes} from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}


export const Input = ({label, onChange, ...props}: Props) => {

    const [isValid, setIsValid] = React.useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsValid(e.target.validity.valid)
        onChange(e)
    }

    return (
        <>
            <label className='auth-form__input-name'>{label}</label>
            <input className={`auth-form__input ${!isValid && 'auth-form__input_color_red'}`}
                   onChange={handleChange} {...props}></input>
        </>
    )
}
