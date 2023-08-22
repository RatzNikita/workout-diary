'use client'
import styles from './styles.module.css'
import AuthForm from '../../components/AuthForm/AuthForm'
import React from "react";
import {Input} from "@component/components/Input/Input";


export default function Login() {

    const [formValue, setFormValue] = React.useState({
        username: '',
        password: '',
    })

    const [isLoading, setIsLoading] = React.useState(false);

    const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e.currentTarget)
    }

    const setValue = (e :  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    return (
        <div className={styles.login}>
            <AuthForm formValue={formValue} type='signin' disabled={isLoading} onSubmit={onLogin}>
                <Input label='Username:' name='username' value={formValue.username} onChange={setValue}></Input>
                <Input label='Password:' name='password' value={formValue.password} onChange={setValue}></Input>
            </AuthForm>
        </div>
    )
}