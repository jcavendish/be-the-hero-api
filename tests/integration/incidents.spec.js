const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  })

  it('Should return status 400, authorization not set', async () =>{
    const response = await request(app)
        .post('/incidents')
        .send({
          title: "Turtles from Maracaípe",
          description: "The turtles of Maracaípe need more space...",
          value: 200
        })

    expect(response.status).toBe(400);
  })

})