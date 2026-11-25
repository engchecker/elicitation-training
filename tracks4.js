/* Potential violence track: staying safe and de-escalating volatile situations.
   Scenarios here run in pressure mode (hidden agitation meter, response clock, levels).
   Loaded after tracks3.js. Edit freely. */

Object.assign(window.PRINCIPLES, {
  S1: "Keeps distance, an exit and open hands",
  S2: "Calm, low, slow voice; short simple sentences",
  S3: "Deflects insults without defending or hitting back",
  S4: "Listens and labels the emotion before influencing",
  S5: "Offers choices and a face-saving way out",
  S6: "Judges when to disengage, leave and get help"
});

Object.assign(window.TRACKS, {
  safety: {
    name: "Potential violence",
    desc: "Stay calm and safe when someone is aggressive, drunk or volatile, at work or on the street. Scenarios run under pressure and unlock in levels.",
    skill: "de-escalating potentially violent confrontations and judging when to leave",
    learner: "a person facing an aggressive, possibly volatile stranger or client",
    core: ["S1", "S2", "S3", "S4", "S5", "S6"],
    note: "Practice builds calm habits; it does not replace in-person training. In real life, if anyone shows a weapon, moves to attack, or you feel unsafe: leave, move towards people and light, and call 111. Describe what you do in brackets during role-plays, for example (step back, hands open)."
  }
});
window.TRACK_ORDER = ["perspective", "defuse", "safety", "smalltalk", "family", "close", "work", "elicit", "personal"];

