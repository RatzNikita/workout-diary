import React, {ReactNode} from "react";
import './AuthForm.css'
import Link from "next/link";

interface Props {
    children: ReactNode,
    formValue: object,
    disabled: boolean,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    type: string,
}


const AuthForm = ({children, formValue, disabled, onSubmit, type}: Props) => {
    const [formValid, setFormValid] = React.useState(false)

    const checkValid = (e: React.FormEvent<HTMLFormElement>) => {
        const target = e.target as HTMLFormElement
        setFormValid(target.form.checkValidity())
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormValid(e.currentTarget.checkValidity())
        if (formValid) {
            onSubmit(e)
        }
    }

    const formIsEmpty = () => {
        for (const field in formValue) {
            // @ts-ignore
            if (formValue[field] !== '') {
                return false;
            }
        }
        return true;
    }

    return (
        <section className='auth-form'>
            <h2 className='auth-form__heading'>{type === 'signup' ? 'Registration' : 'Login'}</h2>
            <form onSubmit={handleSubmit} onChange={checkValid} noValidate
                  className={`auth-form__form ${disabled && 'auth-form__form_disabled'}`}>
                <div className='auth-form__form-container'>
                    {children}
                </div>
                <div className='auth-form__button-container'>
                    <button type='submit'
                            disabled={!formValid}
                            className='auth-form__button'>{type === 'signup' ? 'Зарегистрироваться' : 'Войти'}</button>
                    <p className='auth-form__button-caption'>{type === 'signup' ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'}</p>
                    <Link href={type === 'signup' ? '/signin' : '/signup'}
                          className='auth-form__button-caption auth-form__button-caption_style_link'>{type === 'signup' ? 'Войти' : 'Регистрация'}</Link>
                </div>
            </form>
        </section>
    )
}

export default AuthForm;