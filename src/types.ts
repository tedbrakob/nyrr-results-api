import { z } from "zod";

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

export const teamResultsSchema = z.object({
  teamCode: z.string(),
  teamName: z.string(),
  teamPlace: z.number(),
  totalPoints: z.number(),
  eventDetails: z.array(
    teamEventDetailsSchema,
  ).optional(),
});

export const divisionResultsSchema = z.object({
  divisionCode: z.string(),
  divisionGender: z.enum(["M", "F", "X"]),
  divisionName: z.string(),
  divisionOrder: z.number(),
  teamResults: z.array(
    teamResultsSchema,
  ),
});

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

export const teamSchema = z.object({
  teamCode: z.string(),
  teamName: z.string(),
});

export type DivisionResults = z.infer<typeof divisionResultsSchema>;
export type TeamResults = z.infer<typeof teamResultsSchema>;
export type TeamEventDetails = z.infer<typeof teamEventDetailsSchema>;
export type TeamAwards = z.infer<typeof teamAwardsSchema>;
export type TeamAwardRunners = z.infer<typeof teamAwardRunnersSchema>;
export type Team = z.infer<typeof teamSchema>;