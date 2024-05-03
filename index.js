const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors")
require('dotenv').config()
// console.log(process.env)

require("./helpers/init_mongodb")

const AuthRoute = require("./Routes/Auth.route")

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res, next)=>{
    res.send("Hello World")
})


app.use("/auth", AuthRoute)


app.use(async(req,res,next)=>{
    // const error = new Error("Not Found")
    // error.status = 404
    // next(error)
    next(createError.NotFound())
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})
console.log("Port", process.env.PORT );
const PORT = process.env.PORT || 5000
app.listen(PORT, (req,res)=>{
    console.log(`Server listening on port ${PORT}`);
})