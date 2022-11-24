import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

const PORT = 3001

const app = express()

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})