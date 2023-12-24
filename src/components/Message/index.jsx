import React, { useEffect, useRef } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from "@mui/material/Skeleton";

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
  const listItemRef = useRef();

  useEffect(() => {
    if (listItemRef.current) {
      handleLongWords(listItemRef.current);
    }
  }, [content]);

  const handleLongWords = (element) => {
    if (element) {
      const words = content.split(/\s+/);
      element.innerHTML = ""; // Очищаем содержимое элемента

      words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.style.overflowWrap = 'break-word';
        element.appendChild(wordSpan);

        if (index < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.textContent = ' ';
          element.appendChild(spaceSpan);
        }
      });
    }
  };

  if (isLoading) {
    return <Skeleton width={100} />;
  }

  return (
    <>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start" ref={listItemRef}>
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        // В компоненте Message
        <ListItemText
          primary={user.username}
          style={{ color: "#000000", whiteSpace: "pre-line", overflowWrap: 'break-word', wordBreak: 'break-all' }}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                style={{ color: "#000000" }}
              />
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};