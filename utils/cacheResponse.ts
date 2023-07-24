import { Response } from 'express'
import { config } from '../config'

const cacheResponse = (res: Response, seconds: number): void => {
  if (!config.dev) {
    // Agrega cache cuando se solicita una ruta
    res.set('Cache-Control', `public, max-age=${seconds}`)
  }
}

export default cacheResponse
