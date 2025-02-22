# Complete Guide to Prisma ORM: From Basics to Advanced

## What is an ORM?
An ORM (Object-Relational Mapping) is a programming technique that lets developers work with databases using object-oriented programming concepts. Instead of writing raw SQL queries, ORMs allow you to interact with your database using your programming language's native objects and methods. This abstraction makes database operations more intuitive, reduces code complexity, and helps prevent SQL injection vulnerabilities.

Key benefits of using an ORM:
- Write database queries using familiar programming language syntax
- Automatic conversion between database and programming language data types
- Built-in security features and query sanitization
- Database-agnostic code that can work with different database systems
- Simplified database schema management and migrations
- Type safety and better IDE support

## Introduction to Prisma
Prisma is a next-generation ORM (Object-Relational Mapping) that makes working with databases easy and type-safe for Node.js and TypeScript applications. It consists of several key components:

- **Prisma Client**: An auto-generated, type-safe query builder
- **Prisma Schema**: A declarative way to define your database schema
- **Prisma Migrate**: Database migration tool
- **Prisma Studio**: GUI for viewing/editing database data

## Basic Setup Guide

### 1. Project Initialization
```bash
# Create a new Node.js project
npm init -y

# Install Prisma dependencies
npm install @prisma/client
npm install prisma --save-dev

# Initialize Prisma in your project
npx prisma init
```

### 2. Database Schema Example
```prisma
// schema.prisma
datasource db {
  provider = "postgresql"  // Can be "mysql" or "sqlite" as well
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Basic Blog Schema
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  name      String?
  posts     Post[]    // Relation to Post model
  createdAt DateTime  @default(now())
}

model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String?
  published Boolean   @default(false)
  author    User      @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

## Basic Operations

### 1. Connecting to Database
```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Connect to the database
  await prisma.$connect()
  
  try {
    // Your database operations here
  } catch (error) {
    console.error(error)
  } finally {
    // Always disconnect
    await prisma.$disconnect()
  }
}
```

### 2. Basic CRUD Operations
```typescript
// Create a new user
async function createUser() {
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'John Doe',
    },
  })
  return user
}

// Read users
async function getUsers() {
  // Get all users
  const allUsers = await prisma.user.findMany()
  
  // Get specific user
  const user = await prisma.user.findUnique({
    where: {
      email: 'user@example.com',
    },
  })
  
  return { allUsers, user }
}

// Update user
async function updateUser(id: number) {
  const updated = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: 'Updated Name',
    },
  })
  return updated
}

// Delete user
async function deleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id: id,
    },
  })
}
```

## Intermediate Features

### 1. Relationships and Nested Queries
```typescript
// Create user with posts
async function createUserWithPosts() {
  const user = await prisma.user.create({
    data: {
      email: 'blogger@example.com',
      name: 'Blogger',
      posts: {
        create: [
          {
            title: 'First Post',
            content: 'This is my first post!',
            published: true,
          },
          {
            title: 'Draft Post',
            content: 'Work in progress...',
          },
        ],
      },
    },
    // Include related posts in response
    include: {
      posts: true,
    },
  })
  return user
}

// Query with filters and relations
async function getPublishedPosts() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      author: {
        email: {
          endsWith: '@example.com',
        },
      },
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return posts
}
```

### 2. Pagination and Filtering
```typescript
async function getPaginatedPosts(page: number, pageSize: number) {
  const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  
  const total = await prisma.post.count({
    where: {
      published: true,
    },
  })
  
  return {
    posts,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
  }
}
```

## Advanced Features

### 1. Transactions
```typescript
async function createPostWithTransaction() {
  return await prisma.$transaction(async (tx) => {
    // Create user
    const user = await tx.user.create({
      data: {
        email: 'transaction@example.com',
        name: 'Transaction User',
      },
    })
    
    // Create post for user
    const post = await tx.post.create({
      data: {
        title: 'Transaction Post',
        authorId: user.id,
        published: true,
      },
    })
    
    return { user, post }
  })
}
```

### 2. Middleware Example
```typescript
// Performance monitoring middleware
prisma.$use(async (params, next) => {
  const start = Date.now()
  const result = await next(params)
  const end = Date.now()
  
  console.log(`Query ${params.model}.${params.action} took ${end - start}ms`)
  return result
})

// Soft delete middleware
prisma.$use(async (params, next) => {
  if (params.action === 'delete') {
    // Change delete to update
    params.action = 'update'
    params.args['data'] = { deleted: true }
  }
  return next(params)
})
```

### 3. Advanced Queries
```typescript
// Complex filtering
async function advancedSearch() {
  const results = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: 'prisma',
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: 'database',
            mode: 'insensitive',
          },
        },
      ],
      AND: {
        published: true,
        author: {
          posts: {
            some: {
              published: true,
            },
          },
        },
      },
    },
  })
  return results
}
```

## Best Practices and Tips

1. **Connection Management**
   - Always handle connections properly
   - Use connection pooling for production
   - Close connections when done

2. **Error Handling**
   - Implement proper error handling
   - Use try-catch blocks
   - Handle unique constraint violations

3. **Performance**
   - Use `select` to only fetch needed fields
   - Implement pagination for large datasets
   - Use proper indexes
   - Optimize queries using `include` carefully

4. **Security**
   - Never expose database credentials
   - Use environment variables
   - Implement proper access control
   - Validate input data

## Common Gotchas and Solutions

1. **N+1 Query Problem**
```typescript
// Bad: N+1 queries
const users = await prisma.user.findMany()
for (const user of users) {
  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
  })
}

// Good: Single query with include
const users = await prisma.user.findMany({
  include: {
    posts: true,
  },
})
```

2. **Batch Operations**
```typescript
// Efficient batch create
const users = await prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
  ],
  skipDuplicates: true,
})
```

This guide provides a solid foundation for working with Prisma ORM, from basic setup to advanced features. Remember to:
- Keep your schema clean and well-documented
- Use types generated by Prisma Client
- Follow security best practices
- Optimize queries for performance
- Handle errors appropriately