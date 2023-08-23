'use client'
import styles from './styles.module.css'
import AuthForm from '../../components/AuthForm/AuthForm'
import React from "react";
import {Input} from "@component/components/Input/Input";
import {useAppDispatch} from "@component/hooks/hooks";
import {signup} from "@component/store/reducers/auth/authThunks";


export default function Registration() {

    const dispatch = useAppDispatch();

    const [formValue, setFormValue] = React.useState({
        username: '',
        password: '',
    })

    const [isLoading, setIsLoading] = React.useState(false);

    const onSignup = () => {
        dispatch(signup(formValue))
    }

    const setValue = (e :  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    return (
        <div className={styles.signup}>
            <AuthForm formValue={formValue} type='signup' disabled={isLoading} onSubmit={onSignup}>
                <Input label='Username:' name='username' value={formValue.username} onChange={setValue}></Input>
                <Input type='password' label='Password:' name='password' value={formValue.password} onChange={setValue}></Input>
            </AuthForm>
        </div>
    )
}