import { getCharacter } from './api.js';

const DEFAULT_IMAGE =
    'https://placehold.co/300x400/111827/FFFFFF?text=No+Image';

const modalElement = document.getElementById('characters-modal');
const modal = new bootstrap.Modal(modalElement);

const previousButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let previousId = null;
let nextId = null;
let requestNumber = 0;

function formatValue(value, unit = '') {
    if (value === null || value === undefined || value === '') {
        return 'Unknown';
    }

    return `${value}${unit}`;
}

function addDetail(container, label, value) {
    const row = document.createElement('div');
    row.className = 'detail-row';

    const term = document.createElement('dt');
    term.textContent = label;

    const description = document.createElement('dd');
    description.textContent = value;

    row.append(term, description);
    container.appendChild(row);
}

function addList(container, title, values) {
    if (!Array.isArray(values) || values.length === 0) {
        return;
    }

    const heading = document.createElement('p');
    heading.className = 'fw-semibold mb-1';
    heading.textContent = title;

    const list = document.createElement('ul');
    list.className = 'character-list';

    values.forEach(value => {
        const item = document.createElement('li');
        item.textContent = value;
        list.appendChild(item);
    });

    container.append(heading, list);
}

function renderCharacter(character) {
    document.getElementById('modal-name').textContent =
        character.name || 'Unknown character';

    document.getElementById('modal-id').textContent =
        `#${character.id ?? '???'}`;

    const image = document.getElementById('modal-img');

    image.onerror = () => {
        image.onerror = null;
        image.src = DEFAULT_IMAGE;
    };

    image.src = character.image || DEFAULT_IMAGE;
    image.alt = character.name || 'Star Wars character';

    const wikiLink = document.getElementById('modal-wiki');

    if (character.wiki) {
        wikiLink.href = character.wiki;
        wikiLink.classList.remove('d-none');
    } else {
        wikiLink.removeAttribute('href');
        wikiLink.classList.add('d-none');
    }

    const physical = document.getElementById('modal-physical');
    physical.replaceChildren();

    addDetail(physical, 'Species', formatValue(character.species));
    addDetail(physical, 'Gender', formatValue(character.gender));
    addDetail(physical, 'Height', formatValue(
        character.height,
        character.height != null ? ' m' : ''
    ));
    addDetail(physical, 'Mass', formatValue(
        character.mass,
        character.mass != null ? ' kg' : ''
    ));
    addDetail(physical, 'Homeworld', formatValue(character.homeworld));

    const appearance = document.getElementById('modal-appearance');
    appearance.replaceChildren();
    addDetail(appearance, 'Hair color', formatValue(character.hairColor));
    addDetail(appearance, 'Eye color', formatValue(character.eyeColor));
    addDetail(appearance, 'Skin color', formatValue(character.skinColor));

    const affiliations = document.getElementById('modal-affiliations');
    affiliations.replaceChildren();

    addList(affiliations, 'Current affiliations', character.affiliations);
    addList(
        affiliations,
        'Former affiliations',
        character.formerAffiliations
    );

    if (affiliations.children.length === 0) {
        affiliations.textContent = 'No affiliations listed.';
    }

    const relationships = document.getElementById('modal-relationships');
    relationships.replaceChildren();

    addList(relationships, 'Masters', character.masters);
    addList(relationships, 'Apprentices', character.apprentices);

    if (relationships.children.length === 0) {
        relationships.textContent = 'No relationships listed.';
    }

    const extra = document.getElementById('modal-extra');
    extra.replaceChildren();

    addDetail(extra, 'Born', formatValue(character.born));
    addDetail(extra, 'Birth location', formatValue(character.bornLocation));
    addDetail(extra, 'Died', formatValue(character.died));
    addDetail(extra, 'Death location', formatValue(character.diedLocation));
    addDetail(extra, 'Cybernetics', formatValue(character.cybernetics));

    // These fields are displayed when supplied by the API.
    if (character.manufacturer) {
        addDetail(extra, 'Manufacturer', character.manufacturer);
    }

    if (character.model) {
        addDetail(extra, 'Model', character.model);
    }

    previousId = character.prevId;
    nextId = character.nextId;

    previousButton.disabled = previousId == null;
    nextButton.disabled = nextId == null;
}

export async function openCharacter(id) {
    const thisRequest = ++requestNumber;

    previousButton.disabled = true;
    nextButton.disabled = true;

    try {
        const character = await getCharacter(id);

        // Ignore an older request if a newer navigation happened.
        if (thisRequest !== requestNumber) {
            return;
        }

        renderCharacter(character);

        if (!modalElement.classList.contains('show')) {
            modal.show();
        }
    } catch (error) {
        if (thisRequest === requestNumber) {
            console.error('Could not load character:', error);
            alert(error.message);
        }
    }
}
//previous button
previousButton.addEventListener('click', () => {
    if (previousId != null) {
        openCharacter(previousId);
    }
});
//next button
nextButton.addEventListener('click', () => {
    if (nextId != null) {
        openCharacter(nextId);
    }
});
//same as next and previous button but using the key down
document.addEventListener('keydown', event => {
    if (!modalElement.classList.contains('show')) {
        return;
    }

    if (event.key === 'ArrowLeft' && previousId != null) {
        openCharacter(previousId);
    }

    if (event.key === 'ArrowRight' && nextId != null) {
        openCharacter(nextId);
    }
});
