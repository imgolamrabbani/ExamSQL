/* ════════════════════════════════════════════════════════════
   GAME STATE & INITIALIZATION
   ExamSQL — CSE 3101 SQL Learning Game
════════════════════════════════════════════════════════════ */

const G = {
  db: null,
  editor: null,
  lvl: 0,
  q: 0,
  score: 0,
  xp: 0,
  maxXP: LEVELS.reduce((s, l) => s + l.xp, 0),
  hintsLeft: 3,
  hintsUsed: 0,
  prog: LEVELS.map(() => ({ done: false, qDone: 0, answers: {} })),
  t0: null,
  sqlOK: false,
  monacoOK: false,
  bookmarks: JSON.parse(localStorage.getItem('examsql_bm') || '[]'),
  user: null
};

// Supabase Client Initialization
const supabaseUrl = 'https://wxxlzukqsalbvjwzwrti.supabase.co';
const supabaseKey = 'sb_publishable_6qkxpCkPeYNXjH8dT6JzAw_lunNozei';
let supabase = null;
if (window.supabase) {
  supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
}


const DB_MAP = {
  DB_ECOM: typeof DB_ECOM !== 'undefined' ? DB_ECOM : '',
  DB_UNI: typeof DB_UNI !== 'undefined' ? DB_UNI : '',
  DB_EMP: typeof DB_EMP !== 'undefined' ? DB_EMP : '',
  DB_INS: typeof DB_INS !== 'undefined' ? DB_INS : '',
  DB_STUDENT_COURSE: typeof DB_STUDENT_COURSE !== 'undefined' ? DB_STUDENT_COURSE : '',
  DB_HEALTHCARE: typeof DB_HEALTHCARE !== 'undefined' ? DB_HEALTHCARE : '',
  DB_SOCIAL: typeof DB_SOCIAL !== 'undefined' ? DB_SOCIAL : '',
  DB_BOOK_CHAR: typeof DB_BOOK_CHAR !== 'undefined' ? DB_BOOK_CHAR : '',
  DB_BOOK_PUB: typeof DB_BOOK_PUB !== 'undefined' ? DB_BOOK_PUB : '',
  DB_AUTHOR_BOOK: typeof DB_AUTHOR_BOOK !== 'undefined' ? DB_AUTHOR_BOOK : '',
  DB_HOTEL: typeof DB_HOTEL !== 'undefined' ? DB_HOTEL : ''
};

const SC_MAP = {
  SC_ECOM: typeof SC_ECOM !== 'undefined' ? SC_ECOM : null,
  SC_UNI: typeof SC_UNI !== 'undefined' ? SC_UNI : null,
  SC_EMP: typeof SC_EMP !== 'undefined' ? SC_EMP : null,
  SC_INS: typeof SC_INS !== 'undefined' ? SC_INS : null,
  SC_STUDENT_COURSE: typeof SC_STUDENT_COURSE !== 'undefined' ? SC_STUDENT_COURSE : null,
  SC_HEALTHCARE: typeof SC_HEALTHCARE !== 'undefined' ? SC_HEALTHCARE : null,
  SC_SOCIAL: typeof SC_SOCIAL !== 'undefined' ? SC_SOCIAL : null,
  SC_BOOK_CHAR: typeof SC_BOOK_CHAR !== 'undefined' ? SC_BOOK_CHAR : null,
  SC_BOOK_PUB: typeof SC_BOOK_PUB !== 'undefined' ? SC_BOOK_PUB : null,
  SC_AUTHOR_BOOK: typeof SC_AUTHOR_BOOK !== 'undefined' ? SC_AUTHOR_BOOK : null,
  SC_HOTEL: typeof SC_HOTEL !== 'undefined' ? SC_HOTEL : null
};

function getActiveSetup(q, lv) {
  let s = q.extra || q.setup || lv.setup;
  if (typeof s === 'string' && DB_MAP[s]) {
    return DB_MAP[s];
  }
  return s;
}

function getActiveSchema(q, lv) {
  let s = q.schema || lv.schema;
  if (typeof s === 'string' && SC_MAP[s]) {
    return SC_MAP[s];
  }
  return s;
}

/* ════════════════════════════════════════════════════════════
   DATABASE HELPERS
════════════════════════════════════════════════════════════ */
function newDB(setup) {
  if (G.db) {
    try {
      G.db.close();
    } catch (e) {}
  }
  G.db = new SQL.Database();
  if (setup) {
    try {
      G.db.run(setup);
    } catch (e) {
      console.error('DB setup error:', e);
    }
  }
}

function rebuildDB(lvl, qi) {
  const lv = LEVELS[lvl];
  const q = lv.qs[qi];
  const activeSetup = getActiveSetup(q, lv);
  newDB(activeSetup);
  for (let j = 0; j < qi; j++) {
    const pq = lv.qs[j];
    const pqSetup = getActiveSetup(pq, lv);
    if (pqSetup === activeSetup) {
      if (pq.type === 'view' && pq.exp) {
        try {
          G.db.run(pq.exp);
        } catch (e) {}
      } else if (pq.ans) {
        try {
          G.db.run(pq.ans);
        } catch (e) {}
      }
    }
  }
}

function sql(q) {
  try {
    return { ok: true, r: G.db.exec(q) };
  } catch (e) {
    return { ok: false, err: e.message };
  }
}

function normalize(r) {
  if (!r || !r.length) return [];
  return r[0].values
    .map(row => row.map(v => (v === null ? 'NULL' : String(v).toLowerCase().trim())))
    .sort((a, b) => (a.join('|') < b.join('|') ? -1 : 1));
}

function match(r1, r2) {
  const a = normalize(r1), b = normalize(r2);
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].join('|') !== b[i].join('|')) return false;
  }
  return true;
}

