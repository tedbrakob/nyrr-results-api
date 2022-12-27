import axios from "axios";
import { z } from "zod";
import { DivisionResults, divisionResultsSchema, TeamAwardRunners, teamAwardRunnersSchema, TeamAwards, teamAwardsSchema, TeamResults, teamResultsSchema, Team, teamSchema } from "./types";

type getYearsResponse = Promise<number[]>;
type getDivisionsResultsResponse = Promise<DivisionResults[]>;
type getDivisionResults = Promise<TeamResults[]>;
type getTeamAwards = Promise<TeamAwards[]>;
type getTeamAwardRunners = Promise<TeamAwardRunners[]>;
type getTeams = Promise<Team[]>;
export default class NyrrApi {
  token:string;
  baseUrl = 'https://results.nyrr.org/api';

  constructor(token:string) {
    this.token = token;
  }

  async getYears() : getYearsResponse {
    const response = await this.postWithNyrrToken('ClubStandings/getYears', {});

    const data = response.data.response.items;
    z.array(z.number()).parse(data);

    return data;
  }

  async getDivisionsResults (year:number) : getDivisionsResultsResponse {
    const response = await this.postWithNyrrToken(
      'ClubStandings/getDivisionsResults', 
      { 
        year,
      }
    );

    const data = response.data.response.items;
    z.array(divisionResultsSchema).parse(data);

    return data;
  }

  async getDivisionResults (divisionCode:string, year:number) : getDivisionResults {
    const response = await this.postWithNyrrToken(
      'ClubStandings/getDivisionResults', 
      { 
        year,
        divisionCode,
      }
    );

    const data = response.data.response.items;
    z.array(teamResultsSchema).parse(data);

    return data;
  }

  async getTeamAwards (
    eventCode:string, 
    teamCode:string, 
    gender:string | null = null, 
    minimumAge:number | null = null
  ) : getTeamAwards {
    const postData : {
      eventCode:string, 
      teamCode:string, 
      gender?:string, 
      minimumAge?:string,
    } = {
      eventCode,
      teamCode,
    };

    if (gender !== null) {
      postData.gender = gender;
    }

    if (minimumAge !== null) {
      postData.minimumAge = minimumAge.toString();
    }

    const response = await this.postWithNyrrToken(
      'awards/teamAwards',
      postData
    );

    const data = response.data.response.items;
    z.array(teamAwardsSchema).parse(data);

    return data;
  }

  async getTeamAwardRunners (
    eventCode:string, 
    teamCode:string, 
    teamGender:string | null = null, 
    teamMinimumAge:number | null = null
  ) : getTeamAwardRunners {
    const postData : {
      eventCode:string, 
      teamCode:string, 
      teamGender?:string, 
      teamMinimumAge?:string,
    } = {
      eventCode,
      teamCode,
    };

    if (teamGender !== null) {
      postData.teamGender = teamGender;
    }

    if (teamMinimumAge !== null) {
      postData.teamMinimumAge = teamMinimumAge.toString();
    }

    const response = await this.postWithNyrrToken(
      'awards/teamAwardRunners',
      postData
    );

    const data = response.data.response.items;
    z.array(teamAwardRunnersSchema).parse(data);

    return data;
  }

  async getTeams (year:number) : getTeams {
    const response = await this.postWithNyrrToken(
      'ClubStandings/getTeams',
      { year }
    );

    const data = response.data.response.items;
    z.array(teamSchema).parse(data);

    return data
  }

  static async getToken() : Promise<string> {
    const response = await axios.get('https://results.nyrr.org/GetSettings/rms-settings.rjs');

    const jsonResponse = response.data.replace('var settings = ', '');
    const data = JSON.parse(jsonResponse);

    return data.token;
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
}