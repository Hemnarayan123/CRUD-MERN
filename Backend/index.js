import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import router from './routes/index.js'

const app = express()


app.use(cors())
dotenv.config()
app.use(express.json())

app.use('/api',router)


connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('MongoDB database connected successfully.......');
        console.log(`Server is runnning....... ${process.env.PORT}`);
    })
})

.catch(() => {
    console.log('connection failed');
})


