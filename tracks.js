/* Additional tracks: defusing conflict, difficult work conversations, personal conversations.
   Loaded after data.js. Edit freely. */

Object.assign(window.PRINCIPLES, {
  D1: "Steady yourself first (pace, tone, pause)",
  D2: "Acknowledge the emotion before the content",
  D3: "Let them finish; listen without defending",
  D4: "Find the need beneath the anger",
  D5: "Calm boundaries, options and what you can do",
  D6: "Agree the next step and repair",
  C1: "Prepared, with a clear purpose and outcome",
  C2: "Facts and impact, not labels or character",
  C3: "Invites their view with curiosity",
  C4: "Stays on the issue and handles defensiveness",
  C5: "Clear about the expectation, the ask or the 'no'",
  C6: "Agrees actions and follow-up",
  R1: "Right moment and a soft start",
  R2: "'I' statements: feeling, need, request",
  R3: "Listens to understand and reflects back",
  R4: "Owns their part and repairs",
  R5: "Seeks a shared next step; pauses if flooded"
});

window.TRACKS = {
  elicit: {
    name: "Client elicitation",
    desc: "Draw out what a client really needs, and hold your frame under pressure.",
    skill: "client requirements elicitation",
    learner: "an engineer taking a client call",
    core: ["P1", "P2", "P3", "P4", "P5", "P6", "P7"],
    note: ""
  },
  defuse: {
    name: "Defusing conflict",
    desc: "Calm an angry or tense situation, at work or elsewhere, without giving in or escalating.",
    skill: "defusing anger and conflict",
    learner: "a person calming a tense, angry situation",
    core: ["D1", "D2", "D3", "D4", "D5", "D6"],
    note: "If someone threatens or uses violence, or you feel unsafe, leave or end the contact and get help. Techniques here are for ordinary heated conversations."
  },
  work: {
    name: "Difficult work conversations",
    desc: "Give feedback, say no, disagree with a boss or co-director, and keep the relationship.",
    skill: "difficult conversations at work",
    learner: "a manager or colleague holding a difficult conversation",
    core: ["C1", "C2", "C3", "C4", "C5", "C6"],
    note: ""
  },
  personal: {
    name: "Personal conversations",
    desc: "Raise hurt, set limits and repair with partners, family and friends.",
    skill: "difficult personal conversations",
    learner: "a person having a hard conversation with someone close to them",
    core: ["R1", "R2", "R3", "R4", "R5"],
    note: "This is practice, not therapy or relationship advice. If a relationship feels unsafe, or someone is in distress, seek support from a professional or someone you trust."
  }
};