/* ---------- Lessons ---------- */
window.LESSONS.push(
  {
    id: "LS1", track: "safety", title: "Read the risk before you speak", principle: "S6",
    scene: "Walking back to the office, you see a man shouting at people near the entrance. You have a few seconds before he notices you.",
    summary: "Before using any technique, decide whether you need to be in this conversation at all. Police in New Zealand use TENR: Threat, Exposure, Necessity, Response.",
    points: [
      "**Threat:** what could this person do, and what are they showing you right now?",
      "**Exposure:** how close are you, who else is around, and where is your exit?",
      "**Necessity:** do you actually need to engage? Crossing the road is a valid tactic.",
      "**Response:** choose the lowest-risk option: avoid, talk, or leave.",
      "**Warning signs** that talk may be failing: clenched fists, sudden quiet or staring, blading the body, glancing at your chin or around for witnesses, closing distance, mates fanning out.",
      "**Reassess every few seconds.** The right choice can change mid-sentence."
    ],
    good: "(Notices the man, crosses to the other footpath and uses the side entrance.)",
    bad: "(Walks straight up to him) \"Oi, you can't be shouting here.\"",
    checks: [
      { q: "What does the N in TENR ask?", options: ["Is it noisy?", "Do you need to engage at all?", "Who is nearest?", "What is the next step?"], answer: 1, why: "Necessity: if you don't need to engage, avoiding is often the safest option." },
      { q: "Which is a warning sign that talking may be failing?", options: ["He sits down", "He goes suddenly quiet and closes distance", "He asks you a question", "He swears"], answer: 1, why: "Sudden quiet and closing distance are common pre-attack signs. Swearing alone is not." }
    ]
  },
  {
    id: "LS2", track: "safety", title: "Distance, the fence and your exit", principle: "S1",
    scene: "A drunk man at the bus stop steps towards you, demanding a cigarette.",
    summary: "Your position does more for your safety than your words. Get it right first, then talk.",
    points: [
      "**Keep at least two arm-lengths** away. If they step in, step back or sideways, calmly.",
      "**Stand at an angle**, not square on. Square reads as a challenge and leaves you off balance.",
      "**Hands up, open, at chest height** (the fence). It looks calming and keeps your hands ready.",
      "**Never corner them, and never let yourself be cornered.** Both of you need a way out.",
      "**Use barriers**: a bench, a car, a counter.",
      "**Don't turn your back** at close range. Back away a few steps first, then go."
    ],
    good: "(Steps back and to the side, hands open) \"Sorry mate, I don't smoke.\"",
    bad: "(Stands his ground, arms folded) \"I said no.\"",
    checks: [
      { q: "Why stand at an angle rather than square on?", options: ["It looks casual", "Square reads as a challenge and is less stable", "It's polite", "So you can see your phone"], answer: 1, why: "Angled is less confrontational and gives you balance to move." },
      { q: "What is the fence?", options: ["A barrier you hide behind", "Open hands at chest height, calming and ready", "Folding your arms", "Pointing at the person"], answer: 1, why: "Open hands look non-threatening and protect your space." }
    ]
  },
  {
    id: "LS3", track: "safety", title: "Voice and words under adrenaline", principle: "S2",
    scene: "A man near your office entrance is shouting at you. Your heart is pounding.",
    summary: "Adrenaline makes you talk fast, loud and in long sentences. Their brain can't take in complexity either. Slow everything down.",
    points: [
      "**Breathe first:** in for 4, hold for 4, out for 4. One cycle buys you composure.",
      "**Lower and slower than them.** People tend to match your tone.",
      "**Short sentences.** One idea at a time.",
      "**Use their name** if you know it, or ask for it.",
      "**Avoid:** \"calm down\", \"why\" questions, sarcasm, commands and jargon.",
      "**It's fine to pause.** A calm two seconds beats a rushed wrong line."
    ],
    good: "\"I'm Martin. What's your name?\"",
    bad: "\"Look, you need to calm down, because if you keep carrying on like this I'm going to have to get security involved.\"",
    checks: [
      { q: "Why avoid 'Why are you so angry?'", options: ["It's too long", "'Why' questions feel accusing", "It's too personal", "It's fine to ask"], answer: 1, why: "'Why' asks them to justify themselves, which feels like an attack." },
      { q: "Best pace when someone is shouting?", options: ["Match their speed", "Lower and slower than them", "Faster so you finish first", "Silent"], answer: 1, why: "Calm, slow speech tends to be mirrored." }
    ]
  },
  {
    id: "LS4", track: "safety", title: "Deflect, don't defend", principle: "S3",
    scene: "A man outside the bar says, \"You think you're better than me, eh?\"",
    summary: "Insults are bait. Defending yourself or hitting back turns their anger into a contest. Let the insult pass and redirect.",
    points: [
      "**Don't take the bait.** Your ego is not on trial.",
      "**Deflector phrases:** \"Maybe so.\" \"Fair enough.\" \"I hear you.\" Then redirect.",
      "**No 'but'.** \"I hear you, but...\" cancels the acknowledgement.",
      "**Don't argue facts** while they're angry. That can come later, or never.",
      "**Don't match swearing or volume.**",
      "**Pre-write three lines** so they come out automatically under pressure."
    ],
    good: "\"Maybe so. Looks like your night's gone sideways.\"",
    bad: "\"Actually, I never said that. Don't put words in my mouth.\"",
    checks: [
      { q: "Someone says 'You lot are all the same.' Best reply?", options: ["\"That's not true.\"", "\"Maybe so. What's happened?\"", "\"Don't stereotype me.\"", "Ignore them and walk closer"], answer: 1, why: "Deflect, then redirect to what's going on for them." },
      { q: "Why pre-write lines?", options: ["To sound clever", "Under adrenaline you can't compose well, so rehearsed lines come out automatically", "To memorise a script", "It's not useful"], answer: 1, why: "Rehearsed lines survive stress better than improvised ones." }
    ]
  },
  {
    id: "LS5", track: "safety", title: "Label it, then climb the stairway", principle: "S4",
    scene: "A rough sleeper near your building shouts that people keep moving him on.",
    summary: "The FBI's Behavioural Change Stairway runs: listen, empathise, build rapport, influence, behaviour change. Skipping straight to influence is the most common failure.",
    points: [
      "**Listen** without interrupting. Let them vent if it's safe.",
      "**Label the emotion:** \"Sounds like you're sick of being pushed around.\" Naming a feeling tends to lower it.",
      "**Paraphrase** what you heard in a few words.",
      "**Rapport:** look for anything you genuinely agree with.",
      "**Only then influence:** a request, a suggestion or a choice.",
      "**If it goes back up, step back down** the stairway and listen again."
    ],
    good: "\"Sounds like people have been treating you like you're not even here.\"",
    bad: "\"You can't sleep here, you'll need to move along.\"",
    checks: [
      { q: "What comes before influence on the stairway?", options: ["Threats", "Listening, empathy and rapport", "Calling security", "Explaining the rules"], answer: 1, why: "People only accept influence after they feel heard." },
      { q: "Which is a label?", options: ["\"Calm down.\"", "\"Sounds like you've had a rough day.\"", "\"What's your problem?\"", "\"Rules are rules.\""], answer: 1, why: "A label names the emotion you can see." }
    ]
  },
  {
    id: "LS6", track: "safety", title: "Choices, face and the way out", principle: "S5",
    scene: "A young man's mates are watching as he squares up to you outside a bar.",
    summary: "Many fights happen because backing down in front of others feels worse than fighting. Make it easy and dignified for them to stop.",
    points: [
      "**Give choices, not orders:** \"You can grab a taxi from the rank, or wait here for the bus. Your call.\"",
      "**Both options must be acceptable** to you.",
      "**Let them save face:** give them credit, accept partial blame for the misunderstanding, let them have the last word.",
      "**Separate them from the audience** if you can: \"Can we step over here a sec?\"",
      "**Don't need to win.** The goal is everyone going home.",
      "**Leave the door open:** \"No harm done. Have a good night.\""
    ],
    good: "\"My mistake if it looked like I was laughing at you. Wasn't the case. Enjoy your night.\"",
    bad: "\"Your mates are watching, so don't do anything stupid.\"",
    checks: [
      { q: "Why do audiences make confrontations worse?", options: ["Noise", "Backing down in public costs face", "Witnesses", "They don't"], answer: 1, why: "Loss of face in front of peers drives escalation." },
      { q: "Which is a face-saving line?", options: ["\"You lose.\"", "\"Fair enough, my mistake if it came across that way.\"", "\"Walk away, tough guy.\"", "\"Your mates think you're an idiot.\""], answer: 1, why: "It lets them stop without looking beaten." }
    ]
  },
  {
    id: "LS7", track: "safety", title: "When and how to walk away", principle: "S6",
    scene: "The drunk man has stepped closer twice after you asked him not to. His fists are clenched.",
    summary: "Leaving is a skill, not a failure. Know your triggers for leaving before you need them.",
    points: [
      "**Leave when:** you see a weapon, they keep closing distance after a calm request, warning signs build, a group starts to circle, or you can feel yourself losing it.",
      "**Say it calmly:** \"I'm going to head off now.\" No last word, no parting shot.",
      "**Back away a few steps** while facing them, then turn and walk briskly towards people and light.",
      "**Don't go back** for belongings or to finish the argument.",
      "**Call 111** once you're safe if anyone is at risk.",
      "**Report it** to building security or your manager, so the next person is warned."
    ],
    good: "(Steps back twice, hands open) \"I'm heading off now. Take care.\" (Walks towards the lit shopfronts, then calls 111.)",
    bad: "\"Go on then, try it.\"",
    checks: [
      { q: "Which is a clear trigger to leave?", options: ["He swears", "He keeps closing distance after a calm request", "He disagrees", "He raises his voice once"], answer: 1, why: "Repeatedly closing distance after a request is a strong warning sign." },
      { q: "How should you leave at close range?", options: ["Turn and run immediately", "Back away a few steps facing them, then walk briskly towards people", "Shout a final warning", "Stand your ground"], answer: 1, why: "Creating distance first stops you being caught off guard." }
    ]
  }
);

