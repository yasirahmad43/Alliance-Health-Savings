export type FaqItem = { q: string; a: string };

/** Rendered visibly on the homepage — FAQ schema is emitted only for these. */
export const faqs: FaqItem[] = [
  {
    q: "What is a private PPO plan, and how is it different from a Marketplace plan?",
    a: "A Marketplace (ACA) plan is guaranteed-issue: anyone can buy it during open enrollment regardless of health, and the price is set by age and location rather than health history. A private PPO plan is medically underwritten — the carrier asks health questions and decides whether to offer coverage and at what price. That trade-off is why private plans can be cheaper for healthier applicants and can offer much broader nationwide networks, and why they are not the right answer for everyone.",
  },
  {
    q: "Can I really apply at any time of year?",
    a: "Yes. Because private plans are underwritten rather than guaranteed-issue, they are not tied to the annual open enrollment window or to a qualifying life event. You can start a review in February or in August. If you do have a qualifying life event, an advisor will still tell you whether a Marketplace special enrollment period would serve you better.",
  },
  {
    q: "What happens if I have a pre-existing condition?",
    a: "You should say so — the survey asks about it in step three for exactly that reason. Conditions can be covered, and honest information from the first minute is what lets an advisor find an option that actually works rather than one that falls apart at underwriting. Depending on the condition, underwriting may affect the price, the carrier, or whether a private plan is the right route at all. If a guaranteed-issue Marketplace plan is the better fit, we will say so.",
  },
  {
    q: "How do the doctor networks work?",
    a: "Most private plans in this space use broad nationwide PPO networks, which means you can generally see providers in any state without a referral, and you keep coverage when you travel or move. Marketplace plans increasingly use narrow local HMO networks tied to one county or hospital system. Before you enroll in anything, check that your own doctors and your nearest hospital are in the network — a good advisor will check that with you on the call.",
  },
  {
    q: "What does the deductible actually mean for me?",
    a: "The deductible is what you pay out of pocket before the plan starts sharing costs. A high deductible lowers your monthly premium but raises your exposure in a bad year; a low deductible does the reverse. Many private PPO plans also pay copay-based benefits — doctor visits, telemedicine, labs — before the deductible is met, which matters more day to day than the deductible number itself.",
  },
  {
    q: "What actually happens after I submit the survey?",
    a: "Your answers go to one licensed advisor, who reads them and works out what is genuinely available to someone in your state and situation. Then you get one call. They explain the real options, what each one does not cover, and what it would cost. You are not enrolled in anything by submitting the survey, and nothing is bound until you say yes.",
  },
  {
    q: "Will I be called repeatedly, or have my details sold?",
    a: "No. Your information goes to one licensed advisor — not into a lead auction and not to a bank of dialers. It is never sold to third parties. If you tell the advisor you are not interested, that is the end of it.",
  },
  {
    q: "What determines what I will pay?",
    a: "Age band, the state and county you live in, how many people need coverage, your health history at underwriting, how broad a network you want, and where you set the deductible. The cost explorer on this page shows how those variables push the number in either direction. None of it is a rate until a carrier underwrites your actual application.",
  },
  {
    q: "Who is not a good fit for this?",
    a: "If you qualify for Medicaid, take Medicaid. If your household income puts you in range of a substantial ACA subsidy, a Marketplace plan is usually cheaper than anything private. If you are mid-treatment for a serious condition, staying on COBRA or an employer plan often protects continuity of care in a way a new underwritten policy will not. We would rather tell you that than sell you something worse.",
  },
  {
    q: "Is this insurance advice?",
    a: "The site is educational. The plan conversation happens with a licensed insurance advisor, who is the person authorized to discuss specific plans, benefits and eligibility with you. This site does not provide medical, legal or tax advice, and nothing here guarantees eligibility, approval or a particular rate.",
  },
];
