/* Tracks tailored to the learner: small talk, seeing the other person's side, staying calm.
   Loaded after tracks.js. Edit freely. */

Object.assign(window.PRINCIPLES, {
  T1: "Easy, context-based opener",
  T2: "Open questions about them (not an interview)",
  T3: "Follows up on what they say",
  T4: "Shares something of their own (balanced)",
  T5: "Reads cues and exits or closes warmly",
  V1: "Seeks their view before presenting their own",
  V2: "Reflects content and feeling accurately",
  V3: "Finds what is reasonable in their view",
  V4: "Shows understanding without conceding",
  V5: "States own view clearly, then asks for a reaction"
});

Object.assign(window.TRACKS, {
  smalltalk: {
    name: "Small talk and rapport",
    desc: "Open, sustain and close light conversations at events, in the lunchroom and at the start of meetings.",
    skill: "small talk and building rapport",
    learner: "a person making conversation with someone they have just met or barely know",
    core: ["T1", "T2", "T3", "T4", "T5"],
    note: ""
  },
  perspective: {
    name: "Seeing their side",
    desc: "Understand another person's viewpoint, show you have understood it, then put your own view clearly.",
    skill: "understanding another person's viewpoint and expressing that understanding",
    learner: "a person in a disagreement who wants to understand the other side and show it",
    core: ["V1", "V2", "V3", "V4", "V5"],
    note: ""
  }
});
window.TRACK_ORDER = ["perspective", "defuse", "smalltalk", "work", "elicit", "personal"];

/* Staying calm: extra lesson in the Defusing track */
window.LESSONS.push({
  id: "LD7", track: "defuse", title: "Know your triggers and pre-write your lines", principle: "D1",
  summary: "Calm under pressure is mostly preparation. Know what sets you off, spot it early, and have your first sentence ready.",
  points: [
    "**List your triggers.** Common ones: being rushed, feeling disrespected, being told you are wrong, factual errors, being blamed in front of others.",
    "**Learn your early signs**: faster speech, tight jaw, clipped sentences, the urge to correct.",
    "**Slow your exhale.** A long breath out (longer than the breath in) settles you. Do it before you speak.",
    "**Name it silently**: \"I'm getting irritated.\" Naming the state reduces its grip.",
    "**Pre-write three lines** for your top situations, such as: \"Let me make sure I've understood. Say more about that.\" / \"I'd like to think about that. Can I come back to you by three?\" / \"I want to get this right. What matters most to you?\"",
    "**Delay the reply.** For written provocations, draft, wait, then send. Never reply while irritated.",
    "**Review afterwards**: what triggered me, what did I do, what will I try next time?"
  ],
  good: "(Slow breath out.) \"I'd like to think about that properly. Can I come back to you by three?\"",
  bad: "(Replying at once with a correction, a faster voice and a longer explanation.)",
  checks: [
    { q: "You feel irritation rising when someone says your guidance is wrong. Best first move?", options: ["Correct the error straight away", "Slow your exhale, pause, and use a prepared line such as \"Say more about that\"", "Match their tone", "Send an email immediately"], answer: 1, why: "A short physical reset and a ready line keeps you out of the reactive loop." },
    { q: "Why pre-write lines for hard moments?", options: ["They sound polished", "Under stress it is hard to improvise, so a ready line gives you a calm first step", "They replace listening", "They are shorter"], answer: 1, why: "The first sentence sets the tone. Having it ready removes the hardest part." }
  ]
});

