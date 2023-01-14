import { z } from "zod";
import HttpHandler from "./httpHandler";

const endpoint = 'awards';

export const teamAwardsSchema = z.object({
  "awardId": z.number(),
  "teamGroupOrder": z.number(),
  "teamOrder": z.number(),
  "teamCode": z.string(),
  "teamName": z.string(),
  "teamGender": z.string(),
  "minimumAge": z.number(),
  "summaryPlace": z.number(),
  "summaryTime": z.string(),
  "runnersCount": z.number(),
});
export type TeamAwards = z.infer<typeof teamAwardsSchema>;
export type getTeamAwards = Promise<TeamAwards[]>;

export const getTeamAwards = async (
    httpHandler:HttpHandler,
    eventCode:string, 
    teamCode:string, 
    gender:string | null = null, 
    minimumAge:number | null = null
  ) : getTeamAwards => {
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

  const response = await httpHandler.postWithNyrrToken(
    `${endpoint}/teamAwards`,
    postData
  );

  const data = response.data.response.items;
  z.array(teamAwardsSchema).parse(data);

  return data;
}

export const teamAwardRunnersSchema = z.object({
  "runnerId": z.number(),
  "firstName": z.string(),
  "lastName": z.string(),
  "bib": z.string(),
  "gender": z.string(),
  "age": z.number(),
  "city": z.string(),
  "stateProvince": z.string(),
  "country": z.string(),
  "iaaf": z.string(),
  "finishTime": z.string(),
  "finishPlace": z.number(),
});
export type TeamAwardRunners = z.infer<typeof teamAwardRunnersSchema>;
export type getTeamAwardRunners = Promise<TeamAwardRunners[]>;

export const getTeamAwardRunners = async (
  httpHandler:HttpHandler,
  eventCode:string, 
  teamCode:string, 
  teamGender:string | null = null, 
  teamMinimumAge:number | null = null
) : getTeamAwardRunners => {
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

  const response = await httpHandler.postWithNyrrToken(
    `${endpoint}/teamAwardRunners`,
    postData
  );

  const data = response.data.response.items;
  z.array(teamAwardRunnersSchema).parse(data);

  return data;
}