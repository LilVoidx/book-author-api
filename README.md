# Book-Author API

A RESTful API built with **NestJS**, **TypeORM**, and **PostgreSQL** for managing books and authors.

---

## Features

- **Authors Management**:
  - Create, read, update, and delete authors
  - Each author can have multiple books
  - fields: `name`, `bio`, `birthDate`, `nationality`

- **Books Management**:
  - Create, read, update, and delete books
  - Each book is associated with an author
  - fields: `title`, `description`, `publishedDate`, `genre`

- **Validation**:
  - Input validation using `class-validator` and `class-transformer`
  - Custom error handling with centralized exception filters

- **Database**:
  - PostgreSQL database
  - TypeORM for database operations and entity management

- **Docker**:
  - Dockerized application and database for deployment
  - Docker Compose

---

## Technologies Used

- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: `class-validator`, `class-transformer`
- **Containerization**: Docker, Docker Compose

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-author-api.git
cd book-author-api
```

### 2. Set Up Environment Variables

Create a `.env` file or copy the `.env.example` without example in the root directory and add the following variables:

```env
PORT=port
DB_HOST=db
DB_PORT=5432
DB_USERNAME=yourusername
DB_PASSWORD=yourpassword
DB_DATABASE=bookauthor
```

### 3. Run the Application with Docker

Start the application and database using Docker Compose:

```bash
docker-compose up --build
```
or without docker
```bash
yarn run start:dev
```

The API will be available at `http://localhost:3000`.

---

## API Documentation

### Base URL

```
http://localhost:3000
```

### Authors Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/authors`        | Get all authors with their books.    |
| GET    | `/authors/:id`    | Get a specific author by ID.         |
| POST   | `/authors`        | Create a new author.                 |
| PUT    | `/authors/:id`    | Update an author by ID.              |
| DELETE | `/authors/:id`    | Delete an author by ID.              |

#### Example Requests

- **Create an Author**:
  ```bash
  curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "test name",
    "bio": "this is a bio)",
    "birthDate": "1990-04-31",
    "nationality": "Russian"
  }'
  ```

- **Get All Authors**:
  ```bash
  curl -X GET http://localhost:3000/authors
  ```

---

### Books Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/books`          | Get all books with their authors.    |
| GET    | `/books/:id`      | Get a specific book by ID.           |
| POST   | `/books`          | Create a new book.                   |
| PUT    | `/books/:id`      | Update a book by ID.                 |
| DELETE | `/books/:id`      | Delete a book by ID.                 |

#### Example Requests

- **Create a Book**:
  ```bash
  curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "book title",
    "description": "This is a book i guess",
    "publishedDate": "2003-09-03",
    "genre": "genre",
    "authorId": 1
  }'
  ```

- **Get All Books**:
  ```bash
  curl -X GET http://localhost:3000/books
  ```
---

## Error Handling

The API has a centralized exception filter to handle errors
All errors return a consistent JSON response:

```json
{
  "statusCode": 404,
  "message": "Author with ID 1 not found",
  "timestamp": "timestamp"
}
```

---