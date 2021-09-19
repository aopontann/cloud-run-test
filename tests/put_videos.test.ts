import request from "supertest";
import app from "../src/app";

/* for of でテストしてもいいかも
const testCheck = [
  {
    name: "get video all",
    query: {},
    status: 200,
  },
];
*/

describe("put-videos", () => {
  test("put videos title", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        title: "タイトル（編集後）"
      })
      .then((res) => {
        expect(res.body.result.title).toBe("タイトル（編集後）");
      });
  });

  test("put videos description", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        description: "概要欄（編集後）"
      })
      .then((res) => {
        expect(res.body.result.description).toBe("概要欄（編集後）");
      });
  });

  test("put videos songConfirm-true", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        songConfirm: "true"
      })
      .then((res) => {
        expect(res.body.result.songConfirm).toBe(true);
      });
  });

  test("put videos songConfirm-false", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        songConfirm: "false"
      })
      .then((res) => {
        expect(res.body.result.songConfirm).toBe(false);
      });
  });

  // errorチェック
  test("not found videoId", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "error_err",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("ng title-''", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        title: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("ng description-''", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        description: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("ng description-''", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        description: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("ng song-''", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        songConfirm: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("ng song-'abc'", async () => {
    return request(app)
      .put("/videos")
      .send({
        id: "0jseKaZGFzM",
        songConfirm: "abc"
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});