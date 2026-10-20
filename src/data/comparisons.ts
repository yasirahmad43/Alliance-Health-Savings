export type ComparisonRow = { label: string; them: string; us: string };
export type QA = { q: string; a: string };

export type Comparison = {
  slug: string;
  title: string;
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  /** One-line summary used on the /compare hub card. */
  teaser: string;
  intro: string[];
  them: { name: string; summary: string; points: string[] };
  us: { name: string; summary: string; points: string[] };
  rows: ComparisonRow[];
  sections: QA[];
  bestFor: { them: string; us: string };
  verdict: string;
};

export const comparisons: Comparison[] = [
  {
    slug: "vs-aca-marketplace",
    navTitle: "vs. ACA Marketplace",
    title: "Private PPO vs. ACA Marketplace Plans",
    metaTitle: "Private PPO vs. ACA Marketplace Plans — An Honest Comparison",
    metaDescription:
      "How private PPO coverage and ACA Marketplace plans actually differ on price, networks, deductibles and enrollment — including when the Marketplace is the better choice.",
    teaser:
      "Subsidies, networks and enrollment windows — where each one genuinely wins.",
    intro: [
      "The ACA Marketplace and private PPO coverage are built for two different situations, and most of the confusion between them comes from comparing a sticker price instead of comparing the two things side by side.",
      "Here is the plain version: if you qualify for a meaningful subsidy, the Marketplace is usually very hard to beat, and a licensed advisor should tell you so. If you do not qualify — which is common for self-employed people whose income is above the subsidy cliff — you are paying the full unsubsidized premium, and that is where private PPO coverage is worth a serious look.",
    ],
    them: {
      name: "ACA Marketplace",
      summary:
        "Guaranteed-issue coverage with subsidies tied to income, sold during a fixed annual window.",
      points: [
        "Nobody can be turned down or rated up for health history",
        "Premium tax credits can make coverage very inexpensive at lower incomes",
        "Every plan covers the ten essential health benefits, including maternity and mental health",
        "Unsubsidized premiums for a healthy applicant are often the highest number on the page",
        "Many regions are served mainly by narrow HMO networks with referral requirements",
        "Deductibles on bronze plans commonly run $5,000 and higher",
      ],
    },
    us: {
      name: "Private PPO coverage",
      summary:
        "Medically underwritten plans with broad national networks, available to apply for any day of the year.",
      points: [
        "Broad nationwide PPO networks — see specialists without a referral",
        "Apply any day of the year, not only during open enrollment",
        "Lower premiums are common for applicants in good health",
        "Deductible and copay structures are usually more predictable",
        "Approval is not guaranteed — health history is reviewed",
        "No premium tax credits: the price you see is the price you pay",
      ],
    },
    rows: [
      { label: "Who can be approved", them: "Everyone, guaranteed", us: "Reviewed — health history matters" },
      { label: "Subsidies available", them: "Yes, based on income", us: "No" },
      { label: "Typical unsubsidized premium", them: "Among the highest available", us: "Often materially lower for healthy applicants" },
      { label: "Deductible range", them: "$5,000–$9,000+ on bronze", us: "As low as $0 depending on the plan" },
      { label: "Network type", them: "Often narrow local HMO", us: "Broad nationwide PPO" },
      { label: "Specialist referrals", them: "Usually required", us: "Usually not required" },
      { label: "Enrollment window", them: "About six weeks a year", us: "Any day of the year" },
      { label: "Pre-existing conditions", them: "Always covered", us: "Covered on the plans we place — reviewed at application" },
      { label: "Coverage when you travel", them: "Emergency only, in most cases", us: "In-network nationwide" },
    ],
    sections: [
      {
        q: "Should I just take the subsidy?",
        a: "If your household income puts you well inside the subsidy range, very often yes — and an honest advisor will say so rather than talk you out of it. Premium tax credits can reduce a Marketplace premium to a fraction of its list price, and no private plan competes with that. The question only gets interesting when your income is above the threshold, or your income varies enough that a year-end reconciliation could claw the credit back.",
      },
      {
        q: "Is a PPO really that different from an HMO in practice?",
        a: "It is, and it usually shows up at the worst possible moment. Under a narrow HMO you generally need a primary-care referral before a specialist will see you, and care outside your home network is not covered except in an emergency. A broad PPO lets you book the specialist directly and keeps you in network in most of the country. If you travel, work across state lines, or have a specialist you already trust, that difference is the whole decision.",
      },
      {
        q: "What does medically underwritten actually mean?",
        a: "It means the carrier looks at your health history before issuing the plan, the way life insurance works. Some conditions lead to a higher rate, some to a decline, and many are simply covered. It is why the premium can be lower — the pool is healthier. It is also why private coverage is not the right answer for everyone, and why a real conversation beats an instant online estimate.",
      },
      {
        q: "Can I switch mid-year?",
        a: "Into private PPO coverage, yes — applications are accepted year-round. Moving back onto a Marketplace plan outside open enrollment requires a qualifying life event, such as losing employer coverage, moving, marrying, or having a child. That asymmetry is worth understanding before you drop anything.",
      },
    ],
    bestFor: {
      them:
        "People who qualify for a subsidy, anyone with significant ongoing medical needs, and anyone who needs guaranteed acceptance regardless of health history.",
      us:
        "Healthy self-employed people and families above the subsidy line who want a broad national network and need coverage outside open enrollment.",
    },
    verdict:
      "Check your subsidy first. If it is real, take it. If it is not — and for a large number of self-employed households it is not — a private PPO usually buys a broader network and a lower monthly cost than the unsubsidized Marketplace plan sitting next to it. A licensed advisor can run both numbers with you in one call.",
  },

  {
    slug: "vs-cobra",
    navTitle: "vs. COBRA",
    title: "Private PPO vs. COBRA Coverage",
    metaTitle: "Private PPO vs. COBRA — Which Is Worth It After You Leave a Job?",
    metaDescription:
      "COBRA keeps the exact plan you had, at the full price. Here is how it compares to private PPO coverage on cost, timing and continuity of care.",
    teaser: "Keeping your old plan at full price, versus starting a new one.",
    intro: [
      "COBRA is not a plan. It is the right to keep the exact plan you already had after your employment ends — including the part of the premium your employer used to pay, which is usually most of it.",
      "That is why the first COBRA invoice is such a shock. The coverage did not change; the bill did. Whether it is worth paying depends almost entirely on what care you are in the middle of.",
    ],
    them: {
      name: "COBRA",
      summary:
        "Continuation of your employer plan for a limited period, at the full unsubsidized group rate.",
      points: [
        "Exactly the same plan, network, doctors and drug formulary you already have",
        "Your deductible and out-of-pocket spending for the year carry over",
        "No health questions, no underwriting, no approval to wait for",
        "You pay the entire premium — typically three to five times what was coming out of your paycheck",
        "Time-limited, commonly 18 months",
        "You have 60 days to elect, and coverage backdates if you do",
      ],
    },
    us: {
      name: "Private PPO coverage",
      summary:
        "A new plan of your own, priced on you rather than on your former employer's group.",
      points: [
        "Typically a much lower monthly cost for a healthy applicant",
        "Nationwide PPO network that is not tied to a former employer",
        "Coverage that keeps going as long as you keep it — no 18-month clock",
        "Apply any day of the year",
        "New plan year: your deductible starts over",
        "Approval depends on health history, and your current doctors may or may not be in network",
      ],
    },
    rows: [
      { label: "Monthly cost", them: "Full group premium, employer share included", us: "Priced individually, often far lower" },
      { label: "Approval", them: "Automatic", us: "Subject to review" },
      { label: "Your doctors", them: "Unchanged", us: "Check the network before you switch" },
      { label: "Deductible progress", them: "Carries over for the plan year", us: "Resets" },
      { label: "How long it lasts", them: "Usually up to 18 months", us: "As long as you keep the plan" },
      { label: "Network reach", them: "Whatever your employer bought", us: "Broad nationwide PPO" },
      { label: "Start date", them: "Backdated to your coverage end", us: "Forward-dated once approved" },
      { label: "Mid-treatment continuity", them: "Fully preserved", us: "Not guaranteed" },
    ],
    sections: [
      {
        q: "When is COBRA clearly the right call?",
        a: "When you are in the middle of something. Active cancer treatment, a scheduled surgery, a pregnancy, a course of specialty medication, or a deductible you have already nearly met — in any of those cases the continuity is worth more than the savings, and we will tell you to elect COBRA. This is the part of the comparison most sites quietly skip.",
      },
      {
        q: "What is the 60-day window, and why does it matter so much?",
        a: "You generally have 60 days from your qualifying event to elect COBRA, and if you elect it, coverage is retroactive to the day your employer plan ended. That gives you a genuinely useful option: apply for private coverage during those 60 days, and if something goes wrong before your new plan is in force, you can still fall back on COBRA and have the gap filled. Do not let the window close by accident.",
      },
      {
        q: "Can I use both?",
        a: "Not at the same time, and you should not try. But you can sequence them — for example, elect COBRA to finish a course of treatment, then move to private coverage once it is complete. An advisor can help you time the switch so there is no uncovered day in between.",
      },
      {
        q: "Is COBRA ever cheaper?",
        a: "Sometimes, yes. A large employer with a heavily negotiated plan, a household with several members, or an applicant whose health history would attract a rated premium can all end up with COBRA being the better financial answer. It is worth pricing both rather than assuming.",
      },
    ],
    bestFor: {
      them:
        "Anyone mid-treatment, anyone close to meeting their deductible, and anyone whose specialist relationships cannot be interrupted.",
      us:
        "Healthy people between jobs or newly self-employed, who want to stop paying a full group premium for a plan that is on an 18-month clock anyway.",
    },
    verdict:
      "If you are in the middle of care, elect COBRA — the continuity is worth the price. If you are healthy and simply between jobs, COBRA is usually the most expensive way to stay covered, and a private PPO does the same job for less. Either way, do the comparison before the 60-day window closes.",
  },

  {
    slug: "vs-short-term",
    navTitle: "vs. Short-Term Plans",
    title: "Private PPO vs. Short-Term Health Plans",
    metaTitle: "Private PPO vs. Short-Term Health Plans — What You Give Up",
    metaDescription:
      "Short-term medical is cheap for a reason. An honest look at what it covers, what it excludes, and when a longer-term private PPO makes more sense.",
    teaser: "Cheap and fast, but built to end — and to exclude.",
    intro: [
      "Short-term medical plans are the lowest premiums you will see advertised anywhere, and there is a straightforward reason: they are designed to bridge a gap of a few months, and they exclude the things that make coverage expensive.",
      "Used for what they are, they are a legitimate tool. Used as a substitute for real coverage, they are how people end up with a large bill they did not expect.",
    ],
    them: {
      name: "Short-term medical",
      summary:
        "Temporary, limited-duration coverage meant to bridge a gap of weeks or months.",
      points: [
        "The lowest premiums on the market",
        "Coverage can start within a day or two",
        "Genuinely useful for a known, short, defined gap",
        "Pre-existing conditions are typically excluded outright",
        "Maternity, mental health and prescription coverage are often limited or absent",
        "Benefit caps mean a serious claim can exhaust the plan",
        "Duration is limited, and renewal is not guaranteed",
      ],
    },
    us: {
      name: "Private PPO coverage",
      summary:
        "Ongoing coverage designed to be the plan you keep, not the plan you replace in 90 days.",
      points: [
        "Pre-existing conditions covered on the plans we place",
        "Renewable coverage rather than a countdown",
        "Broad nationwide PPO networks",
        "Meaningful out-of-pocket maximums rather than benefit caps",
        "Higher premium than short-term — because it covers more",
        "Underwritten, so approval takes longer than a day",
      ],
    },
    rows: [
      { label: "Pre-existing conditions", them: "Generally excluded", us: "Covered on the plans we place" },
      { label: "Maximum benefit", them: "Often capped per condition or per policy", us: "Out-of-pocket maximum, then covered" },
      { label: "Prescription coverage", them: "Limited or discount-card only", us: "Included on most plans" },
      { label: "Maternity", them: "Almost never covered", us: "Plan-dependent — ask before you apply" },
      { label: "Mental health", them: "Often excluded", us: "Commonly included" },
      { label: "How long it lasts", them: "Weeks to months, state-dependent", us: "Renewable" },
      { label: "Time to coverage", them: "Often next day", us: "Days, after review" },
      { label: "Monthly premium", them: "Lowest available", us: "Higher, for materially more coverage" },
    ],
    sections: [
      {
        q: "When does a short-term plan genuinely make sense?",
        a: "When the gap is short, known, and you are healthy: a 45-day wait for a new employer's benefits to start, a few weeks between a move and a new plan's effective date, a student between coverage. In those cases it does exactly what it is supposed to do at a price nothing else matches.",
      },
      {
        q: "What does 'pre-existing condition exclusion' mean in practice?",
        a: "It means the carrier can review your records after a claim and decline to pay for anything connected to a condition you already had — sometimes including conditions you had not been formally diagnosed with. People are most often caught out by this when a symptom they mentioned to a doctor months earlier turns out to be related to the claim.",
      },
      {
        q: "What is a benefit cap and why does it matter?",
        a: "Many short-term plans pay only up to a fixed amount per condition, per day in hospital, or per policy period. A single serious event — a cardiac episode, a bad accident — can exceed that cap, and everything past it is yours. A plan with a real out-of-pocket maximum works the opposite way: once you hit the number, the plan takes over.",
      },
      {
        q: "Can I keep renewing a short-term plan?",
        a: "Sometimes, but not reliably, and the rules vary by state. Renewal often means re-applying, which means any condition that developed while you were covered is now pre-existing for the new term. That is the trap: the longer you rely on short-term coverage, the less it covers.",
      },
    ],
    bestFor: {
      them:
        "A healthy person filling a short, defined gap of a few weeks or months who understands and accepts the exclusions.",
      us:
        "Anyone who needs coverage for the foreseeable future rather than until a specific date, and anyone with a health history that a short-term plan would exclude.",
    },
    verdict:
      "Short-term medical is a bridge, not a destination. If you know exactly when your gap ends and you are healthy, use it and move on. If you do not have an end date — or you have any health history at all — the premium difference is buying you something real, and a private PPO is the sounder choice.",
  },

  {
    slug: "vs-health-sharing",
    navTitle: "vs. Health Sharing",
    title: "Private PPO vs. Health Sharing Plans",
    metaTitle: "Private PPO vs. Health Sharing Ministries — An Honest Comparison",
    metaDescription:
      "Health sharing plans are not insurance, and that distinction has consequences. How they compare to private PPO coverage on cost, guarantees and eligibility.",
    teaser: "Low monthly cost, no legal guarantee that a bill gets paid.",
    intro: [
      "Health care sharing ministries pool members' monthly contributions and share eligible medical costs among them. Many members are genuinely happy with them, and the monthly cost is often strikingly low.",
      "The central fact to understand is structural: a sharing plan is not insurance. There is no contractual obligation to pay a claim, and no state insurance department backing it. That does not make it a scam — it makes it a different kind of arrangement, with a different kind of risk.",
    ],
    them: {
      name: "Health sharing plans",
      summary:
        "Member cost-sharing organizations, usually faith-based, operating outside insurance regulation.",
      points: [
        "Monthly contributions are often well below insurance premiums",
        "Many members report a strong community and good service",
        "Not bound by insurance rules that drive up cost",
        "Sharing of a bill is not legally guaranteed",
        "Not regulated by state insurance departments; no guaranty fund",
        "Membership usually requires agreeing to a statement of beliefs or lifestyle terms",
        "Pre-existing conditions are commonly subject to waiting periods or permanent exclusion",
      ],
    },
    us: {
      name: "Private PPO coverage",
      summary:
        "Regulated insurance with a contract, a network, and an appeals process.",
      points: [
        "A contract that obligates the carrier to pay covered claims",
        "State insurance department oversight and a formal appeals path",
        "Negotiated in-network rates through a nationwide PPO",
        "Pre-existing conditions covered on the plans we place",
        "Higher monthly cost than most sharing plans",
        "Underwritten — approval is not automatic",
      ],
    },
    rows: [
      { label: "Is it insurance?", them: "No", us: "Yes" },
      { label: "Obligation to pay", them: "Voluntary sharing, not contractual", us: "Contractual" },
      { label: "Regulator", them: "None for insurance purposes", us: "State insurance department" },
      { label: "Provider network", them: "Usually none — you negotiate", us: "Broad nationwide PPO with negotiated rates" },
      { label: "Pre-existing conditions", them: "Waiting periods or exclusions", us: "Covered on the plans we place" },
      { label: "Eligibility conditions", them: "Often a statement of faith or lifestyle", us: "Health history only" },
      { label: "Appeals if a bill is denied", them: "Internal review only", us: "Formal appeals, then the regulator" },
      { label: "Monthly cost", them: "Typically lower", us: "Typically higher" },
    ],
    sections: [
      {
        q: "Do sharing plans actually pay?",
        a: "Most of the time, for eligible expenses, they do — the larger organizations have long track records. The issue is what happens in the exception. With insurance, a wrongly denied claim goes to an appeals process and then to a state regulator with authority over the carrier. With a sharing plan, there is no such backstop, because there was no contract to enforce.",
      },
      {
        q: "What does 'no network' mean for my bill?",
        a: "Insurance networks exist to pre-negotiate prices. Without one, you are billed at the hospital's list rate and either you or the sharing organization negotiates it down afterward. Some members find that process fine; others find themselves doing paperwork during a month they would rather not be doing paperwork.",
      },
      {
        q: "How are pre-existing conditions handled?",
        a: "Typically with a waiting period — a condition may not be eligible for sharing for the first year or two, sometimes with a phased cap after that, and sometimes never. If you have an ongoing condition, this is the first question to ask and the answer usually decides it.",
      },
      {
        q: "Who is happiest with a sharing plan?",
        a: "Healthy households who align with the organization's values, have savings to absorb a bad month, and want the lowest possible monthly outlay. That is a real and reasonable position — it just should be chosen with the trade-off understood, not because a low monthly number was the only thing compared.",
      },
    ],
    bestFor: {
      them:
        "Healthy members who share the organization's values, can self-fund an unexpected bill, and prioritize the lowest monthly cost.",
      us:
        "Anyone who needs a contractual guarantee, has ongoing medical needs, or does not want to negotiate hospital bills themselves.",
    },
    verdict:
      "Sharing plans trade a legal guarantee for a lower monthly cost. If you are healthy, values-aligned and can absorb a surprise, that trade can work. If a denied bill would be a serious problem for your household, buy the contract — that is what insurance is.",
  },

  {
    slug: "vs-hmo",
    navTitle: "vs. HMO Plans",
    title: "Private PPO vs. HMO Plans",
    metaTitle: "PPO vs. HMO — Networks, Referrals and What It Costs You",
    metaDescription:
      "The practical differences between PPO and HMO coverage: referrals, network reach, out-of-area care and monthly cost — including when an HMO is the better plan.",
    teaser: "Referrals and county lines, versus freedom and a higher premium.",
    intro: [
      "PPO and HMO are not brands or tiers of quality. They describe how a plan controls cost: an HMO does it by narrowing the network and routing you through a primary-care physician, and a PPO does it by negotiating rates across a much wider network and letting you move within it freely.",
      "Neither is universally better. The right one depends on how far you travel, how much of your care is specialist-led, and how much the freedom is worth to you in dollars per month.",
    ],
    them: {
      name: "HMO plans",
      summary:
        "Lower-cost coverage built around a local network and a primary-care gatekeeper.",
      points: [
        "Lower premiums than a comparable PPO",
        "Care is coordinated through one primary-care physician",
        "Often very strong within its own local system",
        "Specialist visits normally require a referral",
        "Out-of-network care is not covered except in an emergency",
        "Networks are frequently county- or region-specific",
      ],
    },
    us: {
      name: "Private PPO coverage",
      summary:
        "Broad national network access with direct specialist booking.",
      points: [
        "See specialists directly, without a referral",
        "In-network nationwide, not just in your home county",
        "Keep existing doctors far more often",
        "Out-of-network care still receives partial coverage on most plans",
        "Higher premium than the equivalent HMO",
        "Requires more of your own judgment about where to seek care",
      ],
    },
    rows: [
      { label: "Specialist referrals", them: "Required", us: "Not required" },
      { label: "Network reach", them: "Local or regional", us: "Nationwide" },
      { label: "Out-of-network care", them: "Emergencies only", us: "Partially covered on most plans" },
      { label: "Care when traveling", them: "Emergencies only", us: "In-network across the country" },
      { label: "Premium", them: "Lower", us: "Higher" },
      { label: "Care coordination", them: "Built in via your PCP", us: "You direct it" },
      { label: "Choice of hospital", them: "Within the network system", us: "Broad, including many major systems" },
      { label: "Best in", them: "A single metro you rarely leave", us: "Multi-state life, travel, or specialist-led care" },
    ],
    sections: [
      {
        q: "How much does a referral requirement really slow things down?",
        a: "In a well-run system, not much — a phone call and a few days. In a busy one, it can mean waiting weeks for a primary-care appointment whose only purpose is to write the referral you already know you need. If you have a chronic condition managed by a specialist, that friction repeats every year.",
      },
      {
        q: "What happens if I get sick out of state on an HMO?",
        a: "A true emergency is covered anywhere. Anything short of an emergency generally is not. That distinction is decided after the fact, by the plan. If you spend serious time outside your home region — snowbirds, contractors, anyone with family across the country — this is the single most important line in the comparison.",
      },
      {
        q: "Are HMO doctors worse?",
        a: "No. Many HMO networks are built around excellent integrated health systems, and the coordinated-care model produces genuinely good outcomes for people who use it as intended. The limitation is reach, not quality.",
      },
      {
        q: "Is the premium difference worth it?",
        a: "It depends on how often you would actually use the extra reach. Someone who sees one local doctor a year is paying for freedom they will not use. Someone who splits the year between two states, or who has a specialist relationship they will not give up, usually finds the PPO pays for itself the first time it matters.",
      },
    ],
    bestFor: {
      them:
        "People settled in one metro, comfortable with a primary-care gatekeeper, who want the lowest monthly premium.",
      us:
        "People who travel, work across state lines, split the year between states, or manage care with a specialist they want to keep.",
    },
    verdict:
      "If your life happens inside one network's footprint, an HMO is good coverage at a lower price and there is no shame in taking it. If your life crosses county or state lines — or your care is specialist-led — the PPO premium is buying something you will actually use.",
  },

  {
    slug: "losing-employer-coverage",
    navTitle: "Losing Employer Coverage",
    title: "Losing Employer Coverage: Your Options",
    metaTitle: "Losing Employer Health Coverage — Every Option, Compared",
    metaDescription:
      "Laid off, quitting, or going self-employed? Here are all the realistic health coverage options, what each one costs, and the deadlines that decide which are still open to you.",
    teaser: "Every route open to you, and the deadlines that close them.",
    intro: [
      "Losing employer coverage triggers a set of deadlines that most people find out about late. This page is the map: every realistic option, what it actually costs, and which door closes first.",
      "The one piece of advice that applies to everyone: find out your exact coverage end date today. Almost every decision below is measured from it.",
    ],
    them: {
      name: "Doing nothing",
      summary:
        "The default outcome if the deadlines pass — and the one that costs the most.",
      points: [
        "Your special enrollment period expires, usually 60 days after coverage ends",
        "Your COBRA election window expires, usually 60 days after the qualifying event",
        "Without a qualifying event, the Marketplace is closed until the next open enrollment",
        "Private coverage is still available year-round — but only once you apply",
        "An uncovered hospital stay is billed at list price",
      ],
    },
    us: {
      name: "Choosing deliberately",
      summary:
        "Four real routes, priced against each other before the windows close.",
      points: [
        "COBRA — same plan, same doctors, full price, up to 18 months",
        "A spouse's employer plan — often the cheapest option people forget to check",
        "The ACA Marketplace — subsidized if your new income qualifies",
        "Private PPO coverage — year-round, broad network, priced on you",
        "Medicaid — genuinely the right answer at lower incomes, and free to check",
      ],
    },
    rows: [
      { label: "COBRA", them: "Elect within ~60 days", us: "Same plan and doctors, full group premium" },
      { label: "Spouse's plan", them: "Usually 30 days from your loss of coverage", us: "Often the lowest total household cost" },
      { label: "ACA Marketplace", them: "Special enrollment, ~60 days", us: "Subsidized if your new income qualifies" },
      { label: "Medicaid", them: "No deadline — apply any time", us: "Worth checking first if income has dropped" },
      { label: "Private PPO", them: "No deadline", us: "Year-round, nationwide network, underwritten" },
      { label: "Short-term plan", them: "No deadline", us: "Only for a short, known gap" },
      { label: "Gap in coverage", them: "Free until something happens", us: "Not a plan" },
    ],
    sections: [
      {
        q: "What should I do first?",
        a: "Confirm the exact date your coverage ends — it is often the last day of the month, not your last day of work. Everything else is counted from that date, and knowing it turns a panic into a schedule.",
      },
      {
        q: "Has my income actually changed?",
        a: "If it has dropped, check Medicaid and check your Marketplace subsidy before anything else. Both are based on your expected income for the year ahead, not last year's W-2. A lot of people assume they will not qualify based on the salary they no longer have. If Medicaid or a large subsidy is the right answer for your household, we will tell you so — it is not something we sell, and it is not something we will talk you out of.",
      },
      {
        q: "Should I elect COBRA while I decide?",
        a: "You do not have to decide immediately. Because COBRA backdates to the day your coverage ended, the 60-day window works as a safety net: you can apply for private coverage first, and if anything goes wrong, elect COBRA and have the gap filled retroactively. Just do not let the window lapse while you are thinking about it.",
      },
      {
        q: "What if I have a condition being treated right now?",
        a: "Then continuity is the priority and COBRA is usually the answer for the duration of that treatment, even at the higher price. Switching plans mid-course can mean a new deductible, a new network, and a new prior-authorization process at the worst moment. Finish the course, then move.",
      },
      {
        q: "Where does private PPO coverage fit?",
        a: "It is the option with no deadline, which makes it the natural landing place once the time-limited routes are priced. For a healthy household above the subsidy line, it is frequently both cheaper than COBRA and broader than a Marketplace HMO. For a household mid-treatment or well inside the subsidy range, it usually is not — and that is a fine answer too.",
      },
    ],
    bestFor: {
      them:
        "Nobody. Letting the windows close is the only option on this page with no upside.",
      us:
        "Everyone leaving employer coverage — the point is to price all five routes once, before the deadlines make the choice for you.",
    },
    verdict:
      "Get your coverage end date, check Medicaid and your subsidy, then price COBRA against a private PPO. One call covers all of it, and there is no pressure to move if your current plan turns out to be the right one to keep.",
  },
];

export const comparisonBySlug = (slug: string) =>
  comparisons.find((c) => c.slug === slug);
