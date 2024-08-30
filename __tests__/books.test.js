const request = require('supertest'); 
const app = require('../app'); 
const db = require('../db');

beforeEach(async function() {
    await db.query("DELETE FROM books");
    await db.query(`
      INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
      VALUES ('1234567890', 'http://a.co/eobPtX2', 'Test Author', 'english', 264, 'Test Publisher', 'Test Title', 2021)`);
  });
  
  afterAll(async function() {
    await db.end();
  });
  
  describe('POST /books', function () {
    test('Creates a new book with valid data', async function () {
      const newBook = {
        isbn: '0987654321',
        amazon_url: 'http://a.co/testurl',
        author: 'Another Author',
        language: 'english',
        pages: 350,
        publisher: 'Another Publisher',
        title: 'Another Title',
        year: 2022
      };
      const response = await request(app).post('/books').send(newBook);
      expect(response.statusCode).toBe(201);
      expect(response.body.book).toHaveProperty('isbn');
    });
  
    test('Responds with 400 for invalid data', async function () {
      const invalidBook = {
        isbn: '0987654321',
        amazon_url: 'not-a-url',
        author: 'Another Author',
        language: 'english',
        pages: 350,
        publisher: 'Another Publisher',
        title: 'Another Title',
        year: 2022
      };
      const response = await request(app).post('/books').send(invalidBook);
      expect(response.statusCode).toBe(400);
    });
  });
  