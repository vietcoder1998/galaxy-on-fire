import http from 'http'
import express from 'express'
import { Server } from "socket.io";
import { createClient } from 'redis';
import path from 'path';

const app = express()
const server: any = http.createServer(app);
const io = new Server(server);
const hostname = '127.0.0.1'
const port = 3000

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
client.hSet('mimi', {
  name: 'mimi',
  age: 0,
  weight: 1,
})

// Pet
class Pet {
  name: string
  age: string
  weight: number
  size: number
  state: string

  constructor(name: string, age: string, weight: number){
    this.name = name
    this.age = age
    this.weight = weight
  }

  feed(weight: number) {
    this.weight += weight
  }

  get data() {
    return {
      name: this.name,
      age: this.age,
      weight: this.weight,
      size: this.size,
      state: this.state
    }
  }

}

app.get('/', async (req, res)=> {
  const data = await client.hGetAll('mimi')
  const pet = new Pet(data.name, data.age, Number(data.weight))
  res.send(pet.data)
})

app.get('/mimi.js', (req, res)=> res.sendFile(path.join(__dirname, 'mimi.js')))

app.get('/feed/:food_weight', async (req, res)=> {
  const { food_weight } = req.params 
  const weight = await client.hGet('mimi', 'weight')

  client.hSet('mimi', 'weight', Number(food_weight) + Number(weight))

  const data = await client.hGetAll('mimi')
  const pet = new Pet(data.name, data.age, Number(data.weight))

  res.send(pet.data)
})

app.get('/view',(req: any, res: any) =>  res.sendFile(path.join(__dirname, 'index.html')))

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})