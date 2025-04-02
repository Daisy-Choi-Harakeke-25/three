import knex from 'knex'
import knexFile from './knexfile'
import { Image } from '@/models/Model'

type Enviroment = 'production' | 'staging' | 'development'

const enviroment = (process.env.NODE_ENV || 'development') as Enviroment
const config = knexFile[enviroment]
const connection = knex(config)

export async function getImage(id: number): Promise<Image | void> {
  try {
  const images = await connection('images').select('id')
  const idExist = images.find(image => image.id === id)
  if(!idExist) return console.log(`The image id number of ${id} does not exist`)
  return await connection('images')
    .select('id', 'name', 'image_url as imageUrl')
    .where({ id })
    .first()
  } catch (error) {
    console.log(`${error}: Internal Sever Error.`)
  }
}
