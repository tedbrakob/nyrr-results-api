import axios from "axios";

export default class HttpHandler {
  token:string;
  baseUrl = 'https://results.nyrr.org/api';

  constructor(token:string) {
    this.token = token;
  }

  async postWithNyrrToken(endpoint:string, data:object) {
    const url = `${this.baseUrl}/${endpoint}`

    const response = await axios.post(url, data, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'token': this.token,
      }
    });

    return response;
  }
  
  static async getToken() : Promise<string> {
    const response = await axios.get('https://results.nyrr.org/GetSettings/rms-settings.rjs');

    const jsonResponse = response.data.replace('var settings = ', '');
    const data = JSON.parse(jsonResponse);

    return data.token;
  }
}