# Conversation Skills Trainer

A static training site for conversation skills in nine tracks (seeing their side, defusing conflict, potential violence, small talk, parents and children, partners and friends, work conversations, client elicitation, personal basics), each with lessons, drills and live AI role-play.

- **Learn**: eight short lessons with checks
- **Drill**: rewrite weak questions, coached by AI
- **Role-play**: four simulated clients with hidden facts; debrief scores you against principles
- **Progress**: mastery = all lessons complete, then three consecutive role-plays at 80+ across at least two clients

## Pressure mode (Potential violence track)

Scenarios in this track unlock in five levels (two scores of 80+ at one level open the next) and run under pressure: the other person has a hidden agitation level (0-10) that rises when you argue, defend or crowd them and falls when you keep distance, label, deflect and offer choices. A response clock (default 8 s) sends a "silence" if you freeze. A call can end in a blow-up (score capped at 50), a calm settle, or you walking away. The debrief shows the agitation trace, turning points, response time, speaking pace and whether you should have left. Describe actions in brackets, e.g. (step back, hands open). Clock, meter visibility, warm-up and level locks are in Settings.

## Use

Open the GitHub Pages site, go to Settings, and paste an Anthropic API key. The key is used only for calls from your browser to `api.anthropic.com`. It is held for the tab unless you tick "Remember". Use a key with a spend limit.

## Edit content

Lessons, drills and scenarios are in `data.js` (client elicitation) and `tracks.js` to `tracks4.js` (the other tracks; `tracks4.js` is Potential violence). No build step.

## Run locally

    python3 -m http.server 8000

## Voice (optional)

In Settings, add an OpenAI API key and tick the voice option. The client's replies are spoken (OpenAI text-to-speech, each client has their own voice) and you answer by microphone (OpenAI speech-to-text). Hands-free mode listens automatically after the client finishes and sends when you pause. The microphone needs HTTPS, which GitHub Pages provides.

## Phone and desktop

The site works on any device. Keys and progress are stored per browser and do not sync. Use Settings to export progress on one device and import it on another (API keys are never included). On a phone, use "Add to Home Screen" to install it like an app.
