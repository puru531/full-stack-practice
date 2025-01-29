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
