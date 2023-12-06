import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Chat, Error, Test } from "./pages";
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import React from "react";
 
function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/create" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/me/:id" element={<Chat />} />
          <Route path="/guild/:guild/:channel" element={<Chat />} />
          <Route path="*" element={<Error />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
