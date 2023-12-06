import React from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import styles from './message.module.scss';
import { UserInfo } from '../UserInfo';
import Skeleton from "@mui/material/Skeleton";
import { ChatItem } from 'react-chat-elements'

export const Message = ({
  id,
  isLoading,
  content,
  createdAt,
  imageUrl,
  direct,
  user,
  isAuthor,
}) => {
  if (isLoading) {
    return <Skeleton width={100} />;
  }

   const onClickRemove = () => {};
  
  return (
    <div className={{ root: styles.root }}>
      {isAuthor && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user}/>
        <div className={styles.indention}>
          <h6 className={clsx(styles.title)}>
            {content}
          </h6>
        </div>
      </div>
    </div>
  );
};