/* ════════════════════════════════════════════════════════════
   RENDER HELPERS
════════════════════════════════════════════════════════════ */
function renderTable(r) {
  if (!r || !r.length) return '<div class="msg ok">✅ Query ran successfully. No rows returned.</div>';
  const { columns: cols, values: vals } = r[0];
  let h = `<table class="rtable"><thead><tr>`;
  cols.forEach(c => (h += `<th>${c}</th>`));
  h += `</tr></thead><tbody>`;
  vals.forEach(row => {
    h += '<tr>';
    row.forEach(v => (v === null ? (h += `<td class="null-v">NULL</td>`) : (h += `<td>${String(v)}</td>`)));
    h += '</tr>';
  });
  h += `</tbody></table><div class="rcount">${vals.length} row${vals.length !== 1 ? 's' : ''} returned</div>`;
  return h;
}

function renderSchema(sc) {
  const el = document.getElementById('schemaStrip');
  if (!sc || !sc.length) {
    el.innerHTML = '<div class="sc-empty">No tables yet — you\'ll CREATE them in this level!</div>';
    return;
  }
  el.innerHTML = sc
    .map(
      t => `
    <div class="sc-card">
      <div class="sc-name">${t.n}</div>
      <div class="sc-cols">${t.c
        .map(([col, type]) => {
          const cl = type === 'PK' ? 'pk' : type === 'FK' ? 'fk' : '';
          const tag = type ? ` <span style="opacity:.55;font-size:9px">[${type}]</span>` : '';
          return `<span class="${cl}">${col}</span>${tag}`;
        })
        .join('<br>')}</div>
    </div>`
    )
    .join('');
}

function renderLvlList() {
  document.getElementById('lvlList').innerHTML = LEVELS.map((lv, i) => {
    const p = G.prog[i];
    const isAct = i === G.lvl, isDone = p.done;
    const cls = isDone ? 'done' : isAct ? 'act' : '';
    return `<div class="lv-item ${cls}" onclick="goLvl(${i})" id="lvi${i}">
      <div class="lv-icon" style="font-family:'Geist Mono', monospace; font-size:10px; font-weight:600; color:var(--t2)">${String(
        i + 1
      ).padStart(2, '0')}</div>
      <div class="lv-meta">
        <div class="lv-name">L${i + 1}: ${lv.title}</div>
        <div class="lv-prog">${isDone ? 'Complete' : `${p.qDone}/${lv.qs.length} done`}</div>
      </div>
      ${isDone ? '<span class="lv-ck">✓</span>' : ''}
    </div>`;
  }).join('');
}

function renderDots() {
  const lv = LEVELS[G.lvl];
  document.getElementById('qdots').innerHTML = lv.qs
    .map((_, i) => {
      const cls = i < G.prog[G.lvl].qDone ? 'done' : i === G.q ? 'act' : '';
      return `<div class="qdot ${cls}" onclick="loadQ(${i})" style="cursor:pointer" title="Go to Question ${i + 1}"></div>`;
    })
    .join('');
}

function updateHdr() {
  const lv = LEVELS[G.lvl];
  document.getElementById('lvlBadge').textContent = `Level ${G.lvl + 1}: ${lv.title}`;
  document.getElementById('scoreNum').textContent = G.score.toLocaleString();
  document.getElementById('xpNum').textContent = `${G.xp} XP`;
  document.getElementById('xpFill').style.width = Math.min(100, (G.xp / G.maxXP) * 100) + '%';
}

/* ════════════════════════════════════════════════════════════
   LOAD LEVEL & QUESTION
════════════════════════════════════════════════════════════ */
function loadLvl(i, qi = 0) {
  G.lvl = i;
  G.q = qi;
  const lv = LEVELS[i];
  renderSchema(lv.schema);
  renderLvlList();
  updateHdr();
  loadQ(qi);
}

function loadQ(qi) {
  G.q = qi;
  G.hintsLeft = 3;
  G.hintsUsed = 0;
  G.t0 = Date.now();
  rebuildDB(G.lvl, qi);
  const lv = LEVELS[G.lvl];
  const q = lv.qs[qi];

  const currentSchema = getActiveSchema(q, lv);
  renderSchema(currentSchema);

  document.getElementById('qNum').textContent = qi + 1;
  document.getElementById('qTitle').textContent = q.title;
  document.getElementById('qCtx').textContent = q.ctx || '';
  document.getElementById('qText').innerHTML = q.q;
  document.getElementById('hintCtr').textContent = `💡 ${G.hintsLeft} hints remaining`;
  document.getElementById('qProg').textContent = `Question ${qi + 1} of ${lv.qs.length}`;
  document.getElementById('resBody').innerHTML =
    '<div class="msg info">Write your SQL and click <b>▶ Run</b> to see results.<br>Click <b>✅ Submit</b> when you\'re confident!</div>';
  document.getElementById('resStat').innerHTML = '';

  const savedAns = G.prog[G.lvl].answers ? G.prog[G.lvl].answers[qi] : null;
  setVal(savedAns || q.start || '-- Write your SQL here\n');
  renderDots();
  updateHdr();
  updateBmBtn();
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = qi === 0;
  if (nextBtn) nextBtn.disabled = qi === lv.qs.length - 1;
  if (typeof saveProgress === 'function') saveProgress();
}

/* ════════════════════════════════════════════════════════════
   EDITOR HELPERS
════════════════════════════════════════════════════════════ */
function setVal(v) {
  if (G.editor) {
    G.editor.setValue(v);
  } else {
    const fb = document.getElementById('fallback-editor');
    if (fb) fb.value = v;
  }
}

function getVal() {
  if (G.editor) return G.editor.getValue();
  const fb = document.getElementById('fallback-editor');
  return fb ? fb.value : '';
}

/* ════════════════════════════════════════════════════════════
   RUN QUERY
════════════════════════════════════════════════════════════ */
function runQuery() {
  const s = getVal().trim();
  if (!s) return;
  const btn = document.getElementById('deckBtnA');
  if (btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 120);
  }
  playSound('laser');
  triggerScanAnimation();
  rebuildDB(G.lvl, G.q);
  const res = sql(s);
  const rb = document.getElementById('resBody');
  const rs = document.getElementById('resStat');
  if (!res.ok) {
    rb.innerHTML = `<div class="msg err">❌ Error:<br>${res.err}</div>`;
    rs.innerHTML = '<span class="badge-v err">⚠ Error</span>';
    triggerScreenShake();
    return;
  }
  playSound('select');
  if (!res.r || !res.r.length) {
    rb.innerHTML = '<div class="msg ok">✅ Statement executed successfully!</div>';
    rs.innerHTML = '<span class="badge-v ok">✅ OK</span>';
  } else {
    rb.innerHTML = renderTable(res.r);
    rs.innerHTML = `<span style="font-size:11px;color:var(--t2)">${res.r[0].values.length} rows</span>`;
  }
}

