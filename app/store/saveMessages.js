import { getHeaders } from "../client/api";

/**
 * 将用户输入的消息保存到服务器数据库
 * @param {*} msg
 */
export default function saveMessages(msg) {
  try {
    const headers = getHeaders();
    fetch("./api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: headers.Authorization,
      },
      body: JSON.stringify(msg),
    });
  } catch (error) {}
}
