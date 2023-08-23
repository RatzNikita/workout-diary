'use client'
import styles from './styles.module.css'
import AuthForm from '../../components/AuthForm/AuthForm'
import React from "react";
import {Input} from "@component/components/Input/Input";
import {useAppDispatch} from "@component/hooks/hooks";
import {signin, signup} from "@component/store/reducers/auth/authThunks";


export default function Login() {

    const dispatch = useAppDispatch();

    const [formValue, setFormValue] = React.useState({
        username: '',
        password: '',
    })

    const [isLoading, setIsLoading] = React.useState(false);

    const onLogin = () => {
        dispatch(signin(formValue))
    }

    const setValue = (e :  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    return (
        <div className={styles.login}>
            <AuthForm formValue={formValue} type='signin' disabled={isLoading} onSubmit={onLogin}>
                <Input  label='Username:' name='username' value={formValue.username} onChange={setValue}></Input>
                <Input type='password' label='Password:' name='password' value={formValue.password} onChange={setValue}></Input>
            </AuthForm>
        </div>
    )
}