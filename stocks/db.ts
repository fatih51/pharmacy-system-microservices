import { connect } from 'mongoose'
import { config } from './config'
const DB = config.MONGO_URL

export const connection = connect(DB)
