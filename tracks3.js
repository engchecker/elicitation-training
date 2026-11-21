/* Family and close-relationship tracks: parents, children, partners and friends.
   Loaded after tracks2.js. Edit freely. */

Object.assign(window.PRINCIPLES, {
  F1: "Right moment; asks before advising",
  F2: "Listens first and reflects the feeling",
  F3: "Asks coaching questions instead of telling",
  F4: "Respects their autonomy; offers options, not orders",
  F5: "Sets kind, calm boundaries and holds them",
  F6: "Repairs and protects the relationship",
  M1: "Notices and answers bids for connection",
  M2: "Soft start: a specific concern, 'I' feeling and need",
  M3: "Listens to understand; asks if they want support or solutions",
  M4: "Takes responsibility for a part; handles defensiveness",
  M5: "Pauses when flooded; makes and accepts repair",
  M6: "Builds the positives: appreciation and curiosity"
});

Object.assign(window.TRACKS, {
  family: {
    name: "Parents and children",
    desc: "Handle difficult parents calmly, and help your children without pushing advice onto them.",
    skill: "conversations with parents and with children (listening, asking instead of telling, kind boundaries)",
    learner: "a parent and adult child handling difficult family conversations",
    core: ["F1", "F2", "F3", "F4", "F5", "F6"],
    note: "This is practice for ordinary family friction. If someone is abusive, or a child or young person may be at risk of harm, seek support from a professional or a helpline such as 1737 (call or text, New Zealand)."
  },
  close: {
    name: "Partners and friends",
    desc: "Communicate well in romantic and friendship relationships: connection, hard conversations and repair.",
    skill: "communicating in romantic partnerships and friendships (connection, concerns, listening, repair)",
    learner: "a person talking with a partner or a close friend",
    core: ["M1", "M2", "M3", "M4", "M5", "M6"],
    note: "This is practice, not therapy or relationship advice. If a relationship feels unsafe or controlling, seek support from a professional or someone you trust."
  }
});
window.TRACK_ORDER = ["perspective", "defuse", "smalltalk", "family", "close", "work", "elicit", "personal"];

