import crypto from 'node:crypto'
import { Readable } from 'node:stream'
import { CHUNK_SIZE } from './constants.mjs'

export const createSizeStream = size => {
  let remaining = size
  return new Readable({
    read() {
      if (remaining <= 0) {
        this.push(null)
        return
      }
      const currentChunkSize = Math.min(remaining, CHUNK_SIZE * 1024)
      const data = crypto.randomBytes(currentChunkSize)
      remaining -= currentChunkSize
      this.push(data)
    },
  })
}