/* ---------- Small talk lessons ---------- */
window.LESSONS.push(
  {
    id: "LT1", track: "smalltalk", title: "Small talk has a job", principle: "T1",
    summary: "Small talk is not about content. It signals safety and goodwill so that the real conversation can happen. It is a learnable routine, not a personality trait.",
    points: [
      "**Its purpose** is to say \"I'm friendly and interested.\" The topic hardly matters.",
      "**Stakes are low.** Nobody is scoring it. A few awkward seconds are normal for everyone.",
      "**Use a simple routine**: open, ask, follow up, share, close.",
      "**Keep it short** at first. Two minutes of decent small talk beats ten of strained effort.",
      "**Treat it like any skill**: prepare a few openers and questions in advance, then practise."
    ],
    good: "\"Morning. How's your week been so far?\"",
    bad: "(Staying silent, or starting straight on a technical topic.)",
    checks: [
      { q: "What is the main purpose of small talk?", options: ["To exchange information", "To signal goodwill and build comfort", "To fill time", "To show expertise"], answer: 1, why: "It builds the trust that makes later, more serious conversations easier." },
      { q: "A good way to approach small talk as someone who finds it hard is to:", options: ["Wing it every time", "Use a simple routine and prepare a few openers", "Avoid it entirely", "Talk about work only"], answer: 1, why: "A routine reduces the effort of improvising." }
    ]
  },
  {
    id: "LT2", track: "smalltalk", title: "Openers from the shared context", principle: "T1",
    summary: "The easiest openers use what you both can see: the place, the event, the food, the weather, the reason you are both there.",
    points: [
      "**Observation**: \"This queue is moving faster than I expected.\"",
      "**Shared purpose**: \"What brought you to the conference?\" / \"Which session are you looking forward to?\"",
      "**Easy personal-but-safe questions**: \"How's your week been?\" \"Have you got anything on this weekend?\"",
      "**Avoid dead-end openers** like \"Good weekend?\", which gets a yes or no.",
      "**Use their name** if you know it, and say yours clearly."
    ],
    good: "\"Hi, I'm Martin. What brought you along today?\"",
    bad: "\"Did you have a good weekend?\" (yes/no)",
    checks: [
      { q: "Which opener invites more than a one-word answer?", options: ["\"Good weekend?\"", "\"What did you get up to at the weekend?\"", "\"Busy?\"", "\"Cold today, isn't it?\" then silence"], answer: 1, why: "An open question gives them something to talk about." },
      { q: "What is an easy source of openers at an event?", options: ["Politics", "The shared context (event, venue, why you're there)", "Your own achievements", "Complaints about colleagues"], answer: 1, why: "Shared context is safe, relevant and always available." }
    ]
  },
  {
    id: "LT3", track: "smalltalk", title: "Follow the thread", principle: "T3",
    summary: "The skill is not in the first question. It is in picking up something they said and asking about that.",
    points: [
      "**Listen for a hook**: a place, a person, a feeling, something they are doing.",
      "**Ask one follow-up** about the hook: \"You said you're presenting tomorrow. How are you feeling about it?\"",
      "**Use echo questions**: repeat a key word with curiosity. \"Invercargill?\"",
      "**Use 'Tell me more'** and 'What was that like?'",
      "**Avoid interviewing.** Two or three questions in a row feels like an interview. Mix with sharing (next lesson).",
      "**Remember a detail** and bring it back later. It shows you listened."
    ],
    good: "Them: \"I've come up from Invercargill.\" You: \"That's a long way. What's it like down there at this time of year?\"",
    bad: "Them: \"I've come up from Invercargill.\" You: \"Right. So what does your council do about consent timeframes?\"",
    checks: [
      { q: "They say, \"I'm presenting tomorrow morning.\" Best follow-up?", options: ["\"What's your topic?\" and then your own talk", "\"How are you feeling about it?\"", "\"Good luck.\" and walk away", "\"I hate presenting.\""], answer: 1, why: "A feeling question picks up the hook and shows interest in them." },
      { q: "What is wrong with a string of questions?", options: ["Nothing", "It feels like an interview", "It's too friendly", "It takes too long"], answer: 1, why: "Balance questions with brief sharing so it feels mutual." }
    ]
  },
  {
    id: "LT4", track: "smalltalk", title: "Give a little", principle: "T4",
    summary: "Small talk is a two-way trade. Share a small piece of yourself so the other person has something to respond to.",
    points: [
      "**Rule of thumb**: roughly equal airtime. A few sentences each.",
      "**Share something small and personal** (not confidential): a hobby, a place, a mild opinion, a small story.",
      "**Respond to what they shared** with something similar: \"I've done a bit of that too...\"",
      "**Avoid a technical monologue.** Keep work stories short and human.",
      "**Be a little vulnerable**: \"I always feel slightly awkward at these things.\" It tends to put the other person at ease.",
      "**Pass the ball back**: \"What about you?\""
    ],
    good: "\"I always find the first ten minutes of these events a bit awkward. How do you find them?\"",
    bad: "\"Let me explain how the clause actually works...\" (three minutes)",
    checks: [
      { q: "Why share something about yourself?", options: ["To fill the time", "It makes the exchange two-way and gives them something to respond to", "To impress", "To change the subject"], answer: 1, why: "Reciprocity makes the conversation feel natural, not like an interview." },
      { q: "A work story is best when it is:", options: ["Detailed and technical", "Short and human", "Confidential", "Long enough to cover the standard"], answer: 1, why: "Short human stories invite connection; technical detail ends it." }
    ]
  },
  {
    id: "LT5", track: "smalltalk", title: "Reading cues and exiting warmly", principle: "T5",
    summary: "Knowing how to finish makes starting less scary. A warm exit leaves a good impression.",
    points: [
      "**Read cues**: looking around, shorter answers, glancing at a phone or door signal they are ready to move on.",
      "**Exit lines**: \"I'll let you get to the coffee. It was good to meet you.\" / \"I should say hello to a couple of people. Enjoy the session.\"",
      "**Name something specific**: \"Good luck with the talk tomorrow.\"",
      "**Leave a thread**: \"Let me know how it goes.\" or \"Find me later.\"",
      "**Avoid vanishing or apologising** (\"Sorry, I'm no good at this\")."
    ],
    good: "\"It's been good to meet you. Good luck with the talk tomorrow. I'll look out for you after.\"",
    bad: "\"Well, I'd better get back to work.\" (abruptly)",
    checks: [
      { q: "Which is a warm exit?", options: ["Walking off mid-sentence", "\"I'll let you get to the coffee. Good luck with the talk tomorrow.\"", "\"Sorry, I'm bad at this.\"", "\"Right, bye.\""], answer: 1, why: "It is specific, kind and leaves a thread." },
      { q: "Which sign suggests the other person wants to wrap up?", options: ["Longer answers", "Looking around and giving shorter replies", "Asking you questions", "Leaning in"], answer: 1, why: "Short replies and looking elsewhere are common exit cues." }
    ]
  }
);

