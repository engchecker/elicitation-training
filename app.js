/* Client Elicitation Trainer. No build step, no server. Progress and key stay in this browser. */
(function () {
  "use strict";

  const LS = { progress: "elicit.progress.v1", settings: "elicit.settings.v1" };
  const API_URL = "https://api.anthropic.com/v1/messages";
  const DEFAULT_MODEL = "claude-sonnet-5-5";

  /* ---------- helpers ---------- */
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) n.setAttribute(k, v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      n.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return n;
  }
  function rich(text) {
    const frag = document.createDocumentFragment();
    String(text).split(/(\*\*[^*]+\*\*)/g).forEach(p => {
      if (/^\*\*[^*]+\*\*$/.test(p)) frag.append(el("strong", null, p.slice(2, -2)));
      else frag.append(document.createTextNode(p));
    });
    return frag;
  }
  const $ = s => document.querySelector(s);
  const clear = n => { while (n.firstChild) n.removeChild(n.firstChild); };
  const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;

  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ } }

  let progress = load(LS.progress, { lessons: {}, sessions: [], drills: [] });
  let settings = load(LS.settings, { model: DEFAULT_MODEL, remember: false });
  let apiKey = "";
  let openaiKey = "";
  try { apiKey = (settings.remember ? localStorage.getItem("elicit.key") : sessionStorage.getItem("elicit.key")) || ""; } catch (e) { /* ignore */ }

  try { openaiKey = (settings.remember ? localStorage.getItem("elicit.okey") : sessionStorage.getItem("elicit.okey")) || ""; } catch (e) { /* ignore */ }
  const SET_DEFAULTS = { voiceOn: false, handsFree: false, autoSend: false, sttModel: "gpt-4o-mini-transcribe", ttsModel: "gpt-4o-mini-tts" };
  settings = Object.assign({}, SET_DEFAULTS, settings);

  function persist() { save(LS.progress, progress); }

  /* ---------- API ---------- */
  async function claude(system, messages, maxTokens) {
    if (!apiKey) throw new Error("Add your Anthropic API key in Settings first.");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({ model: settings.model || DEFAULT_MODEL, max_tokens: maxTokens || 700, system, messages })
    });
    if (!res.ok) {
      let msg = res.status + " " + res.statusText;
      try { const j = await res.json(); if (j.error && j.error.message) msg = j.error.message; } catch (e) { /* ignore */ }
      throw new Error(msg);
    }
    const data = await res.json();
    return (data.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
  }
  function parseJSON(text) {
    const s = text.indexOf("{"), e = text.lastIndexOf("}");
    if (s < 0 || e < 0) throw new Error("Coach did not return structured feedback. Try again.");
    return JSON.parse(text.slice(s, e + 1));
  }

  /* ---------- navigation ---------- */
  const views = { learn: renderLearn, drill: renderDrill, roleplay: renderRoleplay, progress: renderProgress, settings: renderSettings };
  function go(name) {
    document.querySelectorAll("nav button").forEach(b => b.setAttribute("aria-current", b.dataset.view === name ? "page" : "false"));
    stopVoice(); if (rp) rp.active = false;
    const main = $("#view"); clear(main);
    views[name](main);
    window.scrollTo(0, 0);
    if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
  }

  /* ---------- LEARN ---------- */
  function renderLearn(main) {
    const done = LESSONS.filter(l => progress.lessons[l.id]).length;
    main.append(
      el("h2", null, "Learn the principles"),
      el("p", { class: "lede" }, LESSONS.length + " short lessons. Each ends with checks. Complete them all, then move on to the drill and the role-play."),
      el("div", { class: "meter", role: "progressbar", "aria-valuenow": done, "aria-valuemin": 0, "aria-valuemax": LESSONS.length },
        el("div", { class: "meter-fill", style: "width:" + (done / LESSONS.length * 100) + "%" })),
      el("p", { class: "muted" }, done + " of " + LESSONS.length + " lessons complete")
    );
    LESSONS.forEach((l, i) => {
      const card = el("details", { class: "card lesson" });
      if (!progress.lessons[l.id] && i === done) card.setAttribute("open", "");
      card.append(
        el("summary", null,
          el("span", { class: "num" }, String(i + 1)),
          el("span", { class: "ltitle" }, l.title),
          progress.lessons[l.id] ? el("span", { class: "badge ok" }, "Complete") : null),
        el("p", { class: "lede" }, l.summary),
        el("ul", null, l.points.map(p => el("li", null, rich(p)))),
        el("div", { class: "pair" },
          el("div", { class: "good" }, el("b", null, "Try: "), l.good),
          el("div", { class: "bad" }, el("b", null, "Avoid: "), l.bad)),
        l.source ? el("p", { class: "muted" }, "Source: ", el("a", { href: l.source.url, target: "_blank", rel: "noopener noreferrer" }, l.source.label)) : null,
        el("h4", null, "Check yourself"),
        renderChecks(l, card)
      );
      main.append(card);
    });
  }
  function renderChecks(lesson, card) {
    const wrap = el("div");
    const results = new Array(lesson.checks.length).fill(null);
    lesson.checks.forEach((c, qi) => {
      const fb = el("div", { class: "fb", "aria-live": "polite" });
      const opts = el("div", { class: "opts" });
      c.options.forEach((o, oi) => {
        const b = el("button", { class: "opt", type: "button" }, o);
        b.addEventListener("click", () => {
          if (results[qi] !== null) return;
          const ok = oi === c.answer;
          results[qi] = ok;
          b.classList.add(ok ? "right" : "wrong");
          if (!ok) opts.children[c.answer].classList.add("right");
          opts.querySelectorAll("button").forEach(x => x.disabled = true);
          clear(fb); fb.append(el("b", null, ok ? "Correct. " : "Not quite. "), c.why);
          if (results.every(r => r !== null)) {
            if (results.every(r => r)) {
              progress.lessons[lesson.id] = true; persist();
              fb.append(el("div", { class: "badge ok" }, "Lesson complete"));
            } else {
              fb.append(el("div", null, el("button", { class: "btn ghost", type: "button", onclick: () => { clear(wrap); wrap.append(...renderChecks(lesson, card).childNodes); } }, "Retry this lesson's checks")));
            }
          }
        });
        opts.append(b);
      });
      wrap.append(el("div", { class: "q" }, el("p", null, el("b", null, (qi + 1) + ". "), c.q), opts, fb));
    });
    return wrap;
  }

  /* ---------- DRILL ---------- */
  let drillIdx = -1;
  function renderDrill(main) {
    main.append(
      el("h2", null, "Question drill"),
      el("p", { class: "lede" }, "Each prompt shows a weak question or a missed opportunity. Rewrite it so it would draw out the client's real need. Feedback comes from the AI coach.")
    );
    const area = el("div", { class: "card" });
    main.append(area);
    const recent = progress.drills.slice(-10);
    if (recent.length) main.append(el("p", { class: "muted" }, "Last " + recent.length + " drill average: " + avg(recent.map(d => d.rating)).toFixed(1) + " / 5"));
    nextDrill(area);
  }
  function nextDrill(area) {
    clear(area);
    let i; do { i = Math.floor(Math.random() * DRILLS.length); } while (DRILLS.length > 1 && i === drillIdx);
    drillIdx = i;
    const d = DRILLS[i];
    const ta = el("textarea", { rows: 3, placeholder: "Write your improved question or response...", "aria-label": "Your rewrite" });
    const out = el("div", { "aria-live": "polite" });
    const btn = el("button", { class: "btn", type: "button" }, "Get feedback");
    btn.addEventListener("click", async () => {
      const text = ta.value.trim(); if (!text) return;
      btn.disabled = true; clear(out); out.append(el("p", { class: "muted" }, "Coach is reviewing..."));
      try {
        const reply = await claude(
          "You are a coach teaching engineers to elicit client requirements. Use NZ English and be concise. Respond with JSON only: {\"rating\": 0-5 integer, \"feedback\": \"2-3 sentences\", \"model\": \"one strong example question\"}. Reward open, single, non-leading questions that seek purpose, probe vague words, or confirm understanding.",
          [{ role: "user", content: "Weak original: " + d.bad + "\nIssue: " + d.flaw + "\nLearner's rewrite: " + text }], 400);
        const r = parseJSON(reply);
        const rating = Math.max(0, Math.min(5, Math.round(Number(r.rating) || 0)));
        progress.drills.push({ ts: Date.now(), rating }); persist();
        clear(out);
        out.append(el("p", null, el("b", null, "Rating: " + rating + " / 5")), el("p", null, r.feedback), el("p", { class: "good" }, el("b", null, "Example: "), r.model),
          el("button", { class: "btn", type: "button", onclick: () => nextDrill(area) }, "Next prompt"));
      } catch (e) { clear(out); out.append(el("p", { class: "err" }, e.message)); btn.disabled = false; }
    });
    area.append(el("p", { class: "prompt" }, d.bad), el("p", { class: "muted" }, "Hint: " + d.flaw), ta, el("div", { class: "row" }, btn), out);
  }

  const keysFor = s => (s && s.principles) || CORE_PRINCIPLES;


  /* ---------- VOICE (OpenAI speech-to-text and text-to-speech) ---------- */
  let audioEl = null, recorder = null;
  function stopVoice() {
    if (audioEl) { try { audioEl.pause(); } catch (e) { /* ignore */ } audioEl = null; }
    if (recorder) { recorder.cancel(); recorder = null; }
  }
  async function speak(text, s) {
    if (!settings.voiceOn || !openaiKey) return;
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: "Bearer " + openaiKey },
      body: JSON.stringify({ model: settings.ttsModel, voice: settings.voiceName || s.voice || "coral", input: text, instructions: s.voiceStyle || "", response_format: "mp3" })
    });
    if (!res.ok) throw new Error("Voice: " + (await errMsg(res)));
    const url = URL.createObjectURL(await res.blob());
    await new Promise(resolve => {
      audioEl = new Audio(url);
      audioEl.onended = audioEl.onerror = () => { URL.revokeObjectURL(url); resolve(); };
      audioEl.play().catch(resolve);
    });
  }
  async function errMsg(res) {
    try { const j = await res.json(); if (j.error && j.error.message) return j.error.message; } catch (e) { /* ignore */ }
    return res.status + " " + res.statusText;
  }
  async function transcribe(blob) {
    const ext = /mp4/.test(blob.type) ? "mp4" : /ogg/.test(blob.type) ? "ogg" : "webm";
    const fd = new FormData();
    fd.append("file", blob, "speech." + ext);
    fd.append("model", settings.sttModel);
    fd.append("language", "en");
    fd.append("prompt", "A phone call between a structural engineer and a client in New Zealand about consent, producer statements, decks, retaining walls, beams, foundations and council.");
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", { method: "POST", headers: { authorization: "Bearer " + openaiKey }, body: fd });
    if (!res.ok) throw new Error("Transcription: " + (await errMsg(res)));
    return ((await res.json()).text || "").trim();
  }
  /* Starts recording. Resolves with a Blob. If autoStop, ends after a pause following speech. */
  async function startRecording(autoStop, onLevel) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream), chunks = [];
    let cancelled = false, timer = null, ctx = null;
    const done = new Promise(resolve => {
      mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      mr.onstop = () => { clearInterval(timer); stream.getTracks().forEach(t => t.stop()); if (ctx) ctx.close(); resolve(cancelled ? null : new Blob(chunks, { type: mr.mimeType || "audio/webm" })); };
    });
    mr.start();
    if (autoStop) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const an = ctx.createAnalyser(); an.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(an);
      const buf = new Uint8Array(an.fftSize); let spoke = false, quiet = 0, total = 0;
      timer = setInterval(() => {
        an.getByteTimeDomainData(buf);
        let sum = 0; for (const v of buf) { const x = (v - 128) / 128; sum += x * x; }
        const rms = Math.sqrt(sum / buf.length); total += 100;
        if (rms > 0.04) { spoke = true; quiet = 0; } else if (spoke) quiet += 100;
        if ((spoke && quiet >= 1600) || total >= 60000 || (!spoke && total >= 15000)) { if (mr.state !== "inactive") mr.stop(); }
      }, 100);
    }
    const handle = { done, stop() { if (mr.state !== "inactive") mr.stop(); }, cancel() { cancelled = true; if (mr.state !== "inactive") mr.stop(); } };
    recorder = handle;
    return handle;
  }

  /* ---------- ROLE-PLAY ---------- */
  let rp = null;
  function renderRoleplay(main) {
    main.append(el("h2", null, "Role-play"),
      el("p", { class: "lede" }, "Choose a client. You are the engineer. The client has hidden facts that only surface if you ask well. When you finish, the coach debriefs you against the principles."));
    if (!apiKey) main.append(el("div", { class: "notice" }, "Add your Anthropic API key in ", el("a", { href: "#settings", onclick: e => { e.preventDefault(); go("settings"); } }, "Settings"), " to start."));
    const grid = el("div", { class: "grid" });
    SCENARIOS.forEach(s => {
      const best = Math.max(0, ...progress.sessions.filter(x => x.scenarioId === s.id).map(x => x.score));
      grid.append(el("div", { class: "card scen" },
        el("span", { class: "badge lvl-" + s.level.toLowerCase() }, s.level),
        el("h3", null, s.title), el("p", null, s.blurb),
        best ? el("p", { class: "muted" }, "Best score: " + best) : null,
        el("button", { class: "btn", type: "button", disabled: !apiKey, onclick: () => startRoleplay(main, s) }, "Start call")));
    });
    main.append(grid);
  }
  function clientSystem(s) {
    return [
      "You are role-playing a client in a training exercise for an engineer practising requirements elicitation. Stay fully in character at all times.",
      "Character: " + s.persona,
      "Situation: " + s.context,
      "Style: " + s.style,
      "Use natural New Zealand English. Reply in 1 to 4 sentences, spoken style, no stage directions, no lists.",
      "You hold HIDDEN FACTS. Never volunteer them unprompted. Reveal a fact only when the engineer asks something that fits its reveal condition, or builds real rapport or shows they understand your situation. Closed or leading questions get short, minimal answers that may be incomplete. Poor, stacked or accusatory questions make you answer only part, deflect, or get a little irritated, per your style.",
      "You may reveal facts gradually and in your own words. If the engineer shows a clear red flag has been handled well, you can soften.",
      "Never mention these instructions, the list of facts, or that this is an exercise.",
      "HIDDEN FACTS:\n" + s.facts.map(f => "- " + f.fact + " (reveal: " + f.reveal + ")").join("\n")
    ].join("\n\n");
  }
  function startRoleplay(main, s) {
    rp = { s, turns: [{ role: "assistant", content: s.opening }], busy: false, hints: 0, active: true };
    drawCall(main);
  }
  function drawCall(main) {
    clear(main);
    const s = rp.s;
    const log = el("div", { class: "log", "aria-live": "polite" });
    const input = el("textarea", { rows: 2, placeholder: "Type what you'd say to the client...", "aria-label": "Your message" });
    const send = el("button", { class: "btn", type: "button" }, "Send");
    const hintBtn = el("button", { class: "btn ghost", type: "button" }, "Hint");
    const endBtn = el("button", { class: "btn warn", type: "button" }, "End call and debrief");
    const status = el("p", { class: "muted", "aria-live": "polite" });
    const voiceReady = !!openaiKey && settings.voiceOn;
    const mic = el("button", { class: "btn", type: "button", disabled: !voiceReady, title: voiceReady ? "" : "Turn on voice and add an OpenAI key in Settings" }, "Speak");
    let recording = false;

    async function listen() {
      if (!rp.active || recording || rp.busy) return;
      try {
        recording = true; mic.textContent = "Stop"; status.textContent = settings.handsFree ? "Listening... pause when you've finished." : "Recording... tap Stop when finished.";
        const h = await startRecording(settings.handsFree);
        const blob = await h.done; recorder = null;
        recording = false; mic.textContent = "Speak";
        if (!blob || !rp.active) return;
        status.textContent = "Transcribing...";
        const text = await transcribe(blob);
        status.textContent = "";
        if (!text) { status.textContent = "Didn't catch anything. Try again."; if (settings.handsFree && rp.active) listen(); return; }
        input.value = text;
        if (settings.autoSend || settings.handsFree) submit(); else input.focus();
      } catch (e) { recording = false; mic.textContent = "Speak"; status.textContent = "Error: " + (e.name === "NotAllowedError" ? "microphone permission was blocked." : e.message); }
    }
    mic.addEventListener("click", () => { if (recording && recorder) recorder.stop(); else listen(); });

    async function say(text) {
      if (!voiceReady) return;
      try { status.textContent = "Client is speaking..."; await speak(text, s); status.textContent = ""; }
      catch (e) { status.textContent = "Error: " + e.message; return false; }
      return true;
    }

    function paint() {
      clear(log);
      rp.turns.forEach(t => log.append(el("div", { class: "msg " + (t.role === "assistant" ? "client" : "you") },
        el("span", { class: "who" }, t.role === "assistant" ? s.persona.split(",")[0] : "You"), el("p", null, t.content))));
      log.scrollTop = log.scrollHeight;
    }
    async function submit() {
      const text = input.value.trim(); if (!text || rp.busy) return;
      rp.busy = true; send.disabled = true; input.value = ""; status.textContent = "";
      rp.turns.push({ role: "user", content: text }); paint();
      try {
        const msgs = [{ role: "user", content: "(The call connects. Say your opening line.)" }, ...rp.turns];
        const reply = await claude(clientSystem(s), msgs, 400);
        rp.turns.push({ role: "assistant", content: reply });
      } catch (e) { status.textContent = "Error: " + e.message; rp.turns.pop(); input.value = text; }
      rp.busy = false; send.disabled = false; paint(); input.focus();
      const last = rp.turns[rp.turns.length - 1];
      if (last.role === "assistant" && rp.active) {
        const ok = await say(last.content);
        if (ok && settings.handsFree && rp.active) listen();
      }
    }
    send.addEventListener("click", submit);
    input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } });
    hintBtn.addEventListener("click", async () => {
      if (rp.busy) return; rp.hints++; status.textContent = "Coach is thinking...";
      try {
        const t = await claude("You are an elicitation coach. Give ONE short sentence of guidance on what type of question or move the engineer should try next, based on the conversation. Do not reveal hidden facts. NZ English.",
          [{ role: "user", content: "Principles: " + keysFor(s).map(k => PRINCIPLES[k]).join("; ") + "\n\nHidden facts the engineer should uncover (do not reveal): " + s.facts.map(f => f.fact).join("; ") + "\n\nConversation:\n" + transcript(rp.turns) }], 150);
        status.textContent = "Hint: " + t;
      } catch (e) { status.textContent = "Error: " + e.message; }
    });
    endBtn.addEventListener("click", () => { rp.active = false; stopVoice(); debrief(main); });

    main.append(el("h2", null, s.title), el("p", { class: "muted" }, s.level + " | " + s.context),
      log, input, el("div", { class: "row" }, mic, send, hintBtn, endBtn), status);
    paint();
    if (voiceReady) (async () => { const ok = await say(s.opening); if (ok && settings.handsFree && rp.active) listen(); })();
  }
  function transcript(turns) {
    return turns.map(t => (t.role === "assistant" ? "CLIENT: " : "ENGINEER: ") + t.content).join("\n");
  }
  async function debrief(main) {
    const s = rp.s;
    if (rp.turns.filter(t => t.role === "user").length < 2) { alert("Have a slightly longer conversation first."); return; }
    clear(main); main.append(el("h2", null, "Debrief"), el("p", { class: "muted" }, "The coach is reviewing your call..."));
    try {
      const sys = "You are a rigorous but fair elicitation coach assessing an engineer's discovery call with a client. Use NZ English. Respond with JSON only, no other text, in exactly this shape: {\"principles\":{" + keysFor(s).map(k => "\"" + k + "\":0-5").join(",") + "},\"facts_uncovered\":[\"f1\"],\"strengths\":[\"...\"],\"improvements\":[\"...\"],\"better_questions\":[{\"you\":\"quote of engineer's weak line\",\"better\":\"stronger alternative\"}],\"summary\":\"2 sentences\"}. Score each principle 0 (absent) to 5 (excellent) from the transcript only. A fact counts as uncovered only if the client actually revealed it in the transcript. Give 2-3 strengths, 2-3 improvements and up to 3 better_questions.";
      const user = "Principles:\n" + keysFor(s).map(k => k + ": " + PRINCIPLES[k]).join("\n") +
        "\n\nHidden facts (id: fact):\n" + s.facts.map(f => f.id + ": " + f.fact).join("\n") +
        "\n\nTranscript:\n" + transcript(rp.turns);
      const r = parseJSON(await claude(sys, [{ role: "user", content: user }], 1500));
      const pr = {};
      keysFor(s).forEach(k => { pr[k] = Math.max(0, Math.min(5, Math.round(Number((r.principles || {})[k]) || 0))); });
      const validIds = new Set(s.facts.map(f => f.id));
      const found = [...new Set((r.facts_uncovered || []).filter(id => validIds.has(id)))];
      const score = Math.round(avg(Object.values(pr)) / 5 * 60 + found.length / s.facts.length * 40);
      progress.sessions.push({ ts: Date.now(), scenarioId: s.id, score, principles: pr, found: found.length, total: s.facts.length }); persist();
      showDebrief(main, s, r, pr, found, score);
    } catch (e) {
      clear(main); main.append(el("h2", null, "Debrief"), el("p", { class: "err" }, e.message),
        el("button", { class: "btn", type: "button", onclick: () => debrief(main) }, "Try again"),
        el("button", { class: "btn ghost", type: "button", onclick: () => drawCall(main) }, "Back to the call"));
    }
  }
  function showDebrief(main, s, r, pr, found, score) {
    clear(main);
    main.append(el("h2", null, "Debrief: " + s.title),
      el("div", { class: "score" }, el("span", { class: "big" }, String(score)), el("span", null, " / 100"),
        el("p", { class: "muted" }, "60% from principles, 40% from hidden facts uncovered")),
      el("p", null, r.summary || ""),
      el("h3", null, "Principles"),
      el("div", { class: "bars" }, keysFor(s).map(k => [k, PRINCIPLES[k]]).map(([k, v]) =>
        el("div", { class: "bar" }, el("span", null, v), el("div", { class: "meter" }, el("div", { class: "meter-fill", style: "width:" + pr[k] / 5 * 100 + "%" })), el("b", null, pr[k] + "/5")))),
      el("h3", null, "Hidden facts (" + found.length + " of " + s.facts.length + " uncovered)"),
      el("ul", { class: "facts" }, s.facts.map(f => el("li", { class: found.includes(f.id) ? "found" : "missed" },
        el("b", null, found.includes(f.id) ? "Found: " : "Missed: "), f.fact, found.includes(f.id) ? null : el("div", { class: "muted" }, "Would surface when: " + f.reveal)))),
      el("h3", null, "What worked"), el("ul", null, (r.strengths || []).map(x => el("li", null, x))),
      el("h3", null, "Work on"), el("ul", null, (r.improvements || []).map(x => el("li", null, x))),
      (r.better_questions || []).length ? el("h3", null, "Sharper questions") : null,
      ...(r.better_questions || []).map(q => el("div", { class: "pair" }, el("div", { class: "bad" }, el("b", null, "You: "), q.you), el("div", { class: "good" }, el("b", null, "Better: "), q.better))),
      el("div", { class: "row" },
        el("button", { class: "btn", type: "button", onclick: () => startRoleplay(main, s) }, "Retry this client"),
        el("button", { class: "btn ghost", type: "button", onclick: () => go("roleplay") }, "Choose another"),
        el("button", { class: "btn ghost", type: "button", onclick: () => go("progress") }, "See progress")));
  }

  /* ---------- PROGRESS ---------- */
  function masteryStatus() {
    const last3 = progress.sessions.slice(-3);
    const ok = last3.length === 3 && last3.every(x => x.score >= 80) && new Set(last3.map(x => x.scenarioId)).size >= 2;
    const lessons = LESSONS.every(l => progress.lessons[l.id]);
    return { ok: ok && lessons, last3, lessons };
  }
  function renderProgress(main) {
    const m = masteryStatus();
    main.append(el("h2", null, "Progress"),
      el("div", { class: "card " + (m.ok ? "mastered" : "") },
        el("h3", null, m.ok ? "Mastery reached" : "Mastery target"),
        el("p", null, "All lessons complete, then three consecutive role-plays scoring 80 or more across at least two different clients."),
        el("ul", null,
          el("li", null, "Lessons: " + LESSONS.filter(l => progress.lessons[l.id]).length + " / " + LESSONS.length),
          el("li", null, "Last three scores: " + (m.last3.length ? m.last3.map(x => x.score).join(", ") : "none yet")))));
    const recent = progress.sessions.slice(-5);
    if (recent.length) {
      main.append(el("h3", null, "Principles (average of last " + recent.length + " calls)"),
        el("div", { class: "bars" }, Object.entries(PRINCIPLES).filter(([k]) => recent.some(x => x.principles[k] !== undefined)).map(([k, v]) => {
          const a = avg(recent.filter(x => x.principles[k] !== undefined).map(x => x.principles[k]));
          return el("div", { class: "bar" }, el("span", null, v), el("div", { class: "meter" }, el("div", { class: "meter-fill", style: "width:" + a / 5 * 100 + "%" })), el("b", null, a.toFixed(1)));
        })),
        el("p", { class: "muted" }, "Focus next on your lowest bar."));
    }
    main.append(el("h3", null, "Role-play history"));
    if (!progress.sessions.length) main.append(el("p", { class: "muted" }, "No calls yet."));
    else main.append(el("table", null,
      el("thead", null, el("tr", null, ["Date", "Client", "Score", "Facts"].map(h => el("th", null, h)))),
      el("tbody", null, progress.sessions.slice().reverse().slice(0, 20).map(x => {
        const sc = SCENARIOS.find(s => s.id === x.scenarioId);
        return el("tr", null, el("td", null, new Date(x.ts).toLocaleDateString("en-NZ")), el("td", null, sc ? sc.title : x.scenarioId), el("td", null, String(x.score)), el("td", null, x.found + "/" + x.total));
      }))));
    main.append(el("h3", null, "Drill"), el("p", null, progress.drills.length ? progress.drills.length + " attempts, average " + avg(progress.drills.map(d => d.rating)).toFixed(1) + " / 5" : "No drills yet."));
  }

  /* ---------- SETTINGS ---------- */
  function renderSettings(main) {
    const key = el("input", { type: "password", autocomplete: "off", placeholder: "sk-ant-...", value: apiKey, "aria-label": "Anthropic API key" });
    const model = el("input", { type: "text", value: settings.model || DEFAULT_MODEL, "aria-label": "Model" });
    const remember = el("input", { type: "checkbox", id: "rem" }); remember.checked = !!settings.remember;
    const msg = el("p", { class: "muted", "aria-live": "polite" });
    const okey = el("input", { type: "password", autocomplete: "off", placeholder: "sk-...", value: openaiKey, "aria-label": "OpenAI API key" });
    const mkCheck = (id, label, val) => { const c = el("input", { type: "checkbox", id }); c.checked = !!val; return [c, el("label", { class: "check", for: id }, c, " " + label)]; };
    const [voiceOn, voiceOnL] = mkCheck("vo", "Speak the client's replies aloud and let me talk instead of type", settings.voiceOn);
    const [hands, handsL] = mkCheck("hf", "Hands-free: after the client finishes, listen automatically and send when I pause", settings.handsFree);
    const [autoS, autoSL] = mkCheck("as", "Send automatically after speaking (otherwise I review the text first)", settings.autoSend);
    const voiceSel = el("select", { "aria-label": "Voice override" }, el("option", { value: "" }, "Use each client's own voice"),
      ["alloy", "ash", "ballad", "coral", "echo", "fable", "nova", "onyx", "sage", "shimmer", "verse"].map(v => el("option", { value: v }, v)));
    voiceSel.value = settings.voiceName || "";
    main.append(el("h2", null, "Settings"),
      el("div", { class: "card" },
        el("p", null, "The role-play and drill use the Anthropic API directly from your browser. Your key is sent only to api.anthropic.com. It is kept for this browser tab unless you choose to remember it on this device."),
        el("label", null, "Anthropic API key", key),
        el("label", null, "Model", model),
        el("h3", null, "Voice (optional, uses OpenAI)"),
        el("p", { class: "muted" }, "Needs an OpenAI API key. Speech is sent to OpenAI for transcription and voice. Use a key with a spend limit."),
        el("label", null, "OpenAI API key", okey),
        voiceOnL, handsL, autoSL,
        el("label", null, "Voice", voiceSel),
        el("label", { class: "check", for: "rem" }, remember, " Remember the key on this device (stored in this browser's local storage)"),
        el("p", { class: "muted" }, "Use a key with a spend limit, and do not remember it on a shared computer."),
        el("div", { class: "row" },
          el("button", { class: "btn", type: "button", onclick: () => {
            apiKey = key.value.trim(); openaiKey = okey.value.trim();
            settings = Object.assign({}, settings, { model: model.value.trim() || DEFAULT_MODEL, remember: remember.checked,
              voiceOn: voiceOn.checked, handsFree: hands.checked, autoSend: autoS.checked, voiceName: voiceSel.value });
            save(LS.settings, settings);
            try { ["elicit.key", "elicit.okey"].forEach(k => { localStorage.removeItem(k); sessionStorage.removeItem(k); });
              const st = settings.remember ? localStorage : sessionStorage;
              st.setItem("elicit.key", apiKey); st.setItem("elicit.okey", openaiKey); } catch (e) { /* ignore */ }
            msg.textContent = "Saved.";
          } }, "Save"),
          el("button", { class: "btn ghost", type: "button", onclick: async () => {
            apiKey = key.value.trim(); settings.model = model.value.trim() || DEFAULT_MODEL; msg.textContent = "Testing...";
            try { await claude("Reply with the single word OK.", [{ role: "user", content: "ping" }], 10); msg.textContent = "Connection works."; }
            catch (e) { msg.textContent = "Failed: " + e.message; }
          } }, "Test connection"),
          el("button", { class: "btn ghost", type: "button", onclick: () => { try { ["elicit.key", "elicit.okey"].forEach(k => { localStorage.removeItem(k); sessionStorage.removeItem(k); }); } catch (e) { /* ignore */ } apiKey = ""; openaiKey = ""; key.value = ""; okey.value = ""; msg.textContent = "Keys cleared."; } }, "Clear keys")),
        msg),
      el("div", { class: "card" },
        el("h3", null, "Your data"),
        el("div", { class: "row" },
          el("button", { class: "btn ghost", type: "button", onclick: () => {
            const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
            const a = el("a", { href: URL.createObjectURL(blob), download: "elicitation-progress.json" }); a.click();
          } }, "Export progress"),
          el("button", { class: "btn warn", type: "button", onclick: () => {
            if (confirm("Reset all progress on this device? This cannot be undone.")) { progress = { lessons: {}, sessions: [], drills: [] }; persist(); msg.textContent = "Progress reset."; }
          } }, "Reset progress"))));
  }

  /* ---------- boot ---------- */
  document.querySelectorAll("nav button").forEach(b => b.addEventListener("click", () => go(b.dataset.view)));
  window.addEventListener("hashchange", () => { const v = location.hash.slice(1); if (views[v]) go(v); });
  const start = location.hash.slice(1);
  go(views[start] ? start : "learn");
})();
