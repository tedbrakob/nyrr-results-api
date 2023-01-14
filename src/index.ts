import HttpHandler from "./httpHandler";
import * as clubStandings from "./clubStandings";
import * as awards from "./awards";
import * as events from "./events";

export default class NyrrApi {
  httpHandler: HttpHandler;

  constructor(token:string) {
    this.httpHandler = new HttpHandler(token);
  }

  async getYears() : clubStandings.getYears {
    return await clubStandings.getYears(this.httpHandler);
  }

  async getDivisionsResults (year:number) : clubStandings.getDivisionsResults {
    return await clubStandings.getDivisionsResults(this.httpHandler, year);
  }

  async getDivisionResults (divisionCode:string, year:number) : clubStandings.getDivisionResults {
    return await clubStandings.getDivisionResults(this.httpHandler, divisionCode, year);
  }

  async getTeams (year:number) : clubStandings.getTeams {
    return await clubStandings.getTeams(this.httpHandler, year);
  }

  async getTeamAwards (
    eventCode:string, 
    teamCode:string, 
    gender:string | null = null, 
    minimumAge:number | null = null
  ) : awards.getTeamAwards {
    return await awards.getTeamAwards(this.httpHandler, eventCode, teamCode, gender, minimumAge);
  }

  async getTeamAwardRunners (
    eventCode:string, 
    teamCode:string, 
    teamGender:string | null = null, 
    teamMinimumAge:number | null = null
  ) : awards.getTeamAwardRunners {
    return await awards.getTeamAwardRunners(this.httpHandler, eventCode, teamCode, teamGender, teamMinimumAge);
  }

  async eventsSearch (
    year: number | null = null,
    searchString:string = "",
    distance: string | null = null,
  ) : events.search {
    return await events.search(this.httpHandler, year, searchString, distance);
  }

  static async getToken () : Promise<string> {
    return await HttpHandler.getToken();
  }
}