import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

const HOST = '0.0.0.0';
const PORT = 3000;

app.get(`/`, (req,res) => {

});

app.listen(PORT, HOST, () => {
    console.log(`Rodando em ${HOST}:${PORT}`);
});