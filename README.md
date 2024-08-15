# Googui Maps

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff&style=for-the-badge)
![MONGO_BADGE](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
<!-- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) -->

## 🚀 Getting Started

This project is a simple maps application, that gives a simple solution to find the best path between two points on a map. Inspired by Google Maps, but with a focus on the routing functionality.

### Prerequisites

- Node.js
- Docker

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/joaopaulo-dev/googui-maps.git
    ```

2. Install dependencies

    ```bash
    pnpm install
    ```

3. Up containers

    ```bash
    pnpm services:up
    ```

4. Start the application

    ```bash
    pnpm start
    ```

5. Open your browser and navigate to `http://localhost:3333/docs`

### Running the tests

- Run tests

    ```bash
    pnpm test
    ```

- Run tests on watch mode

    ```bash
    pnpm test:watch
    ```

- Run tests on coverage mode

    ```bash
    pnpm test:coverage
    ```

- Run tests on UI mode

    ```bash
    pnpm test:ui
    ```

## 📝 Requirements

### Functional Requirements

- [ ] Should be able to create a map
- [ ] Should be able to get a specific map
- [ ] Should be able to edit a map
- [ ] Should be able to delete a map with all its associated data
- [ ] Should be able to create an obstacle to a map
- [ ] Should be able to get all obstacles of a map
- [ ] Should be able to edit an obstacle of a map
- [ ] Should be able to delete a specific obstacle of a map
- [ ] Should be able to create a waypoint to a map
- [ ] Should be able to get all waypoints of a map
- [ ] Should be able to edit a waypoint of a map
- [ ] Should be able to delete a specific waypoint of a map
- [ ] Should be able to create a route and calculate the best path to a map
- [ ] Should be able to get all routes of a map
- [ ] Should be able to delete a specific route of a map
- [ ] Should be able to create a user
- [ ] Should be able to get user information
- [ ] Should be able to edit a user
- [ ] Should be able to delete a specific user

### Business Requirements

- [ ] Map should have a valid id, start point and end point
- [ ] Map should have at least one obstacle and one waypoint
- [ ] Map should calculate the best path between start and end point
- [ ] Waypoints should be within the map limits
- [ ] Obstacles should be within the map limits
- [ ] Algorithm should be able to handle multiple obstacles and waypoints
- [ ] Best path should consider the obstacles and waypoints
- [ ] Should view the waypoints and obstacles of a map
- [ ] User should be authenticated
- [ ] Map limits should be valid
- [ ] Start and end point should be different
- [ ] Start and end point should not be blocked by obstacles
- [ ] Map should not have cyclic dependencies
- [ ] Route should be within the map limits

### Non-functional Requirements

- [ ] System should implement the A* algorithm
- [ ] Data should be stored in a PostgreSQL/MongoDB database
- [ ] User must be identified by a JWT token
- [ ] Handle with memory leaks and infinite loops when calculating the best path
- [ ] Handle with errors using fastify error handler

### Endpoints

#### Map

- POST `/api/maps`
- GET `/api/maps/:mapId`
- PUT `/api/maps/:mapId`
- DELETE `/api/maps/:mapId`

#### Obstacle

- POST `/api/map/:mapId/obstacles`
- GET `/api/map/:mapId/obstacles`
- PUT `/api/obstacles/:obstacleId`
- DELETE `/api/map/:mapId/obstacles/:obstacleId`

#### Waypoint

- POST `/api/map/:mapId/waypoints`
- GET `/api/map/:mapId/waypoints`
- PUT `/api/waypoints/:waypointId`
- DELETE `/api/map/:mapId/waypoints/:waypointId`

#### Route

- POST `/api/map/:mapId/routes`
- GET `/api/map/:mapId/routes/:routeId`
- DELETE `/api/map/:mapId/routes/:routeId`

#### User

- POST `/api/users`
- GET `/api/users/:userId`
- PUT `/api/users/:userId`
- DELETE `/api/users/:userId` # Also deletes all maps associated
