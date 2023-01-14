import { z } from "zod";
import HttpHandler from "./httpHandler";

const endpoint = 'ClubStandings';

export type getYears = Promise<number[]>;
export const getYears = async (httpHandler:HttpHandler) : getYears => {
  const response = await httpHandler.postWithNyrrToken(`${endpoint}/getYears`, {});
  const data = response.data.response.items;
  z.array(z.number()).parse(data);

  return data;
};

export const teamEventDetailsSchema = z.object({
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
export type TeamEventDetails = z.infer<typeof teamEventDetailsSchema>;
export const teamResultsSchema = z.object({
  teamCode: z.string(),
  teamName: z.string(),
  teamPlace: z.number(),
  totalPoints: z.number(),
  eventDetails: z.array(
    teamEventDetailsSchema,
  ).optional(),
});
export type TeamResults = z.infer<typeof teamResultsSchema>;
export type getDivisionResults = Promise<TeamResults[]>;

export const getDivisionResults = async (httpHandler:HttpHandler, divisionCode:string, year:number) : getDivisionResults => {
    const response = await httpHandler.postWithNyrrToken(
      `${endpoint}/getDivisionResults`, 
      { 
        year,
        divisionCode,
      }
    );

    const data = response.data.response.items;
    z.array(teamResultsSchema).parse(data);

    return data;
}

export const divisionResultsSchema = z.object({
  divisionCode: z.string(),
  divisionGender: z.enum(["M", "F", "X"]),
  divisionName: z.string(),
  divisionOrder: z.number(),
  teamResults: z.array(
    teamResultsSchema,
  ),
});
export type DivisionResults = z.infer<typeof divisionResultsSchema>;
export type getDivisionsResults = Promise<DivisionResults[]>;

export const getDivisionsResults = async (httpHandler:HttpHandler, year:number) : getDivisionsResults => {
  const response = await httpHandler.postWithNyrrToken(
    `${endpoint}/getDivisionsResults`, 
    { 
      year,
    }
  );

  const data = response.data.response.items;
  z.array(divisionResultsSchema).parse(data);

  return data;
}

export const teamSchema = z.object({
  teamCode: z.string(),
  teamName: z.string(),
});
export type Team = z.infer<typeof teamSchema>;
export type getTeams = Promise<Team[]>;

export const getTeams = async (httpHandler:HttpHandler ,year:number) : getTeams => {
    const response = await httpHandler.postWithNyrrToken(
      `${endpoint}/getTeams`, 
      { year }
    );

    const data = response.data.response.items;
    z.array(teamSchema).parse(data);

    return data
}