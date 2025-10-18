import http from 'node:http'
import url from 'node:url'
import findMyWay from 'find-my-way'
import { createSizeStream } from './createSizeStream.mjs'
import { HTTP_PORT, DEFAULT_SIZE } from './constants.mjs'

const router = findMyWay({
  defaultRoute: (_request, response) => {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('Not found')
  },
})

router.on('GET', '/', (request, response) => {
  const { searchParams } = new url.URL(
    request.url,
    `http://${request.headers.host}`
  )
  const sizeParam = searchParams.get('size')
  const size = sizeParam ? parseInt(sizeParam, 10) : DEFAULT_SIZE
  response.writeHead(200, { 'Content-Type': 'application/octet-stream' })
  createSizeStream(size * 1024 * 1024).pipe(response)
})

router.on('GET', '/health', (_request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Status: OK')
})

const server = http.createServer()

server.on('error', error => {
  console.error('Error', error)
})

server.on('listening', () => {
  console.info('Listening on', server.address())
})

server.on('request', (request, response) => {
  router.lookup(request, response)
})

server.listen(HTTP_PORT)
