Databases are of many types, but two popular ones are SQL and NoSQL databases.

## SQL Databases

SQL databases are relational databases. They store data in tables, and the relationships between the tables are defined by the schema. SQL databases are good for complex queries and transactions. Examples of SQL databases are MySQL, PostgreSQL, and SQLite.

## NoSQL Databases

NoSQL databases are non-relational databases. They store data in collections, and the relationships between the collections are not defined by the schema. NoSQL databases are good for large amounts of data and for data that doesn't fit into a schema. Examples of NoSQL databases are MongoDB, Cassandra, and Redis.

## Postgres Database

Postgres is a popular open-source SQL database. It is known for its reliability, performance, and extensibility. Postgres supports many advanced features such as full-text search, JSON support, and geospatial data types. Postgres is widely used in web applications, data warehousing, and geospatial applications.

### Installation

To install Postgres on your machine, you can follow the instructions on the [official website](https://www.postgresql.org/download/).

### Connecting to Postgres

To connect to Postgres, the format of the connection string is `postgres://username:password@host:port/database`. You can use a GUI tool like pgAdmin or a command-line tool like psql to connect to Postgres.

## pg library

The `pg` library is a popular Node.js library for interacting with Postgres databases. It provides a simple and clean API for executing SQL queries and managing transactions. You can install the `pg` library using npm:

```bash
npm install pg
npm install @types/pg
```

### Creating tables

To create a table in Postgres, you can use the `CREATE TABLE` SQL command. Here is an example of creating a `users` table with `id`, `name`, and `email` columns:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  done BOOLEAN NOT NULL DEFAULT FALSE
);
```

#### Creating tables through typescript

```typescript
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "password",
  port: 5432,
});

pool.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`);

pool.query(`
  CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    done BOOLEAN NOT NULL DEFAULT FALSE
  );
`);
```

### Dropping tables

To drop a table in Postgres, you can use the `DROP TABLE` SQL command. Here is an example of dropping the `users` table:

```sql
DROP TABLE users;
```

```sql
DROP TABLE todos;
```

#### Dropping tables through typescript

```typescript
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "password",
  port: 5432,
});

pool.query("DROP TABLE users;");
pool.query("DROP TABLE todos;");
```

### Inserting data

To insert data into a table, you can use the `INSERT INTO` SQL command. Here is an example of inserting a row into the `users` table:

```sql
INSERT INTO users (name, email, password)
VALUES ('John Doe', 'abc@example.com', 'password123');
```

```sql
INSERT INTO todos (user_id, title, description, done)
VALUES (1, 'Buy groceries', 'Milk, eggs, bread', false);
```

#### Inserting data through typescript

```typescript
const insertUserText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)'; // $ is a placeholder for the values, to prevent SQL injection
const insertUserValues = ['John Doe', 'abc@example.com', 'password123'];

let res = await pool.query(insertUserText, insertUserValues);

const insertTodoText = 'INSERT INTO todos (user_id, title, description, done) VALUES ($1, $2, $3, $4)' RETURNING id;
const insertTodoValues = [res.rows[0].id, 'Buy groceries', 'Milk, eggs, bread', false];

await pool.query(insertTodoText, insertTodoValues);

```

### Querying data

To query data from a table, you can use the `SELECT` SQL command. Here is an example of querying all rows from the `users` table:

```sql
SELECT * FROM users;
```

```sql
SELECT * FROM todos WHERE user_id = 1;
```

### Updating data

To update data in a table, you can use the `UPDATE` SQL command. Here is an example of updating the `name` of a user with `id` 1:

```sql
UPDATE users SET name = 'Jane Doe' WHERE id = 1;
```

```sql
UPDATE todos SET done = true WHERE id = 1;
```

### Deleting data

To delete data from a table, you can use the `DELETE` SQL command. Here is an example of deleting a user with `id` 1:

```sql
DELETE FROM users WHERE id = 1;
```

```sql
DELETE FROM todos WHERE id = 1;
```

## Relations

