const API_URL = 'https://akabab.github.io/starwars-api/api';

//download all and save it on memory instead of searching every time
let charactersCache = null;

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Star Wars API returned status ${response.status}`);
    }

    return response.json();
}

export async function getAllCharacters() {
    if (charactersCache !== null) {
        return charactersCache
    }

    const characters = await fetchJson(`${API_URL}/all.json`);

    if(!Array.isArray(characters)) {
        throw new Error('Invalid character data received from the API');
    }

    
    const validImage=async(character)=>{
        const x= await fetch(character.image);
        if(x.status===404) character.image=undefined;
        
    }
    await Promise.allSettled(characters.map(validImage));
    charactersCache = characters;


    return charactersCache
} 

export async function getCharacterById(id) {
    const characters = await getAllCharacters();

    return characters.find(character => character.id === parseInt(id)) || null;
}

export async function searchCharacterByName(name) {
    const characters = await getAllCharacters();

    const query = name.trim().toLowerCase();

    if(!query) {
        return null;
    }
    //return character if we find it by name, else return null
    return characters.find(character => character.name.toLowerCase() === query) || null;

}

export async function getCharacterNavigation(id) {
    const characters = await getAllCharacters();

    const index = characters.findIndex(
        character => character.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const previousIndex = (index - 1 + characters.length) % characters.length;

    const nextIndex = (index + 1) % characters.length;

    return {
        prevId: characters[previousIndex].id,
        nextId: characters[nextIndex].id
    };
}