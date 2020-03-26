const connection = require("../database/connection");

const PAGE_SIZE = 5;

module.exports = {
  async index(request,response) {
    const page = request.query.page > 0 ? request.query.page : 1;

    const count = await connection("incidents")
        .count("*")
        .first();

    const incidents = await connection("incidents")
        .select("incidents.*", "ongs.name", "ongs.email", "ongs.whatsapp", "ongs.city", "ongs.uf")
        .join("ongs", "incidents.ong_id", "ongs.id")
        .limit(PAGE_SIZE)
        .offset((page - 1) * 5);
    
    response.set('x-total-count', count['count(*)']);
    return response.json(incidents);
  },
  async create(request,response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;
    
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    })

    return response.json({id});
  },
  async delete(request, response) {
    const id = request.params.id;
    const incident = await connection("incidents")
        .where("id", id)
        .select("ong_id")
        .first();

    if (incident.ong_id !== request.headers.authorization) {
      return response.status(401).send("Operation not permitted");
    }
    await connection("incidents")
        .where("id", "=", id)
        .del();
        
    return response.status(204).send();
  }
}