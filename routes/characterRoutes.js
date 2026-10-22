import express from 'express';

import {
    listCharacters,
    getCharacterDetails
} from '../controllers/characterController.js';

const router = express.Router();

// GET /api/characters
// GET /api/characters?search=<name>
router.get('/', listCharacters);

// GET /api/characters/<id>
router.get('/:id', getCharacterDetails);

export default router;