/* ---------- Drills ---------- */
[
  ["safety", "Calm down, mate.", "Dismissive command; tells them their feeling is wrong"],
  ["safety", "What's your problem?", "A challenge; invites a fight"],
  ["safety", "Don't you dare talk to me like that.", "Defends your ego and raises the stakes"],
  ["safety", "Move away from my building or I'm calling the police.", "Threat with no choice and no dignified way out"],
  ["safety", "Look, I didn't do anything wrong.", "Defends instead of acknowledging"],
  ["safety", "Why are you so angry?", "'Why' feels accusing; demands justification"]
].forEach(([track, bad, flaw]) => window.DRILLS.push({ track, bad, flaw }));
Object.assign(window.DRILL_CONTEXT = window.DRILL_CONTEXT || {}, {
  "safety|Calm down, mate.": "A drunk man at a bus stop near your office accuses you of staring at him. He's loud and swaying.",
  "safety|What's your problem?": "A stranger has been following you along the footpath shouting comments. You turn to face him.",
  "safety|Don't you dare talk to me like that.": "A man outside a bar calls you a stuck-up prick in front of his mates.",
  "safety|Move away from my building or I'm calling the police.": "A man sleeping rough is shouting at staff coming out of your office entrance.",
  "safety|Look, I didn't do anything wrong.": "A neighbour of your site storms up, saying your truck damaged his letterbox.",
  "safety|Why are you so angry?": "A client turns up at your office unannounced, shouting about an invoice."
});

