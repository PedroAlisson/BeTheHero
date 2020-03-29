const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Incidents", () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new Incidents", async () => {
    const response = await request(app)
      .post("/incidents")
      .set("authorization", "03032dea")
      .send({
        title: "Titulo do caso 03",
        description: "descricao do caso 03",
        value: 120
      });
    expect(response.body).toHaveProperty("id");
  });
});
