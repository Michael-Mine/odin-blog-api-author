# Blog API - Frontend Repo for Authors

A frontend only repo for a blog web app using React, Vite and React Router and tested using Vitest and React Testing Library.

This web app is for the authors of the blog who, after logging in, can create and edits posts with the ability to publish or unpublish posts for the readers. Authors can also delete comments made by the readers.

It connects to a completely separate backend API repo which I developed using Node, Express, PostgreSQL and Prisma ORM.

I also developed a completely separate frontend web app for readers of the blog, who can view the posts and leave comments. To leave comments, they must sign up and login.

Live Link: https://mrmine-blog-api-author.netlify.app/

Credentials to access - Email: "mr@mine.net" Pass: "123"

This project is from The Odin Project course in the Node section.

By building these 3 repos from scratch, this will help solidify my recent learning of developing REST APIs and using JSON Web Tokens for stateless authentication between the frontend and backend.

The API only backend and PostGreSQL database is hosted on Railway and both frontend's are hosted on Netlify.

The backend API and other frontend repos and live link are here:

https://github.com/Michael-Mine/odin-blog-api

https://github.com/Michael-Mine/odin-blog-api-user

Live Link: https://mrmine-blog-api-user.netlify.app/

![Screenshot](./public/screenshot-blog-api.png)

## Highlights

- **Authentication**: Stateless authentication using JSON Web Tokens (JWTs) issued from the backend and held in the frontend using localstorage.

- **Relational Logic**: Users, Posts, and Comments modeled with relational schemas.

---

## Tech Stack

| Layer    | Technologies                        |
| -------- | ----------------------------------- |
| Frontend | React, JavaScript, Vite, Native CSS |
| Backend  | Node, Express, JavaScript, JWTs     |
| Database | PostgreSQL, Prisma ORM              |
| Testing  | Vitest, React Testing Library       |

---

## System Architecture

The application is split into a 3 repos for clear separation of concerns.

- **Server**: A RESTful API focused on controller functions and middleware validation.
- **Clients**: Component-based SPAs utilizing React Router for navigation and PropTypes for type checking.

---

## Database Schema

```prisma
model User {
  id        Int       @id @default(autoincrement())
  cuid      String    @default(cuid(2))
  firstName String
  lastName  String
  username  String    @unique
  password  String
  isAuthor  Boolean   @default(false)
  posts     Post[]
  comments  Comment[]
}

model Post {
  id            Int       @id @default(autoincrement())
  title         String
  content       String
  picUrl        String?
  author        User      @relation(fields: [authorId], references: [id])
  authorId      Int       @default(1)
  isPublished   Boolean   @default(false)
  datePublished DateTime?
  comments      Comment[]
}

model Comment {
  id        Int       @id @default(autoincrement())
  content   String
  date      DateTime  @default(now())
  author    User      @relation(fields: [authorId], references: [id])
  authorId  Int
  post      Post      @relation(fields: [postId], references: [id])
  postId    Int
}
```

---

## Local Development

### Setup

**1. Clone & Install:**

```bash
git clone https://github.com/Michael-Mine/odin-blog-api-author.git

npm install
```

**2. Run App:**

```bash
npm run dev
```

**3. Run Tests:**

```bash
npm run test
```
