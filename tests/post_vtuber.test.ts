import request from "supertest";
import app from "../src/app";

describe("post-vtuber", () => {
  test("add test001", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test001",
        name: "テスト１",
        readname: "てすといち",
        affiliation: "にじさんじ",
        type: "活動中"
      })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  test("add test002", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
        birthday: "0101",
        image: "https://yt3.ggpht.com/ytc/AKedOLTEPOzoQOA4JAS987M1QQHQ3hy1Tgj-AUGgKT2U=s240-c-k-c0x00ffffff-no-rj"
      })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  // errorチェック
  test("(err) add id-'あああ'", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "あああ",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add id-''", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add id123-'test002'", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id123: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add name-''", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add readname-''", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "",
        affiliation: "NIJISANJI KR",
        type: "活動中",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add affiliation-'NIJISANJI KR123'", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add affiliation-''", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "",
        type: "活動中",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add type-'活動中あ'", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中あ",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add type-''", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add birthday-'aaaa'", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
        birthday: "aaaa"
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add birthday-''", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
        birthday: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) add image-''", async () => {
    return request(app)
      .post("/vtuber")
      .send({
        id: "test002",
        name: "テスト２",
        readname: "てすとに",
        affiliation: "NIJISANJI KR",
        type: "活動中",
        image: ""
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});
