# It-Worked-on-my-machine Frontend
- This is the frontend ReactJS web app of Mazematics

### How to View
- Web App: http://172.21.148.167/
- Docs: http://172.21.148.167/docs

## Directory Structure
### Subsystems
- Teaching Platform: `src/components/teaching`
- Learning Platform: `src/components/learning`
- Account Management System: `src/components/accounts`
- Gaming System: `src/components/game`

### Components
- Inside a subsystem, there are multiple components
- Each component should have:
    - `index.js`: Source file for React component
    - `index.test.js`: Unit testing file for React component

## Development
### Prerequisite
1. Install [Node.js](https://nodejs.org/en/)
2. `npm install` (only need to run once to download packages or when the `package.json` is updated)

### How to Run Development Server
1. `npm start`

#### How to Run Docs Server
1. `npm run docs-dev`

#### How to Run Tests
1. `npm test`

## Production
### Prerequisite
1. Install [Docker](https://www.docker.com/)

### How to Deploy
1. `docker-compose up -d --build` (it may take a while)

### How to Pause & Resume
- Pause: `docker-compose stop`
- Resume: `docker-compose start`

### How to View Logs
1. `docker logs mazematics-client -f`