import { WebSocketServer } from 'ws'
import { fileHandler } from '@/lib/db-handler'

export const GET = async () => {
  const ws = new WebSocketServer({ port: 51782 })

  let timer: any

  ws.on('connection', (socket) => {
    setInterval(async () => {
      const files = await fileHandler.findUploading()
      socket.send(JSON.stringify(files))
    }, 1000)

    socket.on('close', () => {
      clearInterval(timer)
    })
  })

  return new Response('success')
}