/* ---------- Lessons ---------- */
window.LESSONS.push(
  {
    id: "LD1", track: "defuse", title: "Steady yourself first", principle: "D1",
    summary: "Heated emotion is contagious. Your first job is to stay regulated so that you can think and so the other person has something calm to come down to.",
    points: [
      "**Slow down**: slower pace, lower and softer voice, longer breath out than in.",
      "**Pause** for two or three seconds before replying. Silence is not weakness.",
      "**Do not match intensity.** Volume and speed escalate in both directions.",
      "**Do not take it personally.** Anger is usually about a threat, a loss or an unmet need, and you are the nearest target.",
      "**Notice your own cues** (clenched jaw, racing talk) and use a pause line: \"Give me a moment to think that through.\"",
      "**Safety first.** If there are threats or violence, or you feel unsafe, leave or end the call and get help."
    ],
    good: "(Pause.) \"I want to make sure I understand. Tell me what's happened.\"",
    bad: "\"Calm down! Shouting isn't going to help.\"",
    checks: [
      { q: "Someone starts shouting at you. What is the best first move?", options: ["Raise your voice so you can be heard", "Slow your pace, lower your voice and pause", "Tell them to calm down", "Quickly explain your side"], answer: 1, why: "A calm pace and tone gives the other person something steady to match, and gives you time to think." },
      { q: "When should you stop trying to defuse and leave?", options: ["When they say something rude", "When threats or violence appear, or you feel unsafe", "After five minutes", "When they interrupt"], answer: 1, why: "Techniques are for ordinary heated conversations. Safety comes first." }
    ]
  },
  {
    id: "LD2", track: "defuse", title: "Acknowledge before you solve", principle: "D2",
    summary: "People cannot hear solutions while they feel unheard. Name the emotion and the reason first.",
    points: [
      "**Name the feeling and the cause**: \"You've waited three weeks and no one called you back. That's frustrating.\"",
      "**Acknowledging is not agreeing.** You are recognising the experience, not conceding the facts.",
      "**Be specific.** Generic sympathy (\"I understand\") sounds like a script.",
      "**Avoid \"calm down\"** and \"I'm sorry you feel that way\". Both dismiss the feeling.",
      "**Do not rush to fix.** Fixing early signals you want the emotion to go away."
    ],
    good: "\"That sounds really frustrating, especially after three weeks with no reply.\"",
    bad: "\"I understand, but there's nothing I can do about that.\"",
    checks: [
      { q: "Which response acknowledges without agreeing?", options: ["\"You're right, we've been useless.\"", "\"It sounds like the delay has been really stressful for you.\"", "\"Calm down and I'll look into it.\"", "\"That's our policy.\""], answer: 1, why: "It names the feeling and cause without conceding any facts or blame." },
      { q: "Why avoid \"calm down\"?", options: ["It is too short", "It dismisses the feeling and usually raises it", "It is impolite in writing only", "It sounds too formal"], answer: 1, why: "It tells the person their emotion is the problem, which tends to escalate it." }
    ]
  },
  {
    id: "LD3", track: "defuse", title: "Let them finish; don't defend", principle: "D3",
    summary: "Venting often runs its course in a couple of minutes if it is not fed. Defending, correcting or explaining feeds it.",
    points: [
      "**Let them finish** without interrupting. Nod, use short verbal cues.",
      "**Hold your explanation.** Facts land only after the person feels heard.",
      "**Avoid inflaming words**: \"but\", \"actually\", \"to be fair\", \"with respect\", \"you always\".",
      "**Reflect the key points** back: \"So the main things are...\"",
      "**Ask \"Is there more?\"** so nothing is left unsaid.",
      "If the attack is on your motives or character, hold your frame (see \"Frame attacks\" in Client elicitation)."
    ],
    good: "\"So you were told it would be quick, you waited five months, and then got a form letter. Is there more?\"",
    bad: "\"Actually, our process clearly states it takes up to six months.\"",
    checks: [
      { q: "Which word most often inflames a heated person?", options: ["\"And\"", "\"Actually\"", "\"Tell\"", "\"Help\""], answer: 1, why: "\"Actually\" and \"but\" signal that you are about to correct them." },
      { q: "When do explanations become useful?", options: ["Immediately", "After the person feels heard", "Never", "Only in writing"], answer: 1, why: "Facts land once the emotional charge has dropped." }
    ]
  },
  {
    id: "LD4", track: "defuse", title: "Find the need beneath the anger", principle: "D4",
    summary: "Anger usually covers fear, loss of control, disrespect or an unmet need. Ask, do not assume.",
    points: [
      "**Position versus interest**: the demand (\"cancel it\") hides the need (\"I can't afford surprises\").",
      "**Ask what matters most**: \"What's the most important thing for you here?\"",
      "**Ask for the good outcome**: \"What would a good result look like?\"",
      "**Ladder gently**: \"And what would that give you?\"",
      "**Check your read**: \"It sounds like you're worried about X. Is that right?\"",
      "**Do not diagnose** their motives. Ask."
    ],
    good: "\"What's the most important thing you need out of this?\"",
    bad: "\"You're just upset because you didn't get your way.\"",
    checks: [
      { q: "What is the difference between a position and an interest?", options: ["No difference", "A position is the demand; an interest is the underlying need behind it", "A position is private", "An interest is a cost"], answer: 1, why: "Meeting the interest often resolves things where the demand cannot be met." },
      { q: "Which is the best way to learn what is driving someone's anger?", options: ["Tell them what you think it is", "Ask what matters most and check your understanding", "Wait for them to stop", "Ask them to put it in writing"], answer: 1, why: "Asking, then checking your read, avoids guessing wrongly and shows respect." }
    ]
  },
  {
    id: "LD5", track: "defuse", title: "Boundaries, options and exits", principle: "D5",
    summary: "You can be warm about the person and firm about the behaviour and the limits.",
    points: [
      "**Firm on behaviour, not person**: \"I want to help, and I can't do that while I'm being shouted at.\"",
      "**State the limit once**, calmly, with what happens next.",
      "**Lead with what you can do**, then what you cannot.",
      "**Offer a choice** of two options. It restores some control.",
      "**Broken record**: repeat the same calm line rather than escalating.",
      "**Use a time-out**: \"Let's pause and pick this up at two o'clock.\" Always return to it."
    ],
    good: "\"I want to sort this out. I can do A today or B on Friday. Which suits you better?\"",
    bad: "\"If you keep talking to me like that I'm hanging up.\" (then repeating it five times)",
    checks: [
      { q: "A caller keeps swearing at you. Which is the best boundary?", options: ["Hang up without comment", "\"I want to help, and I can't while I'm being sworn at. I'll stay on if we can keep it respectful.\"", "Swear back", "\"You're being abusive.\""], answer: 1, why: "It is firm on the behaviour, warm about the person and says what happens next." },
      { q: "Why offer two options?", options: ["It saves time", "It restores a sense of control", "It avoids giving advice", "It sounds professional"], answer: 1, why: "Loss of control fuels anger. Choices give some back." }
    ]
  },
  {
    id: "LD6", track: "defuse", title: "Agree the next step and repair", principle: "D6",
    summary: "End with something concrete, and own what is yours to own.",
    points: [
      "**Summarise** what you heard and what you will do.",
      "**Agree one concrete next step** with a time.",
      "**Apologise for what is yours** (\"I'm sorry you weren't called back\"), not for their feelings or for things you did not do.",
      "**Do what you said**, and follow up in writing.",
      "**Check the temperature**: \"How are we leaving it?\""
    ],
    good: "\"I'll find out why it stalled and ring you by Thursday. Does that work?\"",
    bad: "\"I'll see what I can do.\"",
    checks: [
      { q: "Which apology is best in a complaint call?", options: ["\"I'm sorry you feel that way.\"", "\"I'm sorry no one called you back. That's on us.\"", "\"Sorry, but...\"", "No apology is ever needed"], answer: 1, why: "A specific apology for your part is honest and repairs trust. Apologising for their feelings does not." },
      { q: "What turns a calm call into real repair?", options: ["A promise", "A concrete step with a time, followed through", "A long email", "A discount"], answer: 1, why: "Doing what you said is what rebuilds trust." }
    ]
  },

  /* ----- Work ----- */
  {
    id: "LW1", track: "work", title: "Prepare the conversation", principle: "C1",
    summary: "Most difficult conversations go wrong before they start. Know what you want and why.",
    points: [
      "**Purpose**: what do you want to be different afterwards?",
      "**Facts**: specific, recent examples you can describe without judgement.",
      "**Their view**: what might they say, and what might be going on for them?",
      "**Your limits**: what is non-negotiable, and where can you flex?",
      "**Time and place**: private, unhurried, not in front of others, not at the end of a bad day.",
      "**Separate issue from person.** The aim is a better outcome, not to win."
    ],
    good: "\"I'd like 15 minutes on Thursday to talk about the last three reports. Is that OK?\"",
    bad: "(Raising it in passing in the corridor, angry, with no examples.)",
    checks: [
      { q: "What is the best preparation question?", options: ["How do I prove I'm right?", "What do I want to be different afterwards?", "How short can I make it?", "Who else agrees with me?"], answer: 1, why: "A clear outcome keeps the conversation purposeful and non-punitive." },
      { q: "Where should a difficult conversation happen?", options: ["In passing", "Somewhere private and unhurried", "In a group so it's fair", "By email only"], answer: 1, why: "Privacy and time reduce defensiveness." }
    ]
  },
  {
    id: "LW2", track: "work", title: "Facts and impact, not labels", principle: "C2",
    summary: "Describe what happened and what it caused. Avoid labels about attitude or character.",
    points: [
      "**Situation, Behaviour, Impact**: \"In Tuesday's review (situation), two errors went to the client (behaviour), which cost us a day of rework and some trust (impact).\"",
      "**Describe what a camera would see**, not what you conclude (\"careless\", \"attitude\").",
      "**Avoid always and never.** One counter-example ends the discussion.",
      "**Be recent and specific**, not a list of old grievances.",
      "**Link to impact**, so it is about outcomes, not personality."
    ],
    good: "\"In the last three reports there were calculation errors. The client noticed on the second one.\"",
    bad: "\"You're careless and you never check your work.\"",
    checks: [
      { q: "Which is a behaviour description?", options: ["\"You're careless.\"", "\"Two reports went out with errors in the load table.\"", "\"You've got a poor attitude.\"", "\"You never check.\""], answer: 1, why: "It describes observable facts, not a label." },
      { q: "Why avoid \"always\" and \"never\"?", options: ["They are too strong stylistically", "One counter-example derails the conversation", "They are rude only in writing", "They are not formal"], answer: 1, why: "Absolutes invite a debate about the exception instead of the issue." }
    ]
  },
  {
    id: "LW3", track: "work", title: "Invite their view with curiosity", principle: "C3",
    summary: "After the facts, ask. You often do not have the whole picture, and people change more readily when they have been heard.",
    points: [
      "**Ask an open question**: \"What's your read on this?\"",
      "**Listen for causes** such as workload, unclear process, missing training, fear.",
      "**Stay curious**, not cross-examining. Avoid \"why did you...\", which sounds like blame. Try \"What got in the way?\"",
      "**Reflect back** what you heard before responding.",
      "**Do not diagnose motives.** Ask about them."
    ],
    good: "\"That's what I've seen. What's your take on what's been happening?\"",
    bad: "\"So why can't you just do it properly?\"",
    checks: [
      { q: "Which question invites their view without blame?", options: ["\"Why did you get it wrong?\"", "\"What got in the way?\"", "\"Don't you care?\"", "\"Who told you to do it that way?\""], answer: 1, why: "It opens the door to causes without attributing fault." },
      { q: "What should you do when they explain a cause?", options: ["Correct them", "Reflect it back and explore", "Change topic", "Offer a solution immediately"], answer: 1, why: "Reflecting shows you heard and keeps them talking." }
    ]
  },
  {
    id: "LW4", track: "work", title: "Stay on the issue", principle: "C4",
    summary: "Defensiveness, deflection and emotion are normal. Stay steady and return to the issue.",
    points: [
      "**Expect defensiveness.** It usually comes from fear of losing status or security.",
      "**Acknowledge, then return**: \"I can see this is hard to hear. I do want to come back to the reports.\"",
      "**Deflection** (\"what about Chris?\"): \"I'm happy to talk about that separately. Today it's about your reports.\"",
      "**Tears or anger**: pause, give space, offer a break, then continue.",
      "**Avoid sarcasm, labels and piling on** extra issues.",
      "**Hold your frame**: do not defend your motives (see \"Frame attacks\" in Client elicitation)."
    ],
    good: "\"I hear that. I'd like to stay with the reports for now and come back to that point after.\"",
    bad: "\"Well, you're the one who made the mistakes, so don't blame me.\"",
    checks: [
      { q: "The person says, \"What about Chris? He makes mistakes too.\" Best response?", options: ["\"That's none of your business.\"", "\"Happy to talk about that separately. Today it's about your reports.\"", "Discuss Chris at length", "Drop the topic"], answer: 1, why: "It acknowledges, parks the deflection and returns to the issue." },
      { q: "What often underlies defensiveness?", options: ["Arrogance", "Fear of losing status or security", "Boredom", "Poor communication skills"], answer: 1, why: "Seeing the fear helps you stay calm and respond with steadiness." }
    ]
  },
  {
    id: "LW5", track: "work", title: "Be clear on the ask, or the no", principle: "C5",
    summary: "Vague kindness creates repeat problems. State the expectation, request or refusal plainly, with options where you can.",
    points: [
      "**State the expectation**: \"From now on I need reports checked by a second person before they go out.\"",
      "**Make a clear request**, not a hint.",
      "**Saying no to a boss**: acknowledge the goal, state the constraint with facts, offer options. \"I can have the full version by Wednesday, or a reduced version Friday. Which helps more?\"",
      "**Avoid \"I'll try\".** It sounds like yes and means maybe.",
      "**Say the consequence once**, calmly, if it matters."
    ],
    good: "\"I can't deliver the full review by Friday without risking errors. I can give you a staged version, or the full one on Wednesday.\"",
    bad: "\"I'll try, but it's going to be tough.\"",
    checks: [
      { q: "What is the strongest way to say no to a manager?", options: ["\"I'll try.\"", "Acknowledge the goal, state the constraint, offer options", "Say nothing and miss the deadline", "\"That's impossible.\""], answer: 1, why: "It respects the goal, gives facts and keeps you solution-focused." },
      { q: "Why avoid \"I'll try\"?", options: ["It's informal", "It sounds like a yes and often means maybe", "It's polite", "It's too short"], answer: 1, why: "It hides the real constraint, so problems surface later." }
    ]
  },
  {
    id: "LW6", track: "work", title: "Agree actions and follow up", principle: "C6",
    summary: "A good conversation ends with who does what by when, and a check-in.",
    points: [
      "**Summarise** what you agreed.",
      "**Name actions, owners and dates.**",
      "**Offer support**: \"What would help?\"",
      "**Set a follow-up** time and keep it.",
      "**Send a brief written note** the same day.",
      "**Recognise progress** when it appears."
    ],
    good: "\"So you'll check the next three reports with Priya before sending, and we'll catch up on the 20th.\"",
    bad: "\"Right, let's see how it goes.\"",
    checks: [
      { q: "Which closing is strongest?", options: ["\"Let's see how it goes.\"", "\"You'll do X by Y, I'll do Z, and we'll review on the 20th.\"", "\"Thanks for your time.\"", "\"I'll be watching.\""], answer: 1, why: "Actions, owners and a review date make it concrete." },
      { q: "When should you follow up in writing?", options: ["Never", "The same day, briefly", "Only if things go badly", "In the annual review"], answer: 1, why: "A brief note locks in shared understanding." }
    ]
  },

  /* ----- Personal ----- */
  {
    id: "LP1", track: "personal", title: "Pick the moment and start softly", principle: "R1",
    summary: "How a conversation starts usually decides how it ends. A harsh start-up gets defensiveness.",
    points: [
      "**Pick the moment**: not when either of you is tired, hungry, rushed or in front of others.",
      "**Ask first**: \"Can we talk about something that's been on my mind? Is now OK, or later tonight?\"",
      "**Start with the issue and your feeling**, not blame or a list.",
      "**One topic at a time.** Avoid dragging in old grievances.",
      "**Avoid sarcasm and contempt.** They damage trust more than most disagreements."
    ],
    good: "\"Can we talk about evenings? It's been on my mind and I'd like to sort it out together.\"",
    bad: "\"You're never home. Obviously the job matters more than us.\"",
    checks: [
      { q: "Which is the best way to open?", options: ["\"We need to talk. Now.\"", "\"Can we talk about evenings later tonight? I'd like to work it out together.\"", "\"You always do this.\"", "A text list of complaints"], answer: 1, why: "It asks, signals goodwill and names one topic." },
      { q: "Why avoid sarcasm?", options: ["It's unfunny", "It signals contempt and triggers defensiveness", "It's long", "It's formal"], answer: 1, why: "Contempt is one of the strongest predictors of relationship damage." }
    ]
  },
  {
    id: "LP2", track: "personal", title: "'I' statements: feeling, need, request", principle: "R2",
    summary: "Say what you feel and need, then make one clear request. Avoid labelling the other person.",
    points: [
      "**Formula**: \"When X happens, I feel Y, because I need Z. Would you be willing to...?\"",
      "**Describe the situation**, not their character.",
      "**Own the feeling.** \"I feel alone\" is different from \"You make me feel alone.\"",
      "**Make one specific, doable request.**",
      "**Avoid 'you always/never'.** It starts a defence."
    ],
    good: "\"When I'm doing bedtime alone most nights, I feel stretched and a bit lonely. Could we find two nights that are fixed for you to be home?\"",
    bad: "\"You never help. You just don't care about this family.\"",
    checks: [
      { q: "Which is an 'I' statement with a request?", options: ["\"You never help.\"", "\"I feel stretched when I do bedtime alone. Could we fix two nights?\"", "\"Why are you like this?\"", "\"Fine, whatever.\""], answer: 1, why: "It owns the feeling, names the situation and makes a specific request." },
      { q: "Why make one clear request?", options: ["It's shorter", "It gives them something specific to say yes to", "It avoids feelings", "It sounds formal"], answer: 1, why: "A concrete request is easier to agree to than a vague complaint." }
    ]
  },
  {
    id: "LP3", track: "personal", title: "Listen to understand", principle: "R3",
    summary: "The other person needs to feel understood before they can consider your side.",
    points: [
      "**Listen for the feeling** under the words.",
      "**Reflect back**: \"So you've felt like you're carrying it all. Have I got that right?\"",
      "**Ask open questions**: \"What's that been like for you?\"",
      "**Do not fix or advise** unless asked, especially with someone who is upset.",
      "**Put the phone down** and give your attention.",
      "**Resist rebuttal.** You can disagree later."
    ],
    good: "\"So it's not the hours, it's that I'm not there for the things that matter to you. Is that right?\"",
    bad: "\"That's not fair, I'm doing this for us.\"",
    checks: [
      { q: "Someone is upset. What helps first?", options: ["Advice", "Reflecting what you heard and asking what it's been like", "A solution", "A joke"], answer: 1, why: "Feeling understood is what allows the person to move on." },
      { q: "When is advice best given?", options: ["Immediately", "When asked, or after they feel understood", "Never", "In writing"], answer: 1, why: "Advice before understanding often feels dismissive." }
    ]
  },
  {
    id: "LP4", track: "personal", title: "Own your part and repair", principle: "R4",
    summary: "Naming your own contribution is the fastest way to lower defences. Repair attempts matter more than perfection.",
    points: [
      "**Own your part**: \"I can see I've been missing things that matter to you.\"",
      "**Apologise specifically**, without \"but\".",
      "**Accept repair attempts** from them: a joke, a touch, \"let's try again\".",
      "**Make repairs** yourself: \"Can I try that again?\"",
      "**Do not keep score.** Aim for a better pattern, not a verdict."
    ],
    good: "\"I missed the school concert and I know that hurt. I'm sorry. I'd like to do better.\"",
    bad: "\"I'm sorry you took it that way, but I was busy.\"",
    checks: [
      { q: "Which is a real apology?", options: ["\"Sorry you feel that way.\"", "\"I missed the concert and I'm sorry that hurt you.\"", "\"Sorry, but I was busy.\"", "\"Fine, I'm sorry.\""], answer: 1, why: "It names the behaviour and impact without excuses." },
      { q: "What is a repair attempt?", options: ["A formal agreement", "Any move to lower tension, such as humour, a pause or 'let's try again'", "A written plan", "A winning argument"], answer: 1, why: "Accepting repair attempts keeps conflicts from spiralling." }
    ]
  },
  {
    id: "LP5", track: "personal", title: "A shared next step, and when to pause", principle: "R5",
    summary: "The aim is a workable next step, not a win. If either of you is overwhelmed, pause and return.",
    points: [
      "**Look for a shared step**: \"What could we try for the next two weeks?\"",
      "**Compromise on specifics**, not on your values.",
      "**Spot flooding**: racing heart, shutting down, shouting. Thinking stops.",
      "**Take a break of about 20 minutes**, say when you will return, and calm yourself (do not rehearse arguments).",
      "**Return** as promised.",
      "**Set limits kindly**: \"I love you and I'm not able to do that.\""
    ],
    good: "\"I'm too wound up to talk well. Can we take twenty minutes and come back at eight?\"",
    bad: "(Storming out without saying when you'll be back.)",
    checks: [
      { q: "You both feel flooded. Best move?", options: ["Push on to settle it", "Agree a break of about 20 minutes and a time to return", "Stop talking about it for good", "Text instead"], answer: 1, why: "A short, defined break lets your body calm so you can think again." },
      { q: "What is the goal of the conversation?", options: ["To win", "A shared, workable next step", "To be right", "To avoid feelings"], answer: 1, why: "Relationships last on workable agreements, not on winning." }
    ]
  }
);

