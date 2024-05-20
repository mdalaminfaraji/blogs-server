# Blog Platform

## Description

This is a simple blog platform where users can create, read, update, and delete blog posts.

## Requirements

- Node.js
- Express.js
- PostgreSQL

## Setup

### Back-End

1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Set up your PostgreSQL database and update the connection details in `controllers/posts.js`.
4. Run `npm start` to start the server.

## Deployment

- [Back-End on vercel](https://blog-server-hazel.vercel.app/)

## API Endpoints

### Fetch All Blog Posts

- **URL:** `/posts`
- **Method:** `GET`
- **Description:** Fetch all blog posts.
- **Response:**
  - **200 OK:** An array of blog posts.

### Fetch a Single Blog Post by ID

- **URL:** `/posts/:id`
- **Method:** `GET`
- **Description:** Fetch a single blog post by ID.
- **URL Parameters:**
  - `id` (string): The ID of the blog post.
- **Response:**
  - **200 OK:** The blog post object.
  - **404 Not Found:** If the blog post is not found.

### Create a New Blog Post

- **URL:** `/posts`
- **Method:** `POST`
- **Description:** Create a new blog post.
- **Request Body:**
  - `title` (string): The title of the blog post.
  - `subtitle` (string): The subtitle of the blog post.
  - `description` (string): The description of the blog post.
  - `imageUrl` (string): The imageUrl of the blog post.
  - `author` (string): The author of the blog post.
  - `readTime` (number): The readTime of the blog post.
- **Response:**
  - **201 Created:** The created blog post object.

### Update an Existing Blog Post by ID

- **URL:** `/posts/:id`
- **Method:** `PUT`
- **Description:** Update an existing blog post by ID.
- **URL Parameters:**
  - `id` (string): The ID of the blog post.
- **Request Body:**
  - `title` (string, optional): The title of the blog post.
  - `subtitle` (string, optional): The subtitle of the blog post.
  - `description` (string, optional): The description of the blog post.
  - `imageUrl` (string, optional): The imageUrl of the blog post.
  - `author` (string, optional): The author of the blog post.
  - `readTime` (number, optional): The readTime of the blog post.
- **Response:**
  - **200 OK:** The updated blog post object.
  - **404 Not Found:** If the blog post is not found.

### Delete a Blog Post by ID

- **URL:** `/posts/:id`
- **Method:** `DELETE`
- **Description:** Delete a blog post by ID.
- **URL Parameters:**
  - `id` (string): The ID of the blog post.
- **Response:**
  - **200 OK:** Confirmation of deletion.
  - **404 Not Found:** If the blog post is not found.

## Future Improvements

- Add authentication and authorization.
- Implement comments for blog posts.
- Improve the UI with a design framework like Material-UI or Bootstrap.

## Assumptions

- The user is familiar with setting up a PostgreSQL database.
- Basic knowledge of React, Node.js, and Next.js.