/* ---------- Family lessons ---------- */
window.LESSONS.push(
  {
    id: "LF1", track: "family", title: "Connection before correction", principle: "F2",
    summary: "With children and with parents, people accept guidance from those they feel connected to. The relationship is the channel for everything else.",
    points: [
      "**Connection first.** A child or a parent who feels criticised stops listening. One who feels understood keeps talking.",
      "**Aim to keep the door open**, not to win this conversation. Many small good talks beat one lecture.",
      "**Notice the ratio**: how many of your recent exchanges were questions, corrections or instructions, and how many were interest, humour or appreciation?",
      "**Side-by-side beats face-to-face** for many teenagers and some parents: a drive, a walk, washing up. Less pressure, more talk.",
      "**Stay calm to stay trusted.** If you react strongly to what they tell you, they will tell you less next time.",
      "**Keep it short.** Five good minutes beats forty tense ones."
    ],
    good: "\"I'd like to hear how it's going. No advice unless you want it.\"",
    bad: "\"Right, sit down. We need to talk about your attitude.\"",
    checks: [
      { q: "Why does connection come before correction?", options: ["It is polite", "People accept guidance from those they feel understood by", "It avoids conflict forever", "It makes talks shorter"], answer: 1, why: "A felt connection keeps people talking and open to input." },
      { q: "A teenager tells you something worrying. What helps them keep talking?", options: ["Reacting strongly", "Staying calm and curious", "Immediately setting rules", "Changing the subject"], answer: 1, why: "A calm response shows it is safe to tell you things." }
    ]
  },
  {
    id: "LF2", track: "family", title: "Ask before you advise", principle: "F1",
    summary: "Unrequested advice often lands as 'you can't cope' or 'you're doing it wrong'. Ask first, listen more, and offer ideas as options.",
    points: [
      "**Ask permission**: \"Would you like my thoughts, or would it help more if I just listened?\"",
      "**Listen for at least as long as you talk.** Most people have already thought of the obvious advice.",
      "**Ask what they have thought of**: \"What have you considered so far?\"",
      "**Offer options, not instructions**: \"A couple of things that have worked for others. Take or leave them.\"",
      "**Beware the 'yes, but' game.** If every suggestion is batted away, stop suggesting and start asking.",
      "**Trust them with their own problem.** \"I think you'll work it out. What would help from me?\""
    ],
    good: "\"Do you want my thoughts on this, or do you want me to listen?\"",
    bad: "\"What you need to do is...\"",
    checks: [
      { q: "A child or young adult describes a problem. What is the best first step?", options: ["Give your best solution", "Ask whether they want advice or just a listen", "Tell them a story from your life", "Say it will be fine"], answer: 1, why: "Asking respects their autonomy and tells you what they actually need." },
      { q: "Every suggestion you make gets 'yes, but'. What now?", options: ["Offer more suggestions", "Stop advising and ask what they think might work", "Insist", "End the talk"], answer: 1, why: "'Yes, but' often means they want to be heard, not advised." }
    ]
  },
  {
    id: "LF3", track: "family", title: "Coaching questions", principle: "F3",
    summary: "Questions that help someone think are more useful than answers that think for them.",
    points: [
      "**Open, simple questions**: \"What's the hardest part?\", \"What have you tried?\", \"What would help?\", \"What do you want to happen?\"",
      "**Avoid 'why' interrogations.** \"Why did you do that?\" sounds like blame. Try \"What was going on for you?\"",
      "**Use scales**: \"On a scale of one to ten, how worried are you? What would make it one point lower?\"",
      "**Reflect, then ask**: \"Sounds like that was really embarrassing. What do you want to do about it?\"",
      "**Allow silence.** Let them fill it.",
      "**Let them own the plan**, even if it is not the one you would choose, unless safety is at stake.",
      "**Check in later** on how it went, as a curious friend, not an inspector."
    ],
    good: "\"That sounds rough. What do you think would help?\"",
    bad: "\"Why didn't you just tell the teacher? I told you what to do.\"",
    checks: [
      { q: "Which question coaches rather than tells?", options: ["\"Why did you do that?\"", "\"What would help most right now?\"", "\"Haven't I told you before?\"", "\"Don't you think you should apologise?\""], answer: 1, why: "It hands the thinking to them." },
      { q: "When is it right to override their plan?", options: ["Whenever you disagree", "When safety is at stake", "When you're busy", "When you've had more experience"], answer: 1, why: "Autonomy is the default. Safety is the exception." }
    ]
  },
  {
    id: "LF4", track: "family", title: "Difficult parents: patterns and boundaries", principle: "F5",
    summary: "With parents, old roles snap back fast. Decide in advance what you will and will not do, and hold it kindly.",
    points: [
      "**Notice the old pattern.** Around parents we often slip into being the child, or fight like one. Remember you are an adult now.",
      "**Look for the need under the criticism**: worry, loneliness, wanting to matter, wanting to feel useful. Criticism is often a clumsy form of care.",
      "**Avoid JADE**: justifying, arguing, defending, explaining. It invites more of the same. Hold your frame (see \"Frame attacks\" in Client elicitation).",
      "**Boundaries are about what you will do**, not what they must do: \"If the conversation turns to my parenting, I'll head off. I'd rather stay and enjoy lunch.\"",
      "**Kind, short and repeatable**: \"I know you care, and I'm not going to discuss that.\"",
      "**Limit time and topics**: shorter visits, a safe topic, a fixed end time.",
      "**Follow through calmly.** A boundary you do not keep is just a threat.",
      "**Choose your battles.** Not every comment needs an answer."
    ],
    good: "\"I know you're worried about me. I've got it in hand, and I'd like to hear how your week's been.\"",
    bad: "\"You've always done this! Nothing I do is ever good enough for you!\"",
    checks: [
      { q: "A parent keeps criticising how you run your household. Which is the best response?", options: ["Explain each decision in detail", "\"I know you care. I've got it in hand. How's your week been?\"", "Bring up old grievances", "Stop visiting"], answer: 1, why: "It acknowledges the care, declines to be put on trial, and redirects kindly." },
      { q: "What does a boundary describe?", options: ["What they must stop doing", "What you will do", "What is fair", "A threat"], answer: 1, why: "You control your own actions, not theirs." }
    ]
  },
  {
    id: "LF5", track: "family", title: "Repair and staying close", principle: "F6",
    summary: "Every family has rough moments. What matters is how quickly and warmly they are repaired.",
    points: [
      "**Repair soon**: \"I didn't handle that well earlier. Can I try again?\"",
      "**Own your part**, even when the other person owns more. Do not wait for them first.",
      "**Apologise to children** when you get it wrong. It teaches repair and builds trust.",
      "**Name what you value**: \"I love that you tell me things. I want to keep it that way.\"",
      "**Keep regular, easy contact** with parents and children: short calls, shared tasks, a standing coffee.",
      "**Let go of the verdict.** You do not need them to agree you were right."
    ],
    good: "\"I came on too strong earlier, and I'm sorry. I'd like to hear your side properly.\"",
    bad: "\"I'm sorry you got upset.\"",
    checks: [
      { q: "You lost your temper with your teenager. What helps most?", options: ["Wait for them to apologise", "Apologise for your part and offer to listen", "Pretend it didn't happen", "Ground them"], answer: 1, why: "Prompt repair models respect and keeps the connection." },
      { q: "Why keep regular easy contact with parents?", options: ["It prevents all conflict", "Goodwill from small positive contact cushions the hard moments", "It gives you control", "It is expected"], answer: 1, why: "Positive contact builds a store of goodwill." }
    ]
  },

  /* ----- Partners and friends ----- */
  {
    id: "LM1", track: "close", title: "Bids for connection", principle: "M1",
    summary: "Close relationships are built from small moments. A bid is any small attempt to connect: a comment, a question, a joke, a touch.",
    points: [
      "**Spot the bid**: \"Look at that sunset.\" \"Guess what happened today.\" \"I had a rough day.\"",
      "**Turn towards**: stop what you are doing, look up, respond with interest. It takes ten seconds.",
      "**Turning away** (staying on the laptop, a grunt) is rarely malice, but repeated, it tells them they matter less.",
      "**Ask one follow-up**: \"What happened next?\" \"How did that feel?\"",
      "**Notice your own habits.** Many focused people miss bids when absorbed in a task.",
      "**Make your own bids** too: share a thought, ask a question, offer a small kindness."
    ],
    good: "(Looks up from the screen.) \"Tell me about it. What happened?\"",
    bad: "(Still typing.) \"Mm. Just a minute.\"",
    checks: [
      { q: "Your partner says, \"You'll never guess who I ran into today.\" What is the best response?", options: ["Keep working and say \"mm\"", "Look up and ask, \"Who?\"", "Say you're busy", "Say you'll listen later"], answer: 1, why: "Turning towards a small bid builds connection." },
      { q: "Why do small bids matter?", options: ["They are polite", "Repeated small moments determine whether a relationship feels connected", "They avoid arguments entirely", "They save time"], answer: 1, why: "Connection is built in small, frequent moments." }
    ]
  },
  {
    id: "LM2", track: "close", title: "Appreciation and curiosity", principle: "M6",
    summary: "Stable relationships hold far more warmth than friction. Build the positive side deliberately.",
    points: [
      "**Say thanks specifically**: \"Thanks for sorting dinner. I know it was a long day.\"",
      "**Notice effort**, not just results.",
      "**Stay curious**: ask about their day, worries and plans. People change and so do their answers.",
      "**Schedule protected time**: a regular evening, a walk, a call, with devices away.",
      "**In friendships, reach out without an agenda**: a message that says \"thinking of you\".",
      "**Celebrate their good news** with real interest. How you respond to good news matters as much as how you respond to bad."
    ],
    good: "\"Thanks for handling the school stuff this week. It made a real difference.\"",
    bad: "(Only speaking up when something is wrong.)",
    checks: [
      { q: "Which is a strong expression of appreciation?", options: ["\"Thanks.\"", "\"Thanks for sorting dinner. I know you had a long day.\"", "\"You're great.\"", "Say nothing; they know"], answer: 1, why: "Specific appreciation shows you noticed." },
      { q: "How should you respond to a friend's good news?", options: ["Briefly, then change topic", "With real interest and a follow-up question", "Compare with your own", "Warn about risks"], answer: 1, why: "Active, interested responses to good news strengthen relationships." }
    ]
  },
  {
    id: "LM3", track: "close", title: "Support: listening or fixing?", principle: "M3",
    summary: "Practical people fix. But when someone is upset, they usually want to be heard first. Ask which they want.",
    points: [
      "**Ask**: \"Do you want help with solutions, or do you want me to listen?\"",
      "**Listen first.** Fixing too soon can sound like \"your feelings are a problem to solve\".",
      "**Reflect**: \"That sounds really humiliating.\"",
      "**Be on their side**, even if later you offer a different view.",
      "**Offer practical help later**: \"If it would help, I can look at the email with you.\"",
      "**Do not minimise**: avoid \"it could be worse\" or \"at least...\""
    ],
    good: "\"That sounds awful. Do you want to vent, or shall we think about what to do?\"",
    bad: "\"Well, you should just talk to your boss tomorrow.\"",
    checks: [
      { q: "Your partner comes home upset. What is the best first line?", options: ["\"Here's what you should do.\"", "\"That sounds rough. Do you want to talk it through, or shall we think about solutions?\"", "\"It could be worse.\"", "\"Don't worry.\""], answer: 1, why: "It acknowledges, then lets them choose the kind of support." },
      { q: "Why avoid 'at least...' statements?", options: ["They are cheerful", "They minimise the person's feelings", "They are formal", "They take time"], answer: 1, why: "They tell people their feelings are too big." }
    ]
  },
  {
    id: "LM4", track: "close", title: "Raise a concern as a complaint, not criticism", principle: "M2",
    summary: "A complaint is about a specific behaviour. Criticism attacks character. Complaints can be heard; criticism gets defended.",
    points: [
      "**Complaint**: \"I felt alone at dinner when you were on your laptop.\" **Criticism**: \"You're always glued to your screen. You're so selfish.\"",
      "**Soft start**: begin gently, with the specific situation and your feeling.",
      "**Formula**: \"I feel [feeling] about [specific situation], and I need [need]. Would you be willing to [request]?\"",
      "**Add appreciation**: \"I love our evenings. I'd like more of them.\"",
      "**Avoid the four warning signs**: criticism, contempt (sarcasm, eye-rolls), defensiveness and stonewalling.",
      "**One issue at a time**, at a calm moment."
    ],
    good: "\"I felt a bit lonely at dinner tonight. Could we try phones and laptops away at meals?\"",
    bad: "\"You never pay me any attention. You're always on that thing.\"",
    checks: [
      { q: "Which is a complaint rather than criticism?", options: ["\"You're so selfish.\"", "\"I felt lonely at dinner when you were on your laptop.\"", "\"You never listen.\"", "\"What's wrong with you?\""], answer: 1, why: "It names a specific behaviour and your feeling, without attacking character." },
      { q: "Which is a warning sign of trouble in relationships?", options: ["Saying thanks", "Contempt, such as sarcasm or eye-rolling", "Taking a break", "Asking questions"], answer: 1, why: "Contempt is one of the strongest predictors of relationship damage." }
    ]
  },
  {
    id: "LM5", track: "close", title: "Defensiveness, flooding and repair", principle: "M5",
    summary: "When your heart rate climbs, thinking narrows. Take a break, then return. Repair attempts matter more than perfect conversations.",
    points: [
      "**Spot flooding**: racing heart, tight chest, urge to leave or attack.",
      "**Take a break of about twenty minutes.** Say you will return: \"I'm too wound up to do this well. Can we take twenty minutes and come back at eight?\"",
      "**Calm yourself** (slow breathing, a walk), not rehearse your case.",
      "**Own a part when you come back**: \"I got defensive earlier. I'd like to hear what you were saying.\"",
      "**Use and accept repair attempts**: humour, a touch, \"let's start again\". Do not punish them.",
      "**Do not stonewall**: going silent without saying why feels like abandonment."
    ],
    good: "\"I'm getting too defensive to listen well. Let's take twenty minutes and come back to this at eight.\"",
    bad: "(Walking out without a word, or going silent for the night.)",
    checks: [
      { q: "You are flooded mid-argument. Best move?", options: ["Push on to settle it", "Call a break of about twenty minutes and agree when to return", "Say nothing and leave", "Raise your voice"], answer: 1, why: "A defined break lets your body settle so you can think." },
      { q: "Your partner makes a joke to lighten the mood mid-argument. Best response?", options: ["Take offence", "Accept it as a repair attempt", "Ignore it", "Explain why it isn't funny"], answer: 1, why: "Repair attempts, when accepted, keep arguments from spiralling." }
    ]
  },
  {
    id: "LM6", track: "close", title: "Friendships: staying close and saying hard things", principle: "M6",
    summary: "Friendships fade without effort and survive hard conversations when raised kindly. Both are skills.",
    points: [
      "**Make the first move.** Most people wait to be asked. \"I've been thinking of you. Coffee soon?\"",
      "**Make it specific**: \"Are you free Thursday evening?\" beats \"We should catch up sometime.\"",
      "**Be reliable.** Keep small commitments.",
      "**Raise a hurt early and gently**: \"I want to mention something because our friendship matters to me.\"",
      "**Ask what they need** when they are struggling: advice, practical help, or company.",
      "**Allow for drift.** Reaching out after a long gap without guilt-tripping reopens the door."
    ],
    good: "\"I've missed catching up. Are you free for a walk on Thursday?\"",
    bad: "\"We should catch up sometime.\" (and never follow through)",
    checks: [
      { q: "Which invitation is most likely to lead to a meeting?", options: ["\"We should catch up sometime.\"", "\"Are you free for a walk on Thursday evening?\"", "\"Let me know if you're ever free.\"", "\"It's been ages.\""], answer: 1, why: "A concrete suggestion is easy to say yes to." },
      { q: "A friend says something hurtful in front of others. What helps most?", options: ["Retaliate in kind", "Raise it privately and gently, soon after", "Say nothing forever", "Tell mutual friends"], answer: 1, why: "A private, kind conversation protects the friendship." }
    ]
  }
);