/* ---------- Drills ---------- */
window.DRILLS.forEach(d => { d.track = d.track || "elicit"; });
[
  ["defuse", "Calm down.", "Dismisses the emotion"],
  ["defuse", "I understand, but that's our policy.", "\"But\" cancels the acknowledgement"],
  ["defuse", "I'm sorry you feel that way.", "Apologises for their feelings, not your part"],
  ["defuse", "You're being unreasonable.", "Labels the person and escalates"],
  ["defuse", "With respect, you've got that wrong.", "Corrects before they feel heard"],
  ["defuse", "If you keep shouting I'm hanging up.", "Threat without a calm limit or a way back"],
  ["work", "You've got a bad attitude.", "Label, not behaviour"],
  ["work", "You always miss your deadlines.", "Absolute; not specific"],
  ["work", "Don't take this the wrong way, but...", "Pre-empts defensiveness and signals blame"],
  ["work", "I'll try to get it done by Friday.", "A hidden 'no'"],
  ["work", "Why did you get that wrong?", "Sounds like blame"],
  ["personal", "You never help around here.", "Absolute and accusatory"],
  ["personal", "Why are you being so dramatic?", "Dismissive and contemptuous"],
  ["personal", "Fine. Whatever.", "Withdrawal without saying how you feel"],
  ["personal", "I'm only telling you this for your own good.", "Advice that feels controlling"],
  ["personal", "You always do this.", "Absolute; no specific request"]
].forEach(([track, bad, flaw]) => window.DRILLS.push({ track, bad, flaw }));

