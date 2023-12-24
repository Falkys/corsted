import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom"
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import styles from "./chat.module.scss";
import { MessengerBlock } from '../../components/MessengerBlock';
import { SideBar } from '../../components/SideBarMessenger';
import { selectIsAuth } from '../../redux/slices/auth';

const color = "#300003";

const Item = styled(Paper)(({ teme }) => ({
  margin: 0,
  backgroundColor: color,
  borderRadius: "30px",
  paddingBottom: '100vh',
  color: "#fff",
}));

export const Chat = () => {
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    document.title = "Chat - Corsted";
    
  }, []);

  if (!window.localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }
  
  return (
      <div classes={{ root: styles.root }}>
        <Box>
          <Grid 
            container 
            spacing={0}
            sx={{
              border: "0px solid #e0e0e0",
              borderRadius: "30px",
            }}>
            <Grid 
              container
              xs={0.7}
              sx={{
                height: "100vh",
                color: "#fff",
              }}
              >
              <SideBar />
            </Grid>
            <Grid item xs={2.3}>
              <Item></Item>
            </Grid>
            <Grid 
              container
              direction="column"
              xs={6}
              > 
              <MessengerBlock />
              </Grid>
            <Grid item xs={3}>
              <Item></Item>
            </Grid>
          </Grid>
        </Box>
      </div>
  );
};
