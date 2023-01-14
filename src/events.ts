import { z } from "zod";
import HttpHandler from "./httpHandler";

const endpoint = 'events';

export const eventSchema = z.object({
  "eventName": z.string(),
  "eventCode": z.string(),
  "startDateTime": z.string(),
  "distanceName": z.string(),
  "distanceUnitCode": z.string(),
  "distanceDimension": z.number(),
  "venue": z.string().nullable(),
  "runnerAwardsCount": z.number(),
  "teamAwardsCount": z.number(),
  "teamsCount": z.number(),
  "customStatisticsCount": z.number(),
  "logoImageId": z.number().nullable(),
  "logoImageExtension": z.string().nullable(),
  "isVirtual": z.boolean(),
  "virtualStartDate": z.string().nullable(),
  "virtualEndDate": z.string().nullable(),
  "isAllowedDeleting": z.boolean(),
  "hasAgeGradedResults": z.boolean(),
});
export type Event = z.infer<typeof eventSchema>;

export type search = Promise<Event[]>;
export const search = async (
  httpHandler:HttpHandler,
  year: number | null = null,
  searchString:string = "",
  distance: string | null = null,
) : search => {
  const defaultPageSize = 2000;

  const postData = {
    year,
    searchString, 
    distance, 
    pageIndex: 1,
    pageSize: defaultPageSize,
  };

  const response = await httpHandler.postWithNyrrToken(
    `${endpoint}/search`,
    postData,
  );

  const data = response.data.response.items;
  z.array(eventSchema).parse(data);

  if (response.data.response.totalItems > defaultPageSize) {
    postData.pageIndex += defaultPageSize;
    postData.pageSize = response.data.response.totalItems - defaultPageSize;

    const additionalEventsResponse = await httpHandler.postWithNyrrToken(
      `${endpoint}/search`,
      postData,
    );

    const additionalEvents = additionalEventsResponse.data.response.items;
    z.array(eventSchema).parse(additionalEvents);

    data.push(...additionalEvents);
  }

  return data;
}