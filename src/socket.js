import { io } from 'socket.io-client';

const URL = 'https://backend.cherryblood.repl.co';

export const socket = io(URL);