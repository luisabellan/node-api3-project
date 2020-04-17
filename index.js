const express = require("express")
const cors = require("cors")
// const morgan = require("morgan")
const logger = require("./server")
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

const server = express()
const port = 4000

server.use(express.json())
server.use(cors())


const router = express.Router()




server.use('/users', logger, userRouter)
server.use('/posts', logger, postRouter)
// this middleware function will only run if no route is found.
// routes never call `next()`, so if a route is found, this never runs.
server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})