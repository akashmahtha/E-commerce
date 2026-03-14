import './config/env.js';
import app from './app.js';
import './config/db.js';
import connectDB from './config/db.js';
import cors from 'cors';
import movieRouter from './modules/movie.routes.js'

app.use(express.json());
app.use(cors());


let PORT=process.env.PORT;
connectDB();


app.use("/api/getMovie",movieRouter)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})