/* ════════════════════════════════════════════════════════════
   VERIFY ANSWER
════════════════════════════════════════════════════════════ */
function verify(q, userSQL) {
  const t = q.type;
  rebuildDB(G.lvl, G.q);

  if (t === 'ddl_create') {
    try {
      G.db.run(`DROP TABLE IF EXISTS "${q.tbl}"`);
    } catch (e) {}
    const run = sql(userSQL);
    if (!run.ok) return { ok: false, msg: `❌ SQL Error: ${run.err}` };
    const chk = sql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${q.tbl}'`);
    if (!chk.ok || !chk.r.length || !chk.r[0].values.length)
      return { ok: false, msg: `❌ Table <b>${q.tbl}</b> was not created. Check the table name!` };
    const info = sql(`PRAGMA table_info("${q.tbl}")`);
    if (!info.ok || !info.r.length) return { ok: false, msg: '❌ Could not read table structure.' };
    const cols = info.r[0].values.map(r => r[1].toLowerCase());
    const miss = q.cols.filter(c => !cols.includes(c.toLowerCase()));
    if (miss.length) return { ok: false, msg: `❌ Missing column(s): <b>${miss.join(', ')}</b>` };
    return { ok: true, msg: `✅ Table <b>${q.tbl}</b> created with all required columns!` };
  }

  if (t === 'ddl_alter') {
    const run = sql(userSQL);
    if (!run.ok) return { ok: false, msg: `❌ SQL Error: ${run.err}` };
    const info = sql(`PRAGMA table_info("${q.tbl}")`);
    if (!info.ok || !info.r.length) return { ok: false, msg: '❌ Could not read table structure.' };
    const cols = info.r[0].values.map(r => r[1].toLowerCase());
    if (!cols.includes(q.col.toLowerCase()))
      return { ok: false, msg: `❌ Column <b>${q.col}</b> was not added. Check your ALTER TABLE syntax!` };
    return { ok: true, msg: `✅ Column <b>${q.col}</b> added successfully!` };
  }

  if (t === 'ddl_drop_recreate') {
    const run = sql(userSQL);
    if (!run.ok) return { ok: false, msg: `❌ SQL Error: ${run.err}` };
    const chk = sql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${q.tbl}'`);
    if (!chk.ok || !chk.r.length || !chk.r[0].values.length)
      return { ok: false, msg: `❌ Table <b>${q.tbl}</b> doesn't exist after your SQL. Remember to CREATE it after DROP!` };
    const info = sql(`PRAGMA table_info("${q.tbl}")`);
    if (!info.ok || !info.r.length) return { ok: false, msg: '❌ Could not read table structure.' };
    const cols = info.r[0].values.map(r => r[1].toLowerCase());
    const miss = q.cols.filter(c => !cols.includes(c.toLowerCase()));
    if (miss.length) return { ok: false, msg: `❌ Missing column(s): <b>${miss.join(', ')}</b>` };
    return { ok: true, msg: `✅ Table dropped and recreated correctly!` };
  }

  if (t === 'select') {
    const user = sql(userSQL);
    if (!user.ok) return { ok: false, msg: `❌ SQL Error: ${user.err}` };
    if (!user.r || !user.r.length)
      return { ok: false, msg: '❌ Your query returned no results. Check your table and column names!' };

    rebuildDB(G.lvl, G.q);
    const exp = sql(q.exp);
    if (!exp.ok) return { ok: false, msg: `❌ Internal error: ${exp.err}` };
    const expRows = exp.r.length ? exp.r[0].values.length : 0;
    const userRows = user.r[0].values.length;
    if (match(user.r, exp.r))
      return { ok: true, msg: `✅ Correct! Your result matches! (${userRows} row${userRows !== 1 ? 's' : ''})` };
    return {
      ok: false,
      msg: `❌ Not quite. Expected ${expRows} row(s), you got ${userRows}. Check your WHERE / JOIN / GROUP BY conditions.`
    };
  }

  if (t === 'view') {
    const run = sql(userSQL);
    if (!run.ok) return { ok: false, msg: `❌ SQL Error: ${run.err}` };
    const chk = sql(`SELECT name FROM sqlite_master WHERE type='view' AND name='${q.vname}'`);
    if (!chk.ok || !chk.r.length || !chk.r[0].values.length)
      return { ok: false, msg: `❌ View <b>${q.vname}</b> was not created. Check the view name!` };
    const vd = sql(`SELECT * FROM "${q.vname}"`);
    if (!vd.ok) return { ok: false, msg: `❌ View created but error querying it: ${vd.err}` };

    rebuildDB(G.lvl, G.q);
    const innerSQL = q.exp.replace(/CREATE VIEW\s+\w+\s+AS\s*/i, '');
    const ed = sql(innerSQL);
    if (ed.ok && match(vd.r, ed.r)) return { ok: true, msg: `✅ View <b>${q.vname}</b> created with correct data!` };
    if (vd.r && vd.r.length) return { ok: true, msg: `✅ View <b>${q.vname}</b> created successfully!` };
    return { ok: false, msg: `❌ View was created but returns unexpected data.` };
  }

  if (t === 'dml') {
    const run = sql(userSQL);
    if (!run.ok) return { ok: false, msg: `❌ SQL Error: ${run.err}` };
    const vr = sql(q.vSQL);
    if (!vr.ok) return { ok: false, msg: `❌ Verification error: ${vr.err}` };
    if (!vr.r.length || !vr.r[0].values.length) return { ok: false, msg: '❌ Could not verify: no rows returned.' };
    const val = Number(vr.r[0].values[0][0]);
    if (Math.abs(val - q.expVal) < 0.01) return { ok: true, msg: `✅ Data modified correctly! Verified value: ${val}` };
    return { ok: false, msg: `❌ Verification failed. Got ${val}, expected ${q.expVal}. Check your SQL!` };
  }

  if (t === 'dml_case') {
    const run = sql(userSQL);
    if (!run.ok) return { ok: false, msg: `❌ SQL Error: ${run.err}` };
    const vr = sql(q.vSQL);
    if (!vr.ok) return { ok: false, msg: `❌ Verification error: ${vr.err}` };
    const total = Number(vr.r[0].values[0][0]);
    if (total > 169000) return { ok: true, msg: `✅ CASE update applied! New total salary pool: ${total.toFixed(0)}` };
    return { ok: false, msg: "❌ Salaries don't seem to have changed. Check your CASE expression!" };
  }

  return { ok: false, msg: '❌ Unknown question type.' };
}

