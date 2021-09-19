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

describe("get-videos", () => {
  test("get videos all", async () => {
    return request(app)
      .get("/videos")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos song-true mR-3", async () => {
    return request(app)
      .get("/videos")
      .query({
        songConfirm: "true",
        maxResults: "3",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos song-false mR-3 p-2", async () => {
    return request(app)
      .get("/videos")
      .query({
        songConfirm: "false",
        maxResults: "3",
        page: "2",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos id-'oPAcjv__fbc'", async () => {
    return request(app)
      .get("/videos")
      .query({
        id: "oPAcjv__fbc",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos id-'oPAcjv__fbc,Cch-8tl4z2g'", async () => {
    return request(app)
      .get("/videos")
      .query({
        id: "oPAcjv__fbc,Cch-8tl4z2g",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos startTimeAtAfter,before-'2021-06-01T00:00:00Z'", async () => {
    return request(app)
      .get("/videos")
      .query({
        startTimeAtAfter: "2021-06-01T00:00:00Z",
        startTimeAtBefore: "2021-06-08T00:00:00Z",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos order-startTime", async () => {
    return request(app)
      .get("/videos")
      .query({
        order: "startTime",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos order-viewCount", async () => {
    return request(app)
      .get("/videos")
      .query({
        order: "viewCount",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos order-random", async () => {
    return request(app)
      .get("/videos")
      .query({
        order: "random",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos tags-'葛葉'", async () => {
    return request(app)
      .get("/videos")
      .query({
        tags: "葛葉",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("get videos tags-'葛葉,樋口楓'", async () => {
    return request(app)
      .get("/videos")
      .query({
        tags: "葛葉,樋口楓",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  ///// エラーチェック /////

  test("(err) get videos add-id2", async () => {
    return request(app)
      .get("/videos")
      .query({
        id2: "oPAcjv__fbc",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos id-'あ'", async () => {
    return request(app)
      .get("/videos")
      .query({
        id: "あ",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos id-''", async () => {
    return request(app)
      .get("/videos")
      .query({
        id: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos song-'123'", async () => {
    return request(app)
      .get("/videos")
      .query({
        songConfirm: "123",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos song-'true2'", async () => {
    return request(app)
      .get("/videos")
      .query({
        songConfirm: "true2",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos song-''", async () => {
    return request(app)
      .get("/videos")
      .query({
        songConfirm: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos startTimeAtAfter-'2021-06-01T00:00:00'", async () => {
    return request(app)
      .get("/videos")
      .query({
        startTimeAtAfter: "2021-06-01T00:00:00",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos startTimeAtAfter-'2021-06-01'", async () => {
    return request(app)
      .get("/videos")
      .query({
        startTimeAtAfter: "2021-06-01",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos startTimeAtAfter-''", async () => {
    return request(app)
      .get("/videos")
      .query({
        startTimeAtAfter: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos mR-'0'", async () => {
    return request(app)
      .get("/videos")
      .query({
        maxResult: "0",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos mR-'abc'", async () => {
    return request(app)
      .get("/videos")
      .query({
        maxResult: "abc",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos mR-''", async () => {
    return request(app)
      .get("/videos")
      .query({
        maxResult: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos page-'0'", async () => {
    return request(app)
      .get("/videos")
      .query({
        page: "0",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos page-'abc'", async () => {
    return request(app)
      .get("/videos")
      .query({
        page: "abc",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos page-''", async () => {
    return request(app)
      .get("/videos")
      .query({
        page: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos order-'abc'", async () => {
    return request(app)
      .get("/videos")
      .query({
        order: "abc",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos order-''", async () => {
    return request(app)
      .get("/videos")
      .query({
        order: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  test("(err) get videos tags-''", async () => {
    return request(app)
      .get("/videos")
      .query({
        tags: "",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
  
});
