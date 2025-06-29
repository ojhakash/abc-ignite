import express from 'express';
import classesController from '../controllers/classes.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create classes for a club (one per day in the date range)
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *               - startTime
 *               - duration
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *                 example: "14:00"
 *               duration:
 *                 type: number
 *                 example: 60
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Classes created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 *       400:
 *         description: Validation error
 */
router.post('/', classesController.createClasses);

export default router; 