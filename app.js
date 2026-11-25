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
  const DEFAULT_ABOUT = "I'm a 50-year-old chartered engineer who also manages people and co-directs a small firm. I'm direct, analytical and solution-focused. I find small talk, staying calm in conflict, and understanding and voicing the other person's viewpoint harder than the technical work. I also want to handle difficult parents better, help my children without pushing advice onto them, and communicate well with a partner and friends. I'd like concrete example wording and one clear priority at a time, with plain, practical feedback rather than generic empathy language.";
  const SET_DEFAULTS = { aboutMe: DEFAULT_ABOUT, voiceOn: false, handsFree: false, autoSend: false, sttModel: "gpt-4o-mini-transcribe", ttsModel: "gpt-4o-mini-tts", clock: 8, showMeter: false, warmup: true, unlockAll: false };
  settings = Object.assign({}, SET_DEFAULTS, settings);

  function persist() { save(LS.progress, progress); }
  let track = (settings.track && TRACKS[settings.track]) ? settings.track : "perspective";
  const coachCtx = () => settings.aboutMe ? "\n\nAbout the learner (tailor your feedback to this; give concrete example wording; do not mention this profile explicitly): " + settings.aboutMe : "";
  const trackOf = s => (s && s.track) || "elicit";
  const keysFor = s => (s && s.principles) || TRACKS[trackOf(s)].core;
  function trackBar(main, rerender) {
    const bar = el("div", { class: "tracks", role: "tablist", "aria-label": "Skill track" });
    TRACK_ORDER.map(k => [k, TRACKS[k]]).forEach(([k, v]) => {
      bar.append(el("button", { type: "button", role: "tab", "aria-selected": String(k === track), class: "chip" + (k === track ? " on" : ""),
        onclick: () => { track = k; settings.track = k; save(LS.settings, settings); rerender(); } }, v.name));
    });
    main.append(bar, el("p", { class: "muted" }, TRACKS[track].desc));
    if (TRACKS[track].note) main.append(el("p", { class: "notice" }, TRACKS[track].note));
  }

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
      body: JSON.stringify({ model: settings.model || DEFAULT_MODEL, max_tokens: Math.max(maxTokens || 0, 2000), system, messages })
    });
    if (!res.ok) {
      let msg = res.status + " " + res.statusText;
      try { const j = await res.json(); if (j.error && j.error.message) msg = j.error.message; } catch (e) { /* ignore */ }
      throw new Error(msg);
    }
    const data = await res.json();
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
    if (!text) throw new Error("The model returned no text (stop reason: " + (data.stop_reason || "unknown") + "). Try again.");
    return text;
  }
  function parseJSON(text) {
    const s = text.indexOf("{"), e = text.lastIndexOf("}");
    if (s < 0 || e < 0) { const err = new Error("Coach did not return structured feedback. Try again."); err.raw = text; throw err; }
    return JSON.parse(text.slice(s, e + 1));
  }

  /* ---------- navigation ---------- */
  const views = { plan: renderPlan, learn: renderLearn, drill: renderDrill, roleplay: renderRoleplay, progress: renderProgress, settings: renderSettings };
  function go(name) {
    document.querySelectorAll("nav button").forEach(b => b.setAttribute("aria-current", b.dataset.view === name ? "page" : "false"));
    stopVoice(); if (rp) rp.active = false;
    const main = $("#view"); clear(main);
    views[name](main);
    window.scrollTo(0, 0);
    if (location.hash !== "#" + name) history.replaceState(null, "", "#" + name);
  }


  /* ---------- MY PLAN ---------- */
  const FOCUS = [
    { name: "Small talk", keys: ["T1", "T2", "T3", "T4", "T5"], track: "smalltalk" },
    { name: "Staying calm under pressure", keys: ["D1", "D2", "D3", "D5"], track: "defuse" },
    { name: "Understanding the other person's view", keys: ["V1", "V3", "D4", "C3", "P3"], track: "perspective" },
    { name: "Expressing that understanding", keys: ["V2", "V4", "V5", "P5"], track: "perspective" },
    { name: "Helping others without pushing advice", keys: ["F1", "F3", "F4", "M3"], track: "family" },
    { name: "Boundaries with difficult people", keys: ["F5", "D5", "C4"], track: "family" },
    { name: "Warmth in close relationships", keys: ["M1", "M2", "M6", "F6"], track: "close" },
    { name: "Staying safe in volatile situations", keys: ["S1", "S2", "S3", "S6"], track: "safety" }
  ];
  function focusScore(keys) {
    const vals = [];
    progress.sessions.slice(-12).forEach(x => keys.forEach(k => { if (x.principles && x.principles[k] !== undefined) vals.push(x.principles[k]); }));
    return vals.length ? avg(vals) : null;
  }
  function renderPlan(main) {
    const about = el("textarea", { rows: 5, "aria-label": "About me" }); about.value = settings.aboutMe || "";
    const saved = el("span", { class: "muted" });
    main.append(el("h2", null, "My plan"),
      el("p", { class: "lede" }, "A practice programme built around small talk, staying calm, understanding and voicing other people's views, and your closest relationships."),
      el("div", { class: "card" },
        el("h3", null, "My profile"),
        el("p", { class: "muted" }, "Used only to tailor the coach's feedback. Stored in this browser. Edit it freely."),
        about,
        el("div", { class: "row" }, el("button", { class: "btn", type: "button", onclick: () => { settings.aboutMe = about.value.trim(); save(LS.settings, settings); saved.textContent = " Saved."; } }, "Save profile"), saved)));
    main.append(el("h3", null, "Focus areas"));
    const bars = el("div", { class: "bars" });
    FOCUS.forEach(f => {
      const sc = focusScore(f.keys);
      bars.append(el("div", { class: "bar" }, el("span", null, f.name),
        el("div", { class: "meter" }, el("div", { class: "meter-fill", style: "width:" + ((sc || 0) / 5 * 100) + "%" })),
        el("b", null, sc === null ? "none yet" : sc.toFixed(1))));
    });
    main.append(bars, el("p", { class: "muted" }, "Averages from your last role-play sessions, out of 5."));
    const order = [
      ["perspective", "Start here. It underpins everything else: understand first, then express."],
      ["defuse", "Staying calm. Start with 'Steady yourself first' and 'Know your triggers and pre-write your lines'."],
      ["safety", "Potential violence. Pressure-mode scenarios that unlock in levels, including street situations. Do 'Read the risk' and 'When and how to walk away' first."],
      ["smalltalk", "Small talk. Short, low-stakes scenarios build confidence quickly."],
      ["family", "Parents and children: difficult parents, and helping your children without pushing advice."],
      ["close", "Partners and friends: connection, hard conversations and repair."],
      ["work", "Difficult conversations at work: feedback, saying no, disagreeing with a peer."],
      ["elicit", "Client conversations, once the basics feel natural."],
      ["personal", "Personal basics: a general grounding you can revisit at any point."]
    ];
    main.append(el("h3", null, "Suggested order"));
    const ol = el("ol", { class: "plan" });
    order.forEach(([k, why]) => {
      const m = masteryStatus(k);
      ol.append(el("li", null, el("b", null, TRACKS[k].name + ": "), why, " ",
        el("span", { class: "muted" }, "(" + m.done + "/" + m.total + " lessons" + (m.ok ? ", mastered" : "") + ") "),
        el("button", { class: "btn ghost small", type: "button", onclick: () => { track = k; settings.track = k; save(LS.settings, settings); go("learn"); } }, "Open")));
    });
    main.append(ol);
    main.append(el("h3", null, "A weekly rhythm (about 45 minutes)"),
      el("ul", null,
        el("li", null, "Two short sessions of about 10 minutes: one lesson plus three drill phrases."),
        el("li", null, "Two role-plays of about 10 minutes each. Retry the same scenario once to apply the debrief."),
        el("li", null, "Once a week, use one pre-written line in real life (a follow-up question, \"Help me understand...\", or a pause).")),
      el("p", { class: "muted" }, "Mastery per track: all lessons complete, then three role-plays in a row at 80 or above across two different scenarios."));
  }

  /* ---------- LEARN ---------- */
  function renderLearn(main) {
    const LS_ = LESSONS.filter(l => (l.track || "elicit") === track);
    const done = LS_.filter(l => progress.lessons[l.id]).length;
    main.append(el("h2", null, "Learn the principles"));
    trackBar(main, () => go("learn"));
    main.append(
      el("p", { class: "lede" }, LS_.length + " short lessons. Each ends with checks. Complete them all, then move on to the drill and the role-play."),
      el("div", { class: "meter", role: "progressbar", "aria-valuenow": done, "aria-valuemin": 0, "aria-valuemax": LS_.length },
        el("div", { class: "meter-fill", style: "width:" + (done / LS_.length * 100) + "%" })),
      el("p", { class: "muted" }, done + " of " + LS_.length + " lessons complete")
    );
    LS_.forEach((l, i) => {
      const card = el("details", { class: "card lesson" });
      if (!progress.lessons[l.id] && i === done) card.setAttribute("open", "");
      card.append(
        el("summary", null,
          el("span", { class: "num" }, String(i + 1)),
          el("span", { class: "ltitle" }, l.title),
          progress.lessons[l.id] ? el("span", { class: "badge ok" }, "Complete") : null),
        el("p", { class: "lede" }, l.summary),
        el("ul", null, l.points.map(p => el("li", null, rich(p)))),
        l.scene ? el("div", { class: "ctx" }, el("b", null, "Scene: "), l.scene) : null,
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
    main.append(el("h2", null, "Phrase drill"));
    trackBar(main, () => go("drill"));
    main.append(el("p", { class: "lede" }, "Each prompt shows a weak line or a missed opportunity. Rewrite it so it would work better in this kind of conversation. Feedback comes from the AI coach."));
    const area = el("div", { class: "card" });
    main.append(area);
    const recent = progress.drills.slice(-10);
    if (recent.length) main.append(el("p", { class: "muted" }, "Last " + recent.length + " drill average: " + avg(recent.map(d => d.rating)).toFixed(1) + " / 5"));
    nextDrill(area);
  }
  function nextDrill(area) {
    clear(area);
    const pool = DRILLS.filter(x => (x.track || "elicit") === track);
    let i; do { i = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && i === drillIdx);
    drillIdx = i;
    const d = pool[i];
    const ta = el("textarea", { rows: 3, placeholder: "Write your improved question or response...", "aria-label": "Your rewrite" });
    const out = el("div", { "aria-live": "polite" });
    const btn = el("button", { class: "btn", type: "button" }, "Get feedback");
    btn.addEventListener("click", async () => {
      const text = ta.value.trim(); if (!text) return;
      btn.disabled = true; clear(out); out.append(el("p", { class: "muted" }, "Coach is reviewing..."));
      try {
        const reply = await claude(
          "You are a coach teaching " + TRACKS[track].skill + ". Use NZ English and be concise. Respond with JSON only: {\"rating\": 0-5 integer, \"feedback\": \"2-3 sentences\", \"model\": \"one strong example line\"}. Judge the rewrite against these principles: " + TRACKS[track].core.map(k => PRINCIPLES[k]).join("; ") + "." + coachCtx(),
          [{ role: "user", content: (ctx ? "Situation: " + ctx + "\n" : "") + "Weak original: " + d.bad + "\nIssue: " + d.flaw + "\nLearner's rewrite: " + text }], 400);
        let r;
        try { r = parseJSON(reply); }
        catch (pe) {
          clear(out);
          out.append(el("p", null, reply), el("button", { class: "btn", type: "button", onclick: () => nextDrill(area) }, "Next prompt"));
          return;
        }
        const rating = Math.max(0, Math.min(5, Math.round(Number(r.rating) || 0)));
        progress.drills.push({ ts: Date.now(), rating }); persist();
        clear(out);
        out.append(el("p", null, el("b", null, "Rating: " + rating + " / 5")), el("p", null, r.feedback), el("p", { class: "good" }, el("b", null, "Example: "), r.model),
          el("button", { class: "btn", type: "button", onclick: () => nextDrill(area) }, "Next prompt"));
      } catch (e) { clear(out); out.append(el("p", { class: "err" }, e.message)); btn.disabled = false; }
    });
    const ctx = (window.DRILL_CONTEXT || {})[(d.track || "elicit") + "|" + d.bad];
    area.append(ctx ? el("p", { class: "ctx" }, el("b", null, "Situation: "), ctx) : null, el("p", { class: "prompt" }, d.bad), el("p", { class: "muted" }, "Hint: " + d.flaw), ta, el("div", { class: "row" }, btn), out);
  }



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
        if (onLevel) onLevel(rms, spoke);
        if ((spoke && quiet >= 1600) || total >= 60000 || (!spoke && total >= 15000)) { if (mr.state !== "inactive") mr.stop(); }
      }, 100);
    }
    const handle = { done, stop() { if (mr.state !== "inactive") mr.stop(); }, cancel() { cancelled = true; if (mr.state !== "inactive") mr.stop(); } };
    recorder = handle;
    return handle;
  }

  /* ---------- ROLE-PLAY ---------- */
  let rp = null;
  const isStress = s => !!(s && s.stress);
  function stageUnlocked(s) {
    if (!s.stage || s.stage <= 1 || settings.unlockAll) return true;
    const prev = new Set(SCENARIOS.filter(x => trackOf(x) === trackOf(s) && x.stage === s.stage - 1).map(x => x.id));
    return progress.sessions.filter(x => prev.has(x.scenarioId) && x.score >= 80).length >= 2;
  }
  function isDue(s) {
    const mine = progress.sessions.filter(x => x.scenarioId === s.id);
    if (!mine.length) return false;
    const last = mine[mine.length - 1];
    return last.score < 80 && Date.now() - last.ts >= 2 * 86400000;
  }
  function renderRoleplay(main) {
    main.append(el("h2", null, "Role-play"));
    trackBar(main, () => go("roleplay"));
    main.append(el("p", { class: "lede" }, "Choose a scenario. You are " + TRACKS[track].learner + ". The other person has things going on that only surface if you handle the conversation well. When you finish, the coach debriefs you against the principles."));
    const list = SCENARIOS.filter(s => trackOf(s) === track);
    if (list.some(isStress)) main.append(el("p", { class: "muted" }, "Pressure mode: the other person's agitation is tracked (hidden unless you turn it on in Settings)" + (settings.clock ? ", you have " + settings.clock + " seconds to start each answer" : "") + ", and levels unlock after two scores of 80 or more at the level below. Describe actions in brackets, for example (step back, hands open)."));
    if (!apiKey) main.append(el("div", { class: "notice" }, "Add your Anthropic API key in ", el("a", { href: "#settings", onclick: e => { e.preventDefault(); go("settings"); } }, "Settings"), " to start."));
    const grid = el("div", { class: "grid" });
    list.forEach(s => {
      const best = Math.max(0, ...progress.sessions.filter(x => x.scenarioId === s.id).map(x => x.score));
      const open = stageUnlocked(s);
      grid.append(el("div", { class: "card scen" + (open ? "" : " locked") },
        el("span", { class: "badge lvl-" + s.level.toLowerCase() }, s.level),
        open && isDue(s) ? el("span", { class: "badge due" }, "Due for a retry") : null,
        el("h3", null, s.title), el("p", null, s.blurb),
        s.brief ? el("div", { class: "ctx" }, el("b", null, "Your situation: "), s.brief) : null,
        s.goal ? el("p", { class: "muted" }, el("b", null, "Your goal: "), s.goal) : null,
        best ? el("p", { class: "muted" }, "Best score: " + best) : null,
        open ? null : el("p", { class: "muted" }, "Locked: score 80 or more twice at level " + (s.stage - 1) + ", or unlock all levels in Settings."),
        el("button", { class: "btn", type: "button", disabled: !apiKey || !open, onclick: () => startRoleplay(main, s) }, "Start call")));
    });
    main.append(grid);
  }
  function pressureRules(s) {
    return "PRESSURE MODE. Track your own agitation from 0 (calm) to 10 (about to attack), starting at " + (s.startAgitation != null ? s.startAgitation : 5) + ". End EVERY reply with a new line containing only [[A:n]] giving your current level." +
      " Raise it by 1 to 3 when the learner argues, defends themselves, lectures, gives orders, threatens police or security, uses sarcasm or says 'calm down', moves closer, blocks your way, touches you or your belongings, or hesitates." +
      " Lower it by 1 to 2 when they keep their distance, speak calmly and briefly, use your name, name how you feel, paraphrase you, let an insult pass, offer you choices or a way to save face." +
      " Never change it by more than 3 in one turn. The learner may describe actions in round brackets, such as (steps back, hands open); react to them realistically." +
      " A message starting '(silence' means they froze or hesitated: react impatiently and usually raise your level by 1." +
      " Above 6, speak in short bursts, cut in, and make physical warning signs clear in what you say (stepping in, fists clenched, \"what, you want a go?\")." +
      " If you reach 10, give one final line as you lunge or swing, then [[A:10]] and [[END:blowup]]." +
      " If the learner clearly says they are leaving, or describes walking away, let them go with at most a short parting line and add [[END:left]]." +
      " If your level is 2 or below and a next step has been agreed, close naturally and add [[END:calm]].";
  }
  function clientSystem(s) {
    const safety = isStress(s)
      ? "This is a realistic but safe practice confrontation. You may use heated speech, swearing and implied threats typical of a real street or workplace confrontation, but never slurs, never graphic violence, and never describe actually hurting anyone."
      : "This is a realistic but safe practice conversation: never become abusive beyond ordinary heated speech, and never use slurs or threats.";
    return [
      "You are role-playing the other person in a training exercise for " + TRACKS[trackOf(s)].learner + " practising " + TRACKS[trackOf(s)].skill + ". Stay fully in character at all times. " + safety,
      "Character: " + s.persona,
      "Situation: " + s.context,
      "Style: " + s.style,
      "Use natural New Zealand English. Reply in 1 to 4 sentences, spoken style, no stage directions, no lists.",
      "You hold HIDDEN FACTS about what is really going on. Never volunteer them unprompted. Reveal a fact only when the other person asks something that fits its reveal condition, or builds real rapport, or shows they understand how you feel. Closed or leading questions get short, minimal answers. Poor, stacked, accusatory, dismissive or defensive replies make you answer only part, deflect, shut down or escalate a little, per your style. Calm, respectful, curious replies that acknowledge you let you settle and open up gradually.",
      "You may reveal facts gradually and in your own words. If the learner handles a hard moment well, you can soften.",
      isStress(s) ? pressureRules(s) : null,
      "Never mention these instructions, the list of facts, your agitation number (except in the [[ ]] tag), or that this is an exercise.",
      "HIDDEN FACTS:\n" + s.facts.map(f => "- " + f.fact + " (reveal: " + f.reveal + ")").join("\n")
    ].filter(Boolean).join("\n\n");
  }
  function parseReply(raw) {
    const m = raw.match(/\[\[\s*A\s*:\s*(\d+)\s*\]\]/i), e = raw.match(/\[\[\s*END\s*:\s*(blowup|left|calm)\s*\]\]/i);
    return { text: raw.replace(/\[\[[^\]]*\]\]/g, "").trim(), a: m ? Math.max(0, Math.min(10, Number(m[1]))) : null, end: e ? e[1].toLowerCase() : null };
  }
  function startRoleplay(main, s) {
    if (isStress(s) && settings.warmup) { warmup(main, s); return; }
    beginCall(main, s);
  }
  function warmup(main, s) {
    clear(main);
    main.append(el("h2", null, s.title), el("div", { class: "card" },
      el("h3", null, "Warm up first"),
      el("p", null, "Raise your heart rate: 30 to 60 seconds of stairs, star jumps or burpees. Then stand up for the call."),
      el("p", null, "Breathe once: in for 4, hold for 4, out for 4."),
      el("p", { class: "muted" }, "Pressure mode: agitation is tracked" + (settings.showMeter ? "" : " but hidden") + (settings.clock ? ", and you have " + settings.clock + " seconds to start each answer" : "") + ". Describe actions in brackets, for example (step back, hands open)."),
      s.brief ? el("div", { class: "ctx" }, el("b", null, "Your situation: "), s.brief) : null,
      el("div", { class: "row" },
        el("button", { class: "btn", type: "button", onclick: () => beginCall(main, s) }, "I'm ready"),
        el("button", { class: "btn ghost", type: "button", onclick: () => go("roleplay") }, "Back"))));
  }
  function beginCall(main, s) {
    rp = { s, turns: [{ role: "assistant", content: s.opening }], busy: false, hints: 0, active: true,
      meter: isStress(s) ? [s.startAgitation != null ? s.startAgitation : 5] : null, end: null,
      silences: 0, latency: [], wpm: [], readyAt: null, startedAt: null };
    drawCall(main);
  }
  function drawCall(main) {
    clear(main);
    const s = rp.s, stress = isStress(s);
    const log = el("div", { class: "log", "aria-live": "polite" });
    const input = el("textarea", { rows: 2, placeholder: stress ? "What do you say or do? Actions in brackets, e.g. (step back, hands open)" : "Type what you'd say to the client...", "aria-label": "Your message" });
    const send = el("button", { class: "btn", type: "button" }, "Send");
    const hintBtn = el("button", { class: "btn ghost", type: "button" }, "Hint");
    const endBtn = el("button", { class: "btn warn", type: "button" }, "End call and debrief");
    const status = el("p", { class: "muted", "aria-live": "polite" });
    const clockEl = el("p", { class: "clock", "aria-live": "off" });
    const meterBox = el("div", { class: "agit" });
    const endNote = el("div", { hidden: true });
    const voiceReady = !!openaiKey && settings.voiceOn;
    const mic = el("button", { class: "btn", type: "button", disabled: !voiceReady, title: voiceReady ? "" : "Turn on voice and add an OpenAI key in Settings" }, "Speak");
    let recording = false, clockT = null, pendingWpm = null, speechT0 = null;
    const useClock = stress && Number(settings.clock) > 0;

    function stopClock() { if (clockT) { clearInterval(clockT); clockT = null; } clockEl.textContent = ""; clockEl.classList.remove("hot"); }
    function markStart() { if (rp.readyAt && !rp.startedAt) { rp.startedAt = Date.now(); stopClock(); } }
    function ready() {
      if (!rp.active || rp.end) return;
      rp.readyAt = Date.now(); rp.startedAt = null;
      if (!useClock) return;
      stopClock();
      const t0 = Date.now();
      clockT = setInterval(() => {
        const left = Number(settings.clock) - (Date.now() - t0) / 1000;
        if (!rp.active) { stopClock(); return; }
        if (left <= 0) { stopClock(); timeout(); return; }
        clockEl.textContent = "Answer in " + Math.ceil(left) + " s";
        clockEl.classList.toggle("hot", left <= 3);
      }, 200);
    }
    function timeout() {
      if (!rp.active || rp.busy || rp.end) return;
      if (rp.silences >= 2) { clockEl.textContent = "Clock paused. Answer when you're ready."; return; }
      rp.silences++;
      if (recording && recorder) recorder.cancel();
      submit("(silence: you hesitated and said nothing)");
    }

    async function listen() {
      if (!rp.active || recording || rp.busy || rp.end) return;
      try {
        recording = true; speechT0 = null; mic.textContent = "Stop"; status.textContent = settings.handsFree ? "Listening... pause when you've finished." : "Recording... tap Stop when finished.";
        const h = await startRecording(settings.handsFree, (rms, spoke) => { if (spoke) { if (!speechT0) speechT0 = Date.now(); markStart(); } });
        const blob = await h.done; recorder = null;
        recording = false; mic.textContent = "Speak";
        if (!blob || !rp.active) return;
        const durMs = speechT0 ? Date.now() - speechT0 - (settings.handsFree ? 1600 : 0) : 0;
        status.textContent = "Transcribing...";
        const text = await transcribe(blob);
        status.textContent = "";
        if (!text) { status.textContent = "Didn't catch anything. Try again."; if (settings.handsFree && rp.active) listen(); return; }
        const words = text.split(/\s+/).filter(Boolean).length;
        pendingWpm = durMs > 1500 && words >= 3 ? Math.round(words / (durMs / 60000)) : null;
        input.value = text;
        if (settings.autoSend || settings.handsFree) submit(); else input.focus();
      } catch (e) { recording = false; mic.textContent = "Speak"; status.textContent = "Error: " + (e.name === "NotAllowedError" ? "microphone permission was blocked." : e.message); }
    }
    mic.addEventListener("click", () => { if (recording && recorder) recorder.stop(); else listen(); });
    input.addEventListener("input", markStart);

    async function say(text) {
      if (!voiceReady) return false;
      try { status.textContent = "They're speaking..."; await speak(text, s); status.textContent = ""; }
      catch (e) { status.textContent = "Error: " + e.message; return false; }
      return true;
    }
    async function afterReply(text) {
      const ok = await say(text);
      if (!rp.active) return;
      if (rp.end) { finish(); return; }
      ready();
      if (ok && settings.handsFree) listen();
    }

    function paint() {
      clear(log);
      rp.turns.forEach(t => log.append(el("div", { class: "msg " + (t.role === "assistant" ? "client" : "you") },
        el("span", { class: "who" }, t.role === "assistant" ? s.persona.split(",")[0] : "You"), el("p", null, t.content))));
      log.scrollTop = log.scrollHeight;
      clear(meterBox);
      if (stress && settings.showMeter && rp.meter) {
        const a = rp.meter[rp.meter.length - 1];
        meterBox.append(el("span", null, "Agitation " + a + "/10"), el("div", { class: "meter" }, el("div", { class: "meter-fill" + (a >= 7 ? " hot" : ""), style: "width:" + a * 10 + "%" })));
      }
    }
    function finish() {
      stopClock();
      [input, send, mic, hintBtn].forEach(b => { b.disabled = true; });
      const msgs = {
        blowup: "They've lost control and lunged. In real life, the moment to leave was earlier. The debrief shows where it turned.",
        left: "You walked away. Leaving is a valid outcome; the debrief judges whether it was the right call and done safely.",
        calm: "Things have settled. Well held."
      };
      endNote.hidden = false; endNote.className = "notice end-" + rp.end; endNote.textContent = msgs[rp.end] || "";
      endBtn.textContent = "Debrief";
    }
    async function submit(override) {
      const auto = typeof override === "string";
      const text = (auto ? override : input.value).trim();
      if (!text || rp.busy || !rp.active || rp.end) return;
      stopClock();
      if (!auto) {
        rp.silences = 0;
        if (rp.readyAt) rp.latency.push(Math.round(((rp.startedAt || Date.now()) - rp.readyAt) / 100) / 10);
        if (pendingWpm) rp.wpm.push(pendingWpm);
        input.value = "";
      }
      pendingWpm = null; rp.readyAt = null; rp.startedAt = null;
      rp.busy = true; send.disabled = true; status.textContent = "";
      rp.turns.push({ role: "user", content: text }); paint();
      let replied = false;
      try {
        const msgs = [{ role: "user", content: "(The call connects. Say your opening line.)" }, ...rp.turns];
        const raw = await claude(clientSystem(s), msgs, 400);
        const r = stress ? parseReply(raw) : { text: raw, a: null, end: null };
        rp.turns.push({ role: "assistant", content: r.text || "..." }); replied = true;
        if (rp.meter) {
          const prev = rp.meter[rp.meter.length - 1];
          const a = r.a == null ? prev : r.a;
          rp.meter.push(a);
          if (r.end) rp.end = r.end; else if (a >= 10) rp.end = "blowup";
        }
      } catch (e) { status.textContent = "Error: " + e.message; rp.turns.pop(); if (!auto) input.value = text; }
      rp.busy = false; send.disabled = false; paint(); if (!auto) input.focus();
      const last = rp.turns[rp.turns.length - 1];
      if (replied && last.role === "assistant" && rp.active) afterReply(last.content);
      else if (!replied) ready();
    }
    send.addEventListener("click", () => submit());
    input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } });
    hintBtn.addEventListener("click", async () => {
      if (rp.busy) return; rp.hints++; status.textContent = "Coach is thinking...";
      try {
        const t = await claude("You are a coach for " + TRACKS[trackOf(s)].skill + ". Give ONE short sentence of guidance on what type of move the learner should try next, based on the conversation. Do not reveal hidden facts. NZ English." + coachCtx(),
          [{ role: "user", content: "Principles: " + keysFor(s).map(k => PRINCIPLES[k]).join("; ") + "\n\nHidden facts the learner should uncover (do not reveal): " + s.facts.map(f => f.fact).join("; ") + "\n\nConversation:\n" + transcript(rp.turns, rp.meter) }], 150);
        status.textContent = "Hint: " + t;
      } catch (e) { status.textContent = "Error: " + e.message; }
    });
    endBtn.addEventListener("click", () => { stopClock(); rp.active = false; stopVoice(); debrief(main); });

    main.append(el("h2", null, s.title), s.brief ? el("div", { class: "ctx" }, el("b", null, "Your situation: "), s.brief, s.goal ? el("br") : null, s.goal ? el("b", null, "Your goal: ") : null, s.goal || null) : el("p", { class: "muted" }, s.level + " | " + s.context),
      meterBox, log, endNote, clockEl, input, el("div", { class: "row" }, mic, send, hintBtn, endBtn), status);
    paint();
    afterReply(s.opening);
  }
  function transcript(turns, meter) {
    let k = 0;
    return turns.map(t => {
      if (t.role !== "assistant") return "LEARNER: " + t.content;
      const tag = meter && meter[k] != null ? " [agitation " + meter[k] + "/10]" : ""; k++;
      return "OTHER PERSON" + tag + ": " + t.content;
    }).join("\n");
  }
  async function debrief(main) {
    const s = rp.s, stress = isStress(s);
    if (rp.turns.filter(t => t.role === "user").length < (rp.end ? 1 : 2)) { alert("Have a slightly longer conversation first."); return; }
    clear(main); main.append(el("h2", null, "Debrief"), el("p", { class: "muted" }, "The coach is reviewing your call..."));
    try {
      const extraShape = stress ? ",\"turning_points\":[{\"you\":\"the learner's line\",\"change\":\"+2\",\"why\":\"...\",\"better\":\"...\"}],\"leave_judgement\":\"1 sentence\"" : "";
      const extraRules = stress ? " This was a potentially violent confrontation in pressure mode. The other person's hidden agitation (0-10) after each of their lines is shown. Lines in round brackets are the learner's actions; '(silence...' means they froze. Give up to 4 turning_points where agitation moved most (up or down), quoting the learner's line just before the change, with why it moved and a better line or action. In leave_judgement, say whether the learner should have left earlier, later, or judged it right, and why. Score S1 from distance, positioning and exits described in actions or words; if the learner never mentioned position or distance, score S1 no higher than 2." : "";
      const sys = "You are a rigorous but fair coach for " + TRACKS[trackOf(s)].skill + ", assessing a learner's conversation with another person. Use NZ English. Respond with JSON only, no other text, in exactly this shape: {\"principles\":{" + keysFor(s).map(k => "\"" + k + "\":0-5").join(",") + "},\"facts_uncovered\":[\"f1\"],\"strengths\":[\"...\"],\"improvements\":[\"...\"],\"better_questions\":[{\"you\":\"quote of the learner's weak line\",\"better\":\"stronger alternative\"}],\"summary\":\"2 sentences\"" + extraShape + "}. Score each principle 0 (absent) to 5 (excellent) from the transcript only. A fact counts as uncovered only if the other person actually revealed it in the transcript. Give 2-3 strengths, 2-3 improvements (most important first, each with example wording the learner could use) and up to 3 better_questions." + extraRules + coachCtx();
      const user = "Principles:\n" + keysFor(s).map(k => k + ": " + PRINCIPLES[k]).join("\n") +
        "\n\nHidden facts (id: fact):\n" + s.facts.map(f => f.id + ": " + f.fact).join("\n") +
        (stress ? "\n\nOutcome: " + (rp.end || "learner ended the call") : "") +
        "\n\nTranscript:\n" + transcript(rp.turns, rp.meter);
      const r = parseJSON(await claude(sys, [{ role: "user", content: user }], 4000));
      const pr = {};
      keysFor(s).forEach(k => { pr[k] = Math.max(0, Math.min(5, Math.round(Number((r.principles || {})[k]) || 0))); });
      const validIds = new Set(s.facts.map(f => f.id));
      const found = [...new Set((r.facts_uncovered || []).filter(id => validIds.has(id)))];
      let score = Math.round(avg(Object.values(pr)) / 5 * 60 + found.length / s.facts.length * 40);
      if (rp.end === "blowup") score = Math.min(score, 50);
      const rec = { ts: Date.now(), scenarioId: s.id, score, principles: pr, found: found.length, total: s.facts.length };
      if (stress) Object.assign(rec, { outcome: rp.end || "ended", peak: Math.max(...rp.meter), final: rp.meter[rp.meter.length - 1],
        latency: rp.latency.length ? Math.round(avg(rp.latency) * 10) / 10 : null, wpm: rp.wpm.length ? Math.round(avg(rp.wpm)) : null, silences: rp.turns.filter(t => t.role === "user" && /^\(silence/.test(t.content)).length });
      progress.sessions.push(rec); persist();
      showDebrief(main, s, r, pr, found, score, rec);
    } catch (e) {
      clear(main); main.append(el("h2", null, "Debrief"), el("p", { class: "err" }, e.message),
        el("button", { class: "btn", type: "button", onclick: () => debrief(main) }, "Try again"),
        rp.end ? null : el("button", { class: "btn ghost", type: "button", onclick: () => { rp.active = true; drawCall(main); } }, "Back to the call"));
    }
  }
  function pressurePanel(s, r, rec) {
    const outcomes = { blowup: "Blow-up: they attacked (score capped at 50)", left: "You walked away", calm: "Settled calmly", ended: "You ended the call" };
    const box = el("div", { class: "card" }, el("h3", null, "Under pressure"),
      el("p", null, el("b", null, "Outcome: "), outcomes[rec.outcome] || rec.outcome, ". Peak agitation " + rec.peak + "/10, finishing at " + rec.final + "/10."),
      el("div", { class: "trace", "aria-label": "Agitation after each of their lines" }, rp.meter.map(a => el("div", { class: a >= 7 ? "hot" : "", style: "height:" + Math.max(4, a * 10) + "%", title: String(a) }))),
      el("p", { class: "muted" }, "Agitation after each of their lines, from their opening onwards."),
      el("ul", null,
        rec.latency != null ? el("li", null, "Average time to start answering: " + rec.latency + " s") : null,
        rec.wpm != null ? el("li", null, "Speaking pace: about " + rec.wpm + " words a minute" + (rec.wpm > 160 ? " (fast; aim for 120 to 150 when it's heated)" : "")) : null,
        rec.silences ? el("li", null, "Froze or ran out of time: " + rec.silences + (rec.silences === 1 ? " time" : " times")) : null));
    if (r.leave_judgement) box.append(el("p", null, el("b", null, "Leave or stay: "), r.leave_judgement));
    if ((r.turning_points || []).length) {
      box.append(el("h4", null, "Turning points"));
      r.turning_points.forEach(t => box.append(el("div", { class: "pair" },
        el("div", { class: /^\s*[-\u2212]/.test(String(t.change)) ? "good" : "bad" }, el("b", null, "You (" + t.change + "): "), t.you, el("div", { class: "muted" }, t.why || "")),
        t.better ? el("div", { class: "good" }, el("b", null, "Try: "), t.better) : null)));
    }
    return box;
  }
  function showDebrief(main, s, r, pr, found, score, rec) {
    clear(main);
    main.append(el("h2", null, "Debrief: " + s.title),
      el("div", { class: "score" }, el("span", { class: "big" }, String(score)), el("span", null, " / 100"),
        el("p", { class: "muted" }, "60% from principles, 40% from what you uncovered")),
      el("p", null, r.summary || ""),
      rec && isStress(s) && rp && rp.meter ? pressurePanel(s, r, rec) : null,
      el("h3", null, "Principles"),
      el("div", { class: "bars" }, keysFor(s).map(k => [k, PRINCIPLES[k]]).map(([k, v]) =>
        el("div", { class: "bar" }, el("span", null, v), el("div", { class: "meter" }, el("div", { class: "meter-fill", style: "width:" + pr[k] / 5 * 100 + "%" })), el("b", null, pr[k] + "/5")))),
      el("h3", null, "What was really going on (" + found.length + " of " + s.facts.length + " uncovered)"),
      el("ul", { class: "facts" }, s.facts.map(f => el("li", { class: found.includes(f.id) ? "found" : "missed" },
        el("b", null, found.includes(f.id) ? "Found: " : "Missed: "), f.fact, found.includes(f.id) ? null : el("div", { class: "muted" }, "Would surface when: " + f.reveal)))),
      el("h3", null, "What worked"), el("ul", null, (r.strengths || []).map(x => el("li", null, x))),
      el("h3", null, "Work on"), el("ul", null, (r.improvements || []).map(x => el("li", null, x))),
      (r.better_questions || []).length ? el("h3", null, "Sharper lines") : null,
      ...(r.better_questions || []).map(q => el("div", { class: "pair" }, el("div", { class: "bad" }, el("b", null, "You: "), q.you), el("div", { class: "good" }, el("b", null, "Better: "), q.better))),
      el("div", { class: "row" },
        el("button", { class: "btn", type: "button", onclick: () => startRoleplay(main, s) }, "Retry this scenario"),
        el("button", { class: "btn ghost", type: "button", onclick: () => go("roleplay") }, "Choose another"),
        el("button", { class: "btn ghost", type: "button", onclick: () => go("progress") }, "See progress")));
  }

  /* ---------- PROGRESS ---------- */
  function masteryStatus(tk) {
    const ls = LESSONS.filter(l => (l.track || "elicit") === tk);
    const sess = progress.sessions.filter(x => { const sc = SCENARIOS.find(s => s.id === x.scenarioId); return sc && trackOf(sc) === tk; });
    const last3 = sess.slice(-3);
    const callsOk = last3.length === 3 && last3.every(x => x.score >= 80) && new Set(last3.map(x => x.scenarioId)).size >= 2;
    const done = ls.filter(l => progress.lessons[l.id]).length;
    return { ok: callsOk && done === ls.length, last3, done, total: ls.length, sess };
  }
  function renderProgress(main) {
    main.append(el("h2", null, "Progress"),
      el("p", { class: "lede" }, "Mastery in a track means all its lessons complete, then three consecutive role-plays scoring 80 or more across at least two different scenarios."));
    TRACK_ORDER.map(k => [k, TRACKS[k]]).forEach(([k, v]) => {
      const m = masteryStatus(k);
      const card = el("div", { class: "card " + (m.ok ? "mastered" : "") },
        el("h3", null, v.name + (m.ok ? ": mastery reached" : "")),
        el("ul", null,
          el("li", null, "Lessons: " + m.done + " / " + m.total),
          el("li", null, "Last three scores: " + (m.last3.length ? m.last3.map(x => x.score).join(", ") : "none yet"))));
      const recent = m.sess.slice(-5);
      if (recent.length) {
        card.append(el("p", { class: "muted" }, "Principles (average of last " + recent.length + " calls)"),
          el("div", { class: "bars" }, v.core.concat(k === "elicit" ? ["P8"] : []).filter(p => recent.some(x => x.principles[p] !== undefined)).map(p => {
            const a2 = avg(recent.filter(x => x.principles[p] !== undefined).map(x => x.principles[p]));
            return el("div", { class: "bar" }, el("span", null, PRINCIPLES[p]), el("div", { class: "meter" }, el("div", { class: "meter-fill", style: "width:" + a2 / 5 * 100 + "%" })), el("b", null, a2.toFixed(1)));
          })));
      }
      main.append(card);
    });
    main.append(el("h3", null, "Role-play history"));
    if (!progress.sessions.length) main.append(el("p", { class: "muted" }, "No calls yet."));
    else main.append(el("table", null,
      el("thead", null, el("tr", null, ["Date", "Scenario", "Score", "Found"].map(h => el("th", null, h)))),
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
    const clockSel = el("select", { "aria-label": "Response clock" }, [["0", "Off"], ["5", "5 seconds"], ["8", "8 seconds"], ["12", "12 seconds"]].map(([v, t]) => el("option", { value: v }, t)));
    clockSel.value = String(settings.clock != null ? settings.clock : 8);
    const [showM, showML] = mkCheck("sm", "Show the agitation meter during the call (harder to read people without it)", settings.showMeter);
    const [warm, warmL] = mkCheck("wu", "Prompt me to raise my heart rate before each pressure scenario", settings.warmup);
    const [unl, unlL] = mkCheck("ul", "Unlock all levels (skip the 80-twice rule)", settings.unlockAll);
    const importInput = el("input", { type: "file", accept: "application/json,.json", hidden: true });
    importInput.addEventListener("change", async () => {
      const f = importInput.files[0]; if (!f) return;
      try {
        const d = JSON.parse(await f.text());
        const p = d.progress || d;
        if (!p || typeof p.lessons !== "object" || !Array.isArray(p.sessions) || !Array.isArray(p.drills)) throw new Error("This doesn't look like a progress file from this app.");
        if (!confirm("Replace the progress on this device with the imported file? Your current progress here will be overwritten.")) return;
        progress = { lessons: p.lessons, sessions: p.sessions, drills: p.drills }; persist();
        if (d.profile) {
          if (typeof d.profile.aboutMe === "string") settings.aboutMe = d.profile.aboutMe;
          if (d.profile.track && TRACKS[d.profile.track]) { settings.track = d.profile.track; track = d.profile.track; }
          save(LS.settings, settings);
        }
        msg.textContent = "Imported " + p.sessions.length + " role-plays and " + Object.keys(p.lessons).length + " lessons.";
      } catch (e) { msg.textContent = "Import failed: " + e.message; }
      importInput.value = "";
    });
    main.append(importInput);
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
        el("h3", null, "Pressure mode (Potential violence track)"),
        el("label", null, "Time to start each answer", clockSel),
        showML, warmL, unlL,
        el("label", { class: "check", for: "rem" }, remember, " Remember the key on this device (stored in this browser's local storage)"),
        el("p", { class: "muted" }, "Use a key with a spend limit, and do not remember it on a shared computer."),
        el("div", { class: "row" },
          el("button", { class: "btn", type: "button", onclick: () => {
            apiKey = key.value.trim(); openaiKey = okey.value.trim();
            settings = Object.assign({}, settings, { model: model.value.trim() || DEFAULT_MODEL, remember: remember.checked,
              voiceOn: voiceOn.checked, handsFree: hands.checked, autoSend: autoS.checked, voiceName: voiceSel.value,
              clock: Number(clockSel.value), showMeter: showM.checked, warmup: warm.checked, unlockAll: unl.checked });
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
            const data = { app: "conversation-skills-trainer", version: 1, progress, profile: { aboutMe: settings.aboutMe, track: settings.track } };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const a = el("a", { href: URL.createObjectURL(blob), download: "conversation-trainer-progress.json" }); a.click();
            msg.textContent = "Exported. API keys are never included.";
          } }, "Export progress"),
          el("button", { class: "btn ghost", type: "button", onclick: () => importInput.click() }, "Import progress"),
          el("button", { class: "btn warn", type: "button", onclick: () => {
            if (confirm("Reset all progress on this device? This cannot be undone.")) { progress = { lessons: {}, sessions: [], drills: [] }; persist(); msg.textContent = "Progress reset."; }
          } }, "Reset progress"))));
  }

  /* ---------- boot ---------- */
  document.querySelectorAll("nav button").forEach(b => b.addEventListener("click", () => go(b.dataset.view)));
  window.addEventListener("hashchange", () => { const v = location.hash.slice(1); if (views[v]) go(v); });
  const start = location.hash.slice(1);
  go(views[start] ? start : "plan");
})();
