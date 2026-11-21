# Client Elicitation Trainer

A static training site for learning client requirements elicitation, then practising it against live AI role-play clients.

- **Learn**: eight short lessons with checks
- **Drill**: rewrite weak questions, coached by AI
- **Role-play**: four simulated clients with hidden facts; debrief scores you against principles
- **Progress**: mastery = all lessons complete, then three consecutive role-plays at 80+ across at least two clients

## Use

Open the GitHub Pages site, go to Settings, and paste an Anthropic API key. The key is used only for calls from your browser to `api.anthropic.com`. It is held for the tab unless you tick "Remember". Use a key with a spend limit.

## Edit content

Lessons, drills and scenarios are all in `data.js`. No build step.

## Run locally

    python3 -m http.server 8000

## Voice (optional)

In Settings, add an OpenAI API key and tick the voice option. The client's replies are spoken (OpenAI text-to-speech, each client has their own voice) and you answer by microphone (OpenAI speech-to-text). Hands-free mode listens automatically after the client finishes and sends when you pause. The microphone needs HTTPS, which GitHub Pages provides.
