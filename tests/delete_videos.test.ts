import request from "supertest";
import app from "../src/app";

describe("delete-videos", () => {
  test("delete videos", async () => {
    return request(app)
      .delete("/videos")
      .send({
        id: "0jseKaZGFzM",
      })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  test("not found videoId", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "error-err",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("error videoId-''", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});