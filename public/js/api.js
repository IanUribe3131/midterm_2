const API_BASE = '/api/characters';

async function request(url) {
    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
    }

    return data;
}

export function getCharacters(search = '') {
    const url = new URL(API_BASE, window.location.origin);//

    if(search) {
        url.searchParams.set('search', search);//
    }

    return request(url);
}

export function getCharacter(id){
    return request(`${API_BASE}/${encodeURIComponent(id)}`);
}