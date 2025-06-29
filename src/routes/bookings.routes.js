import express from 'express';
import bookingsController from '../controllers/bookings.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a class for a member
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberName
 *               - className
 *               - participationDate
 *             properties:
 *               memberName:
 *                 type: string
 *               className:
 *                 type: string
 *               participationDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Booking successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 booking:
 *                   type: object
 *       400:
 *         description: Validation error or class full
 *       404:
 *         description: Class not found
 *   get:
 *     summary: Search bookings by member and/or date range
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: member
 *         schema:
 *           type: string
 *         description: Member name to filter
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for participation
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for participation
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   className:
 *                     type: string
 *                   classStartTime:
 *                     type: string
 *                   bookingDate:
 *                     type: string
 *                   member:
 *                     type: string
 */
router.post('/', bookingsController.bookClass);

router.get('/', bookingsController.searchBookings);

export default router; 