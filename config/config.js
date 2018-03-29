module.exports = {
  "development": {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || null,
    "database": "pet_match_db",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "pet_match_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "pet_match_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
