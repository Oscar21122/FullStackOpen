```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML page
    deactivate server
    browser->>server: GET /data.json (for notes)
    activate server
    server-->>browser: JSON data (notes)
    deactivate server
    browser->>browser: Render notes using DOM

```
