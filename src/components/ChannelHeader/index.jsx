import React from 'react';
import styles from './channelHeader.module.scss';
import Divider from '@mui/material/Divider'; 

export const ChannelHeader = ({ iconUrl, name, description }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={iconUrl || '/noavatar.png'} alt={name} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{name}</span>
        <Divider sx={{ background: "#fff", height: 20, m: 0.5 }} orientation="vertical" />
        <span className={styles.additional}>{description}</span>
      </div>
    </div>
  );
};
