const mysql = require("mysql2");

const { DB_HOST, DB_USER, DB_NAME } = process.env;

// Connect without specifying DB to create it if not exists
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: process.env.DB_PASSWORD,
});

// Connect and create DB if needed
connection.connect((err) => {
  if (err) {
    console.error("Initial MySQL connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL server...");

  connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, (err) => {
    if (err) {
      console.error("Database creation failed:", err.message);
      process.exit(1);
    }
    console.log(`Database "${DB_NAME}" is ready.`);

    // Close initial connection
    connection.end();
  });
});

// Now create connection to the specific database
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: process.env.DB_PASSWORD,
});
db.connect((err) => {
  if (err) {
    console.error("MySQL connection to DB failed:", err.message);
    process.exit(1);
  }
  console.log(`✅ Connected to database "${DB_NAME}"`);

  // Create 'blogs' table if not exists
  const createBlogsTableQuery = `
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image VARCHAR(255),
      category VARCHAR(100) NOT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
      -- You can add FOREIGN KEY (user_id) if you have users table
    )
  `;

  db.query(createBlogsTableQuery, (err) => {
    if (err) {
      console.error("Failed to create blogs table:", err.message);
      process.exit(1);
    }
    console.log("Blogs table is ready.");
  });
});
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

db.query(createUsersTableQuery, (err) => {
  if (err) {
    console.error("Failed to create users table:", err.message);
    process.exit(1);
  }
  console.log("✅ Users table is ready.");
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection to DB failed:", err.message);
    process.exit(1);
  }
  console.log(`✅ Connected to database "${DB_NAME}"`);
});

module.exports = db;
