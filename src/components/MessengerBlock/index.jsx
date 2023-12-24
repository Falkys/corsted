import React, { useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from '@mui/material/InputBase';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import Send from '@mui/icons-material/Send';
import { ChannelHeader } from '../../components/ChannelHeader';
import styles from "./messenger.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../../components/Message';
import { animateScroll } from 'react-scroll';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom"
import { fetchMessages } from '../../redux/slices/messages';
import { fetchAuthOne } from '../../redux/slices/auth';
import { io } from 'socket.io-client';
import { useParams } from "react-router-dom";
import List from '@mui/material/List';

const color = "#210002";

const ItemFour = styled(Paper)(({ teme }) => ({
  margin: 0,
  backgroundColor: color,
  borderRadius: 0,
  paddingBottom: '10px',
  paddingLeft: "20px",
  paddingTop: "10px",
  color: "#fff",
}));

const ItemFive = styled(Paper)(({ teme }) => ({
  margin: 0,
  backgroundColor: color,
  borderRadius: 0,
  color: "#fff",
  overflow: 'auto',  // Добавлено свойство overflow
  height: '60vh',    // Установлена фиксированная высота
  wordWrap: 'break-word',  // Обработка длинных слов
  overflowX: 'hidden',  // Предотвращение горизонтального скролла
}));

const ItemSix = styled(Paper)(({ teme }) => ({
  margin: 0,
  backgroundColor: color,
  borderRadius: 0,
  paddingBottom: '0px',
  color: "#fff",
  zIndex: 100000,
}));

const URL = 'https://backend.cherryblood.repl.co';
const socket = io(URL);

export const MessengerBlock = () => {
  const opponent1 = useSelector(state => state.auth.dataOne);
  const { id } = useParams();
  const [chatmessages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const messagesContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { messages } = useSelector(state => state.messages);
  const isPostsLoading = messages.status === 'loading';
  const isError = messages.status === 'error';
  const user = useSelector(state => state.auth.data);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchMessages({ opponent: id }));
      if (data.error) {
        navigate("/me")
      }
      const opponent = await dispatch(fetchAuthOne({ id: id }));
      console.log(opponent)
      socket.emit('joinRoom', { opponent: id, token: window.localStorage.getItem('token') });
      socket.on("send message", function (data) {
        console.log(data);
        setMessages((prevMessages) => [...prevMessages, { message: data.message, user: data.user }]);
        setTimeout(() => {
          animateScroll.scrollToBottom({
            containerId: 'messagesContainer',
          });
        }, 1);
      });
      const modifiedMessages = data.payload.map(item => ({
        message: {
          content: item.message[0].content,
          time: item.message[0].time
        },
        user: {
          username: item.user[0].username,
          avatar: item.user[0].avatar,
        }
      }));
      setMessages(modifiedMessages);
      setTimeout(() => {
        animateScroll.scrollToBottom({
          containerId: 'messagesContainer',
        });
      }, 1);
    };
    fetchData();
  }, [dispatch, id]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      sendMessage();
      event.preventDefault();
    }
  };

  const sendMessage = () => {
    if (messageText) {
      socket.emit("new message", { opponent: id, message: { content: messageText } });
      setMessageText("");
    }
  };

  return (
    <>
      <Grid item>
        <ItemFour>
          <ChannelHeader name={opponent1 ? opponent1.username : 'Гость'} description="Description" />
        </ItemFour>
      </Grid>
      <Grid item id="messagesContainer" ref={messagesContainerRef} style={{ overflowY: 'auto', height: "80vh", background: "#210002" }} >
        <ItemFive 
          id="messagesContainer" 
          ref={messagesContainerRef}
          className={styles.field} >
          <List sx={{ width: '100%', bgcolor: color }}>
            {chatmessages.map((item, index) => (
              <div key={index} className={styles.message}>
                <Message
                  id={item.user.id}
                  content={item.message.content}
                  user={item.user}
                  isLoading={isPostsLoading}
                  createdAt={item.message.time}
                  direct="left"
                  isAuthor={true}
                />
              </div>
            ))}
          </List>
        </ItemFive>
      </Grid>
      <ItemSix>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin: 0, borderRadius: 20 }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Message"
            multiline
            maxRows={4}
            onKeyDown={handleKeyDown}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: '10px' }}
            onClick={sendMessage}
          >
            <Send/>
          </IconButton>
        </Paper>
      </ItemSix>
    </>
  );
};