/* ---------- Scenarios (pressure mode) ---------- */
window.SCENARIOS.push(
  {
    id: "SS1", track: "safety", stage: 1, stress: true, startAgitation: 4, level: "Easy", voice: "ash",
    voiceStyle: "New Zealand man in his forties. Irritated, clipped and impatient, softening when listened to.",
    title: "Level 1: The invoice dispute",
    blurb: "A client turns up at your office reception, irritated about your fee.",
    brief: "Glen, a homeowner client, has walked into reception unannounced, waving your invoice.",
    goal: "Bring him down, understand the real issue and agree a next step without discounting on the spot.",
    persona: "Glen, 46, a homeowner, irritated and feeling ripped off.",
    context: "Glen has come into your office reception unannounced holding your invoice.",
    opening: "Three grand? For a beam calc? You've got to be joking. I want someone to explain this right now.",
    style: "Impatient, sarcastic, talks over you. Escalates when you justify the fee line by line, quote policy, or say 'calm down'. Settles when his frustration is acknowledged and he's asked what he expected.",
    facts: [
      { id: "f1", fact: "He was quoted a 'ballpark' of $1,500 on the phone by someone else in the office", reveal: "when asked what he expected or was told" },
      { id: "f2", fact: "The builder told him engineers 'always pad their bills'", reveal: "when asked where his concern comes from" },
      { id: "f3", fact: "His renovation is already over budget and his partner is upset with him", reveal: "when asked how the project is going overall" },
      { id: "f4", fact: "He would be satisfied with a breakdown and a call from the director", reveal: "when asked what would help" }
    ]
  },
  {
    id: "SS2", track: "safety", stage: 2, stress: true, startAgitation: 5, level: "Medium", voice: "onyx",
    voiceStyle: "New Zealand man in his fifties, tradesman. Loud, blunt and accusing, quieter when respected.",
    title: "Level 2: The failed inspection",
    blurb: "A builder on site blames you for a failed council inspection.",
    brief: "You arrive on site for a routine visit. Mick, the builder, storms over: the council failed his framing inspection, citing your details.",
    goal: "Stay steady, find out what actually happened and agree what you'll do, without accepting blame you don't own.",
    persona: "Mick, 55, an experienced builder, angry and under pressure.",
    context: "On a residential building site, the builder confronts you beside the site shed.",
    opening: "Your drawings just cost me a week. Council failed the framing because of your bracing details. Who's paying for this?",
    style: "Loud, accusing, uses frame attacks (\"you've never swung a hammer\", \"you office guys\"). Steps closer when angry. Escalates when you defend your drawings or blame council. Settles when acknowledged and asked specifics.",
    facts: [
      { id: "f1", fact: "The inspector flagged missing hold-downs that are clearly shown on sheet S3, which his crew didn't have", reveal: "when asked exactly what the inspector said" },
      { id: "f2", fact: "His site copy of the drawings is an old revision", reveal: "when asked which drawings the crew were using" },
      { id: "f3", fact: "He has a penalty clause with the client for delays", reveal: "when asked what the delay means for him" },
      { id: "f4", fact: "He wants you to ring the inspector today and confirm the fix", reveal: "when asked what would help most" }
    ]
  },
  {
    id: "SS3", track: "safety", stage: 3, stress: true, startAgitation: 5, level: "Medium", voice: "echo",
    voiceStyle: "New Zealand man in his late thirties. Cold, contemptuous, needling; quieter when he can't get a rise.",
    title: "Level 3: \"You're not a real engineer\"",
    blurb: "A developer attacks your competence in front of his project manager.",
    brief: "In a site meeting, the developer, Craig, dismisses your concerns about a retaining wall and starts making it personal.",
    goal: "Don't defend your credentials. Deflect, stay calm, and keep the focus on the safety issue.",
    persona: "Craig, 39, a property developer, contemptuous and used to getting his way.",
    context: "A site meeting with the developer and his project manager present.",
    opening: "Honestly, are you even a real engineer? Every other consultant just signs these off. You're costing me money because you're scared of your own shadow.",
    style: "Needling personal attacks and frame attacks (\"desk jockey\", \"you'd fail in the real world\"). Escalates when you list your credentials, get defensive or sarcastic. Backs off when you deflect calmly and ask what he needs.",
    facts: [
      { id: "f1", fact: "His bank funding drawdown depends on the wall being signed off this month", reveal: "when asked what's driving the timing" },
      { id: "f2", fact: "A previous engineer signed off a wall that later failed, and he is privately worried", reveal: "late, once he stops attacking" },
      { id: "f3", fact: "He would accept an alternative design if it doesn't add more than two weeks", reveal: "when offered options" }
    ]
  },
  {
    id: "SS4", track: "safety", stage: 4, stress: true, startAgitation: 6, level: "Hard", voice: "verse",
    voiceStyle: "New Zealand man in his sixties. Shaky with rage, loud, and close; voice cracks when talking about his wife.",
    title: "Level 4: The site neighbour",
    blurb: "A neighbour of your site storms up, red-faced, about dust and noise.",
    brief: "You're alone on site doing an inspection. A neighbour comes through the gap in the fence, shouting, and walks straight at you.",
    goal: "Manage distance first. De-escalate if it's safe; leave if it isn't.",
    persona: "Barry, 64, next-door neighbour, exhausted and furious.",
    context: "A residential construction site. You are alone; the neighbour has come through a gap in the temporary fence.",
    opening: "Are you in charge here? Three months of this! Dust through my windows, trucks at six in the morning. I've had enough!",
    style: "Very loud, jabs a finger, closes distance if you don't manage it. Escalates if you say it's not your responsibility, cite consent conditions, or stand your ground nose to nose. Calms if you keep distance, acknowledge his three months, and offer a concrete action.",
    facts: [
      { id: "f1", fact: "His wife is recovering from lung surgery and the dust is a real worry", reveal: "when asked what's been hardest" },
      { id: "f2", fact: "He has complained to the builder four times and been ignored", reveal: "when asked what he's tried" },
      { id: "f3", fact: "He wants a name and number for someone who will actually respond", reveal: "when asked what would help" }
    ]
  },
  {
    id: "SS5", track: "safety", stage: 4, stress: true, startAgitation: 6, level: "Hard", voice: "ballad",
    voiceStyle: "New Zealand man around thirty, clearly drunk: slurred, loud, swinging between friendly and aggressive.",
    title: "Level 4: The drunk at the bus stop",
    blurb: "A drunk man near your work decides you've disrespected him.",
    brief: "Friday evening. You're waiting at the bus stop near your office. A drunk man asks for a cigarette, then takes offence when you say no.",
    goal: "Keep distance and stay calm. Help if it's safe; walk away if warning signs build.",
    persona: "Shane, 31, very drunk, alone, emotional and unpredictable.",
    context: "A city bus stop near an office building, early evening. There are a few other people about.",
    opening: "Oi. Oi! I asked you a question, bro. You too good to give us a smoke?",
    style: "Slurred, repeats himself, mood swings fast. Steps closer and gets louder when ignored, lectured, told off, or when you look at your phone. Takes offence at 'mate' said sarcastically. Calms with patience, respect, distance and practical help. If agitation is high and you stay close, he squares up and clenches his fists.",
    facts: [
      { id: "f1", fact: "He's lost his mates and his phone is dead", reveal: "when asked if he's alright or what's going on" },
      { id: "f2", fact: "He's missed the last bus to his suburb and has no idea how to get home", reveal: "when asked where he's heading" },
      { id: "f3", fact: "He's just been dumped by text and is embarrassed", reveal: "late, if you stay kind and patient" },
      { id: "f4", fact: "He would happily walk to the taxi rank if someone pointed it out", reveal: "when offered a practical choice" }
    ]
  },
  {
    id: "SS6", track: "safety", stage: 4, stress: true, startAgitation: 7, level: "Hard", voice: "sage",
    voiceStyle: "New Zealand man in his late forties. Rough, hoarse and loud, with sudden shifts from shouting to muttering; quieter and more coherent when treated with respect.",
    title: "Level 4: The man at the office entrance",
    blurb: "A man sleeping rough near your building shouts at you as you come out.",
    brief: "You leave the office at dusk. A man who has been sleeping in the doorway nearby is agitated and shouting at people coming out. He turns on you. Most people sleeping rough are far more often victims of violence than perpetrators. His anger is likely fear, illness or intoxication.",
    goal: "Treat him with dignity, keep your distance, and either calm things or leave safely. Don't lecture or threaten.",
    persona: "Darren, 48, has slept rough near the building for months, unwell, has been drinking, and is fiercely protective of his belongings.",
    context: "The footpath outside an office building at dusk. His bedding and bags are against the wall.",
    opening: "What are you looking at?! You lot. You think you own the street. Somebody chucked my gear in the skip! Was it you?",
    style: "Volatile and unpredictable; shouts, then mutters. Escalates sharply if crowded, talked down to, threatened with police or security, told to move on, or if anyone goes near his belongings. Settles gradually when spoken to as a person, asked his name, given space, and when his loss is acknowledged. If agitation is high, he picks up a bottle; the right call then is to leave.",
    facts: [
      { id: "f1", fact: "Yesterday someone from the building had a cleaner throw out his sleeping bag and his late mother's photo", reveal: "when asked what happened" },
      { id: "f2", fact: "He hasn't been called by his name by anyone in weeks", reveal: "when asked his name and spoken to by it" },
      { id: "f3", fact: "He knows when the outreach van comes and wants to get a new sleeping bag from it", reveal: "when asked what he needs" },
      { id: "f4", fact: "He would move further down the street if asked respectfully and not ordered", reveal: "when given a choice rather than an order" }
    ]
  },
  {
    id: "SS7", track: "safety", stage: 5, stress: true, startAgitation: 7, level: "Hard", voice: "alloy",
    voiceStyle: "New Zealand man in his early twenties. Loud and performative for his audience, with mates jeering; quieter and more uncertain one-on-one.",
    title: "Level 5: Outside the bar, with an audience",
    blurb: "A young man thinks you laughed at him. His mates are watching.",
    brief: "Leaving a work function, you walk past a bar. A young man steps in front of you, saying you laughed at him. Three of his mates gather round.",
    goal: "Give him a way to back down without losing face, avoid being surrounded, and leave if it turns.",
    persona: "Kyle, 23, drinking with mates, insecure and performing for them.",
    context: "A busy footpath outside a bar at about 10 pm. His mates stand nearby egging him on.",
    opening: "Something funny, old man? Yeah, you. I saw you laughing. Go on, say it to my face.",
    style: "Performs for his mates, who chime in (\"get into him, Kyle\"). Escalates on any challenge, sarcasm, apology that sounds weak, or if you argue facts. If agitation is high, a mate moves behind you. Settles when given credit and a dignified way out, especially if you speak to him one-on-one or move slightly away from his mates.",
    facts: [
      { id: "f1", fact: "He was turned away by a girl inside a minute ago and his mates laughed at him", reveal: "late, if spoken to calmly one-on-one" },
      { id: "f2", fact: "He doesn't actually want to fight; he wants to not look weak", reveal: "when offered a face-saving line" },
      { id: "f3", fact: "He'll let it go if you take the blame for the misunderstanding in front of his mates", reveal: "when you accept partial blame without grovelling" }
    ]
  }
);
