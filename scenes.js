/* Situation text for every lesson example and role-play. Applied after all content loads. */
(function(){
const SCENES = {
 "L1": "A homeowner phones a small consultancy: \"I need a steel beam to take out a wall.\" You are the engineer taking the call.",
 "L2": "First call with a homeowner about a deck at the back of a sloping section. You are the engineer scoping it.",
 "L3": "A developer says he needs the design \"quick\" and \"cheap\" for a small fit-out. You are the engineer on the call.",
 "L4": "You are scoping a small residential project when the client mentions the builder has already started.",
 "L5": "A buyer rings, stressed, about a settlement date and a wall he wants removed. You are the engineer listening.",
 "L6": "A builder asks you to sign a PS4 for a slab and framing you did not design or observe.",
 "L7": "The end of a 20-minute scoping call about a deck and retaining wall. You are wrapping up.",
 "L8": "A site manager is pushing you for a same-day sign-off and asks, \"Are you just covering your backside?\"",
 "LD1": "A member rings furious about a declined registration application. You take the call in a professional body's practice team.",
 "LD2": "The same caller says he has waited three weeks with no reply.",
 "LD3": "A caller complains the application took five months and the decision arrived as a form letter.",
 "LD4": "A client demands you \"cancel the whole thing\" after receiving a fee estimate.",
 "LD5": "A caller keeps swearing at you during a complaint call.",
 "LD6": "You are ending a complaint call about a stalled application.",
 "LD7": "In a review meeting a peer says your guidance note is wrong, and you feel your irritation rising.",
 "LW1": "You manage a graduate engineer whose last three reports had errors, and you are planning how to raise it.",
 "LW2": "In the feedback conversation you describe what happened in the last three reports.",
 "LW3": "After describing the errors, you want to hear the graduate's view.",
 "LW4": "A team member responds to your feedback with, \"What about Chris? His reports have errors too.\"",
 "LW5": "Your manager wants a full design review by Friday, but peer review alone needs three working days.",
 "LW6": "You are closing a feedback conversation with a graduate engineer.",
 "LP1": "Evening at home. You want to talk with your partner about how evenings have been going.",
 "LP2": "The same conversation: you explain how you feel about doing bedtime mostly alone.",
 "LP3": "Your partner comes home upset after a hard day at work.",
 "LP4": "You missed your daughter's school concert because of a late meeting.",
 "LP5": "A conversation with someone close gets heated and you are both overwhelmed.",
 "LT1": "You are at a professional conference with a room full of people you don't know.",
 "LT2": "You are in the registration queue at a conference, next to someone you don't know.",
 "LT3": "In that queue, the person says she has come up from Invercargill.",
 "LT4": "At a conference dinner you are talking with a sponsor's CEO.",
 "LT5": "The dinner is winding down and you want to move on from the conversation politely.",
 "LV1": "In a design review a graduate engineer states a view you think is wrong.",
 "LV2": "A senior engineer from another firm says he sees a problem with your draft guidance.",
 "LV3": "A council consent manager explains how altered producer statements affect her team.",
 "LV4": "The same manager insists engineers are making her team's life harder.",
 "LV5": "You have listened to the council manager and now want to give your own view.",
 "LF1": "You are driving your teenage daughter home from sports practice.",
 "LF2": "Your 22-year-old son asks what you think about leaving his degree.",
 "LF3": "Your ten-year-old comes home from school upset.",
 "LF4": "You are visiting your mother, who comments on how you run your household.",
 "LF5": "You lost your temper with your teenager at dinner last night.",
 "LM1": "Evening. You are working at your laptop and your partner starts telling you about someone she ran into.",
 "LM2": "End of a busy week; your partner has handled most of the school and home routine.",
 "LM3": "Your partner arrives home upset after being criticised in front of her team.",
 "LM4": "Your partner was on the laptop through dinner again, and you want to raise it.",
 "LM5": "A conversation about household jobs turns into an argument.",
 "LM6": "You haven't seen an old university friend for two years and want to get back in touch."
};
const BRIEFS = {
 "S1": {
  "brief": "You are an engineer at a small consultancy. A homeowner, Aroha, has been told by her builder that she needs an engineer for a deck at the back of her house. She hasn't used an engineer before. This is the first call.",
  "goal": "Find out what she needs and what has happened so far, and agree a sensible next step."
 },
 "S2": {
  "brief": "You take a call from Dan, who is buying a 1960s weatherboard house. He wants a beam specified to remove a wall before settlement, and he sounds rushed.",
  "goal": "Understand what is driving his request before you commit to anything, and keep him on side."
 },
 "S3": {
  "brief": "Craig, a site manager, rings asking for a PS4 on a slab and framing his crew has finished. He wants it today. You have not been involved in the project.",
  "goal": "Find out what has happened on site, and offer only what you can honestly provide."
 },
 "S4": {
  "brief": "Priya, an architect, rings about structure for a renovation of an older house and wants a fee quickly. She says the brief is 'flexible'.",
  "goal": "Pin down scope, constraints and programme well enough to give a sound fee."
 },
 "S5": {
  "brief": "Gary, owner of a half-finished extension, rings angry. The project has stalled and he feels let down by everyone involved.",
  "goal": "Stay calm, hold your frame, find out what is wrong and what he needs, and agree a next step."
 },
 "SD1": {
  "brief": "You work in a professional body's practice team. Tom, an experienced engineer, rings after receiving a letter declining his registration application following a five-month wait. He is angry.",
  "goal": "Calm the call, understand what he needs and agree a next step."
 },
 "SD2": {
  "brief": "It is Saturday and you are at home. Your neighbour Wayne storms up your drive about your new boundary fence.",
  "goal": "Stay calm, avoid escalation, understand his concern and agree a way forward."
 },
 "SD3": {
  "brief": "After a team meeting where deliverables were reviewed, a colleague, Jo, snapped at you in front of others. You have taken her aside.",
  "goal": "Repair the working relationship and agree a better handover."
 },
 "SD4": {
  "brief": "You have just presented new guidance at a conference. In the Q&A, Dan, an audience member, stands up and challenges you in front of the room.",
  "goal": "Stay calm and respectful in front of the room, and move towards a useful next step."
 },
 "SW1": {
  "brief": "You manage Sam, a capable graduate engineer. Three recent reports had errors and one reached the client. You have booked a private 15 minutes.",
  "goal": "Give clear feedback, understand what is going on, and agree actions."
 },
 "SW2": {
  "brief": "Your manager, Alex, has just told you she needs a full design review by Friday. You know the peer review step alone needs about three working days.",
  "goal": "Say no to the deadline as set, offer options, and keep the relationship strong."
 },
 "SW3": {
  "brief": "You and Morgan co-direct a small consultancy. Two bids were lost recently. He wants to cut fees to win work and you disagree. You have asked for a conversation.",
  "goal": "Understand his concerns, share yours and agree a next step."
 },
 "SP1": {
  "brief": "You have arranged a coffee with a close friend, Kim, who has cancelled the last three times.",
  "goal": "Raise how you feel without blame, understand what is going on, and agree a way to stay in touch."
 },
 "SP5": {
  "brief": "Your sibling, Chris, rings about your mother's 80th birthday in three weeks. You have missed or left early from some family events in the past.",
  "goal": "Show you care, find out what he needs, and agree what you will do."
 },
 "ST1": {
  "brief": "You are in the registration queue at a professional conference. The person next to you looks unsure, and you don't know her.",
  "goal": "Have a friendly two-to-three-minute conversation, learn something about her, and finish warmly."
 },
 "ST2": {
  "brief": "It is Monday morning. You walk into the office kitchen and a colleague, Dev, whom you rarely chat with, is making coffee.",
  "goal": "Make easy conversation and learn something about him."
 },
 "ST3": {
  "brief": "At a conference dinner you are seated next to Graham, CEO of a materials supplier that sponsors the event. You have never met.",
  "goal": "Build rapport and show genuine interest, with no sales pitch."
 },
 "ST4": {
  "brief": "You are about to start a meeting with Helen, a council building consent manager you haven't met. She says she has forty minutes.",
  "goal": "Build a little rapport in the first few minutes before the agenda."
 },
 "SV1": {
  "brief": "You represent the engineering profession. Margaret, a council consent manager, has asked for a meeting about altered producer statements. She opens sharply.",
  "goal": "Understand her concerns and show you have, before offering your view and a next step."
 },
 "SV2": {
  "brief": "You help organise a conference. Rob, marketing manager at a supplier, has asked for a call about next year's sponsorship.",
  "goal": "Respond with understanding, find out what is behind it, and keep the relationship."
 },
 "SV3": {
  "brief": "You wrote a draft guidance note. Greg, a respected senior structural engineer, has phoned about it.",
  "goal": "Understand his objection and show you have, without getting defensive, and agree a next step."
 },
 "SV4": {
  "brief": "You manage Taylor, a capable team member. She asked for a private chat and seems nervous.",
  "goal": "Listen, show understanding and thank her, without defending."
 },
 "SF1": {
  "brief": "You are visiting your mother, Joan, for afternoon tea. She tends to comment on how you are managing.",
  "goal": "Stay calm, keep a kind boundary and understand what is behind her comments."
 },
 "SF2": {
  "brief": "You have told your father, Ray, that you are thinking of reducing your working hours.",
  "goal": "Hold your decision calmly while showing you understand his concerns."
 },
 "SF3": {
  "brief": "You are driving your 15-year-old daughter, Ella, home from sports practice. She has been withdrawn lately.",
  "goal": "Keep the door open and listen. Offer no advice unless she wants it."
 },
 "SF4": {
  "brief": "Your 22-year-old son, Jack, has asked to talk about whether to leave his degree for a job offer.",
  "goal": "Support him in deciding for himself."
 },
 "SF5": {
  "brief": "Your ten-year-old son, Noah, has come home from school upset and gone to his room.",
  "goal": "Help him feel heard. Don't try to fix it."
 },
 "SM1": {
  "brief": "It is late evening. Your partner, Jordan, wants to talk after dinner.",
  "goal": "Hear her, own your part and agree one small change."
 },
 "SM2": {
  "brief": "Your partner, Sam, has just come home after a bad day.",
  "goal": "Listen first and ask what she needs."
 },
 "SM3": {
  "brief": "You have asked an old friend, Tim, for a coffee. At a barbecue last week he made a joke at your expense.",
  "goal": "Raise it kindly without damaging the friendship."
 },
 "SM4": {
  "brief": "You are ringing an old friend, Mike, whom you haven't spoken to for two years.",
  "goal": "Reconnect honestly and agree something concrete."
 },
 "SM5": {
  "brief": "You have gone to see Lena, a close friend who recently lost her job.",
  "goal": "Be present, listen, and offer help only in the way she wants it."
 }
};
window.LESSONS.forEach(l => { if (SCENES[l.id]) l.scene = SCENES[l.id]; });
window.SCENARIOS.forEach(s => { if (BRIEFS[s.id]) { s.brief = BRIEFS[s.id].brief; s.goal = BRIEFS[s.id].goal; } });
})();
