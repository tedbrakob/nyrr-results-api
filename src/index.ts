import axios from "axios";
import z from "zod";

const teamEventDetailsSchema = z.object({
  distanceName: z.string(),
  distanceUnitCode: z.string(),
  eventCode: z.string(),
  eventName: z.string(),
  isClubPointsPublished: z.boolean(),
  isPointsReallyExists: z.boolean(),
  isTeamAwardExists: z.boolean(),
  logoImageExtension: z.string().nullable(),
  logoImageId: z.number().nullable(),
  points: z.number().nullable(),
  startDateTime: z.string(),
});

const teamResultsSchema = z.object({
  teamCode: z.string(),
  teamName: z.string(),
  teamPlace: z.number(),
  totalPoints: z.number(),
  eventDetails: z.array(
    teamEventDetailsSchema,
  ).optional(),
});

const divisionResultsSchema = z.object({
  divisionCode: z.string(),
  divisionGender: z.enum(["M", "F", "X"]),
  divisionName: z.string(),
  divisionOrder: z.number(),
  teamResults: z.array(
    teamResultsSchema,
  ),
});

const clubScorerSchema = z.object({
  runnerId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  bib: z.string(),
  gender: z.string(),
  age: z.number(),
  city: z.string(),
  stateProvince: z.string(),
  country: z.string(),
  iaaf: z.string(),
  finishTime: z.string(),
  finishPlace: z.number(),
});

type DivisionResults = z.infer<typeof divisionResultsSchema>;
type TeamResults = z.infer<typeof teamResultsSchema>;
type ClubScorer = z.infer<typeof clubScorerSchema>;
type TeamEventDetails = z.infer<typeof teamEventDetailsSchema>;

type getYearsResponse = Promise<number[]>;
type getDivisionsResultsResponse = Promise<DivisionResults[]>;
type getDivisionResults = Promise<TeamResults[]>;

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