/* ---------- Scenarios ---------- */
window.SCENARIOS.forEach(s => { s.track = s.track || "elicit"; });
window.SCENARIOS.push(
  {
    id: "SD1", track: "defuse", level: "Medium", voice: "echo",
    voiceStyle: "New Zealand man in his fifties. Angry and hurt, speaking fast and tight, softening only if he feels heard.",
    title: "The declined application",
    blurb: "A professional rings angry after his registration application was declined.",
    persona: "Tom, 52, an experienced engineer, usually reserved but now furious and anxious.",
    context: "You work in a professional body's practice team and take a heated call.",
    opening: "I've just had your letter. Five months I've waited and I get a form letter saying no. What kind of organisation is this?",
    style: "Raised voice, accusing, interrupts. Escalates at \"policy\", \"calm down\", \"but\" and explanations. Settles gradually when his frustration is specifically acknowledged and he is listened to, then answers questions openly.",
    facts: [
      { id: "f1", fact: "He was told by a colleague it would be 'a formality', so he told his employer it would be approved", reveal: "when asked what he expected or how this came about, once he has settled" },
      { id: "f2", fact: "His employer has made a promotion conditional on registration by year end", reveal: "when asked what it means for him or what matters most" },
      { id: "f3", fact: "The form letter did not say what evidence was missing, so he feels disrespected and kept in the dark", reveal: "when asked about the letter or what would have helped" },
      { id: "f4", fact: "He is frightened about money; he has a large mortgage and his partner has just reduced work", reveal: "when treated with real empathy and asked what is worrying him" },
      { id: "f5", fact: "What he actually wants is a clear explanation of what was missing and a path to reapply quickly", reveal: "when asked what a good outcome would look like" },
      { id: "f6", fact: "He is embarrassed about shouting and would apologise if given a calm exit", reveal: "late, when the engineer stays steady and offers a concrete next step" }
    ]
  },
  {
    id: "SD2", track: "defuse", level: "Hard", voice: "onyx",
    voiceStyle: "New Zealand man in his late fifties. Gruff and aggressive at the door, voice breaking slightly when he mentions the past.",
    title: "The neighbour at the door",
    blurb: "A neighbour storms over about your new fence.",
    persona: "Wayne, 58, a long-time neighbour, aggressive and sarcastic when he arrives.",
    context: "You are at home when a neighbour knocks on your door, angry about your new boundary fence.",
    opening: "You've put that fence up without asking anyone. Who do you think you are? It's on my land.",
    style: "Blunt, sarcastic, makes personal remarks and frame attacks (\"typical\", \"people like you\", \"are you stupid or just rude?\"). Escalates if you defend yourself, argue about your intent or tell him to calm down. Softens if you stay calm, decline the insult without hitting back, acknowledge how it looks to him, and ask what matters.",
    facts: [
      { id: "f1", fact: "The old hedge on the boundary was planted by his late wife and the fence replaced it without warning", reveal: "when asked about the hedge or what the boundary means to him, after he settles" },
      { id: "f2", fact: "He has had no contact from you or the contractor, so he feels disrespected and ignored", reveal: "when asked how he found out or what he'd have wanted" },
      { id: "f3", fact: "He is not certain the fence is over the boundary; he has not had it surveyed", reveal: "when asked what he's seen or how he knows" },
      { id: "f4", fact: "He is worried about selling the house next year and any boundary dispute affecting the sale", reveal: "when asked about what worries him or his plans" },
      { id: "f5", fact: "He would accept a joint survey and a conversation about replanting a hedge on his side", reveal: "when offered or asked about options" },
      { id: "f6", fact: "He is embarrassed about how he arrived and would like to start again", reveal: "late, if you stay steady and offer a calm way forward" }
    ]
  },
  {
    id: "SD3", track: "defuse", level: "Medium", voice: "coral",
    voiceStyle: "New Zealand woman in her late thirties. Sharp and clipped, stressed, then quieter as she calms.",
    title: "Snapped at in the meeting",
    blurb: "A colleague snaps at you in front of others about a late deliverable.",
    persona: "Jo, 38, a capable colleague, overloaded and angry.",
    context: "You have stepped aside after a team meeting where a colleague snapped at you.",
    opening: "You left me with nothing again. I looked like an idiot in there, thanks very much.",
    style: "Short, sharp, blames. Escalates if you explain, defend, say 'calm down' or point out she snapped. Opens up when you acknowledge how it landed for her and ask what happened.",
    facts: [
      { id: "f1", fact: "She received your inputs two days late and rewrote them overnight to meet the deadline", reveal: "when asked what happened, once settled" },
      { id: "f2", fact: "Her manager criticised her work yesterday, so she was already raw", reveal: "when asked about the day or how she's doing" },
      { id: "f3", fact: "She is covering two roles while someone is on leave", reveal: "when asked about workload" },
      { id: "f4", fact: "She was left off the email thread where the deadline was changed", reveal: "when asked what made the deadline unclear" },
      { id: "f5", fact: "She wants a recognised handover process, not an apology alone", reveal: "when asked what would help going forward" },
      { id: "f6", fact: "She regrets snapping and would accept a short, honest apology", reveal: "late, when you stay steady and own your part" }
    ]
  },
  {
    id: "SW1", track: "work", level: "Medium", voice: "ash",
    voiceStyle: "Young New Zealand man in his late twenties. Polite, a little anxious and defensive, quieter when exposed.",
    title: "The error-prone reports",
    blurb: "Give feedback to a capable team member whose last three reports had errors.",
    persona: "Sam, 27, a capable, ambitious engineer who wants to be promoted and is anxious about looking incompetent.",
    context: "You manage Sam. You have booked a private 15 minutes to discuss three reports with errors.",
    opening: "Hi. You said you wanted a quick chat? Is something wrong?",
    style: "Polite but defensive. Minimises (\"they were minor\"), deflects (\"nobody told me the process\"). If labelled or accused, withdraws or gets prickly. If given facts, curiosity and respect, opens up.",
    facts: [
      { id: "f1", fact: "He has been given extra tasks all month and is working late to keep up", reveal: "when asked about workload or what has been going on" },
      { id: "f2", fact: "He was never shown the internal checking process", reveal: "when asked about process or training" },
      { id: "f3", fact: "He is embarrassed and afraid the errors will block a promotion", reveal: "when treated with empathy and asked how he sees it" },
      { id: "f4", fact: "He did not ask for help because he feared looking incompetent", reveal: "when asked what stopped him asking" },
      { id: "f5", fact: "He believes the errors were minor and the client didn't care", reveal: "when asked about the impact, early on" },
      { id: "f6", fact: "He would welcome a checking buddy and a short training session", reveal: "when asked what would help" }
    ]
  },
  {
    id: "SW2", track: "work", level: "Hard", voice: "sage",
    voiceStyle: "New Zealand woman in her late forties. Brisk, senior, under pressure, defensive when told something can't be done.",
    title: "Saying no to the boss",
    blurb: "Your manager wants a full deliverable by Friday that cannot be done well in the time.",
    persona: "Alex, 49, your manager, senior and under pressure, direct, hates hearing 'can't'.",
    context: "Your manager has just told you a full review is needed by Friday. You have asked for five minutes.",
    opening: "I need the full review on my desk by Friday. That's non-negotiable. Is there a problem?",
    style: "Brisk, impatient, defensive at 'can't' or excuses. Responds to being given the goal back, facts and clear options. Gets annoyed at vagueness or 'I'll try'.",
    facts: [
      { id: "f1", fact: "She has promised the deliverable to a senior stakeholder and is worried about her credibility", reveal: "when asked what's driving Friday" },
      { id: "f2", fact: "She did not know the peer review step alone takes three working days", reveal: "when you explain the constraint with facts" },
      { id: "f3", fact: "A staged version (summary plus top risks) on Friday would satisfy the stakeholder", reveal: "when asked what the stakeholder actually needs" },
      { id: "f4", fact: "She would accept the full review the following Wednesday if the stakeholder is warned today", reveal: "when offered a clear option with a date" },
      { id: "f5", fact: "She is worried about being blindsided again after a recent miss in another team", reveal: "late, when you show you share the goal" },
      { id: "f6", fact: "She dislikes being told 'can't' but welcomes 'I can do this, by then'", reveal: "when you reframe with options" }
    ]
  },
  {
    id: "SW3", track: "work", level: "Hard", voice: "alloy",
    voiceStyle: "New Zealand man in his forties. Earnest and increasingly frustrated, feels unheard, calmer once listened to.",
    title: "The co-director disagreement",
    blurb: "Your co-director wants to cut fees to win work; you disagree.",
    persona: "Morgan, 45, co-director of a small firm, anxious about cash flow and feels dismissed.",
    context: "You and your co-director have been avoiding a disagreement about cutting fees. You have asked for a conversation.",
    opening: "I know you don't like it, but we've lost two bids in a row. Something has to change and I'm not hearing any ideas from you.",
    style: "Earnest, increasingly frustrated. Says 'you never listen' and 'you always say no'. Escalates if you counter with figures straight away. Softens when you reflect his concerns and ask about his view first.",
    facts: [
      { id: "f1", fact: "Cash flow has been tight for three months and he has not told you the real numbers", reveal: "when asked what's behind the concern, with rapport" },
      { id: "f2", fact: "A competitor's quote for a recent job was 25% lower, which stung", reveal: "when asked about the lost bids" },
      { id: "f3", fact: "He feels you dismiss his concerns and do not see the pressure he is under", reveal: "when asked how the conversations have felt" },
      { id: "f4", fact: "He is worried about losing a key client who has hinted at going elsewhere", reveal: "when asked what he's most worried about" },
      { id: "f5", fact: "He would accept a review rule instead of a blanket cut, such as discounting only for repeat clients", reveal: "when offered or asked about alternatives" },
      { id: "f6", fact: "He wants to agree a regular monthly check-in on finances", reveal: "late, when you've reflected his concerns and proposed a next step" }
    ]
  },
  {
    id: "SP1", track: "personal", level: "Easy", voice: "shimmer",
    voiceStyle: "New Zealand woman in her late thirties. Warm, tired, a bit guilty, gentle.",
    title: "The friend who keeps cancelling",
    blurb: "You want to raise how hurt you feel that a close friend keeps cancelling plans.",
    persona: "Kim, 39, a close friend, warm but avoiding, tired and guilty.",
    context: "You have arranged a coffee with a close friend who has cancelled the last three times.",
    opening: "Hey, thanks for waiting. Sorry, I'm a bit frazzled today. What's up?",
    style: "Warm, apologetic, a bit evasive. Gets defensive if accused of being a bad friend. Opens up if you speak about your feelings kindly and ask what's going on.",
    facts: [
      { id: "f1", fact: "Her father is moving into residential care and she is managing the move", reveal: "when asked how she's been, gently" },
      { id: "f2", fact: "She cancels because she feels drained and guilty about being poor company", reveal: "when asked about the cancelling without blame" },
      { id: "f3", fact: "She did not realise you were hurt and feels awful hearing it", reveal: "after you share your feelings with an I statement" },
      { id: "f4", fact: "She would love to see you but only has energy for something small, like a walk", reveal: "when asked what would suit her" },
      { id: "f5", fact: "She is afraid of losing the friendship because she keeps letting you down", reveal: "late, when you reassure her" }
    ]
  },
  {
    id: "SP2", track: "personal", level: "Medium", voice: "nova",
    voiceStyle: "New Zealand woman in her late thirties. Tired and hurt, quietly sharp, softer when understood.",
    title: "Late nights again",
    blurb: "Your partner is upset about your work hours and the evenings you miss.",
    persona: "Jess, 38, your partner, tired, resentful and doesn't want to nag.",
    context: "It is a Sunday evening. Your partner has said she wants to talk about the week.",
    opening: "Another week of you coming home after the kids are in bed. I'm just so tired of it.",
    style: "Quietly sharp, 'you always' statements. Withdraws if you defend or explain the work. Opens up when you reflect her feelings and own your part.",
    facts: [
      { id: "f1", fact: "She feels alone with the evening routine and says she is exhausted", reveal: "when asked how the week has been for her" },
      { id: "f2", fact: "You missed your daughter's school assembly on Thursday and she cried afterwards", reveal: "when asked what has hurt most" },
      { id: "f3", fact: "She doesn't want you to work less; she wants predictability", reveal: "when asked what she needs" },
      { id: "f4", fact: "She worries about money and doesn't want to add to your stress", reveal: "when asked about what she hasn't been saying" },
      { id: "f5", fact: "She would accept two fixed nights a week at home plus a heads-up when you'll be late", reveal: "when asked about a workable plan" },
      { id: "f6", fact: "She misses time together as a couple, not only help with the kids", reveal: "late, when she feels understood" }
    ]
  },
  {
    id: "SP3", track: "personal", level: "Hard", voice: "fable",
    voiceStyle: "Elderly New Zealand man in his eighties. Gruff, proud, stubborn; quieter and more honest when he feels respected.",
    title: "Dad and the car keys",
    blurb: "You are worried about your father's driving and want to talk about it.",
    persona: "Bill, 84, your father, proud, stubborn and fiercely independent.",
    context: "You have come over to talk to your father about his driving, which worries you.",
    opening: "I know why you're here. I've been driving for sixty years and I'm not stopping.",
    style: "Gruff, dismissive, uses humour to deflect, frame attacks (\"don't treat me like a child\"). Digs in if lectured, warned or told what to do. Opens up if respected, asked what matters to him, and offered choices.",
    facts: [
      { id: "f1", fact: "He had a near-miss at an intersection last month and hasn't told anyone", reveal: "when asked gently about recent drives, after he feels respected" },
      { id: "f2", fact: "He fears losing independence and becoming a burden", reveal: "when asked what driving means to him" },
      { id: "f3", fact: "He hates being told what to do by his children", reveal: "when you notice how this feels for him" },
      { id: "f4", fact: "He would consider a driving assessment arranged through his GP if it's his decision", reveal: "when offered options and choice" },
      { id: "f5", fact: "He needs to get to bowls on Thursdays and the shops, and worries about taxi costs", reveal: "when asked what he'd miss" },
      { id: "f6", fact: "He's proud of you and wants you to trust him", reveal: "late, when he feels respected" }
    ]
  },
  {
    id: "SP4", track: "personal", level: "Medium", voice: "shimmer",
    voiceStyle: "New Zealand teenage girl, fifteen. Flat, one-word answers at first, more natural and open as she relaxes.",
    title: "The quiet teenager",
    blurb: "Your 15-year-old has gone quiet and withdrawn at home.",
    persona: "Mia, 15, your daughter, withdrawn, guarded and allergic to interrogation.",
    context: "You are driving your daughter home and have decided to gently check in.",
    opening: "I'm fine. Why does everyone keep asking?",
    style: "One-word answers, shrugs, sarcasm. Shuts down with questions that feel like interrogation, advice, or mentions of grades. Opens slowly if you listen, reflect, and don't push.",
    facts: [
      { id: "f1", fact: "She has fallen out with her close friend group and eats lunch alone", reveal: "when she feels safe and is not interrogated" },
      { id: "f2", fact: "She is embarrassed and doesn't want you to contact the school or other parents", reveal: "when asked what she wants from you" },
      { id: "f3", fact: "She feels her parents only ask about grades and homework", reveal: "when you reflect how it must feel" },
      { id: "f4", fact: "She doesn't want advice, she wants someone to listen", reveal: "when asked what would help" },
      { id: "f5", fact: "She would like a regular low-pressure time together, like driving to the shop", reveal: "when offered a low-key option" }
    ]
  }
);
