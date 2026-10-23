// Offline SVG Fallback for missing/broken sprites
const DEFAULT_IMAGE = "data:image/svg+xml;utf8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="100%" height="100%" fill="#2b3035"/>
    <circle cx="100" cy="100" r="60" fill="none" stroke="#6c757d" stroke-width="8"/>
    <line x1="40" y1="100" x2="160" y2="100" stroke="#6c757d" stroke-width="8"/>
    <circle cx="100" cy="100" r="18" fill="#2b3035" stroke="#6c757d" stroke-width="8"/>
    <text x="50%" y="185" font-family="sans-serif" font-size="14" fill="#adb5bd" text-anchor="middle">No Image</text>
  </svg>
`);

import { getCharacters } from './api.js';
import { renderCatalog } from './catalog.js';
import { openCharacter } from './characterDetails.js';

// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const catalogSection = document.getElementById('catalog-section');
const loadingSpinner = document.getElementById('loading-spinner');
const errorView = document.getElementById('error-view');
const errorMessage = document.getElementById('error-message');

const clearSearchButton = document.getElementById('clear-search-btn');
const errorResetButton = document.getElementById('error-reset-btn');
const brandReset = document.getElementById('brand-reset');

let catalogRequestNumber = 0;

async function loadCatalog(search = '') {
    const thisRequest = ++catalogRequestNumber;

    loadingSpinner.classList.remove('d-none');
    catalogSection.classList.add('d-none');
    errorView.classList.add('d-none');

    try {
        const characters = await getCharacters(search);

        if (thisRequest !== catalogRequestNumber) {
            return;
        }

        renderCatalog(characters, openCharacter);
        catalogSection.classList.remove('d-none');
    } catch (error) {
        if (thisRequest !== catalogRequestNumber) {
            return;
        }

        errorMessage.textContent = error.message;
        errorView.classList.remove('d-none');
    } finally {
        if (thisRequest === catalogRequestNumber) {
            loadingSpinner.classList.add('d-none');
        }
    }
}