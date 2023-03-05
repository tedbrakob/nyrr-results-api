import * as clubStandings from "./clubStandings";
import * as awards from "./awards";
import * as events from "./events";

export default {
  async getYears(): clubStandings.getYears {
    return await clubStandings.getYears();
  },

  async getDivisionsResults (year:number): clubStandings.getDivisionsResults {
    return await clubStandings.getDivisionsResults(year);
  },

  async getDivisionResults (divisionCode:string, year:number): clubStandings.getDivisionResults {
    return await clubStandings.getDivisionResults(divisionCode, year);
  },

  async getTeams (year:number): clubStandings.getTeams {
    return await clubStandings.getTeams(year);
  },

  async getTeamAwards (
    eventCode:string, 
    teamCode:string, 
    gender:string | null = null, 
    minimumAge:number | null = null
  ): awards.getTeamAwards {
    return await awards.getTeamAwards(eventCode, teamCode, gender, minimumAge);
  },

  async getTeamAwardRunners (
    eventCode:string, 
    teamCode:string, 
    teamGender:string | null = null, 
    teamMinimumAge:number | null = null
  ): awards.getTeamAwardRunners {
    return await awards.getTeamAwardRunners(eventCode, teamCode, teamGender, teamMinimumAge);
  },

  async eventsSearch (
    year: number | null = null,
    searchString:string = "",
    distance: string | null = null,
  ): events.search {
    return await events.search(year, searchString, distance);
  },
}