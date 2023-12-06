import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lime, purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import { BiMenu, BiLogIn, BiSun, BiLogOut } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from '../../redux/slices/auth';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
   const user = useSelector(state => state.auth.data);
  
  const onClickLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem("token")
        return <Navigate to="/" />
    }
  };

  const onClickMenu =  () => {
    
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
              <Button variant="outlined" color="secondary">Home</Button>
            </Link>
          <div className={styles.buttons}>
            <div className={styles.bar}>
                <BiMenu className={styles.icon}/>
                <BiSun className={styles.icon} />
              {isAuth ? (
      <img className={styles.avatar} src={user.avatarUrl || '/noavatar.png'} alt={user.username} />
                        ) : (
      <Link to="/login">
        <BiLogIn className={styles.icon} />
      </Link>
                )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
