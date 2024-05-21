require(`dotenv`).config()
const express = require('express');
const cors=require("cors")
const userRouter = require('./router/auth-router'); 
const contactRoute = require("./router/contact-route");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

const PORT = process.env.PORT || 5000;
const connectdb=require(`./utils/db`);
const errorMiddleware = require('./middleware/errorMiddleware');

// bodyParser
const bodyParser = require('body-parser');
// middleware
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser)
app.use(cors())
// Router

app.use('/api/auth', userRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
// admin router
app.use("/api/admin", adminRoute);


app.use(errorMiddleware)

const corsOptions = {
  origin: "http://localhost:5175",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

connectdb(
app.listen(PORT, () => {
  console.log(`Server is running on port number is ${PORT}`);
}))