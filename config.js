/** Common config for bookstore. */

// Replace with your actual PostgreSQL credentials
let DB_URI = `postgresql://mathewstevens:new_password@localhost:5432`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/books-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;
}

module.exports = { DB_URI };
