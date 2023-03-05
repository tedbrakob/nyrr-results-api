# nyrr-results-api

#### Installation
```
npm install nyrr-results-api
```

#### Example Usage
```
import NyrrApi from "nyrr-results-api";

...
...
...

//get team results for the Men's "A" division in 2022
const divisionResults = await NyrrApi.getDivisionResults("AM", 2022);
```

### Available functions
All functions of `NyrrApi` return a promise that resolves to a value described below:

* `getYears()`
  * Get the list of years with team standings available.
* `getDivisionsResults(year:number)`
  * Get a list of all divisions with team standings for a given year
* `getTeams(year:number)`
  * Get a list of all teams available for a given year
* `getDivisionResults(divisionCode:string, year:number)`
  * Get a list of team results for a given division and year.  This includes team points for each race
* ```
  getTeamAwards(
    eventCode:string, 
    teamCode:string, 
    gender:string | null = null, 
    minimumAge:number | null = null
  )
  ```
  * Get a list of team results for a given division and year.  This includes team points for each race
  * This endpoint accepts a gender and minimum age rather than a division code.  For example, to get the team's open men division, pass `gender = "M"` and `minimumAge = 0`.
* ```
  getTeamAwardRunners(
    eventCode:string, 
    teamCode:string, 
    teamGender:string | null = null, 
    teamMinimumAge:number | null = null
  )
  ```
  * Get a list of team results for a given division and year.  This includes team points for each race
  * This endpoint accepts a gender and minimum age rather than a division code.  For example, to get the team's open men division, pass `teamGender = "M"` and `teamMinimumAge = 0`.

More coming soon...