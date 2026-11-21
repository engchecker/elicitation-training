/* Content for the Client Elicitation Trainer. Edit freely. */

window.PRINCIPLES = {
  P1: "Purpose: find the need behind the request",
  P2: "Open questions that invite the client's story",
  P3: "Probing and laddering (follow the thread)",
  P4: "Coverage of the engineering checklist",
  P5: "Listening: paraphrase and summarise back",
  P6: "Assumptions and red flags surfaced",
  P7: "Close: confirm, record, agree next steps"
};

window.LESSONS = [
  {
    id: "L1",
    title: "Brief versus need",
    principle: "P1",
    summary: "Clients arrive with a solution (\"I need a beam\"). Your job is to find the problem it is meant to solve.",
    points: [
      "The **stated request** is usually a proposed solution. The **need** is the outcome the client wants (a bigger kitchen, a consentable deck, a loan settled on time).",
      "Ask **why** before **how**: \"What are you hoping this will let you do?\" comes before \"What size is the beam?\"",
      "Separate the **client** (who pays), the **user** (who lives with it) and the **decision-maker** (who signs off). They are often different people.",
      "A clear need lets you offer a better or cheaper solution than the one requested, or say no with good reason."
    ],
    good: "\"Before we talk about the wall, what are you wanting the space to be like once it's done?\"",
    bad: "\"So you want the wall out. What's the wall made of?\"",
    checks: [
      {
        q: "A client says, \"I need a steel beam designed to replace a wall.\" What is the best first move?",
        options: ["Ask for the beam span and loads", "Ask what they are trying to achieve with the space", "Quote a fee for beam design", "Ask whether the wall is load-bearing"],
        answer: 1,
        why: "The beam is a proposed solution. Understanding the outcome keeps options open and reveals constraints you would otherwise miss."
      },
      {
        q: "Who is the 'decision-maker'?",
        options: ["The person who contacts you first", "The person who pays the invoice", "The person with authority to approve scope, fee and risk", "The builder"],
        answer: 2,
        why: "The first contact, payer and decision-maker can be three different people. Identify who can actually say yes."
      }
    ]
  },
  {
    id: "L2",
    title: "The question toolkit",
    principle: "P2",
    summary: "Different questions do different jobs. Use a funnel: broad and open first, then narrow, then confirm.",
    points: [
      "**Open** questions (\"Tell me about...\", \"How did...\", \"What happened when...\") draw out stories and unknowns.",
      "**Closed** questions (\"Is it on a slope?\") confirm specific facts. Use them late, not first.",
      "**Funnel**: open, then probe, then closed to pin down detail, then summarise.",
      "**Avoid leading questions** (\"You don't need consent, do you?\"). They hand the client the answer you expect.",
      "**Scenario questions** (\"Walk me through a typical day using this deck\") expose requirements clients cannot state abstractly.",
      "One question at a time. Stacked questions get one answer, usually the easiest."
    ],
    good: "\"Talk me through how the site is used at the moment, and what you'd like to change.\"",
    bad: "\"It's flat, it's on piles, and the council's fine with it, right?\"",
    checks: [
      {
        q: "Which is a leading question?",
        options: ["How did you arrive at that budget?", "You've already got consent, haven't you?", "What happened at the council meeting?", "Can you describe the site?"],
        answer: 1,
        why: "It signals the 'right' answer and discourages the client from correcting you."
      },
      {
        q: "In a funnel sequence, when do closed questions belong?",
        options: ["First, to save time", "After open questions and probing, to confirm detail", "Never", "Only at the end of the project"],
        answer: 1,
        why: "Open first to discover what you did not know to ask, then closed to pin down specifics."
      }
    ]
  },
  {
    id: "L3",
    title: "Probing and laddering",
    principle: "P3",
    summary: "The first answer is rarely the whole answer. Follow the thread until you reach the real constraint.",
    points: [
      "**Probes**: \"Say more about that.\", \"What do you mean by 'cheap'?\", \"What happened next?\"",
      "**Laddering**: keep asking \"and why does that matter?\" until you reach a value or constraint (a deadline, a lender, a neighbour dispute).",
      "**Clarify vague words**: quick, cheap, standard, simple, normal, sorted. Ask for an example or a number.",
      "**Silence** works. Count to five after an answer; people often add the important part.",
      "Probe **contradictions** gently: \"Earlier you said X, and now Y. Help me understand.\""
    ],
    good: "Client: \"We need it quick.\" You: \"What's driving the timing?\"",
    bad: "Client: \"We need it quick.\" You: \"No problem, two weeks.\"",
    checks: [
      {
        q: "A client says they want it 'cheap'. What is the best response?",
        options: ["Offer a discount", "Ask what cheap means: a figure, or cheaper than what?", "Move on to scope", "Explain your hourly rate"],
        answer: 1,
        why: "'Cheap' is relative. A number, a comparison or a funding constraint is what you need."
      },
      {
        q: "What is laddering?",
        options: ["Asking the same question louder", "Repeatedly asking why something matters to reach the underlying driver", "Listing deliverables in order", "Escalating to a manager"],
        answer: 1,
        why: "Each 'why does that matter?' moves from feature to benefit to underlying constraint."
      }
    ]
  },
  {
    id: "L4",
    title: "The engineering checklist",
    principle: "P4",
    summary: "Clients cannot tell you what they do not know matters. Carry your own checklist and cover it in conversation, not as an interrogation.",
    points: [
      "**Purpose and outcome**: what, why, and what success looks like.",
      "**Site and ground**: location, slope, soil knowledge, neighbours, boundaries, hazards.",
      "**Existing structure**: age, alterations, drawings, previous engineers, known defects.",
      "**Consent and compliance**: consent status, council feedback or RFIs, which producer statements are expected (PS1 to PS4), who is the building certifier or inspector.",
      "**Stakeholders**: owner, builder, architect, lender, insurer, neighbours, who decides.",
      "**Scope and deliverables**: design only, or inspection and PS4 too? What is explicitly excluded?",
      "**Budget and programme**: fee expectation, construction budget, hard deadlines (settlement, builder start, funding).",
      "**Risk and history**: work already started, past disputes, anything \"the last engineer\" said."
    ],
    good: "\"Has anything been built or ordered yet, and has council seen any of it?\"",
    bad: "(Never asking about consent, existing work or deadlines.)",
    checks: [
      {
        q: "Which topic is most easily missed, yet can change your scope entirely?",
        options: ["The client's favourite colour", "Whether work has already started on site", "The client's job title", "The date of the first call"],
        answer: 1,
        why: "Work already under way changes the service (retrospective assessment, PS4 limits) and the risk."
      },
      {
        q: "Why ask about hard deadlines like settlement or builder start dates?",
        options: ["To justify a higher fee", "They drive the programme and often reveal pressure to cut corners", "They are irrelevant to engineers", "To be polite"],
        answer: 1,
        why: "External deadlines create pressure that affects scope, review time and what can honestly be promised."
      }
    ]
  },
  {
    id: "L5",
    title: "Listening and playing back",
    principle: "P5",
    summary: "People only trust you have understood if you show it. Paraphrase, summarise, and let them correct you.",
    points: [
      "**Paraphrase** in your own words: \"So the main concern is...\"",
      "**Summarise** every few minutes: \"Let me check I have this right...\"",
      "Do not **solve too early**. Jumping to answers cuts off disclosure.",
      "Name **emotion** when it appears: \"It sounds like the delays have been stressful.\"",
      "Take **notes** and say you are doing it. It signals care and builds the record."
    ],
    good: "\"So the deadline is the loan settlement on the 14th, and the builder can't start without a signed-off design. Have I got that right?\"",
    bad: "\"OK, I'll get it done.\"",
    checks: [
      {
        q: "Why summarise back to the client?",
        options: ["To fill silence", "To test and correct your understanding, and show you listened", "To lengthen the call", "To avoid writing notes"],
        answer: 1,
        why: "A summary invites correction while the cost of correcting is still low."
      },
      {
        q: "A client mentions the delays have been stressful. What is the best response?",
        options: ["Ignore it and continue", "Acknowledge it briefly, then ask what is driving the delays", "Promise to fix everything", "Change the subject to fees"],
        answer: 1,
        why: "Acknowledging builds trust, and the cause of the stress is often the real constraint."
      }
    ]
  },
  {
    id: "L6",
    title: "Assumptions and red flags",
    principle: "P6",
    summary: "Surface what you are assuming, and notice the signals that a job is riskier than it looks.",
    points: [
      "State assumptions aloud: \"I'm assuming the existing framing is original. Is that right?\"",
      "**Red flags**: work already built, \"the builder says it's fine\", pressure for a quick sign-off, refusal to share drawings, unclear who pays, conflicting accounts, pre-set conclusions (\"just tick it off\").",
      "**Professional boundaries**: a producer statement or sign-off must rest on your own design or observation. You can say no, or reshape the scope.",
      "Name the **limits of what you know**: you have not seen the site, the drawings or the ground.",
      "Prefer a **staged scope** (assessment first) when the unknowns are large."
    ],
    good: "\"I can't sign off work I haven't seen. What I can do is inspect it and report what I find.\"",
    bad: "\"Sure, send me the PS4 template and I'll sign it.\"",
    checks: [
      {
        q: "A client wants a PS4 for work already completed that you never designed or observed. Best response?",
        options: ["Sign it to help them settle", "Explain what you can honestly offer, such as an inspection and report, and the limits", "Refuse and end the call", "Quote a higher fee"],
        answer: 1,
        why: "A producer statement must be supported by your own design or observation. Offer an honest alternative scope."
      },
      {
        q: "Which is a red flag?",
        options: ["The client has drawings ready", "The client says the builder reckons it's fine and wants a quick tick", "The client asks about fees", "The client wants a site visit"],
        answer: 1,
        why: "Pre-set conclusions and pressure to sign off quickly are classic risk signals."
      }
    ]
  },
  {
    id: "L7",
    title: "Closing the conversation",
    principle: "P7",
    summary: "End by confirming what you heard, what happens next, and what is in and out of scope, then put it in writing.",
    points: [
      "**Playback**: purpose, key facts, constraints, assumptions, unknowns.",
      "**Scope in and out**: say what you will not be doing.",
      "**Next steps** with owners and dates: documents to send, site visit, fee proposal.",
      "**Send a written summary** the same day and invite corrections.",
      "Leave the door open: \"Is there anything I haven't asked that I should have?\""
    ],
    good: "\"To confirm: design of the deck and retaining wall, no inspection yet, consent resubmission by the 20th. I'll send that through today.\"",
    bad: "\"Great, I'll be in touch.\"",
    checks: [
      {
        q: "Which closing question often surfaces the last hidden fact?",
        options: ["Are we done?", "Is there anything I haven't asked that I should have?", "Do you accept the fee?", "When can you pay?"],
        answer: 1,
        why: "It gives permission to volunteer what the structure of your questions missed."
      },
      {
        q: "What should follow the conversation?",
        options: ["Nothing until the fee is accepted", "A same-day written summary with scope, assumptions and next steps", "A verbal reminder next week", "A new meeting"],
        answer: 1,
        why: "A written record fixes shared understanding and protects both parties."
      }
    ]
  }
];

