import {
    getAllCharacters,
    getCharacterById,
    searchCharacterByName,
    getCharacterNavigation
} from '../services/characterService.js';

export async function listCharacters(req, res, next) {
    try {
        const search = req.query.search;

        if (search) {
            const character = await searchCharacterByName(search);

            if (!character) {
                return res.status(404).json({
                    error: `No character found matching "${search}".`
                });
            }

            return res.json([character]);
        }

        const characters = await getAllCharacters();

        // Return only the information needed for catalog cards.
        const catalog = characters.map(character => ({
            id: character.id,
            name: character.name,
            image: character.image,
            // species: character.species
        }));

        res.json(catalog);
    } catch (error) {
        next(error);
    }
}

export async function getCharacterDetails(req, res, next) {
    try {
        const character = await getCharacterById(req.params.id);

        if (!character) {
            return res.status(404).json({
                error: 'Character not found.'
            });
        }

        const navigation = await getCharacterNavigation(character.id);

        res.json({
            ...character,
            ...navigation
        });
    } catch (error) {
        next(error);
    }
}
