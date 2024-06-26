import express from 'express'
import { createBooking, getAllBooking, getBooking } from '../Controllers/bookingController.js'

const router = express.Router()

router.post('/', createBooking)
router.get('/:id', getBooking)

export default router