/* Drill: rewrite the weak question. Graded by AI. */
window.DRILLS = [
  { bad: "You want the wall out, don't you?", flaw: "Leading and closed" },
  { bad: "What size is the deck, how high is it, what's it made of, and when do you want it?", flaw: "Stacked questions" },
  { bad: "Is the site flat?", flaw: "Closed, assumes the answer is simple" },
  { bad: "So you need a beam?", flaw: "Accepts the solution, skips the need" },
  { bad: "You've got consent already, right?", flaw: "Leading" },
  { bad: "What's your budget?", flaw: "Blunt; invites a guarded answer. Reframe with context" },
  { bad: "Client: \"We want it done quickly.\" You: \"OK.\"", flaw: "No probe on a vague word" },
  { bad: "Anything else?", flaw: "Weak close" },
  { bad: "Did the last engineer do it properly?", flaw: "Leading and judgemental" },
  { bad: "Client: \"The builder says it's fine.\" You: \"Great, send the drawings.\"", flaw: "Misses a red flag" },
  { bad: "Why did you do that?", flaw: "Sounds accusatory; \"why\" can feel like blame" },
  { bad: "Tell me everything about the house.", flaw: "Too broad, no focus" }
];

/* Role-play scenarios. Facts are hidden from the learner until debrief. */
window.SCENARIOS = [
  {
    id: "S1",
    level: "Easy",
    title: "The deck on the slope",
    blurb: "A homeowner phones about engineering a deck.",
    persona: "Aroha, 38, homeowner, friendly and chatty but not technical. She has never used an engineer before.",
    context: "You are an engineer at a small consulting firm taking a first enquiry call.",
    opening: "Hi, I was told I need an engineer for a deck at our place. Can you help?",
    style: "Warm, talkative, goes off on tangents about the kids. Answers open questions generously. Gives short answers to closed questions.",
    facts: [
      { id: "f1", fact: "Deck is about 2.5 m above ground on a sloping back section", reveal: "when asked about the site or the deck's height" },
      { id: "f2", fact: "Council declined the first consent application and asked for geotechnical and engineering information (an RFI)", reveal: "when asked about consent or council contact" },
      { id: "f3", fact: "There is a retaining wall at the bottom of the slope that was built by a previous owner without consent", reveal: "when asked about existing structures or what is on the site" },
      { id: "f4", fact: "Her real goal is a safe outdoor space for the kids and a place to sell the house in six months", reveal: "when asked why she wants the deck or about timing" },
      { id: "f5", fact: "Her budget is around $4,000 for engineering", reveal: "when asked about budget in a non-pushy way" },
      { id: "f6", fact: "A neighbour on the lower boundary has complained about the retaining wall", reveal: "when asked about neighbours or boundaries" }
    ]
  },
  {
    id: "S2",
    level: "Medium",
    title: "Knocking out the wall",
    blurb: "A buyer wants a load-bearing wall removed before settlement.",
    persona: "Dan, 45, buyer under pressure, speaks quickly, a bit defensive. Trusts his builder.",
    context: "You take a first call from a property buyer.",
    opening: "Look, I just need a beam spec'd to take out a wall. Builder says it's easy. How soon can you do it?",
    style: "Clipped, impatient. Gives minimal answers unless you ask why or show you understand his pressure. Opens up when you paraphrase his situation accurately.",
    facts: [
      { id: "f1", fact: "Settlement on the house is in 12 days and the lender requires the work plan beforehand", reveal: "when probed on 'how soon' or what is driving timing" },
      { id: "f2", fact: "House is a 1960s weatherboard with a heavy concrete tile roof", reveal: "when asked about the house age, roof or construction" },
      { id: "f3", fact: "The wall supports ceiling joists and the roof, and the builder has not seen drawings", reveal: "when asked what the wall supports or what documents exist" },
      { id: "f4", fact: "He plans to add a second storey in two years", reveal: "when asked about longer-term plans or the need for the open-plan space" },
      { id: "f5", fact: "No consent has been applied for; builder said 'it's minor work'", reveal: "when asked about consent or council" },
      { id: "f6", fact: "He wants a producer statement so the lender will release funds", reveal: "when asked what documents he needs at the end" },
      { id: "f7", fact: "Builder is his brother-in-law and has already ordered a steel beam", reveal: "when asked about the builder or what has been ordered, with some rapport" }
    ]
  },
  {
    id: "S3",
    level: "Hard",
    title: "The tick-box request",
    blurb: "A site manager wants a quick sign-off on work already done.",
    persona: "Craig, 52, experienced site manager for a small building firm. Confident, slightly dismissive of engineers, time-poor.",
    context: "You receive a call from a builder asking for engineering help.",
    opening: "Mate, I just need a PS4 on a slab and framing we've done. It's all standard. Can you sign it off today?",
    style: "Brisk, assertive, deflects detailed questions with 'it's standard'. Gets annoyed at too many questions, but responds to respectful, purpose-led questions and to being told what you can offer. Never admits problems unless specifically and carefully probed.",
    facts: [
      { id: "f1", fact: "No engineer was involved in the design; the slab was poured using a generic detail from another job", reveal: "when asked who designed it or what drawings exist" },
      { id: "f2", fact: "The site has a high water table and the slab was poured over soft ground without testing", reveal: "when asked about the ground or site investigation" },
      { id: "f3", fact: "The council inspector failed the foundation inspection last week", reveal: "when asked about inspections or council involvement" },
      { id: "f4", fact: "Framing is already up and has been covered with wrap and cladding in places", reveal: "when asked about stage of work or access for inspection" },
      { id: "f5", fact: "The owner is threatening to withhold the final payment until the producer statement is provided", reveal: "when asked why it is needed today or who is pushing" },
      { id: "f6", fact: "He has used a 'friendly' engineer before who just signed what he sent", reveal: "when you probe how this normally works or push back on signing without seeing it" },
      { id: "f7", fact: "He would accept an inspection and report if it was quick and cheap, since he is out of options", reveal: "only when you clearly explain what you can honestly offer instead of a sign-off" }
    ]
  },
  {
    id: "S4",
    level: "Medium",
    title: "The architect's moving brief",
    blurb: "An architect keeps changing the scope of a renovation.",
    persona: "Priya, 41, architect, articulate and busy, thinks in design terms and finds structural constraints annoying.",
    context: "An architect rings about structure for a renovation project.",
    opening: "Hi, we've got a lovely renovation, just need some structure sorted. Can you give me a fee? We're pretty flexible.",
    style: "Fluent but vague. Uses design jargon. Says 'flexible' and 'we'll see' often. Gives concrete answers only when asked for examples or numbers.",
    facts: [
      { id: "f1", fact: "Client wants to remove two internal walls and add a large glazed opening to the north", reveal: "when asked to describe the changes to the structure" },
      { id: "f2", fact: "The existing house is a 1920s villa with unreinforced foundations and a history of settlement cracks", reveal: "when asked about the existing building condition or history" },
      { id: "f3", fact: "The project has a fixed construction budget and she has already told the client structure would be 'a few thousand'", reveal: "when asked about budget or what the client was told" },
      { id: "f4", fact: "The client has asked for a decision on the scheme in two weeks, and design is only half done", reveal: "when asked about programme or decision dates" },
      { id: "f5", fact: "A previous engineer was dropped after disagreeing about retaining the chimney", reveal: "when asked about previous engineering input or who else has been involved" },
      { id: "f6", fact: "She expects the engineer to attend three site meetings and produce markups within the fee", reveal: "when asked what she expects the engineer to deliver or attend" }
    ]
  }
];
