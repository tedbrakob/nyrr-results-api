import axios from "axios";

export default async (endpoint: string, data: object) => {
  const baseUrl = "https://results.nyrr.org/api/v2";
  const url = `${baseUrl}/${endpoint}`;

  const response = await axios.post(url, data, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });

  return response;
}
