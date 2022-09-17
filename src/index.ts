import axios from "axios";
import z from "zod";

export default class NyrrApi {
    token:string;
    baseUrl = 'https://results.nyrr.org/api';

    constructor(token:string) {
        this.token = token;
    }

    async getYears() {
        const response = await this.postWithNyrrToken('ClubStandings/getYears', {});

        const data = response.data.response.items;
        z.array(z.number()).parse(data);

        return data;
    }

    async postWithNyrrToken(endpoint:string, data:object) {
        debugger;
        const url = `${this.baseUrl}/${endpoint}`

        const response = await axios.post(url, data, {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'token': this.token,
            }
        });

        return response;
    }
}