/* ════════════════════════════════════════════════════════════
   SUBMIT
════════════════════════════════════════════════════════════ */
function submitAnswer() {
  const userSQL = getVal().trim();
  if (!userSQL) {
    document.getElementById('resBody').innerHTML = '<div class="msg err">❌ Please write a SQL query first!</div>';
    return;
  }
  const btn = document.getElementById('deckBtnB');
  if (btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 120);
  }
  playSound('laser');
  triggerScanAnimation();
  const lv = LEVELS[G.lvl];
  const q = lv.qs[G.q];
  const { ok, msg } = verify(q, userSQL);

  const rb = document.getElementById('resBody');
  const rs = document.getElementById('resStat');

  if (ok) {
    const alreadySolved = !!(G.prog[G.lvl].answers && G.prog[G.lvl].answers[G.q]);
    const timeSec = Math.floor((Date.now() - G.t0) / 1000);
    const bonus = Math.max(0, 80 - timeSec);
    const pen = G.hintsUsed * 15;
    const pts = alreadySolved ? 0 : Math.max(20, 50 + bonus - pen);

    if (!alreadySolved) {
      G.score += pts;
      popXP(pts);
    }

    rb.innerHTML = alreadySolved
      ? `<div class="msg ok">${msg}<br><br><b>Correct!</b> (Already solved, 0 points awarded)</div>`
      : `<div class="msg ok">${msg}<br><br><b>+${pts} points</b> earned!</div>`;
    rs.innerHTML = '<span class="badge-v ok">Correct!</span>';

    G.prog[G.lvl].qDone = Math.max(G.prog[G.lvl].qDone, G.q + 1);
    if (!G.prog[G.lvl].answers) G.prog[G.lvl].answers = {};
    G.prog[G.lvl].answers[G.q] = userSQL;
    renderLvlList();
    renderDots();
    updateHdr();

    if (G.q >= lv.qs.length - 1) {
      setTimeout(() => {
        showLvlDone();
      }, 400);
    } else {
      playSound('success');
      setTimeout(() => {
        document.getElementById('okTitle').textContent = 'STAGE CLEAR';
        document.getElementById('okDesc').textContent = alreadySolved
          ? `Already solved! Keep practicing.`
          : `+${pts} points! Keep going!`;
        showM('okModal');
        confetti(20);
      }, 400);
    }
  } else {
    rb.innerHTML = `<div class="msg err">${msg}</div>`;
    rs.innerHTML = '<span class="badge-v err">Try again</span>';
    triggerScreenShake();
  }
}

function nextQ() {
  closeM('okModal');
  playSound('select');
  loadQ(G.q + 1);
}
function prevQ() {
  if (G.q > 0) {
    playSound('select');
    loadQ(G.q - 1);
  }
}
function skipQ() {
  const lv = LEVELS[G.lvl];
  if (G.q < lv.qs.length - 1) {
    playSound('select');
    loadQ(G.q + 1);
  }
}

function showLvlDone() {
  const alreadyDone = !!G.prog[G.lvl].done;
  if (!alreadyDone) {
    G.xp += LEVELS[G.lvl].xp;
    G.prog[G.lvl].done = true;
  }
  renderLvlList();
  updateHdr();
  confetti(50);
  playSound('stageclear');
  document.getElementById('lvlMTitle').textContent = `STAGE ${G.lvl + 1} COMPLETE`;
  document.getElementById('lvlMDesc').textContent = `You've mastered "${LEVELS[G.lvl].title}"!`;
  document.getElementById('lvlXP').textContent = alreadyDone
    ? `Already completed level!`
    : `+${LEVELS[G.lvl].xp} XP Earned!`;
  showM('lvlModal');
}

function nextLevel() {
  closeM('lvlModal');
  if (G.lvl >= LEVELS.length - 1) {
    document.getElementById('finalScore').textContent = G.score.toLocaleString();
    playSound('success');
    showM('winModal');
  } else {
    playSound('coin');
    loadLvl(G.lvl + 1);
  }
}

function goLvl(i) {
  playSound('coin');
  loadLvl(i);
}

/* ════════════════════════════════════════════════════════════
   PROGRESS PERSISTENCE
════════════════════════════════════════════════════════════ */
function saveLocalState() {
  const data = {
    lvl: G.lvl,
    q: G.q,
    score: G.score,
    xp: G.xp,
    prog: G.prog
  };
  localStorage.setItem('examsql_progress', JSON.stringify(data));
  localStorage.setItem('examsql_bm', JSON.stringify(G.bookmarks));
}

async function saveCloudProgress() {
  if (!supabase || !G.user) return;
  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: G.user.id,
        score: G.score,
        xp: G.xp,
        lvl: G.lvl,
        q: G.q,
        prog: G.prog,
        bookmarks: G.bookmarks,
        updated_at: new Date().toISOString()
      });
    if (error) {
      console.error('Error saving cloud progress:', error.message);
    }
  } catch (e) {
    console.error('Cloud save error:', e);
  }
}

function saveProgress() {
  saveLocalState();
  if (supabase && G.user) {
    saveCloudProgress();
  }
}

