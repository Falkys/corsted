import React from 'react';
import { useSelector } from 'react-redux';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Send from '@mui/icons-material/Send';
import Home from '@mui/icons-material/Home';
import Group from '@mui/icons-material/Group';
import TextField from '@mui/material/TextField';
import Add from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const SideBar = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.data);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   const [openFriends, setOpenFriends] = React.useState(false);
  const handleOpenFriends = () => setOpenFriends(true);
  const handleCloseFriends = () => setOpenFriends(false);

     const [openAddServer, setOpenAddServer] = React.useState(false);
  const handleOpenAddServer = () => setOpenAddServer(true);
  const handleCloseAddServer = () => setOpenAddServer(false);

  const HomeButton = () => {
    navigate('/');
  };
  
  return (
<>
    <Grid 
      container
      justifyContent="center"
      alignItems="center" 
      sx={{
        height: "60px",
      }}>
    <IconButton
      color="secondary"
      sx={{ p: '10px' }}
      onClick={HomeButton}
    >
      <Send/>
    </IconButton>
    </Grid>
    <Grid 
      container
      direction="column"
      justifyContent="center"
      alignItems="center" 
      sx={{
        height: "calc(90vh - 120px)",
      }}
      >
      <Grid item>
      <IconButton
        color="secondary"
        sx={{ p: '10px' }}
        onClick={HomeButton}
      >
        <Home />
      </IconButton>
      </Grid>
       <Grid item>
      <IconButton
        color="secondary"
        sx={{ p: '10px' }}
        onClick={handleOpenFriends}
      >
        <Group/>
      </IconButton>
      </Grid>
      <Grid item>
      <IconButton
        color="secondary"
        sx={{ p: '10px' }}
        onClick={handleOpenAddServer}
      >
        <Add/>
      </IconButton>
      </Grid>
      </Grid>
    <Grid 
      container
      justifyContent="center"
      alignItems="flex-end" 
      sx={{
        height: "60px",
      }}>
    <IconButton
      color="secondary"
      sx={{ p: '10px' }}
      onClick={handleOpen}
    >
      <Avatar name={user ? user.username : 'Гость'} src={user ? user.avatar : '/noavatar.png'} />
    </IconButton>
    </Grid>
  
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        My profile
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, njsaajdnsjdnjksnkjfns
      </Typography>
    </Box>
  </Modal>
  <Modal
    open={openFriends}
    onClose={handleCloseFriends}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Friend
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, njsaajdnsjdnjksnkjfns
      </Typography>
    </Box>
  </Modal>
  <Modal
    open={openAddServer}
    onClose={handleCloseAddServer}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Server
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
w
        <TextField />
      </Typography>
    </Box>
  </Modal>
</>
    )
};