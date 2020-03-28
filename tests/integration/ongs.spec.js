const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
  })

  it('Should return the id of a new ONG', async () =>{
    const response = await request(app)
        .post('/ongs')
        .send({
            name: "Eco Associados3",
            email: "contato@ecoassociados.com",
            whatsapp: "81995657789",
            city: "Ipojuca",
            uf: "PE"
          })

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })

  it('Should return status 400, name is required', async () =>{
    const response = await request(app)
        .post('/ongs')
        .send({
            email: "contato@ecoassociados.com",
            whatsapp: "81995657789",
            city: "Ipojuca",
            uf: "PE"
          })

    expect(response.status).toBe(400);
  })

  it('Should return status 400, email is required', async () =>{
    const response = await request(app)
        .post('/ongs')
        .send({
            name: "Eco Associados3",
            whatsapp: "81995657789",
            city: "Ipojuca",
            uf: "PE"
          })

    expect(response.status).toBe(400);
  })

  it('Should return status 400, email is not well formatted', async () =>{
    const response = await request(app)
        .post('/ongs')
        .send({
            name: "Eco Associados3",
            email: "contatoecoassociadoscom",
            whatsapp: "81995657789",
            city: "Ipojuca",
            uf: "PE"
          })

    expect(response.status).toBe(400);
  })

  it('Should return status 400, whatsapp is required', async () =>{
    const response = await request(app)
        .post('/ongs')
        .send({
            name: "Eco Associados3",
            email: "contato@ecoassociados.com",
            city: "Ipojuca",
            uf: "PE"
          })

    expect(response.status).toBe(400);
  })

  it('Should return status 400, whatsapp is not well formatted', async () =>{
    const response = await request(app)
        .post('/ongs')
        .send({
            name: "Eco Associados3",
            email: "contato@ecoassociados.com",
            whatsapp: "8199565",
            city: "Ipojuca",
            uf: "PE"
          })

    expect(response.status).toBe(400);
  })

  it('Should return status 400, city is required', async () =>{
    const response = await request(app)
        .post('/ongs')
        .send({
            name: "Eco Associados3",
            email: "contato@ecoassociados.com",
            whatsapp: "81995657789",
            uf: "PE"
          })

    expect(response.status).toBe(400);
  })

  it('Should return status 400, uf is required', async () =>{
    const response = await request(app)
        .post('/ongs')
        .send({
            name: "Eco Associados3",
            email: "contato@ecoassociados.com",
            whatsapp: "81995657789",
            city: "Ipojuca",
          })

    expect(response.status).toBe(400);
  })
})