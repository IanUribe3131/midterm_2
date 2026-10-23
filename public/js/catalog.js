const DEFAULT_IMAGE = 'https://placehold.co/300x400/111827/FFFFFF?text=No+Image';

export function renderCatalog(characters, onSelect) {
    const grid = document.getElementById('catalog-grid');
    const count = document.getElementById('catalog-count');
    const subtitle = document.getElementById('catalog-subtitle');

    grid.replaceChildren();
    count.textContent = `${characters.length} characters`;
    subtitle.textContent = 'Explore the galaxy';

    characters.forEach(character => {
        const column = document.createElement('div');
        column.className = 'col';

        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'card char-card h-100 w-100 text-start';
        card.setAttribute('aria-label', `View ${character.name}`);

        const image = document.createElement('img');
        image.className = 'card-img-top char-card-img';
        image.alt = character.name;
        image.loading = 'lazy';
        image.src = character.image || DEFAULT_IMAGE;

        image.addEventListener('error', () => {
            image.onerror = null;
            image.src = DEFAULT_IMAGE;
        });

        const body = document.createElement('div');
        body.className = 'card-body';

        const id = document.createElement('span');
        id.className = 'badge text-bg-secondary mb-2';
        id.textContent = `ID: ${character.id}`;

        const name = document.createElement('h6');
        name.className = 'card-title fw-bold mb-1';
        name.textContent = character.name;

        const species = document.createElement('p');
        species.className = 'card-text small text-secondary mb-0';
        species.textContent = character.species || 'Unknown species';

        body.append(id, name, species);
        card.append(image, body);

        card.addEventListener('click', () => {
            onSelect(character.id);
        });

        column.appendChild(card);
        grid.appendChild(column);
    });
}