/* ---------- Seeing their side lessons ---------- */
window.LESSONS.push(
  {
    id: "LV1", track: "perspective", title: "Understanding comes before being right", principle: "V1",
    summary: "Technically correct is not the same as effective. People rarely change their mind until they feel understood.",
    points: [
      "**The engineer's trap**: finding the error, correcting it and expecting agreement. It usually produces defence.",
      "**Two jobs**: understand their view (and show it), then state yours. In that order.",
      "**Their view is data.** It tells you their constraints, fears and priorities, even where you disagree with the conclusion.",
      "**Understanding is not agreement.** You can fully understand a view you reject.",
      "**Aim for 'that makes sense given where they stand.'** There is nearly always a reasonable path to their position."
    ],
    good: "\"Before I give you my view, I'd like to understand yours properly. Tell me how it looks from where you sit.\"",
    bad: "\"That's technically incorrect. The clause says...\"",
    checks: [
      { q: "What is the engineer's trap in a disagreement?", options: ["Being too empathetic", "Correcting facts before the other person feels understood", "Avoiding conflict", "Agreeing too quickly"], answer: 1, why: "Early correction triggers defence and stalls the discussion." },
      { q: "Does understanding someone's view mean you agree?", options: ["Yes", "No, it means you can describe it fairly and see why they hold it", "Only if they are senior", "Only in writing"], answer: 1, why: "Understanding and agreement are separate. You can offer the first without the second." }
    ]
  },
  {
    id: "LV2", track: "perspective", title: "Ask to understand", principle: "V1",
    summary: "Use curious, open questions that invite them to explain, not defend.",
    points: [
      "**\"Help me understand...\"** is an invitation, not a challenge.",
      "**\"What's most important to you here?\"** gets to the priority.",
      "**\"What concerns you most?\"** gets to the fear.",
      "**\"What would a good outcome look like?\"** gets to the goal.",
      "**\"What have you seen that leads you to that view?\"** gets to the evidence.",
      "**Avoid 'Why would you think that?'** It sounds like disbelief. Try \"What's led you to that?\"",
      "**One question, then listen.** Stay quiet for a beat after their answer."
    ],
    good: "\"Help me understand what you've seen that leads you to that view.\"",
    bad: "\"Why would you think that?\"",
    checks: [
      { q: "Which question invites explanation without challenge?", options: ["\"Why would you think that?\"", "\"Help me understand what's led you to that.\"", "\"Can you prove it?\"", "\"Surely you can see...\""], answer: 1, why: "It is genuinely curious and signals respect." },
      { q: "What should you do after asking?", options: ["Immediately add your view", "Stay quiet and listen", "Rephrase the question", "Move on"], answer: 1, why: "Silence invites the fuller answer." }
    ]
  },
  {
    id: "LV3", track: "perspective", title: "Reflect content and feeling", principle: "V2",
    summary: "Say back what you heard, including the feeling and the reason, and let them correct you.",
    points: [
      "**Formula**: \"You're [feeling] because [reason]. Have I got that right?\"",
      "**Feeling words**: frustrated, worried, overlooked, under pressure, embarrassed, let down, anxious, disrespected.",
      "**Content first, then feeling.** \"So the forms keep arriving altered, and your team ends up carrying the risk. That sounds exhausting.\"",
      "**Check, don't assume**: \"Have I got that right?\" or \"What did I miss?\"",
      "**Be brief.** One or two sentences. Avoid parroting.",
      "**Accept correction gracefully.** It means they are engaging."
    ],
    good: "\"So you're worried that the guidance will cost you time you don't have. Have I got that right?\"",
    bad: "\"I understand.\" (nothing else)",
    checks: [
      { q: "Which is an accurate reflection?", options: ["\"I understand.\"", "\"You're frustrated because it keeps landing on your team. Have I got that right?\"", "\"You shouldn't feel that way.\"", "\"Everyone has that problem.\""], answer: 1, why: "It names the feeling and reason and invites correction." },
      { q: "Why end with 'Have I got that right?'", options: ["It's polite filler", "It tests your understanding and lets them correct you", "It ends the conversation", "It avoids commitment"], answer: 1, why: "Checking turns a guess into confirmed understanding." }
    ]
  },
  {
    id: "LV4", track: "perspective", title: "Express understanding without conceding", principle: "V4",
    summary: "Show you see why they hold the view, without agreeing to the conclusion.",
    points: [
      "**\"I can see why...\"**: \"I can see why that looks like a problem, given what your team deals with.\"",
      "**Find what is reasonable**: what would have to be true for their view to make sense?",
      "**Replace 'but' with 'and'**: \"I see why you'd say that, and I see it differently.\"",
      "**Avoid 'I hear you, but...'** The 'but' erases what came before.",
      "**Do not concede facts you dispute.** Acknowledge the experience, not the claim.",
      "**Say it once, sincerely.** Repeating sounds scripted."
    ],
    good: "\"Given the pressure your team is under, I can see why altered forms feel like the last straw.\"",
    bad: "\"I hear you, but you've misread the clause.\"",
    checks: [
      { q: "Which conveys understanding without conceding?", options: ["\"You're right, we got it wrong.\"", "\"I can see why that looks like a problem given your workload.\"", "\"I hear you, but you're wrong.\"", "\"There's nothing I can do.\""], answer: 1, why: "It validates the experience while leaving the facts open." },
      { q: "Why replace 'but' with 'and'?", options: ["'But' is rude", "'But' erases the acknowledgement that came before", "'And' is shorter", "It's grammar"], answer: 1, why: "'And' lets both views stand together." }
    ]
  },
  {
    id: "LV5", track: "perspective", title: "State your view, then ask for a reaction", principle: "V5",
    summary: "After they feel understood, say your own view plainly, framed as your perspective, and ask how it lands.",
    points: [
      "**Bridge with 'and'**: \"I see the pressure on your team, and from the profession's side, here's what we're seeing.\"",
      "**Own it as your view**: \"From where I sit...\" rather than \"The truth is...\"",
      "**Lead with shared goals**: \"We both want consents to be right and quick.\"",
      "**Be brief and specific.** One or two points.",
      "**Ask for a reaction**: \"How does that land?\" or \"What am I missing?\"",
      "**Propose a next step** you can both live with."
    ],
    good: "\"We both want consents that are right and quick. From where I sit, the alterations come from unclear templates. How does that land with you?\"",
    bad: "\"Well, the real issue is that your team doesn't read the guidance.\"",
    checks: [
      { q: "After reflecting their view, how should you introduce yours?", options: ["\"But actually...\"", "\"And from where I sit... How does that land?\"", "\"The truth is...\"", "Say nothing"], answer: 1, why: "It frames your view as one perspective and invites response." },
      { q: "What is a good shared starting point?", options: ["Who was at fault", "A goal you both hold", "Policy citations", "Your credentials"], answer: 1, why: "Shared goals turn opponents into problem-solvers." }
    ]
  }
);

