// タイムゾーンの時間を取得
const { formatToTimeZone } = require("date-fns-timezone");

const FORMAT = "YYYY-MM-DDTHH:mm:ss";
const TIME_ZONE_TOKYO = "Asia/Tokyo";

module.exports.get_time = (TIME_ZONE, time_hour_diff) => {
  const time = new Date();
  time.setHours(time.getHours() + time_hour_diff);
  const formatted_time = formatToTimeZone(time, FORMAT, {
    timeZone: TIME_ZONE,
  });
  return formatted_time + "Z";
};

module.exports.get_time2 = (q) => {
  const query = q || {};
  const time = new Date()
  const format = query.format || "YYYY-MM-DDTHH:mm:ss";
  const timezone = query.timeZone || "Asia/Tokyo";
  const formatted_time = formatToTimeZone(time, format, {
    timeZone: timezone,
  });
  return formatted_time + "Z";
}

// JST 2021-05-23T16:22:24Z
module.exports.toUTC = (JST) => {
  const time = Date.parse(JST);
  const date = new Date(time);
  date.setHours(date.getHours() - 9);
  const formatted_time = formatToTimeZone(date, FORMAT, {
    timeZone: "UTC",
  });
  return formatted_time + "Z";
}

module.exports.toJST = (UTC) => {
  const time = Date.parse(UTC);
  const date = new Date(time);
  //date.setHours(date.getHours() + 9);
  const formatted_time = formatToTimeZone(date, FORMAT, {
    timeZone: TIME_ZONE_TOKYO,
  });
  return formatted_time + "Z";
}
