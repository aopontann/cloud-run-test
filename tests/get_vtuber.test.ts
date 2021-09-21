import request from "supertest";
import app from "../src/app";

describe("get-vtuber", () => {
  test("all", async () => {
    return request(app)
      .get("/vtuber")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("affiliation-'にじさんじ'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        affiliation: "にじさんじ"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("affiliation-'にじさんじ,NIJISANJI KR'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        affiliation: "にじさんじ,NIJISANJI KR"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("name-'葛葉'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        name: "葛葉"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("name-'葛葉,叶'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        name: "葛葉,叶"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("id-'UCBi8YaVyZpiKWN3_Z0dCTfQ'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        id: "UCBi8YaVyZpiKWN3_Z0dCTfQ"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("id-'UCBi8YaVyZpiKWN3_Z0dCTfQ,UCe_p3YEuYJb8Np0Ip9dk-FQ'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        id: "UCBi8YaVyZpiKWN3_Z0dCTfQ,UCe_p3YEuYJb8Np0Ip9dk-FQ"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("type-'活動中'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        id: "UCBi8YaVyZpiKWN3_Z0dCTfQ"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("type-'卒業,ユニット'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        type: "卒業,ユニット"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("birthday-'0930'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        birthday: "0930"
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  // errorチェック
  test("affiliation-'にじにゃんじ'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        birthday: "0930"
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("affiliation-''", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        affiliation: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("name-''", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        name: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("id-'あああ'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        id: "あああ"
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("id-''", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        id: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("type-'あああ'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        type: "あああ"
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("type-''", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        type: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("birthday-'aaa'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        birthday: "aaa"
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("birthday-'あああ'", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        birthday: "あああ"
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("birthday-''", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        birthday: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("not exist query", async () => {
    return request(app)
      .get("/vtuber")
      .query({
        aaa: "aaa"
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});