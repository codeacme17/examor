import { WebSocketServer } from 'ws'
import { fileHandler } from '@/lib/db-handler'

export const GET = async () => {
  const ws = new WebSocketServer({ port: 51782 }, () => {
    console.log('WebSocket server is running on port 51782')
  })

  ws.on('error', (error) => {
    if (process.env.NODE_ENV !== 'development')
      console.log('WebSocket server failed to start, ' + error)
    return new Response('WebSocket server failed to start', { status: 500 })
  })

  ws.on('connection', (socket) => {
    const timer = setInterval(async () => {
      const files = await fileHandler.findUploading()
      socket.send(JSON.stringify(files))
    }, 1000)

    socket.on('close', () => {
      clearInterval(timer)
    })
  })

  return new Response('success')
}
