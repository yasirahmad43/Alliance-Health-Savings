export type StateEntry = {
  name: string;
  abbr: string;
  slug: string;
  /** Real major cities — used for genuinely state-specific page copy, never filler. */
  cities: string[];
  /** One true, non-plan-specific line of context about coverage in that state. */
  context: string;
};

export const states: StateEntry[] = [
  { name: "Alabama", abbr: "AL", slug: "alabama", cities: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"], context: "Alabama's Marketplace is federally run, and much of the state outside the Birmingham and Huntsville metros is served by a small number of narrow local networks." },
  { name: "Alaska", abbr: "AK", slug: "alaska", cities: ["Anchorage", "Fairbanks", "Juneau", "Wasilla", "Sitka"], context: "Alaska has some of the highest individual premiums in the country and long referral distances outside Anchorage, which makes nationwide PPO access unusually valuable here." },
  { name: "Arizona", abbr: "AZ", slug: "arizona", cities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Flagstaff"], context: "Arizona's large self-employed and seasonal-resident population often needs coverage that travels between states rather than a network tied to one county." },
  { name: "Arkansas", abbr: "AR", slug: "arkansas", cities: ["Little Rock", "Fayetteville", "Fort Smith", "Springdale", "Jonesboro"], context: "Outside the Little Rock and Northwest Arkansas corridors, specialist care often means driving to a regional hub — so which hospitals a plan includes matters more than the premium alone." },
  { name: "California", abbr: "CA", slug: "california", cities: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento", "Long Beach", "Oakland"], context: "California runs its own Marketplace with region-based pricing, and HMO plans dominate several regions — which is why network breadth is usually the first thing to check here." },
  { name: "Colorado", abbr: "CO", slug: "colorado", cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder", "Pueblo"], context: "Colorado's mountain-resort counties have historically carried the highest premiums in the state, and coverage that works both on the Front Range and on the Western Slope is worth asking about." },
  { name: "Connecticut", abbr: "CT", slug: "connecticut", cities: ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury"], context: "Many Connecticut residents work in New York or Massachusetts, so a plan that only contracts in-state can be an expensive surprise." },
  { name: "Delaware", abbr: "DE", slug: "delaware", cities: ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna"], context: "Delaware is a small individual market with few carriers, and a lot of care crosses into the Philadelphia metro — so out-of-state network access is a practical question, not a technicality." },
  { name: "Florida", abbr: "FL", slug: "florida", cities: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Fort Lauderdale", "Tallahassee"], context: "Florida has one of the largest self-employed and early-retiree populations in the country, and its Marketplace plans lean heavily toward narrow HMO networks." },
  { name: "Georgia", abbr: "GA", slug: "georgia", cities: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Macon"], context: "Several rural Georgia counties have had only one or two Marketplace carriers, and referrals frequently route back to metro Atlanta." },
  { name: "Hawaii", abbr: "HI", slug: "hawaii", cities: ["Honolulu", "Pearl City", "Hilo", "Kailua", "Kapolei"], context: "Hawaii's market is shaped by its employer-coverage law, and inter-island or mainland care makes network reach a real consideration for anyone self-employed." },
  { name: "Idaho", abbr: "ID", slug: "idaho", cities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello", "Coeur d'Alene"], context: "Idaho runs its own exchange and has an unusually early open-enrollment window — which catches people out when a job ends mid-year." },
  { name: "Illinois", abbr: "IL", slug: "illinois", cities: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Springfield", "Peoria"], context: "Chicago-area networks and downstate networks are often built separately, so a plan that looks broad in one half of Illinois can be thin in the other." },
  { name: "Indiana", abbr: "IN", slug: "indiana", cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Bloomington"], context: "Indiana's contractor and trades workforce is large, and many of those plans need to follow the worker across state lines into Illinois, Ohio or Kentucky." },
  { name: "Iowa", abbr: "IA", slug: "iowa", cities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City", "Ames"], context: "Iowa's individual Marketplace has been thin for years, with many counties down to a single carrier — so private options are worth comparing side by side." },
  { name: "Kansas", abbr: "KS", slug: "kansas", cities: ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe", "Lawrence"], context: "A large share of Kansas care flows into the Kansas City and Wichita systems, and plans differ sharply on whether they include both." },
  { name: "Kentucky", abbr: "KY", slug: "kentucky", cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"], context: "Northern Kentucky residents frequently use Cincinnati hospitals, which a Kentucky-only network may not cover." },
  { name: "Louisiana", abbr: "LA", slug: "louisiana", cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"], context: "Louisiana's individual premiums run above the national average, and hurricane-season disruption makes portable coverage more than a convenience." },
  { name: "Maine", abbr: "ME", slug: "maine", cities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"], context: "Maine's rural counties rely on a handful of regional systems, and seasonal and self-employed work is common — a combination that rewards year-round enrollment options." },
  { name: "Maryland", abbr: "MD", slug: "maryland", cities: ["Baltimore", "Columbia", "Germantown", "Silver Spring", "Frederick", "Rockville"], context: "Maryland has a unique all-payer hospital rate system, and many residents commute into DC or Virginia for care as well as work." },
  { name: "Massachusetts", abbr: "MA", slug: "massachusetts", cities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell", "Quincy"], context: "Massachusetts has its own coverage mandate and a state exchange, so the rules here differ from most other states — worth a conversation before you change plans." },
  { name: "Michigan", abbr: "MI", slug: "michigan", cities: ["Detroit", "Grand Rapids", "Warren", "Ann Arbor", "Lansing", "Traverse City"], context: "Upper Peninsula and northern Michigan residents often travel long distances for specialists, and plan networks vary widely on which systems they include." },
  { name: "Minnesota", abbr: "MN", slug: "minnesota", cities: ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington", "St. Cloud"], context: "Minnesota runs its own exchange, and access to the Rochester and Twin Cities systems is often the deciding factor between plans." },
  { name: "Mississippi", abbr: "MS", slug: "mississippi", cities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"], context: "Mississippi has among the lowest number of Marketplace carriers per county, and northern residents frequently use Memphis-area hospitals." },
  { name: "Missouri", abbr: "MO", slug: "missouri", cities: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence"], context: "Missouri's two big metros sit on opposite state lines, so plans that stop at the border can leave a St. Louis or Kansas City resident out of network a few miles from home." },
  { name: "Montana", abbr: "MT", slug: "montana", cities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte", "Helena"], context: "Montana's distances mean specialist care often involves travel, and a plan's out-of-area rules matter as much as its network list." },
  { name: "Nebraska", abbr: "NE", slug: "nebraska", cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"], context: "Nebraska has a large agricultural and self-employed population, and much of the state's specialty care concentrates in Omaha and Lincoln." },
  { name: "Nevada", abbr: "NV", slug: "nevada", cities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks", "Carson City"], context: "Nevada's hospitality and gig workforce turns over constantly, which is exactly the situation year-round private enrollment was built for." },
  { name: "New Hampshire", abbr: "NH", slug: "new-hampshire", cities: ["Manchester", "Nashua", "Concord", "Dover", "Rochester"], context: "Many New Hampshire residents work in Massachusetts and use Boston hospitals, so cross-border network access is a routine question here." },
  { name: "New Jersey", abbr: "NJ", slug: "new-jersey", cities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton", "Edison"], context: "New Jersey has a state coverage mandate and heavy commuting into New York and Philadelphia — both of which shape which plan actually works for you." },
  { name: "New Mexico", abbr: "NM", slug: "new-mexico", cities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"], context: "Outside Albuquerque and Santa Fe, New Mexico's provider supply is thin, and some residents use El Paso facilities across the Texas line." },
  { name: "New York", abbr: "NY", slug: "new-york", cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"], context: "New York runs its own exchange with community rating, and upstate and downstate networks are effectively different markets." },
  { name: "North Carolina", abbr: "NC", slug: "north-carolina", cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Asheville"], context: "North Carolina's rural counties have had limited Marketplace competition, while the Triangle and Charlotte have deep provider networks — the gap between them is large." },
  { name: "North Dakota", abbr: "ND", slug: "north-dakota", cities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"], context: "North Dakota care often crosses into Minnesota, and plans differ on whether those systems are in network." },
  { name: "Ohio", abbr: "OH", slug: "ohio", cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"], context: "Ohio's major hospital systems compete hard, and a plan can include one of them in a city while excluding the one you actually use." },
  { name: "Oklahoma", abbr: "OK", slug: "oklahoma", cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond", "Lawton"], context: "Oklahoma's individual premiums have run above the national average, and its energy and contracting workforce often needs coverage that doesn't hinge on one employer." },
  { name: "Oregon", abbr: "OR", slug: "oregon", cities: ["Portland", "Salem", "Eugene", "Gresham", "Bend", "Medford"], context: "Oregon prices by region, and rural eastern and southern counties face much thinner provider choice than the Willamette Valley." },
  { name: "Pennsylvania", abbr: "PA", slug: "pennsylvania", cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton"], context: "Pennsylvania's Philadelphia and Pittsburgh systems are built around competing networks, so which one a plan contracts with decides where you can be seen." },
  { name: "Rhode Island", abbr: "RI", slug: "rhode-island", cities: ["Providence", "Warwick", "Cranston", "Pawtucket", "Newport"], context: "Rhode Island is small enough that many residents use Boston specialists, which an in-state-only network won't cover." },
  { name: "South Carolina", abbr: "SC", slug: "south-carolina", cities: ["Charleston", "Columbia", "North Charleston", "Greenville", "Myrtle Beach"], context: "South Carolina's coastal and Upstate regions are served by different hospital systems, and tourism-sector work makes year-round enrollment genuinely useful." },
  { name: "South Dakota", abbr: "SD", slug: "south-dakota", cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"], context: "South Dakota's two dominant health systems cover most of the state, and western residents sometimes use facilities in Wyoming or Nebraska." },
  { name: "Tennessee", abbr: "TN", slug: "tennessee", cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro"], context: "Tennessee has had counties with a single Marketplace carrier, while Nashville and Memphis have deep networks — where you live changes the math." },
  { name: "Texas", abbr: "TX", slug: "texas", cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Lubbock"], context: "Texas has the largest uninsured population in the country and a huge self-employed workforce, and many Marketplace plans there are narrow-network HMOs." },
  { name: "Utah", abbr: "UT", slug: "utah", cities: ["Salt Lake City", "West Valley City", "Provo", "St. George", "Ogden", "Park City"], context: "Utah's larger average household size makes family-tier pricing and out-of-pocket maximums the numbers that matter most here." },
  { name: "Vermont", abbr: "VT", slug: "vermont", cities: ["Burlington", "South Burlington", "Rutland", "Montpelier", "Barre"], context: "Vermont has an unusually restricted individual market, and many residents use Dartmouth-area facilities across the New Hampshire line." },
  { name: "Virginia", abbr: "VA", slug: "virginia", cities: ["Virginia Beach", "Richmond", "Arlington", "Norfolk", "Alexandria", "Roanoke"], context: "Northern Virginia care routinely crosses into DC and Maryland, while southwest Virginia depends on a handful of regional systems." },
  { name: "Washington", abbr: "WA", slug: "washington", cities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Everett"], context: "Washington prices by region, and Vancouver-area residents often use Portland providers — a detail plenty of plans don't accommodate." },
  { name: "West Virginia", abbr: "WV", slug: "west-virginia", cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"], context: "West Virginia has among the highest individual premiums in the country and limited carrier choice in most counties." },
  { name: "Wisconsin", abbr: "WI", slug: "wisconsin", cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton"], context: "Wisconsin has an unusually high number of regional health systems, so networks vary noticeably from one part of the state to the next." },
  { name: "Wyoming", abbr: "WY", slug: "wyoming", cities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Jackson"], context: "Wyoming has the smallest population of any state and frequently the highest individual premiums, with much specialty care in Colorado, Utah or Montana." },
];

export const stateBySlug = (slug: string) => states.find((s) => s.slug === slug);

/** Accepts "Florida", "florida", "FL" or "fl". */
export function matchState(input: string): StateEntry | undefined {
  const q = input.trim().toLowerCase();
  if (!q) return undefined;
  return (
    states.find((s) => s.name.toLowerCase() === q) ??
    states.find((s) => s.abbr.toLowerCase() === q)
  );
}

export function searchStates(input: string, limit = 6): StateEntry[] {
  const q = input.trim().toLowerCase();
  if (!q) return [];
  const starts = states.filter(
    (s) => s.name.toLowerCase().startsWith(q) || s.abbr.toLowerCase() === q,
  );
  const contains = states.filter(
    (s) => !starts.includes(s) && s.name.toLowerCase().includes(q),
  );
  return [...starts, ...contains].slice(0, limit);
}