async function loadCloudProgress() {
  if (!supabase || !G.user) return;
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', G.user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching cloud progress:', error.message);
      return;
    }

    const localRaw = localStorage.getItem('examsql_progress');
    const localBM = localStorage.getItem('examsql_bm');
    let localData = null;
    let localBookmarks = [];
    if (localRaw) {
      try { localData = JSON.parse(localRaw); } catch (e) {}
    }
    if (localBM) {
      try { localBookmarks = JSON.parse(localBM); } catch (e) {}
    }

    const wasSigningIn = sessionStorage.getItem('examsql_signing_in') === 'true';
    sessionStorage.removeItem('examsql_signing_in'); // Consume redirect flag

    if (data) {
      // Merge logic: use local state if explicitly signing in now and local progress is further ahead
      let useLocal = false;
      if (wasSigningIn && localData && (localData.xp > (data.xp || 0))) {
        useLocal = true;
      }

      if (useLocal) {
        G.score = localData.score || 0;
        G.xp = localData.xp || 0;
        G.lvl = localData.lvl || 0;
        G.q = localData.q || 0;
        if (localData.prog) G.prog = localData.prog;
        G.bookmarks = localBookmarks || [];
        // Save local progress to the cloud
        await saveCloudProgress();
      } else {
        // Load cloud state
        G.score = data.score || 0;
        G.xp = data.xp || 0;
        G.lvl = data.lvl || 0;
        G.q = data.q || 0;
        if (data.prog && Array.isArray(data.prog)) {
          data.prog.forEach((p, idx) => {
            if (G.prog[idx]) {
              G.prog[idx].done = !!p.done;
              G.prog[idx].qDone = typeof p.qDone === 'number' ? p.qDone : 0;
              G.prog[idx].answers = p.answers || {};
            }
          });
        }
        if (data.bookmarks && Array.isArray(data.bookmarks)) {
          G.bookmarks = data.bookmarks;
        }
      }
    } else {
      // Create new progress row in cloud
      if (localData) {
        G.score = localData.score || 0;
        G.xp = localData.xp || 0;
        G.lvl = localData.lvl || 0;
        G.q = localData.q || 0;
        if (localData.prog) G.prog = localData.prog;
        G.bookmarks = localBookmarks || [];
      }
      
      const { error: insertErr } = await supabase
        .from('user_progress')
        .insert([{
          user_id: G.user.id,
          score: G.score,
          xp: G.xp,
          lvl: G.lvl,
          q: G.q,
          prog: G.prog,
          bookmarks: G.bookmarks
        }]);

      if (insertErr) {
        console.error('Error creating cloud progress:', insertErr.message);
      }
    }

    saveLocalState();
  } catch (e) {
    console.error('Cloud load crashed:', e);
  }
}

function loadProgress() {
  const raw = localStorage.getItem('examsql_progress');
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data) {
      if (typeof data.lvl === 'number') G.lvl = data.lvl;
      if (typeof data.q === 'number') G.q = data.q;
      if (typeof data.score === 'number') G.score = data.score;
      if (typeof data.xp === 'number') G.xp = data.xp;
      if (data.prog && Array.isArray(data.prog)) {
        data.prog.forEach((p, idx) => {
          if (G.prog[idx]) {
            if (typeof p.done === 'boolean') G.prog[idx].done = p.done;
            if (typeof p.qDone === 'number') G.prog[idx].qDone = p.qDone;
            G.prog[idx].answers = p.answers || {};
          }
        });
      }
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
}

/* ════════════════════════════════════════════════════════════
   SUPABASE AUTHENTICATION
════════════════════════════════════════════════════════════ */
let isEngineReady = false;

function showLoggedState(isLoggedIn) {
  const loggedOutDiv = document.getElementById('auth-logged-out');
  const loggedInDiv = document.getElementById('auth-logged-in');
  const userHud = document.getElementById('user-hud');

  if (isLoggedIn && G.user) {
    if (loggedOutDiv) loggedOutDiv.style.display = 'none';
    if (loggedInDiv) loggedInDiv.style.display = 'block';

    const nameEl = document.getElementById('user-name');
    const emailEl = document.getElementById('user-email');
    const avatarEl = document.getElementById('user-avatar');

    const profile = G.user.user_metadata || {};
    if (nameEl) nameEl.textContent = profile.full_name || G.user.email || 'Arcade Player';
    if (emailEl) emailEl.textContent = G.user.email || '';
    if (avatarEl) avatarEl.src = profile.avatar_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

    if (userHud) {
      userHud.style.display = 'flex';
      const hudAvatar = document.getElementById('user-hud-avatar');
      const hudName = document.getElementById('user-hud-name');
      if (hudAvatar) hudAvatar.src = profile.avatar_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
      if (hudName) hudName.textContent = profile.full_name || G.user.email.split('@')[0] || 'Player';
    }
  } else {
    if (loggedOutDiv) loggedOutDiv.style.display = 'block';
    if (loggedInDiv) loggedInDiv.style.display = 'none';
    if (userHud) userHud.style.display = 'none';
  }
}

function enableAuthControls() {
  const authLoading = document.getElementById('auth-loading');
  if (authLoading) authLoading.style.display = 'none';

  const gBtn = document.getElementById('googleLoginBtn');
  const guestBtn = document.getElementById('guestPlayBtn');
  const startBtn = document.getElementById('startBtn');
  const loadMsg = document.getElementById('loadMsg');

  if (isEngineReady) {
    if (gBtn) { gBtn.disabled = false; gBtn.style.display = 'flex'; }
    if (guestBtn) { guestBtn.disabled = false; guestBtn.style.display = 'inline-flex'; }
    if (startBtn) startBtn.disabled = false;

    if (G.user) {
      showLoggedState(true);
      if (loadMsg) loadMsg.textContent = '✅ Profile Loaded! Ready to start.';
    } else {
      showLoggedState(false);
      if (loadMsg) loadMsg.textContent = '✅ Ready! Sign in or play as guest.';
    }
  }
}

async function loginWithGoogle() {
  if (!supabase) {
    alert("Supabase client is offline or failed to load. Check your internet connection.");
    return;
  }
  playSound('confirm');
  sessionStorage.setItem('examsql_signing_in', 'true');
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });
  if (error) {
    console.error('Google login error:', error.message);
    alert('Google login failed: ' + error.message);
  }
}

