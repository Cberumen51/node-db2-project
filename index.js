const express = require("express")
const carsRouter = require("./cars/cars-router")

const server = express()
const port = 2415;

server.use(express.json())

server.use("/cars", carsRouter)
server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})