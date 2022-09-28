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

//more on token below
const nyrrApi = new NyrrApi(token);

//get team results for the Men's "A" division in 2022
const divisionResults = await nyrrApi.getDivisionResults("AM", 2022);
```

### Token
The api at results.nyrr.org/api requires a token.  This token is not issued on a per-app basis, there is only one token.  For the time I've been working on this api wrapper it has not changed from below:

`898d6b6aef0e4887`

I've included the static `getToken()` function to get an up-to-date token.  This won't work from the frontend due to the CORS policy on the resource the token in retrieved from.  This function must be called from your own backend and passed along to the frontend.

```
  const token = await NyrrApi.getToken();
```

Once the token is obtained, pass that as a parameter to the constructor.

### Available functions
All functions of `NyrrApi` return a promise that resolves to a value described below:

* `getYears()`
  * Get the list of years with team standings available.
* `getDivisionsResults(year:number)`
  * Get a list of all divisions with team standings for a given year
* `getDivisionResults(divisionCode:string, year:number)`
  * Get a list of team results for a given division and year.  This includes team points for each race

More coming soon...