/* ---------- Drills ---------- */
[
  ["family", "Because I said so.", "Shuts the conversation; no reasons or listening"],
  ["family", "What's wrong with you?", "Shaming; invites defensiveness"],
  ["family", "When I was your age...", "Shifts the focus to you and often feels dismissive"],
  ["family", "You should just ignore them.", "Unrequested advice; minimises the feeling"],
  ["family", "Why did you do that?", "Sounds like blame"],
  ["family", "Have you thought about just asking the teacher?", "Advice dressed up as a question"],
  ["family", "Parent: \"After everything I've done for you.\" You: \"That's not fair, I've always been grateful!\"", "Defends and argues; takes the bait"],
  ["family", "That's none of your business.", "Cuts the parent off harshly with no care shown"],
  ["close", "You never listen.", "Absolute and critical; invites defence"],
  ["close", "Nothing's wrong.", "Withdrawing; hides the feeling and the need"],
  ["close", "You're overreacting.", "Dismisses the feeling"],
  ["close", "What do you want me to do about it?", "Defensive; misses the need to be heard"],
  ["close", "Can't you take a joke?", "Blames the person who was hurt"],
  ["close", "We should catch up sometime.", "Vague; rarely leads to a plan"]
].forEach(([track, bad, flaw]) => window.DRILLS.push({ track, bad, flaw }));