Relations are the way to connect data between tables. In SQL databases, relations are defined by foreign keys. A foreign key is a column in a table that references the primary key of another table. This establishes a relationship between the two tables.

### One-to-Many

In a one-to-many relationship, one row in a table can be related to many rows in another table. For example, a user can have many todos. To establish a one-to-many relationship, you can add a foreign key column in the child table that references the primary key of the parent table.

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id), -- foreign key
  title VARCHAR(255) NOT NULL,
  description TEXT,
  done BOOLEAN NOT NULL DEFAULT FALSE
);
```

### Many-to-Many

In a many-to-many relationship, many rows in one table can be related to many rows in another table. For example, a user can have many roles, and a role can be assigned to many users. To establish a many-to-many relationship, you can create a junction table that connects the two tables.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user_roles (
  user_id INTEGER REFERENCES users(id), -- foreign key
  role_id INTEGER REFERENCES roles(id) -- foreign key
);
```

### One-to-One

In a one-to-one relationship, one row in a table is related to one row in another table. For example, a user can have one profile. To establish a one-to-one relationship, you can add a foreign key column in one of the tables that references the primary key of the other table.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id), -- foreign key
  bio TEXT
);
```

## Joins

Joins are used to combine rows from two or more tables based on a related column between them. There are different types of joins in SQL:

- INNER JOIN: Returns rows when there is a match in both tables.
- LEFT JOIN: Returns all rows from the left table and the matched rows from the right table.
- RIGHT JOIN: Returns all rows from the right table and the matched rows from the left table.
- FULL JOIN: Returns rows when there is a match in one of the tables.

```sql
SELECT users.name, todos.title
FROM users
INNER JOIN todos ON users.id = todos.user_id;
```

```sql
SELECT users.name, todos.title
FROM users
LEFT JOIN todos ON users.id = todos.user_id;
```

```sql
SELECT users.name, todos.title
FROM users
RIGHT JOIN todos ON users.id = todos.user_id;
```

```sql
SELECT users.name, todos.title
FROM users
FULL JOIN todos ON users.id = todos.user_id;
```

## Indexes

Indexes are used to speed up the retrieval of data from a table. They are created on columns in a table to improve the performance of queries that filter, sort, or group by those columns. There are different types of indexes in SQL:

- B-tree index: The default index type in most databases.
- Hash index: Used for equality comparisons.
- GiST index: Used for geometric data types.
- GIN index: Used for full-text search.

```sql
CREATE INDEX users_name_index ON users (name);
```

```sql
CREATE INDEX todos_user_id_index ON todos (user_id);
```

## Views

Views are virtual tables that are created by a query. They are used to simplify complex queries and to hide the underlying structure of the database. Views can be queried like regular tables, but they do not store any data themselves.

```sql
CREATE VIEW user_todos AS
SELECT users.name, todos.title
FROM users
INNER JOIN todos ON users.id = todos.user_id;
```

```sql
SELECT * FROM user_todos;
```

## Transactions

Transactions are used to group multiple SQL commands into a single unit of work. They ensure that all the commands are executed together or none of them are executed. Transactions are used to maintain data integrity and consistency in the database.

```typescript
const client = await pool.connect();

try {
  await client.query("BEGIN");

  await client.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    ["John Doe", "emailid@domain.com", "password123"]
  );
  await client.query(
    "INSERT INTO todos (user_id, title, description, done) VALUES ($1, $2, $3, $4)",
    [1, "Buy groceries", "Milk, eggs, bread", false]
  );

  await client.query("COMMIT");
} catch (e) {
  await client.query("ROLLBACK");
  throw e;
} finally {
  client.release();
}
```

## Conclusion

Postgres is a powerful SQL database that is widely used in web applications, data warehousing, and geospatial applications. It supports many advanced features such as full-text search, JSON support, and geospatial data types. The `pg` library provides a simple and clean API for interacting with Postgres databases in Node.js. By using SQL commands, you can create tables, insert data, query data, update data, and delete data in Postgres. You can also establish relationships between tables, create indexes, create views, and manage transactions in Postgres. Postgres is a versatile database that can handle a wide range of use cases and workloads.