function playAsGuest() {
  playSound('confirm');
  startGame();
}

async function logout() {
  if (supabase) {
    playSound('confirm');
    await supabase.auth.signOut();
  }
  G.user = null;
  localStorage.removeItem('examsql_progress');
  localStorage.removeItem('examsql_bm');
  location.reload();
}

/* ════════════════════════════════════════════════════════════
   BOOKMARKS FEATURE
════════════════════════════════════════════════════════════ */
function toggleBookmark() {
  const lvl = G.lvl, q = G.q;
  const idx = G.bookmarks.findIndex(b => b.lvl === lvl && b.q === q);
  if (idx === -1) {
    G.bookmarks.push({ lvl, q });
  } else {
    G.bookmarks.splice(idx, 1);
  }
  saveProgress();
  updateBmBtn();
  renderBookmarks();
}

function updateBmBtn() {
  const lvl = G.lvl, q = G.q;
  const btn = document.getElementById('bmBtn');
  if (!btn) return;
  const isBm = G.bookmarks.some(b => b.lvl === lvl && b.q === q);
  if (isBm) {
    btn.classList.add('on');
  } else {
    btn.classList.remove('on');
  }
}

function renderBookmarks() {
  const listEl = document.getElementById('bmList');
  const countEl = document.getElementById('bmCount');
  if (!listEl || !countEl) return;
  countEl.textContent = G.bookmarks.length;
  if (G.bookmarks.length === 0) {
    listEl.innerHTML = '<div class="bm-empty">Nothing bookmarked yet</div>';
    return;
  }
  listEl.innerHTML = G.bookmarks
    .map((bm, index) => {
      const lv = LEVELS[bm.lvl];
      if (!lv) return '';
      const qObj = lv.qs[bm.q];
      if (!qObj) return '';
      return `<div class="bm-item" onclick="goBm(${bm.lvl}, ${bm.q})">
      <span class="bm-icon" style="display:flex; align-items:center; justify-content:center;"><svg class="svg-icon" style="color:var(--yellow); width:12px; height:12px;" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></span>
      <div class="bm-meta">
        <div class="bm-name">${qObj.title}</div>
        <div class="bm-info">L${bm.lvl + 1}: ${lv.title} · Q${bm.q + 1}</div>
      </div>
      <button class="bm-del" onclick="event.stopPropagation(); removeBm(${index})" title="Delete bookmark">×</button>
    </div>`;
    })
    .join('');
}

function removeBm(index) {
  G.bookmarks.splice(index, 1);
  saveProgress();
  updateBmBtn();
  renderBookmarks();
}

function goBm(lvl, q) {
  G.lvl = lvl;
  const lv = LEVELS[lvl];
  renderSchema(lv.schema);
  renderLvlList();
  updateHdr();
  loadQ(q);
}

/* ════════════════════════════════════════════════════════════
   HINTS
════════════════════════════════════════════════════════════ */
function openHint() {
  if (G.hintsLeft <= 0) {
    document.getElementById('resBody').innerHTML = '<div class="msg err">❌ No more hints for this question!</div>';
    return;
  }
  const q = LEVELS[G.lvl].qs[G.q];
  const idx = 3 - G.hintsLeft;
  const hint = q.hints[idx] || 'No more hints.';
  const pen = [15, 25, 35][idx];
  document.getElementById('hintNum').textContent = idx + 1;
  document.getElementById('hintTxt').innerHTML = hint;
  document.getElementById('hintPen').textContent = `⚠️ Using hint ${idx + 1} costs ${pen} points from your submission score`;
  showM('hintModal');
}

function useHint() {
  G.hintsLeft--;
  G.hintsUsed++;
  document.getElementById('hintCtr').textContent = `💡 ${G.hintsLeft} hint${G.hintsLeft !== 1 ? 's' : ''} remaining`;
  closeM('hintModal');
}

/* ════════════════════════════════════════════════════════════
   CHEAT SHEET
════════════════════════════════════════════════════════════ */
const CHEAT = `
<div class="ch-sec"><h4>🏗️ DDL — Data Definition</h4>
<div class="ch-code">CREATE TABLE name (
  col1 TYPE constraint,
  col2 TYPE,
  PRIMARY KEY (col1),
  FOREIGN KEY (col) REFERENCES other(col)
);
ALTER TABLE name ADD col TYPE;
ALTER TABLE name DROP COLUMN col;
DROP TABLE name;</div></div>
<div class="ch-sec"><h4>🔍 Basic SELECT</h4>
<div class="ch-code">SELECT col1, col2, expr AS alias
FROM table
WHERE condition
ORDER BY col ASC|DESC;

DISTINCT -- removes duplicates: SELECT DISTINCT col
BETWEEN: WHERE col BETWEEN 10 AND 20
LIKE: WHERE name LIKE '%pattern%'  -- % = anything, _ = one char
IS NULL / IS NOT NULL</div></div>
<div class="ch-sec"><h4>🔗 JOINs</h4>
<div class="ch-code">INNER JOIN t2 ON t1.id = t2.id   -- matching rows only
LEFT  JOIN t2 ON t1.id = t2.id   -- all left + matched right
RIGHT JOIN t2 ON t1.id = t2.id   -- all right + matched left
FULL OUTER JOIN t2 ON ...        -- all rows from both
NATURAL JOIN t2                  -- auto-match same-named cols</div></div>
<div class="ch-sec"><h4>📊 Aggregates & Grouping</h4>
<div class="ch-code">COUNT(*),  COUNT(col),  COUNT(DISTINCT col)
SUM(col),  AVG(col),   MIN(col),  MAX(col)

SELECT dept, COUNT(*) AS cnt
FROM table
GROUP BY dept
HAVING COUNT(*) > 5;

⚠️  WHERE filters ROWS (before grouping)
⚠️  HAVING filters GROUPS (after grouping)</div></div>
<div class="ch-sec"><h4>🪆 Subqueries</h4>
<div class="ch-code">WHERE col IN     (SELECT col FROM t WHERE ...)
WHERE col NOT IN (SELECT col FROM t WHERE ...)
WHERE col > ALL  (SELECT col FROM t)   -- greater than MAX
WHERE col > SOME (SELECT col FROM t)   -- greater than ANY
WHERE EXISTS     (SELECT 1 FROM t WHERE t.id = outer.id)

-- Correlated: inner query references outer query's column
SELECT * FROM t1 x WHERE salary > (SELECT AVG(salary) FROM t1 WHERE dept = x.dept)</div></div>
<div class="ch-sec"><h4>🌐 Set Operations</h4>
<div class="ch-code">SELECT a FROM t1  UNION      SELECT a FROM t2  -- no dups
SELECT a FROM t1  UNION ALL  SELECT a FROM t2  -- with dups
SELECT a FROM t1  INTERSECT  SELECT a FROM t2  -- in both
SELECT a FROM t1  EXCEPT     SELECT a FROM t2  -- in t1 not t2</div></div>
<div class="ch-sec"><h4>👁️ Views</h4>
<div class="ch-code">CREATE VIEW vname AS
  SELECT col1, col2 FROM table WHERE condition;

SELECT * FROM vname;      -- query like a table
DROP VIEW vname;          -- remove view</div></div>
<div class="ch-sec"><h4>✏️ DML — Data Manipulation</h4>
<div class="ch-code">INSERT INTO t (col1, col2) VALUES (v1, v2);
INSERT INTO t SELECT ... FROM other WHERE ...;

UPDATE t SET col1=v1, col2=v2 WHERE condition;
UPDATE t SET col = CASE
  WHEN cond1 THEN val1
  WHEN cond2 THEN val2
  ELSE default_val
END;

DELETE FROM t WHERE condition;  -- ⚠️ Always use WHERE!</div></div>
<div class="ch-sec"><h4>⚡ Common Patterns</h4>
<div class="ch-code">-- Max in each group (correlated subquery)
SELECT * FROM t x WHERE val = (SELECT MAX(val) FROM t WHERE grp = x.grp);

-- Above-average in group
SELECT * FROM t x WHERE val > (SELECT AVG(val) FROM t WHERE grp = x.grp);

-- Rows with no match (anti-join)
SELECT * FROM t WHERE id NOT IN (SELECT id FROM other);

-- Salary % increase
UPDATE t SET sal = sal * 1.10;  -- 10% raise</div></div>
`;

