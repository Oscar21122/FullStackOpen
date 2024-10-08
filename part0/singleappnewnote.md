```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>browser: Create new note (JS)
    browser->>server: POST /new_note_spa (JSON data)
    activate server
    server-->>browser: 201 Created
    deactivate server
    browser->>browser: Add new note to DOM
```