/* ---------- Scenarios ---------- */
window.SCENARIOS.push(
  {
    id: "SF1", track: "family", level: "Medium", voice: "fable",
    voiceStyle: "Elderly New Zealand woman in her mid-seventies. Brisk, gently critical, with a worried edge.",
    title: "A parent who criticises",
    blurb: "Your mother comments on how tired you look and how you run your family.",
    persona: "Joan, 76, your mother, loving but critical, used to being listened to and sometimes lonely.",
    context: "You are visiting your mother for afternoon tea.",
    opening: "You're looking very tired. You work too hard and those children need more of you. In my day we managed better.",
    style: "Critical in a caring tone, uses frame attacks (\"I'm only saying this because nobody else will\", \"you've always been stubborn\"). Escalates if you defend yourself, explain at length or snap. Softens when you acknowledge her care, stay calm, hold a kind boundary and show interest in her.",
    facts: [
      { id: "f1", fact: "She is lonely since moving into a retirement village and sees few people", reveal: "when asked how she's been or how the village is" },
      { id: "f2", fact: "She worries about you and doesn't know how else to show it", reveal: "when you acknowledge her care without defending" },
      { id: "f3", fact: "She feels left out of the grandchildren's lives", reveal: "when asked about the grandchildren or what she'd like to be part of" },
      { id: "f4", fact: "She grew up in a home where criticism was how people showed they cared", reveal: "when asked about her own childhood or how her family was" },
      { id: "f5", fact: "She would love a regular standing time, such as Sunday lunch or a weekly call", reveal: "when asked what would make her happy" },
      { id: "f6", fact: "She feels hurt when you look at your phone while she's talking", reveal: "late, once she feels heard" }
    ]
  },
  {
    id: "SF2", track: "family", level: "Hard", voice: "onyx",
    voiceStyle: "Elderly New Zealand man in his late seventies. Gruff, loud, dismissive; quieter when respected.",
    title: "A parent who disapproves of your decision",
    blurb: "You tell your father you're thinking of cutting your hours. He's not impressed.",
    persona: "Ray, 79, your father, proud, anxious about money, uses sacrifice and guilt as arguments.",
    context: "You have told your father you are considering reducing your working hours.",
    opening: "Reduce your hours? Ridiculous. After everything your mother and I did to give you opportunities, you're going to throw it away?",
    style: "Dismissive, loud, uses frame attacks (\"you've gone soft\", \"typical of your generation\", \"after all we did\"). Escalates if you defend, explain your reasons or get angry. Settles if you stay calm, ask about his experience, acknowledge what he sacrificed and hold your decision without a fight.",
    facts: [
      { id: "f1", fact: "He grew up poor and fears financial insecurity above all", reveal: "when asked about his own working life or what money meant to him" },
      { id: "f2", fact: "He feels his sacrifices have never been properly acknowledged", reveal: "when you thank him sincerely and specifically" },
      { id: "f3", fact: "He is proud of you but has never said it", reveal: "late, once he feels respected" },
      { id: "f4", fact: "He wants to be consulted on big decisions, not informed afterwards", reveal: "when asked how he'd like to be involved" },
      { id: "f5", fact: "He worries you will regret it as he regrets not spending more time with family", reveal: "when asked what he's most worried about" },
      { id: "f6", fact: "He would accept your decision if he understood your plan and felt it was sound", reveal: "when you share your plan calmly and invite his thoughts" }
    ]
  },
  {
    id: "SF3", track: "family", level: "Medium", voice: "shimmer",
    voiceStyle: "New Zealand teenage girl, fifteen. Flat, one-word answers at first, more natural and open as she relaxes.",
    title: "The teenager who has gone quiet",
    blurb: "Your 15-year-old has withdrawn at home and you want to check in without nagging.",
    persona: "Ella, 15, your daughter, withdrawn, guarded and allergic to interrogation or advice.",
    context: "You are driving your daughter home from a sports practice and decide to gently check in.",
    opening: "I'm fine. Why does everyone keep asking?",
    style: "One-word answers, shrugs, sarcasm. Shuts down with questions that feel like interrogation, advice or mention of grades. Opens slowly if you listen, reflect and don't push. Does not mention anything about hurting herself.",
    facts: [
      { id: "f1", fact: "She has fallen out with her close friend group and eats lunch alone", reveal: "when she feels safe and is not interrogated" },
      { id: "f2", fact: "She is embarrassed and doesn't want you to contact the school or other parents", reveal: "when asked what she wants from you" },
      { id: "f3", fact: "She feels her parents only ask about grades and homework", reveal: "when you reflect how it must feel" },
      { id: "f4", fact: "She doesn't want advice; she wants someone to listen", reveal: "when asked what would help" },
      { id: "f5", fact: "She would like regular low-pressure time together, like driving to the shop", reveal: "when offered a low-key option" }
    ]
  },
  {
    id: "SF4", track: "family", level: "Hard", voice: "ash",
    voiceStyle: "New Zealand young man, twenty-two. Frustrated, restless, a bit defensive; relaxes if he feels trusted.",
    title: "The adult child who asks for advice, then rejects it",
    blurb: "Your 22-year-old son asks what he should do about his course, then argues with every suggestion.",
    persona: "Jack, 22, your son, bright, anxious and wanting both guidance and independence.",
    context: "Your son has asked to talk about whether to leave his degree for a job offer.",
    opening: "I can't decide whether to quit uni for this job. What do you think I should do?",
    style: "Asks for advice, then 'yes, but' to each suggestion. Gets irritated if lectured or told what to do. Opens up if you ask what he thinks, reflect his feelings, and express trust in his ability to decide.",
    facts: [
      { id: "f1", fact: "He has been offered a good entry-level job and is excited but scared", reveal: "when asked what appeals to him or how he feels" },
      { id: "f2", fact: "He is afraid of disappointing you because you value education", reveal: "when you say you're not trying to steer him" },
      { id: "f3", fact: "He has lost interest in the course but hasn't told anyone", reveal: "when asked about the course honestly, without judgement" },
      { id: "f4", fact: "He is anxious about money and the student loan", reveal: "when asked what worries him most" },
      { id: "f5", fact: "He actually wants to hear 'I trust you to make a good decision'", reveal: "late, when you ask what support would help" },
      { id: "f6", fact: "He has already half decided to take the job", reveal: "when asked what he's leaning towards" }
    ]
  },
  {
    id: "SF5", track: "family", level: "Easy", voice: "coral",
    voiceStyle: "New Zealand ten-year-old boy. Upset, small voice, then brighter when comforted.",
    title: "A child upset about a friend",
    blurb: "Your ten-year-old comes home upset after being left out by a friend.",
    persona: "Noah, 10, your son, upset, a bit tearful and embarrassed.",
    context: "Your son has come home from school looking upset and goes to his room.",
    opening: "Nothing. I don't want to talk about it.",
    style: "Short answers, a bit teary. Shuts down if told 'it's nothing', given advice or asked lots of questions. Opens up if you sit with him, name the feeling gently and stay calm.",
    facts: [
      { id: "f1", fact: "His best friend played with other kids at lunch and told him he wasn't invited", reveal: "when you sit with him and gently reflect how he might be feeling" },
      { id: "f2", fact: "He felt embarrassed in front of the others", reveal: "when you name the feeling without pushing" },
      { id: "f3", fact: "He's worried he did something wrong", reveal: "when asked what he's been thinking about" },
      { id: "f4", fact: "He doesn't want you to talk to the teacher", reveal: "when asked what he wants from you" },
      { id: "f5", fact: "He'd like a hug and to play a game together", reveal: "when asked what would help" }
    ]
  },
  {
    id: "SM1", track: "close", level: "Medium", voice: "nova",
    voiceStyle: "New Zealand woman in her late forties. Hurt underneath, dry and a little sarcastic on top, softer when she feels noticed.",
    title: "Partner feels like a colleague",
    blurb: "Your partner is upset that you were on your laptop through dinner again.",
    persona: "Jordan, 48, your partner, loving but feeling unseen, dry humour that turns sharp when hurt.",
    context: "It is late evening. Your partner wants to talk after dinner.",
    opening: "You were on your laptop through dinner again. Some days I feel like I'm living with a colleague.",
    style: "Hurt, sarcastic. Uses 'you always' phrases. Withdraws if you defend or explain your workload. Softens when you acknowledge her, own your part and ask what she's missing.",
    facts: [
      { id: "f1", fact: "She had good news today that you didn't notice", reveal: "when asked about her day or what she tried to tell you" },
      { id: "f2", fact: "She misses talking together without devices", reveal: "when asked what she's missing" },
      { id: "f3", fact: "She feels last on your list", reveal: "when asked how it has felt, with empathy" },
      { id: "f4", fact: "She wants fifteen minutes of undistracted time each day", reveal: "when asked what would help" },
      { id: "f5", fact: "She worries you're unhappy or overwhelmed", reveal: "late, once she feels heard" },
      { id: "f6", fact: "She'd love to hear you say you appreciate her", reveal: "late, when she feels safe" }
    ]
  },
  {
    id: "SM2", track: "close", level: "Easy", voice: "nova",
    voiceStyle: "New Zealand woman in her late forties. Stressed, wound up, tearful at times, calmer when listened to.",
    title: "Partner has had a terrible day",
    blurb: "Your partner arrives home upset about a humiliating day at work.",
    persona: "Sam, 47, your partner, upset and venting, needing to be heard.",
    context: "Your partner has just come home from a bad day.",
    opening: "I've had the worst day. Honestly, I don't even know where to start.",
    style: "Venting, pausing, circling back. Gets frustrated if you jump to advice, minimise or say 'at least'. Calms down if you listen, reflect and ask what she needs.",
    facts: [
      { id: "f1", fact: "Her manager criticised her in front of the team", reveal: "when asked what happened" },
      { id: "f2", fact: "She felt humiliated and wanted to leave the room", reveal: "when you reflect the feeling" },
      { id: "f3", fact: "She doesn't want advice tonight; she wants to be on her side", reveal: "when asked what she needs" },
      { id: "f4", fact: "She'd welcome help drafting a reply tomorrow", reveal: "when offered practical help later" },
      { id: "f5", fact: "She feels better when she's heard and often finds her own answer", reveal: "late, as she calms" }
    ]
  },
  {
    id: "SM3", track: "close", level: "Medium", voice: "alloy",
    voiceStyle: "New Zealand man in his fifties. Jovial on the surface, defensive when challenged, quieter and sincere when he feels safe.",
    title: "The friend who made a hurtful joke",
    blurb: "A long-time friend made a joke at your expense in front of others, and you want to raise it.",
    persona: "Tim, 52, a long-time friend, jovial, a bit insecure and quick to deflect with humour.",
    context: "You have asked an old friend for a coffee to raise something that bothered you.",
    opening: "Go on then, what's this mysterious coffee about? Hope you're not going to tell me you're leaving the pub quiz team.",
    style: "Jokes to deflect. Gets defensive if accused (\"can't you take a joke?\"). Becomes more sincere if you raise it gently, as a specific concern, with your feeling and that the friendship matters.",
    facts: [
      { id: "f1", fact: "He was nervous about his own job situation at the barbecue and joked to cover it", reveal: "when asked how things have been for him" },
      { id: "f2", fact: "He didn't realise the joke landed badly", reveal: "after you raise it gently with an I statement" },
      { id: "f3", fact: "He feels you've drifted away lately", reveal: "when asked how he's seen the friendship" },
      { id: "f4", fact: "He values the friendship and would apologise if it wasn't made a big deal", reveal: "when you affirm the friendship" },
      { id: "f5", fact: "He'd like to do something just the two of you", reveal: "late, when repair is underway" }
    ]
  },
  {
    id: "SM4", track: "close", level: "Easy", voice: "echo",
    voiceStyle: "New Zealand man in his early fifties. Warm, a little reserved, wry humour, pleased to be contacted.",
    title: "Reconnecting with an old friend",
    blurb: "You are phoning a friend you haven't spoken to for two years.",
    persona: "Mike, 51, a good friend from university, warm but reserved, hurt that contact lapsed.",
    context: "You have decided to ring an old friend after a long gap.",
    opening: "Well, this is a surprise. I'd almost forgotten what your voice sounds like.",
    style: "Warm with a dry edge. A little guarded at first. Opens up if you don't make excuses, are honest and ask about him.",
    facts: [
      { id: "f1", fact: "He went through a separation last year and felt let down that you didn't call", reveal: "when asked how he's been, honestly and warmly" },
      { id: "f2", fact: "He is pleased you rang and has thought about you often", reveal: "when you own the gap without excuses" },
      { id: "f3", fact: "He has taken up cycling and rides most weekends", reveal: "when asked what he's up to" },
      { id: "f4", fact: "He would like to catch up in person", reveal: "when you suggest something specific" },
      { id: "f5", fact: "He finds it hard to reach out first", reveal: "late, once relaxed" }
    ]
  },
  {
    id: "SM5", track: "close", level: "Medium", voice: "shimmer",
    voiceStyle: "New Zealand woman in her late forties. Quiet, ashamed, guarded; warmer as she feels safe.",
    title: "A friend going through a hard time",
    blurb: "A close friend has lost her job and you want to help without fixing.",
    persona: "Lena, 49, a close friend, quiet, embarrassed, and used to being the strong one.",
    context: "You have gone to see a friend who recently lost her job.",
    opening: "Thanks for coming. I'm okay, really. Don't fuss.",
    style: "Deflects, says she's fine, bristles at advice or pity. Opens up if you stay calm, ask gently, ask whether she wants help or company, and don't minimise.",
    facts: [
      { id: "f1", fact: "She was made redundant three weeks ago and hasn't told many people", reveal: "when asked how she is, gently" },
      { id: "f2", fact: "She feels ashamed and worries about being seen as a failure", reveal: "when you acknowledge how hard it is" },
      { id: "f3", fact: "She doesn't want advice; she wants company and normality", reveal: "when asked what she needs" },
      { id: "f4", fact: "She would value a reference or an introduction later", reveal: "when offered practical help without pressure" },
      { id: "f5", fact: "She is worried about money but doesn't want to discuss details", reveal: "late, once safe" }
    ]
  }
);
