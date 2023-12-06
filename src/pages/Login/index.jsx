import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
}

    
    if (data.payload.message) {
      setError('email', {
          type: 'manual',
          message: data.payload.message,
        });
      setError('password', {
        type: 'manual',
        message: data.payload.message,
      });
    } else if (data.payload[0].param) {
      data.payload.forEach(item => {
          setError(item.param, {
            type: 'manual',
            message: item.msg,
          });
      });
    }

  }
   if (isAuth) {
     return <Navigate to="/me/1" />
   }
  return (
    <Paper style={{ marginTop: 100 }} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        type='email'
        color="primary"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        { ... register('email', { required: 'Укажите почту'})}
        fullWidth
      />
      <TextField 
        className={styles.field} 
        label="Пароль"
        color="primary"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        { ... register('password', { required: 'Укажите пароль', minLength: { value: 5, message: 'Пароль должен содержать как минимум 5 символов',}})}
        fullWidth />
        <Link to="/register" className={styles.login}>
          Нет аккаунта?
        </Link>
      <Button disabled={!isValid} color="secondary" type='submit' size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
    </Paper>
  );
};
