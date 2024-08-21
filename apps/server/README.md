# Googui Maps - API

This is the API documentation for Googui Maps, containing all the endpoints, their functionalities and instructions on how to use them.

## Getting Started

### Prerequisites

- Node.js
- Package Manager (`pnpm`)
- Docker

### Installation

1. Clone the repository

    ```bash
    git clone https://gitlab.com/jala-university1/cohort-1/oficial-pt-programa-o-4-apr-221/se-o-b/pes-de-pano
    ```

2. Install dependencies

    ```bash
    pnpm install
    ```

3. Create a `.env.docker` file in the root directory and add the following variables:

    ```bash
    # MongoDB configuration
    MONGODB_ROOT_PASSWORD=secret
    MONGODB_USERNAME=googui
    MONGODB_PASSWORD=secret
    MONGODB_DATABASE=googui_maps

    # PostgreSQL Configuration
    POSTGRESQL_USERNAME=googui
    POSTGRESQL_PASSWORD=secret
    POSTGRESQL_DATABASE=googui_maps
    ```

4. Enter the `apps/server` directory

    ```bash
    cd apps/server
    ```

5. Up containers

    ```bash
    pnpm services:up
    ```

6. Start the application

    ```bash
    pnpm start
    ```

7. Open your browser and navigate to `http://localhost:3333/docs`

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

## Requirements

### Functional Requirements

- [x] Should be able to create a map
- [x] Should be able to get a specific map
- [x] Should be able to edit a map
- [x] Should be able to delete a map with all its associated data
- [x] Should be able to create an obstacle to a map
- [x] Should be able to get all obstacles of a map
- [x] Should be able to edit an obstacle of a map
- [x] Should be able to delete a specific obstacle of a map
- [x] Should be able to create a waypoint to a map
- [x] Should be able to get all waypoints of a map
- [x] Should be able to edit a waypoint of a map
- [x] Should be able to delete a specific waypoint of a map
- [ ] Should be able to create a route and calculate the best path to a map
- [x] Should be able to get the best route of a map
- [x] Should be able to delete a specific route of a map
- [x] Should be able to register a user
- [x] Should be able to authenticate a user
- [x] Should be able to get all users if is admin
- [x] Should be able to get user information
- [x] Should be able to edit a user
- [x] Should be able to delete a specific user with all its associated data

### Business Requirements

- [ ] Map should have a valid id and limits
- [ ] Map should have at least one obstacle and one waypoint
- [ ] Map should calculate the best path between start and end point
- [ ] Waypoints should be within the map limits
- [ ] Obstacles should be within the map limits
- [ ] Algorithm should be able to handle multiple obstacles and waypoints
- [ ] Best path should consider the obstacles and waypoints
- [x] Should view the waypoints and obstacles of a map
- [x] User should be authenticated
- [ ] Start and end point should be different
- [ ] Start and end point should not be blocked by obstacles
- [ ] Route should be within the map limits
- [ ] Map should not have cyclic dependencies

### Non-functional Requirements

- [ ] System should implement the A* algorithm
- [x] Data should be stored in a PostgreSQL/MongoDB database
- [x] User must be identified by a JWT token
- [ ] Handle with memory leaks and infinite loops when calculating the best path
- [x] Handle with errors using fastify error handler
- [x] User id must be a UUID

### Endpoints

#### Map

- POST `/api/maps`
- GET `/api/maps/:mapId`
- PUT `/api/maps/:mapId`
- DELETE `/api/maps/:mapId`

#### Obstacle

- POST `/api/maps/:mapId/obstacles`
- GET `/api/maps/:mapId/obstacles`
- PUT `/api/maps/:mapId/obstacles/:obstacleId`
- DELETE `/api/maps/:mapId/obstacles/:obstacleId`

#### Waypoint

- POST `/api/maps/:mapId/waypoints`
- GET `/api/maps/:mapId/waypoints`
- PUT `/api/maps/:mapId/waypoints/:waypointId`
- DELETE `/api/maps/:mapId/waypoints/:waypointId`

#### Route

- POST `/api/maps/:mapId/routes`
- GET `/api/maps/:mapId/routes/:routeId`
- DELETE `/api/maps/:mapId/routes/:routeId`

#### User

- POST `/api/users/auth/register`
- POST `/api/users/auth/login`
- GET `/api/users` # Only admin
- GET `/api/users/profile`
- PUT `/api/users`
- DELETE `/api/users` # Also deletes all maps associated