/* ---------- Drills ---------- */
[
  ["smalltalk", "Good weekend?", "Closed; invites 'yes' and silence"],
  ["smalltalk", "Fine thanks.", "Dead end; no question or hook back"],
  ["smalltalk", "I'm not really good at small talk.", "Labels yourself and ends the conversation"],
  ["smalltalk", "Well, I'd better get back to work.", "Abrupt exit"],
  ["smalltalk", "Let me tell you about the guidance project...", "Monologue; no interest in them"],
  ["smalltalk", "Them: \"I've just come from Invercargill.\" You: \"Right. Anyway, about the consent timeframes...\"", "Misses the hook"],
  ["perspective", "That's technically incorrect.", "Corrects before understanding"],
  ["perspective", "I hear you, but you've misunderstood the clause.", "'But' erases the acknowledgement; implies they are wrong"],
  ["perspective", "Why would you think that?", "Sounds like disbelief"],
  ["perspective", "Obviously the standard says otherwise.", "Dismissive; 'obviously' belittles"],
  ["perspective", "That's not what I meant.", "Defensive; centres you"],
  ["perspective", "I understand.", "Generic; shows nothing"]
].forEach(([track, bad, flaw]) => window.DRILLS.push({ track, bad, flaw }));

/* ---------- Scenarios ---------- */
window.SCENARIOS.push(
  {
    id: "ST1", track: "smalltalk", level: "Easy", voice: "coral",
    voiceStyle: "New Zealand woman in her mid-forties. Friendly, slightly nervous, warm laugh.",
    title: "Conference registration queue",
    blurb: "You are in the registration queue at a conference and the person next to you looks unsure.",
    persona: "Rachel, 44, an engineer at a regional council, friendly but nervous, attending for the first time.",
    context: "You are in the queue for registration at a professional conference. You do not know the person next to you.",
    opening: "Oh, hi. Sorry, is this the queue for registration, or for coffee?",
    style: "Friendly and a little nervous. Answers open questions fully and happily. Gives short answers to closed questions or if the other person only talks about work or lectures. Asks a question back when the other person shares something about themselves.",
    facts: [
      { id: "f1", fact: "She has flown up from Invercargill and this is her first time at the conference", reveal: "when asked where she's from or what brought her" },
      { id: "f2", fact: "She is presenting tomorrow morning and is nervous", reveal: "when asked how she's finding the event or what she's looking forward to, with warmth" },
      { id: "f3", fact: "Her council has a growing consent backlog and she is stretched thin", reveal: "when asked about her work, after some rapport" },
      { id: "f4", fact: "She loves tramping and does a long walk most summers", reveal: "when asked what she does outside work or at weekends" },
      { id: "f5", fact: "She hopes to find a mentor or someone to talk to about her work", reveal: "when asked what she hopes to get from the conference" },
      { id: "f6", fact: "She worked once with someone you probably know", reveal: "when you share where you work or what you do" }
    ]
  },
  {
    id: "ST2", track: "smalltalk", level: "Easy", voice: "ash",
    voiceStyle: "New Zealand man in his mid-thirties. Easygoing, friendly, a bit tired.",
    title: "Monday in the lunchroom",
    blurb: "A colleague you work with but barely chat to is in the kitchen on Monday morning.",
    persona: "Dev, 36, a friendly colleague, easygoing and tired on a Monday.",
    context: "You walk into the kitchen on Monday morning and a colleague is making coffee.",
    opening: "Morning. Don't suppose you know how this machine works? It's beaten me again.",
    style: "Easygoing and talkative if asked about himself. Notices when the other person is distracted or only talks work and gets polite and brief. Often asks 'what about you?'",
    facts: [
      { id: "f1", fact: "He ran his first half marathon on Saturday", reveal: "when asked about his weekend" },
      { id: "f2", fact: "His daughter has just started school", reveal: "when asked about family or home life" },
      { id: "f3", fact: "He is moving house in three weeks and is stressed about it", reveal: "when asked how he's going or how the week looks" },
      { id: "f4", fact: "He would love to go to the conference but has not asked", reveal: "when you mention the conference or events" },
      { id: "f5", fact: "He has noticed you are usually heads-down and wasn't sure if you like being interrupted", reveal: "when you share something personal or admit small talk is not your strong suit" }
    ]
  },
  {
    id: "ST3", track: "smalltalk", level: "Medium", voice: "fable",
    voiceStyle: "New Zealand man in his late fifties. Warm, wry, a little formal, chuckles often.",
    title: "Seated beside the sponsor",
    blurb: "At a conference dinner you're seated next to the CEO of a sponsor.",
    persona: "Graham, 58, CEO of a materials supplier and conference sponsor, affable, wry, tests whether people are interested in him.",
    context: "You are at a conference dinner and have been seated next to a sponsor's CEO you do not know.",
    opening: "Well, they've put me next to an engineer. I hope you don't mind the company.",
    style: "Warm and wry. Enjoys talking about himself if asked, but loses interest quickly if you pitch for sponsorship or lecture him. Likes being asked about his story.",
    facts: [
      { id: "f1", fact: "He started as a draughtsman and worked his way up", reveal: "when asked how he got into the industry" },
      { id: "f2", fact: "He is worried about workforce shortages in his business", reveal: "when asked about what keeps him busy or worried" },
      { id: "f3", fact: "His sponsorship budget was cut by about a fifth this year", reveal: "when you build rapport and ask about the sponsorship, not pitch it" },
      { id: "f4", fact: "He recently became a grandfather", reveal: "when asked about life outside work" },
      { id: "f5", fact: "He loves sailing and spends weekends on the water", reveal: "when asked about weekends or hobbies" },
      { id: "f6", fact: "He would like a speaking slot to raise his firm's profile", reveal: "late, if you've shown real interest and asked what he'd like from sponsoring" }
    ]
  },
  {
    id: "ST4", track: "smalltalk", level: "Medium", voice: "sage",
    voiceStyle: "New Zealand woman in her early fifties. Courteous, brisk, watches the clock.",
    title: "First five minutes with a new stakeholder",
    blurb: "You are about to start a meeting with a council manager you haven't met before.",
    persona: "Helen, 52, a building consent manager, courteous but brisk and time-conscious.",
    context: "You arrive for a meeting with a council manager. You need her goodwill before you get to the agenda.",
    opening: "Thanks for coming in. I've got about forty minutes, so shall we jump straight in?",
    style: "Polite but guarded. Warms when someone takes one minute to show interest in her before the agenda. Cool and clipped if the agenda is pushed immediately or if the other person is stiff.",
    facts: [
      { id: "f1", fact: "She has had a tough week after a staff member resigned", reveal: "when asked about her week or how things are going" },
      { id: "f2", fact: "She started as a building inspector twenty years ago", reveal: "when asked about her background" },
      { id: "f3", fact: "Her team is about three weeks behind on consents", reveal: "when asked about the workload, after rapport" },
      { id: "f4", fact: "She values being consulted before guidance is published", reveal: "when asked what she'd like from the relationship" },
      { id: "f5", fact: "She has been wary of the profession after previous dealings but is open to a fresh start", reveal: "late, if you've been warm and honest" }
    ]
  },
  {
    id: "SV1", track: "perspective", level: "Hard", voice: "sage",
    voiceStyle: "New Zealand woman in her mid-fifties. Controlled, formal and sharp, tension under the politeness.",
    title: "The council's frustration",
    blurb: "A council consent manager says engineers keep altering producer statements and her team pays for it.",
    persona: "Margaret, 55, a building consent manager at a city council, controlled, sharp and under pressure.",
    context: "You represent the engineering profession. A council manager has requested a meeting about altered producer statements.",
    opening: "Your members keep altering producer statements and my team pays for it. What exactly are you going to do about it?",
    style: "Formal, accusatory, uses frame attacks (\"typical of the profession\", \"are you even listening?\"). Escalates if you correct her, cite rules or defend the profession. Softens when you accurately reflect her workload and liability concerns before offering any view.",
    facts: [
      { id: "f1", fact: "Her team found altered statements in about a dozen consents this quarter and each one cost days to chase", reveal: "when asked what she's seeing or how it affects her team" },
      { id: "f2", fact: "Council legal advisers warned her of liability if altered statements are accepted", reveal: "when asked what worries her most" },
      { id: "f3", fact: "Her staff are overloaded and morale is low", reveal: "when you acknowledge the workload and ask about the team" },
      { id: "f4", fact: "She feels the profession has ignored councils' concerns in the past", reveal: "when asked about past dealings, with empathy" },
      { id: "f5", fact: "She wants one standard template and a clear public statement from the professional body", reveal: "when asked what a good outcome would be" },
      { id: "f6", fact: "She would co-sign a joint guidance note and help draft it", reveal: "when you reflect her view accurately and propose working together" },
      { id: "f7", fact: "She is under pressure from her own manager and doesn't want to blame individual engineers", reveal: "late, once she feels heard" }
    ]
  },
  {
    id: "SV2", track: "perspective", level: "Medium", voice: "alloy",
    voiceStyle: "New Zealand man in his late forties. Apologetic, a bit awkward, relieved if treated kindly.",
    title: "The sponsor pulling out",
    blurb: "A sponsor rings to say they are withdrawing support for your conference.",
    persona: "Rob, 47, marketing manager at a supplier, apologetic and awkward, dreading this call.",
    context: "You help organise a conference. A sponsor has asked for a call about next year.",
    opening: "Hi. I've got some bad news about our sponsorship, and I'm really sorry.",
    style: "Apologetic and nervous. Gets defensive and withdraws if guilt-tripped, pushed or argued with. Opens up and offers alternatives if the other person shows understanding.",
    facts: [
      { id: "f1", fact: "His firm cut its marketing budget mid-year", reveal: "when asked what happened or what led to this" },
      { id: "f2", fact: "A new CEO now wants measurable return on every sponsorship", reveal: "when asked about the decision process" },
      { id: "f3", fact: "He argued for the sponsorship and lost the discussion, and feels embarrassed", reveal: "when treated with understanding" },
      { id: "f4", fact: "His firm would consider a smaller in-kind contribution, such as providing a venue lunch", reveal: "when asked about options" },
      { id: "f5", fact: "He needs clearer reporting on what sponsors get from the event", reveal: "when asked what would help him make a case next time" },
      { id: "f6", fact: "He expects the situation might improve next year", reveal: "late, once he feels the relationship is safe" }
    ]
  },
  {
    id: "SV3", track: "perspective", level: "Hard", voice: "echo",
    voiceStyle: "New Zealand man in his late fifties. Blunt, gravelly, impatient; slows down when he's listened to.",
    title: "The peer who says you're wrong",
    blurb: "A respected senior engineer says your draft guidance is wrong.",
    persona: "Greg, 57, a senior structural engineer, blunt, respected and commercially pressured.",
    context: "You wrote a draft guidance note. A senior engineer has phoned you about it.",
    opening: "I read your draft guidance. Honestly, parts of it are wrong, and I'm surprised it got this far.",
    style: "Blunt, uses frame attacks (\"you haven't done real design in years\", \"clearly nobody practising reviewed this\"). Escalates if you defend your credentials, explain intent or argue. Opens up if you stay calm, ask which parts, and reflect his concerns.",
    facts: [
      { id: "f1", fact: "He had a consent declined when a reviewer applied the draft's interpretation to a particular detail", reveal: "when asked what he's seen or which parts concern him" },
      { id: "f2", fact: "His specific objection is one clause that does not match common practice for small timber buildings", reveal: "when asked which part and why" },
      { id: "f3", fact: "He feels committees lack practising engineers and past consultations ignored him", reveal: "when asked about how the process has felt" },
      { id: "f4", fact: "He is under fee pressure and extra compliance work hits him hard", reveal: "when asked about the practical impact on him" },
      { id: "f5", fact: "He would review a revised draft and contribute worked examples if he felt respected", reveal: "when you reflect his view and ask what would help" },
      { id: "f6", fact: "He respects the effort behind the guidance and is blunt because he cares", reveal: "late, once he feels heard" }
    ]
  },
  {
    id: "SV4", track: "perspective", level: "Hard", voice: "nova",
    voiceStyle: "New Zealand woman in her early thirties. Careful, nervous, picking her words, steadier if the response is good.",
    title: "Feedback from a direct report",
    blurb: "A team member tells you she finds it hard to bring problems to you.",
    persona: "Taylor, 31, a capable team member who reports to you, nervous about giving upward feedback.",
    context: "You manage Taylor. She has asked for a private chat and is clearly nervous.",
    opening: "Thanks for making time. There's something I'd like to raise, and I'm a bit nervous about it.",
    style: "Careful, hedges, qualifies everything. Backs off and says 'it's fine' if the response is defensive, explanatory or dismissive. Becomes clearer and more candid if the response is calm, curious and appreciative.",
    facts: [
      { id: "f1", fact: "Once she brought a problem and was told it was obvious, so she now delays bringing bad news", reveal: "when asked for an example or what has happened" },
      { id: "f2", fact: "She respects his expertise and wants him to know that", reveal: "when asked how she sees his role, with warmth" },
      { id: "f3", fact: "She finds him quick to jump to solutions before she has finished explaining", reveal: "when asked what happens in conversations with him" },
      { id: "f4", fact: "She would value a regular one-to-one with a loose agenda", reveal: "when asked what would help" },
      { id: "f5", fact: "She would like to be asked 'what do you think?' before being given the answer", reveal: "when asked what she would change" },
      { id: "f6", fact: "She is worried raising this will affect how she is seen", reveal: "late, once she feels safe" }
    ]
  },
  {
    id: "SD4", track: "defuse", level: "Hard", voice: "onyx",
    voiceStyle: "New Zealand man in his fifties. Loud, challenging, slightly sarcastic, as if speaking from the floor of a hall.",
    title: "Hostile question from the floor",
    blurb: "At a conference talk, an audience member challenges you in front of the room.",
    persona: "Dan, 54, an audience member, challenging, sarcastic and clearly personally affected.",
    context: "You have just finished presenting and taken questions. Dan stands up.",
    opening: "So when exactly did the profession decide it knew better than the people doing the work?",
    style: "Challenging, sarcastic, makes personal remarks and frame attacks (\"people like you\", \"you've never built anything\"). Keeps pushing if you defend, justify or match his tone. If you stay calm, hold your frame and ask what he has seen, he calms and gives specifics.",
    facts: [
      { id: "f1", fact: "He lost a contract after a council decision that cited recent guidance", reveal: "when asked what has happened to him or what he's seen" },
      { id: "f2", fact: "He feels unheard by regulators and professional bodies", reveal: "when you acknowledge this without defending" },
      { id: "f3", fact: "He has a specific example prepared", reveal: "when asked for it" },
      { id: "f4", fact: "He would talk to you after the session if it wasn't in front of everyone", reveal: "when offered a calm next step" },
      { id: "f5", fact: "He isn't hostile to you personally; he's frustrated and the room gave him an audience", reveal: "late, once he settles" }
    ]
  },
  {
    id: "SP5", track: "personal", level: "Medium", voice: "ash",
    voiceStyle: "New Zealand man in his mid-forties. Dry and sarcastic on the surface, hurt underneath, quieter when understood.",
    title: "The sibling and the family event",
    blurb: "Your sibling suspects you'll skip a big family event because of work.",
    persona: "Chris, 47, your sibling, dry, sarcastic and quietly hurt.",
    context: "Your sibling has phoned about your mother's 80th birthday in three weeks.",
    opening: "Mum's 80th is in three weeks. Are you actually coming this time, or is work more important again?",
    style: "Sarcastic, uses frame attacks (\"typical\", \"you always do this\"). Escalates if you defend yourself, explain at length or get cold. Softens when you acknowledge how it has looked from his side and ask what he needs.",
    facts: [
      { id: "f1", fact: "He has organised most of the event on his own and feels alone doing it", reveal: "when asked how the planning has been going" },
      { id: "f2", fact: "He was hurt when you left early at the last family gathering", reveal: "when asked what's been bothering him" },
      { id: "f3", fact: "Their mother has been asking whether you will be there", reveal: "when asked how Mum is or what she's said" },
      { id: "f4", fact: "He needs help with a specific job, such as the venue booking and speeches", reveal: "when asked what would help" },
      { id: "f5", fact: "He is worried about the cost and hasn't said so", reveal: "when he feels understood" },
      { id: "f6", fact: "He would be happy with a shorter appearance if told in advance", reveal: "late, once he feels heard" }
    ]
  }
);