function openCheat() {
  document.getElementById('cheatBody').innerHTML = CHEAT;
  showM('cheatModal');
}

/* ════════════════════════════════════════════════════════════
   AUDIO SYNTHESIZER & ANIMATION SYSTEM
   (Web Audio API - Offline Friendly, Retro Chiptune Synthesis)
════════════════════════════════════════════════════════════ */
let audioCtx = null;
let soundEnabled = localStorage.getItem('examsql_sound') !== 'false';

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'coin') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'select') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'laser') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.07);
        gain.gain.setValueAtTime(0.06, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.18);
      });
    } else if (type === 'failure') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(60, now + 0.38);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } else if (type === 'stageclear') {
      const notes = [
        { f: 587.33, d: 0.09 }, // D5
        { f: 659.25, d: 0.09 }, // E5
        { f: 698.46, d: 0.09 }, // F5
        { f: 783.99, d: 0.14 }, // G5
        { f: 698.46, d: 0.09 }, // F5
        { f: 783.99, d: 0.09 }, // G5
        { f: 880.0, d: 0.09 }, // A5
        { f: 1046.5, d: 0.28 } // C6
      ];
      let time = now;
      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(n.f, time);
        gain.gain.setValueAtTime(0.05, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + n.d);
        time += n.d;
      });
    }
  } catch (e) {
    console.error('Audio play error:', e);
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('examsql_sound', soundEnabled);
  const btn = document.getElementById('soundBtn');
  if (btn) btn.textContent = soundEnabled ? '🔊 ON' : '🔇 OFF';
  if (soundEnabled) playSound('select');
}

function triggerPowerOnEffect(callback) {
  const el = document.getElementById('crt-power-overlay');
  if (!el) return callback();
  el.style.display = 'flex';
  el.className = '';
  el.offsetHeight; // force reflow
  el.classList.add('power-on');
  playSound('coin');
  setTimeout(() => {
    el.style.display = 'none';
    callback();
  }, 450);
}

function triggerScreenShake() {
  const game = document.getElementById('game');
  if (!game) return;
  game.classList.remove('shake');
  game.offsetHeight; // force reflow
  game.classList.add('shake');
  playSound('failure');
  setTimeout(() => {
    game.classList.remove('shake');
  }, 400);
}

function triggerScanAnimation() {
  const lines = document.querySelectorAll('.scanline-laser');
  lines.forEach(l => {
    l.classList.remove('scanning');
    l.offsetHeight; // force reflow
    l.classList.add('scanning');
  });
}

/* ════════════════════════════════════════════════════════════
   CONTROLLERS: JOYSTICK & TOUCH-SWIPE
════════════════════════════════════════════════════════════ */
function setupJoystick() {
  const joy = document.getElementById('joystick');
  if (!joy) return;
  const base = joy.parentElement;
  let active = false;
  let startX, startY;
  let baseRect;

  base.addEventListener('mousedown', startDrag);
  base.addEventListener('touchstart', startDrag, { passive: false });

  function startDrag(e) {
    active = true;
    baseRect = base.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startX = clientX;
    startY = clientY;
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    if (e.cancelable) e.preventDefault();
  }

  let lastTrigger = 0;

  function drag(e) {
    if (!active) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    let dx = clientX - (baseRect.left + baseRect.width / 2);
    let dy = clientY - (baseRect.top + baseRect.height / 2);

    const maxRadius = 18;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxRadius) {
      dx = (dx / dist) * maxRadius;
      dy = (dy / dist) * maxRadius;
    }

    joy.style.transform = `translate(${dx}px, ${dy}px)`;

    const threshold = 13;
    const now = Date.now();
    if (now - lastTrigger > 350) {
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          skipQ();
          lastTrigger = now;
        } else {
          prevQ();
          lastTrigger = now;
        }
      } else if (Math.abs(dy) > threshold) {
        if (dy > 0) {
          if (G.lvl < LEVELS.length - 1) {
            goLvl(G.lvl + 1);
            lastTrigger = now;
          }
        } else {
          if (G.lvl > 0) {
            goLvl(G.lvl - 1);
            lastTrigger = now;
          }
        }
      }
    }
    if (e.cancelable) e.preventDefault();
  }

  function stopDrag() {
    if (!active) return;
    active = false;
    joy.style.transform = 'translate(0, 0)';
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  }
}

