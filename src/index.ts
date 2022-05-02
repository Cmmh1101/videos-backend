import dotenv from 'dotenv';
dotenv.config();


import app from './app'
import './database'

app.listen(5000,() => {
    console.log('server on port 5000')
})