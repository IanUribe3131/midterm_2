# Team AI Prompt & Audit Log
**Team Members:** Ian Uribe, Sebastian Aguilar


---

## Log Entry

**Goal:** Separate the Express app into routes, controllers and services.

**Prompt**: "How can I organize the Express app in routes, controllers and services so the routes don't have the fetch calls?"

**Tool** : Chatgpt GPT-6

**The Human Audit & Modifications**: AI put the fetch and the status codes inside the routes. We moved the external API calls to the service and the request handling to the controller. It also used /api/characters in some places and /api/character in others, so we left only /api/character.

**Integration & Learnings**: The route only receives the request, the controller answers it and the service talks to the Star Wars API. We learned the route → controller → service flow.


---

**Goal:** Make the search return the exact character name.

**Prompt**: "How can I search a character by its exact name and return a 404 when there is no match?"

**Tool** : Chatgpt GPT-6

**The Human Audit & Modifications**: AI used includes() and returned partial matches. We changed it to trim the text, compare in lowercase and use ===. It also returned the character alone, so we wrapped it in an array to keep the same format as the catalog.

**Integration & Learnings**: The search result and the full catalog use the same render function in the frontend.

---

**Goal:** Add previous and next navigation to the character detail.

**Prompt**: "How can I get the previous and next character in the modal if the ids are not consecutive?"

**Tool** : Chatgpt GPT-6

**The Human Audit & Modifications**: AI used id - 1 and id + 1, which skipped characters. We changed it to find the position in the array and use modulo to go back to the first or last character. AI also did this in the controller, so we moved it to the service.

**Integration & Learnings**: The backend sends prevId and nextId with the character, so the modal can navigate without the full list.

---


**Goal:** Give the page a Star Wars style without breaking Bootstrap.

**Prompt**: "How can I give the page a Star Wars look with Bootstrap and still keep the grid and the modal working?"

**Tool** : Chatgpt GPT-6

**The Human Audit & Modifications**: AI kept the red hover from the starter, which did not match the gold details. We changed it to gold and added a shadow.

**Integration & Learnings**: The styles override Bootstrap colors without changing its components.

---

**Goal:** Make the default image according to the theme of the page

**Prompt**: "Create a starwars blade as default image, in the same way as the actual default image has been created. With an offline svg."

**Tool** : Chatgpt GPT-6

**The Human Audit & Modifications**: There weren't issues

**Integration & Learnings**: New default image for the page.

---