function setupSwipe() {
  const qpanel = document.querySelector('.qpanel');
  if (!qpanel) return;
  let startX = 0;
  let startY = 0;

  qpanel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  qpanel.addEventListener('touchend', e => {
    const diffX = e.changedTouches[0].clientX - startX;
    const diffY = e.changedTouches[0].clientY - startY;

    if (Math.abs(diffX) > 60 && Math.abs(diffY) < 40) {
      if (diffX < 0) {
        const lv = LEVELS[G.lvl];
        if (G.q < lv.qs.length - 1) {
          qpanel.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
          qpanel.style.transform = 'translateX(-100px)';
          qpanel.style.opacity = '0';
          setTimeout(() => {
            skipQ();
            qpanel.style.transition = 'none';
            qpanel.style.transform = 'translateX(100px)';
            setTimeout(() => {
              qpanel.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
              qpanel.style.transform = 'translateX(0)';
              qpanel.style.opacity = '1';
            }, 20);
          }, 150);
        }
      } else {
        if (G.q > 0) {
          qpanel.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
          qpanel.style.transform = 'translateX(100px)';
          qpanel.style.opacity = '0';
          setTimeout(() => {
            prevQ();
            qpanel.style.transition = 'none';
            qpanel.style.transform = 'translateX(-100px)';
            setTimeout(() => {
              qpanel.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
              qpanel.style.transform = 'translateX(0)';
              qpanel.style.opacity = '1';
            }, 20);
          }, 150);
        }
      }
    }
  }, { passive: true });
}

/* ════════════════════════════════════════════════════════════
   MODALS, FX & XP POPUPS
════════════════════════════════════════════════════════════ */
function showM(id) {
  document.getElementById(id).classList.add('show');
}
function closeM(id) {
  document.getElementById(id).classList.remove('show');
}
function closeModal(id) {
  closeM(id);
}

document.querySelectorAll('.overlay').forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === el) el.classList.remove('show');
  });
});

function confetti(n = 25) {
  const colors = ['#ff0055', '#00ffff', '#bd00ff', '#39ff14', '#ffcc00', '#ffffff'];
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const e = document.createElement('div');
      e.className = 'conf';
      const c = colors[Math.floor(Math.random() * colors.length)];
      const sz = 5 + Math.random() * 7;
      e.style.cssText = `left:${Math.random() * 100}vw;top:-20px;background:${c};
        width:${sz}px;height:${sz}px;border-radius:0px;
        animation-duration:${1.8 + Math.random() * 2}s;animation-delay:${Math.random() * 0.4}s;`;
      document.body.appendChild(e);
      setTimeout(() => e.remove(), 3500);
    }, Math.random() * 300);
  }
}

function popXP(pts) {
  const e = document.createElement('div');
  e.className = 'xp-pop';
  e.textContent = `+${pts}`;
  e.style.cssText = `top:${window.innerHeight * 0.4}px;left:${window.innerWidth - 180}px;`;
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 1800);
}

/* ════════════════════════════════════════════════════════════
   INITIALIZATION & SETUP
════════════════════════════════════════════════════════════ */
let sqlOK = false, mOK = false;

function checkReady() {
  if (sqlOK && mOK) {
    isEngineReady = true;
    enableAuthControls();
  }
}

// Initialize sql.js engine
(async () => {
  try {
    const SQL = await initSqlJs({
      locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}`
    });
    window.SQL = SQL;
    sqlOK = true;
    document.getElementById('loadMsg').textContent = 'SQL engine ready ✅ Loading editor...';
    checkReady();
  } catch (e) {
    document.getElementById('loadMsg').textContent = '⚠️ Failed to load SQL engine. Check internet connection.';
    console.error(e);
  }
})();

// Load Monaco Editor
if (window.require) {
  window.require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
  window.require(['vs/editor/editor.main'], function () {
    mOK = true;
    checkReady();
  });
} else {
  // Fallback if Monaco CDN fails
  const wrap = document.getElementById('editor-wrap');
  if (wrap) wrap.innerHTML = '<textarea id="fallback-editor" spellcheck="false"></textarea>';
  mOK = true;
  checkReady();
}

// Initialize Supabase Auth state observer
if (supabase) {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session && session.user) {
      G.user = session.user;
      await loadCloudProgress();
    } else {
      G.user = null;
    }
    enableAuthControls();
  });
} else {
  // Offline / Ad-blocker fallback
  setTimeout(() => {
    enableAuthControls();
  }, 100);
}

function startGame() {
  if (!sqlOK) {
    document.getElementById('loadMsg').textContent = 'Still loading... please wait!';
    return;
  }
  triggerPowerOnEffect(() => {
    document.getElementById('splash').classList.add('out');
    document.getElementById('game').classList.add('on');

    if (mOK && window.monaco && !document.getElementById('fallback-editor')) {
      const edEl = document.getElementById('monaco-editor');
      G.editor = monaco.editor.create(edEl, {
        value: '-- Write your SQL here\n',
        language: 'sql',
        theme: 'vs-dark',
        fontSize: 15.5,
        fontFamily: "'Share Tech Mono', monospace",
        lineNumbers: 'on',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'on',
        padding: { top: 14 },
        scrollbar: { vertical: 'auto', horizontal: 'auto' }
      });
      G.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runQuery);
      G.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, submitAnswer);
    }

    loadProgress();
    renderBookmarks();
    loadLvl(G.lvl, G.q);

    // Set initial sound button label
    const sBtn = document.getElementById('soundBtn');
    if (sBtn) sBtn.textContent = soundEnabled ? '🔊 ON' : '🔇 OFF';

    // Setup controllers
    setupJoystick();
    setupSwipe();
  });
}
