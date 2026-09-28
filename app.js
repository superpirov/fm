const $app = document.getElementById('app');
const $toast = document.getElementById('toast');

function toast(msg){
  const el=document.createElement('div');
  el.className='toast';
  el.textContent=msg;
  $toast.appendChild(el);
  setTimeout(()=>el.remove(), 2600);
}

// ----- DATA -----
const COUNTRIES = [
  {code:'ENG', name:'Англия', leagues:['Premier League','Championship']},
  {code:'ESP', name:'Испания', leagues:['LaLiga','LaLiga 2']},
  {code:'GER', name:'Германия', leagues:['Bundesliga','2. Bundesliga']},
  {code:'ITA', name:'Италия', leagues:['Serie A','Serie B']},
  {code:'FRA', name:'Франция', leagues:['Ligue 1','Ligue 2']},
  {code:'POR', name:'Португалия', leagues:['Liga Portugal','Liga 2']},
  {code:'NED', name:'Нидерланды', leagues:['Eredivisie','Eerste Divisie']},
  {code:'TUR', name:'Турция', leagues:['Süper Lig','1. Lig']},
  {code:'BRA', name:'Бразилия', leagues:['Série A','Série B']},
  {code:'ARG', name:'Аргентина', leagues:['Liga Profesional','Primera Nacional']},
  {code:'USA', name:'США', leagues:['MLS','USL Championship']},
  {code:'JPN', name:'Япония', leagues:['J1 League','J2 League']},
  {code:'KOR', name:'Корея', leagues:['K League 1','K League 2']},
  {code:'MEX', name:'Мексика', leagues:['Liga MX','Liga Expansión']},
  {code:'RUS', name:'Россия', leagues:['РПЛ','ФНЛ']},
  {code:'UKR', name:'Украина', leagues:['УПЛ','Первая лига']},
  {code:'POL', name:'Польша', leagues:['Ekstraklasa','I Liga']},
  {code:'BEL', name:'Бельгия', leagues:['Pro League','Challenger']},
  {code:'SCO', name:'Шотландия', leagues:['Premiership','Championship']},
  {code:'SWE', name:'Швеция', leagues:['Allsvenskan','Superettan']},
];

const CLUB_NAMES_BY_COUNTRY = {
  ENG: ['Арсенал','Челси','Ливерпуль','Манчестер Сити','Тоттенхэм','Ньюкасл','Астон Вилла','Брайтон','Вест Хэм','Эвертон','Фулхэм','Кристал Пэлас'],
  ESP: ['Реал Мадрид','Барселона','Атлетико','Севилья','Вильярреал','Валенсия','Бетис','Сосьедад','Атлетик','Жирона','Сельта','Малага'],
  GER: ['Бавария','Боруссия Д','Байер','Лейпциг','Штутгарт','Айнтрахт','Вольфсбург','Вердер','Фрайбург','Хоффенхайм','Унион','Гладбах'],
  ITA: ['Интер','Милан','Ювентус','Наполи','Рома','Лацио','Аталанта','Фиорентина','Торино','Болонья','Сампдория','Удинезе'],
  FRA: ['ПСЖ','Марсель','Монако','Лилль','Лион','Ницца','Ренн','Ланс','Страсбур','Нант','Реймс','Тулуза'],
  POR: ['Бенфика','Порту','Спортинг','Брага','Витория','Маритимо','Боависта','Фамаликао','Эшторил','Ароука','Тондела','Эstoril'],
  NED: ['Аякс','ПСВ','Фейеноорд','АЗ','Твенте','Утрехт','Витесс','Херенвен','Гронинген','Зволле','Неймеген','Утрехт'],
  TUR: ['Галатасарай','Фенербахче','Бешикташ','Трабзонспор','Башакшехир','Аланьяспор','Ризеспор','Сивасспор','Антальяспор','Газиантеп','Коньяспор','Истанбулспор'],
  BRA: ['Фламенго','Палмейрас','Сан-Паулу','Сантос','Коринтианс','Гремио','Атлетику Минайро','Ботафого','Васко','Флуминенсе','Байя','Атлетику Паранаенсе'],
  ARG: ['Бока Хуниорс','Ривер Плейт','Индепендьенте','Расинг','Ланус','Архентинос','Тальерес','Банфилд','Колон','Уракан','Эстудьянтес','Химнасия'],
  USA: ['Интер Майами','Лос-Анджелес Гэлакси','Сиэтл Саундерс','Атланта Юнайтед','Чикаго Файр','Нью-Йорк Сити','Портленд Тимберс','Филадельфия Юнион','Даллас','Сан-Хосе','Орландо Сити','Нэшвилл'],
  JPN: ['Виссел Кобе','Урава Редс','Иокогама Маринос','Кавасаки Фронтале','Сересо Осака','Санфречче Хиросима','Фукуока','Нагоя','Саппоро','Касима','Виссел','Шонан'],
  KOR: ['Ульсан','Пхохан','Чонбук','Сеул','Инчон','Дэгу','Гwangju','Сувон','Джеджу','Пусан','Гангвон','Тэджон'],
  MEX: ['Америка','Гвадалахара','Монтеррей','Крус Асуль','Толука','Леон','Пумас','Тихуана','Сантос','Некса','Атлас','Керетаро'],
  RUS: ['Зенит','Спартак','ЦСКА','Динамо','Краснодар','Локомотив','Ростов','Ахмат','Оренбург','Пари Нижний Новгород','Урал','Факел'],
  UKR: ['Динамо Киев','Шахтёр','Днепр','Заря','Ворскла','Олександрия','Колос','Рух','Металлист','Ингулець','Чорноморець','Верес'],
  POL: ['Легия','Лех','Варта','Гурник','Ягеллония','Погоń','Заглембе','Висла','Сталь','Корона','ГКТ','Мьедзь'],
  BEL: ['Андерлехт','Брюгге','Сент-Трюйден','Генк','Гент','Стандар','Серен','Остенде','Вестерло','Локерен','Шарлеруа','Мехелен'],
  SCO: ['Селтик','Рейнджерс','Абердин','Хиберниан','Харт','Данди Юнайтед','Мотеруел','Сент-Джонстон','Ливингстон','Росс','Килмарнок','Сент-Миррен'],
  SWE: ['Мальмё','АИК','Хаммарбю','Юргорден','Эльфсборг','Кальмар','Норрчёпинг','Хеккен','Сириус','Варна','Дегерфорс','Броммапойкарна'],
};

const FIRST_NAMES = ['Лука','Марк','Алекс','Даниил','Иван','Михаил','Лео','Килиан','Эрлинг','Джамал','Педри','Гави','Букайо','Фил','Деклан','Родри','Винисиус','Джуд','Хвича','Рафаэл'];
const LAST_NAMES  = ['Силва','Мюллер','Гарсия','Смит','Ковач','Петров','Иванов','Фернандеш','Сака','Фоден','Муса','Беллингем','Холанд','Мбаппе','Вини','Родриго','Салиба','Райс','Эдегор','Кейн'];
const POSITIONS = ['GK','LB','CB','CB','RB','CDM','CM','CAM','LW','ST','RW'];

const TOURNAMENTS = ['Лига Чемпионов','Лига Европы','Лига Конференций','Суперкубок УЕФА','Клубный ЧМ','Copa Libertadores','Кубок страны','Суперкубок страны'];

// talent distribution: 1 most common, 10 rarest ~1%
function genTalent(){
  const r = Math.random()*100;
  if(r<28) return 1;
  if(r<50) return 2;
  if(r<65) return 3;
  if(r<77) return 4;
  if(r<85) return 5;
  if(r<91) return 6;
  if(r<95) return 7;
  if(r<97.5) return 8;
  if(r<99) return 9;
  return 10;
}
function genLevel(talent){
  // base normal around 52 + talent*3 + noise; clamp 18-99, with tail for elite
  // For realism: many 35-65, few >85
  let base = 40 + Math.random()*25; // 40-65
  base += (talent-5)*2.2;
  base += (Math.random()-0.5)*12;
  // rare elite bump
  if(talent>=9 && Math.random()<0.12) base+= 12;
  if(talent===10 && Math.random()<0.25) base+= 15;
  base = Math.round(base);
  return Math.max(18, Math.min(99, base));
}
function genSalary(level, talent){
  // yearly salary in $
  // base 15k - 22M curve exponential
  const base = 15000 + Math.pow(level/30, 4.6)* 220000 + talent*12000 + Math.random()*20000;
  return Math.round(base/1000)*1000;
}
function genAge(group){
  if(group==='y10') return 10+Math.floor(Math.random()*4);
  if(group==='y14') return 14+Math.floor(Math.random()*3);
  if(group==='y17') return 17+Math.floor(Math.random()*3);
  if(group==='res') return 18+Math.floor(Math.random()*5);
  return 20+Math.floor(Math.random()*14); // 20-33
}
function genPlayer(group='main', forcedPos){
  const talent = genTalent();
  let level = genLevel(talent);
  if(group==='y10') level = Math.max(12, Math.min(69, level-18+ Math.floor(Math.random()*9)));
  if(group==='y14') level = Math.max(18, Math.min(74, level-10+ Math.floor(Math.random()*7)));
  if(group==='y17') level = Math.max(28, Math.min(82, level-5));
  if(group==='res') level = Math.max(35, Math.min(86, level-4));
  const pos = forcedPos || POSITIONS[Math.floor(Math.random()*POSITIONS.length)];
  return {
    id: Math.random().toString(36).slice(2,9),
    name: FIRST_NAMES[Math.floor(Math.random()*FIRST_NAMES.length)]+' '+LAST_NAMES[Math.floor(Math.random()*LAST_NAMES.length)],
    pos, talent, level,
    age: genAge(group),
    salary: genSalary(level, talent),
    contract: 2026 + Math.floor(Math.random()*4) + 1,
    form: (3 + Math.random()*2).toFixed(1),
    injury: Math.random()<0.07
  };
}
function genSquad(){
  const first = Array.from({length:22}, (_,i)=> genPlayer('main', POSITIONS[i%POSITIONS.length]));
  // boost first 11 a bit
  first.forEach((p,i)=>{ if(i<11) p.level = Math.min(99, p.level+3)});
  const reserve = Array.from({length:18}, ()=> genPlayer('res'));
  const y10 = Array.from({length:10}, ()=> genPlayer('y10'));
  const y14 = Array.from({length:12}, ()=> genPlayer('y14'));
  const y17 = Array.from({length:14}, ()=> genPlayer('y17'));
  return {first, reserve, y10, y14, y17};
}
function genTable(leagueName, myClub, country){
  const clubs = [];
  const names = clubListFor(country || COUNTRIES[0], leagueName);
  for(let i=0;i<12;i++){
    const name = names[i];
    clubs.push({name, pld: 0, w:0,d:0,l:0,gf:0,ga:0,pts:0, form: genLevelForTable()});
  }
  // proper round-robin: each team plays each other once (11 rounds for 12 teams)
  const n = clubs.length;
  const rounds = [];
  for(let r=0;r<n-1;r++){
    const round = [];
    for(let i=0;i<n/2;i++){
      const a = clubs[i];
      const b = clubs[n-1-i];
      round.push([a,b]);
    }
    rounds.push(round);
    // rotate all except first
    const last = clubs.pop();
    clubs.splice(1, 0, last);
  }
  // simulate first 8 rounds
  for(let r=0;r<Math.min(8, rounds.length);r++){
    for(const [a,b] of rounds[r]){
      const res = simScore(a.form,b.form);
      a.gf+=res.a; b.gf+=res.b; a.ga+=res.b; b.ga+=res.a;
      a.pld++; b.pld++;
      if(res.a>res.b){a.w++;a.pts+=3;b.l++}
      else if(res.b>res.a){b.w++;b.pts+=3;a.l++}
      else {a.d++;b.d++;a.pts++;b.pts++}
    }
  }
  clubs.sort((a,b)=> b.pts-a.pts || (b.gf-b.ga)-(a.gf-a.ga));
  return clubs;
}
function genLevelForTable(){ return 58+Math.floor(Math.random()*24)}
function simScore(a,b){
  const diff=(a-b)/18;
  const baseA = 1.1 + diff + (Math.random()-0.5)*0.9;
  const baseB = 1.1 - diff + (Math.random()-0.5)*0.9;
  return {a: Math.max(0, Math.round(baseA + (Math.random()<0.12?1:0))), b: Math.max(0, Math.round(baseB + (Math.random()<0.12?1:0)))}
}

// ----- STATE -----
const defaultState = {
  screen:'start', // start | wizard | game
  wizardStep:1,
  mode:'standard', // standard | create
  owner:false,
  dismissal:true,
  manager:{first:'',last:'',dob:'1995-06-15',nat:'RUS'},
  createClub:{name:'', stadiumCap:8000, budgetLeft:2000000, colors:['#22E6A0','#0E1420'], shape:'shield', icon:'★'},
  selectedCountry: COUNTRIES[0],
  selectedLeague: COUNTRIES[0].leagues[0],
  selectedClub: null,
  club:null,
  gameDate: new Date(2026,7,27), // 27 Aug 2026
  view:'news', // news | calendar | tables | first | reserve | youth | training | roles | tactics | contracts | staff | finances | marketing | kit | tickets | sponsors | trophies | fans | infra | career | settings
  youthTab:'y17',
  tactic:'balanced',
  formation:'4-3-3',
  news:[],
  calendarEvents:{},
  squad:null,
  table:null,
  finances:{balance: 4200000, income: 1850000, expenses: 1320000},
  nextMatch:null,
  roles:{captain:null, freekick:null, penalty:null, corners:null, pens:[]},
  saveName:'fm_save'
};

function cloneState(s){ try{ return structuredClone(s); }catch(e){ return JSON.parse(JSON.stringify(s)); } }
let S = load() || cloneState(defaultState);
if(S.gameDate) S.gameDate = new Date(S.gameDate);
if(S.nextMatch && S.nextMatch.date) S.nextMatch.date = new Date(S.nextMatch.date);
if(!S.squad && S.club) S.squad = genSquad();
if(S.club && !S.table) S.table = genTable(S.selectedLeague, S.club, S.selectedCountry);

function save(){
  localStorage.setItem('fm_elite_save', JSON.stringify(S));
}
function load(){
  try{ const v=localStorage.getItem('fm_elite_save'); return v? JSON.parse(v): null }catch(e){ return null}
}
function fmtDate(d){
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toLocaleDateString('ru-RU',{day:'2-digit', month:'long', year:'numeric'});
}
function fmtMoney(n){
  if(n>=1000000) return (n/1000000).toFixed(2)+' M $';
  if(n>=1000) return (n/1000).toFixed(0)+' K $';
  return n+' $';
}
function levelColor(l){
  if(l>=88) return '#F0C75E';
  if(l>=78) return '#22E6A0';
  if(l>=60) return '#4F7CFF';
  if(l>=45) return '#8A96B0';
  return '#FF4D6A';
}
function talentStars(t){
  return '★'.repeat(t) + '☆'.repeat(10-t);
}

// ----- RENDER -----
function render(){
  if(S.screen==='start') renderStart();
  else if(S.screen==='wizard') renderWizard();
  else renderGame();
}

function renderStart(){
  $app.innerHTML = `
  <div class="start-wrap">
    <div class="start-left">
      <div class="brand">
        <div class="brand-mark">FM</div>
        <div>
          <div class="brand-title">FOOTBALL MANAGER</div>
          <div class="brand-sub">Elite Edition • 2026/27</div>
        </div>
        <span class="badge" style="margin-left:auto">LIVE</span>
      </div>

      <div class="kicker" style="margin:10px 0 8px">Главное меню</div>
      <div class="menu">
        <button class="menu-btn active" data-act="new">
          <div><b>Новая игра</b><small>Начать карьеру с нуля</small></div><span>↗</span>
        </button>
        <button class="menu-btn" data-act="load">
          <div><b>Загрузить игру</b><small>${load()? 'Сохранение найдено':'Нет сохранений'}</small></div><span>◷</span>
        </button>
        <button class="menu-btn" data-act="settings">
          <div><b>Настройки</b><small>Графика, звук, язык</small></div><span>⚙</span>
        </button>
        <button class="menu-btn" data-act="exit">
          <div><b>Выход</b><small>Завершить сессию</small></div><span>✕</span>
        </button>
      </div>

      <div style="margin-top:18px; padding:14px; border-radius:16px; background: linear-gradient(135deg, rgba(34,230,160,0.10), rgba(79,124,255,0.08)); border:1px solid rgba(255,255,255,0.06)">
        <div class="kicker">Совет скаута</div>
        <div style="font-size:13px; color:var(--muted); margin-top:6px; line-height:1.5">Игроки с талантом 10 появляются реже 1% — береги их. Уровень 85+ — мировой класс, но пик формы короток.</div>
      </div>

      <div class="menu-meta">
        <span class="pill">214 федераций</span>
        <span class="pill">~65 000 игроков</span>
        <span class="pill">Уровни 0–99</span>
        <span class="version">v1.0 • GitHub Pages Ready</span>
      </div>
    </div>

    <div class="start-right">
      <div class="glass hero-card">
        <div class="badge badge-gold">Симуляция реального мира</div>
        <h2 class="h1">Управляй.<br>Строй. Побеждай.</h2>
        <p class="muted" style="line-height:1.6; margin:0">Самый тёмный, дорогой и спокойный для глаз менеджер. Все федерации, живые таблицы, таланты и контракты. Твоя история — от академии 10-леток до Лиги Чемпионов.</p>
        <div class="hero-stats">
          <div class="stat"><b>2.0 M $</b><br><span>Бюджет на новый клуб</span></div>
          <div class="stat"><b>0—99</b><br><span>Система уровней</span></div>
          <div class="stat"><b>1—10 ★</b><br><span>Талант • редкость</span></div>
        </div>
        <div class="row" style="margin-top:16px">
          <button class="btn" data-act="new">Начать карьеру →</button>
          <button class="btn btn-ghost" data-act="load">Продолжить</button>
        </div>
      </div>
      <div class="kicker" style="margin-top:14px; opacity:0.7">Нажми «Новая игра» — выбери режим, стань владельцем или менеджером под угрозой увольнения.</div>
    </div>
  </div>`;
  $app.querySelectorAll('[data-act]').forEach(b=> b.addEventListener('click', e=>{
    const act=e.currentTarget.dataset.act;
    if(act==='new'){ S.screen='wizard'; S.wizardStep=1; render(); }
    else if(act==='load'){
      const l=load();
      if(!l || !l.club) toast('Нет сохранённой карьеры');
      else { S=l; S.gameDate=new Date(S.gameDate); S.screen='game'; render(); toast('Карьера загружена');}
    }
    else if(act==='settings') toast('Настройки: тёмная тема Elite уже включена');
    else if(act==='exit') toast('Сеанс сохранён. До встречи, босс.');
  }));
}

function renderWizard(){
  const step=S.wizardStep;
  let body='';
  if(step===1) body = `
    <div class="kicker">Шаг 1 из 3 — Режим игры</div>
    <h2 class="h1" style="margin:0; font-size:28px">Как начнёшь свою историю?</h2>
    <div class="opt-grid">
      <div class="opt ${S.mode==='standard'?'sel':''}" data-mode="standard">
        <div class="badge">Рекомендуем</div>
        <h4>Стандартный режим</h4>
        <p>Выбери страну → лигу → клуб. Прими команду с историей, бюджетом и академией. Подходит для классического пути.</p>
        <div class="pill" style="margin-top:10px; display:inline-flex">214 стран • 600+ лиг</div>
      </div>
      <div class="opt ${S.mode==='create'?'sel':''}" data-mode="create">
        <div class="badge badge-gold">Creative</div>
        <h4>Создать новый клуб</h4>
        <p>С нуля за 2 000 000 $: построй стадион, придумай имя и эмблему. Начни в низшей лиге выбранной страны.</p>
        <div class="pill" style="margin-top:10px; display:inline-flex">Бюджет 2M $ • Конструктор эмблемы</div>
      </div>
    </div>
    <div class="grid2">
      <label class="checkrow"><input type="checkbox" ${S.owner?'checked':''} data-check="owner"> <div><b>Владелец клуба</b><div class="small muted">Полный контроль, без увольнения</div></div></label>
      <label class="checkrow"><input type="checkbox" ${S.dismissal?'checked':''} data-check="dismissal"> <div><b>Игра с увольнением</b><div class="small muted">Как менеджер: плохие результаты — отставка</div></div></label>
    </div>
    <div style="background: rgba(240,199,94,0.08); border:1px solid rgba(240,199,94,0.14); padding:12px 14px; border-radius:14px; display:flex; gap:10px; align-items:center">
      <span style="width:32px;height:32px; border-radius:999px; background: var(--gold); color:#1A1400; display:grid; place-items:center; font-weight:800">$</span>
      <div class="small"><b>Зарплаты — за год.</b> <span class="muted">Уровень 0–99, талант 1–10. Талант 10 — ~1% игроков, встречается как реальный вундеркинд.</span></div>
    </div>
  `;
  else if(step===2) body = `
    <div class="kicker">Шаг 2 из 3 — Профиль менеджера</div>
    <h2 class="h1" style="margin:0; font-size:28px">Кто будет у руля?</h2>
    <div class="grid2">
      <label>Имя<input class="input" data-field="first" value="${S.manager.first}" placeholder="Александр"></label>
      <label>Фамилия<input class="input" data-field="last" value="${S.manager.last}" placeholder="Петров"></label>
      <label>Дата рождения<input class="input" type="date" data-field="dob" value="${S.manager.dob}"></label>
      <label>Гражданство
        <select class="input" data-field="nat">
          ${COUNTRIES.map(c=> `<option value="${c.code}" ${S.manager.nat===c.code?'selected':''}>${c.name}</option>`).join('')}
        </select>
      </label>
    </div>
    <div class="card" style="padding:14px; display:flex; gap:12px; align-items:center">
      <div class="avatar" style="background: linear-gradient(135deg, var(--accent), #0DBF88)"> ${ (S.manager.first[0]||'A') + (S.manager.last[0]||'P') } </div>
      <div><b>${S.manager.first||'Александр'} ${S.manager.last||'Петров'}</b><div class="small muted">${COUNTRIES.find(c=>c.code===S.manager.nat)?.name||''} • ${S.manager.dob} • ${S.owner?'Владелец':'Менеджер'} ${S.dismissal?'• с увольнением':''}</div></div>
      <span class="badge" style="margin-left:auto">Лицензия PRO</span>
    </div>
  `;
  else if(step===3){
    if(S.mode==='standard'){
      body = `
        <div class="kicker">Шаг 3 из 3 — Выбор клуба</div>
        <h2 class="h1" style="margin:0; font-size:28px">Выбери страну → лигу → клуб</h2>
        <div class="grid2">
          <div>
            <div class="kicker" style="margin-bottom:8px">Страна</div>
            <div style="max-height:300px; overflow:auto; display:flex; flex-direction:column; gap:8px; padding-right:4px">
              ${COUNTRIES.map(c=> `<button class="menu-btn ${S.selectedCountry.code===c.code?'active':''}" data-country="${c.code}" style="padding:12px 14px"><b>${c.name}</b><span class="small">${c.leagues.join(' • ')}</span></button>`).join('')}
            </div>
          </div>
          <div>
            <div class="kicker" style="margin-bottom:8px">Лига • Клуб</div>
            <div style="display:flex; gap:8px; margin-bottom:10px">
              ${S.selectedCountry.leagues.map(l=> `<button class="btn ${S.selectedLeague===l?'':'btn-ghost'} btn-sm" data-league="${l}">${l}</button>`).join('')}
            </div>
            <div style="display:grid; gap:8px; max-height:260px; overflow:auto; padding-right:4px">
              ${clubListFor(S.selectedCountry, S.selectedLeague).map(cl=> `<button class="player-row" data-club="${cl}" style="justify-content:space-between"><span><b>${cl}</b> <span class="muted small">— ${S.selectedLeague}</span></span><span class="tag ${S.selectedClub===cl?'accent':''}">${S.selectedClub===cl?'Выбран':'Выбрать'}</span></button>`).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      // create club
      body = `
        <div class="kicker">Шаг 3 из 3 — Создание клуба</div>
        <h2 class="h1" style="margin:0; font-size:28px">Построй мечту за 2 000 000 $</h2>
        <div class="grid2">
          <div style="display:flex; flex-direction:column; gap:12px">
            <label>Название клуба<input class="input" data-field="cname" value="${S.createClub.name}" placeholder="Например, ФК Аврора"></label>
            <label>Вместимость стадиона: <b>${S.createClub.stadiumCap.toLocaleString('ru-RU')}</b>
              <input type="range" min="3000" max="15000" step="500" data-field="cap" value="${S.createClub.stadiumCap}" style="width:100%; accent-color: var(--accent)">
              <div class="small muted">Стоимость: ${(S.createClub.stadiumCap*120).toLocaleString('ru-RU')} $ • Остаток: <b style="color:${S.createClub.budgetLeft<0?'var(--red)':'var(--accent)'}">${S.createClub.budgetLeft.toLocaleString('ru-RU')} $</b></div>
            </label>
            <div class="grid2">
              <label>Форма эмблемы
                <select class="input" data-field="shape"><option ${S.createClub.shape==='shield'?'selected':''} value="shield">Щит</option><option ${S.createClub.shape==='circle'?'selected':''} value="circle">Круг</option><option ${S.createClub.shape==='diamond'?'selected':''} value="diamond">Ромб</option></select>
              </label>
              <label>Иконка
                <select class="input" data-field="icon"><option ${S.createClub.icon==='★'?'selected':''}>★</option><option ${S.createClub.icon==='⚽'?'selected':''}>⚽</option><option ${S.createClub.icon==='🦁'?'selected':''}>🦁</option><option ${S.createClub.icon==='🦅'?'selected':''}>🦅</option><option ${S.createClub.icon==='👑'?'selected':''}>👑</option></select>
              </label>
            </div>
            <div class="grid2">
              <label>Цвет 1<input type="color" class="input" data-field="c1" value="${S.createClub.colors[0]}" style="height:44px; padding:4px"></label>
              <label>Цвет 2<input type="color" class="input" data-field="c2" value="${S.createClub.colors[1]}" style="height:44px; padding:4px"></label>
            </div>
          </div>
          <div class="card" style="padding:16px; display:flex; flex-direction:column; align-items:center; gap:14px; justify-content:center">
            <div class="logo-preview">
              <div class="emblem" style="background: linear-gradient(135deg, ${S.createClub.colors[0]}, ${S.createClub.colors[1]}); border-radius:${S.createClub.shape==='circle'?'999px':S.createClub.shape==='diamond'?'12px': '16px'}; transform:${S.createClub.shape==='diamond'?'rotate(0deg)':''}">
                <span style="${S.createClub.shape==='diamond'?'transform:rotate(0deg)':''}">${S.createClub.icon}</span>
              </div>
            </div>
            <div style="text-align:center"><b>${S.createClub.name||'ФК Аврора'}</b><div class="small muted">${S.createClub.stadiumCap.toLocaleString('ru-RU')} мест • Бюджет осталось ${S.createClub.budgetLeft.toLocaleString('ru-RU')} $</div></div>
            <div class="pill">Старт в низшей лиге выбранной страны</div>
          </div>
        </div>
      `;
    }
  }

  $app.innerHTML = `
  <div class="wizard">
    <div class="wizard-card glass">
      <div class="wizard-head">
        <div style="display:flex; align-items:center; gap:12px">
          <div class="brand-mark" style="width:36px;height:36px; font-size:14px">FM</div>
          <div><b>Новая карьера</b><div class="small muted">Elite • Тёмная тема</div></div>
        </div>
        <div class="steps">
          <div class="step-dot ${step>=1?'on':''}">1</div>
          <div class="step-dot ${step>=2?'on':''}">2</div>
          <div class="step-dot ${step>=3?'on':''}">3</div>
        </div>
        <button class="btn btn-ghost btn-sm" data-act="backToStart">← В меню</button>
      </div>
      <div class="wizard-body">
        ${body}
        <div class="row" style="justify-content:space-between; margin-top:6px">
          <button class="btn btn-ghost" data-nav="prev" ${step===1?'disabled style="opacity:0.4; pointer-events:none"':''}>← Назад</button>
          <div class="row">
            ${step<3? `<button class="btn" data-nav="next">Далее →</button>` : `<button class="btn btn-gold" data-nav="start">Начать сезон →</button>`}
          </div>
        </div>
      </div>
    </div>
  </div>`;

  // events
  $app.querySelector('[data-act="backToStart"]')?.addEventListener('click', ()=>{ S.screen='start'; render(); });
  $app.querySelectorAll('[data-mode]').forEach(el=> el.addEventListener('click', ()=>{ S.mode=el.dataset.mode; render(); }));
  $app.querySelectorAll('[data-check]').forEach(el=> el.addEventListener('change', e=>{
    const k=e.target.dataset.check; S[k]=e.target.checked;
    if(k==='owner' && S.owner) S.dismissal=false;
    if(k==='dismissal' && S.dismissal) S.owner=false;
    render();
  }));
  $app.querySelectorAll('[data-field]').forEach(el=>{
    const h = e=>{
      const f=e.target.dataset.field;
      if(f==='first') S.manager.first=e.target.value;
      if(f==='last') S.manager.last=e.target.value;
      if(f==='dob') S.manager.dob=e.target.value;
      if(f==='nat') S.manager.nat=e.target.value;
      if(f==='cname'){ S.createClub.name=e.target.value; // live update
      }
      if(f==='cap'){ S.createClub.stadiumCap=parseInt(e.target.value); S.createClub.budgetLeft=2000000 - S.createClub.stadiumCap*120 - 400000; render(); return}
      if(f==='shape') S.createClub.shape=e.target.value;
      if(f==='icon') S.createClub.icon=e.target.value;
      if(f==='c1') S.createClub.colors[0]=e.target.value;
      if(f==='c2') S.createClub.colors[1]=e.target.value;
      // no full re-render for text fields to keep focus, just save
      save();
    };
    el.addEventListener('input', h);
    el.addEventListener('change', h);
  });
  $app.querySelectorAll('[data-country]').forEach(b=> b.addEventListener('click', ()=>{ const c=COUNTRIES.find(x=>x.code===b.dataset.country); S.selectedCountry=c; S.selectedLeague=c.leagues[0]; S.selectedClub=null; render(); }));
  $app.querySelectorAll('[data-league]').forEach(b=> b.addEventListener('click', ()=>{ S.selectedLeague=b.dataset.league; S.selectedClub=null; render(); }));
  $app.querySelectorAll('[data-club]').forEach(b=> b.addEventListener('click', ()=>{ S.selectedClub=b.dataset.club; render(); }));

  $app.querySelector('[data-nav="prev"]')?.addEventListener('click', ()=>{ S.wizardStep=Math.max(1,S.wizardStep-1); render(); });
  $app.querySelector('[data-nav="next"]')?.addEventListener('click', ()=>{
    if(S.wizardStep===1){ S.wizardStep=2; render(); return;}
    if(S.wizardStep===2){
      if(!S.manager.first || !S.manager.last) return toast('Введи имя и фамилию менеджера');
      S.wizardStep=3; render(); return;
    }
  });
  $app.querySelector('[data-nav="start"]')?.addEventListener('click', ()=>{
    let clubName='';
    if(S.mode==='standard'){
      if(!S.selectedClub) return toast('Выбери клуб');
      clubName=S.selectedClub;
    } else {
      if(!S.createClub.name || S.createClub.name.length<3) return toast('Придумай название клуба (мин. 3 символа)');
      if(S.createClub.budgetLeft<0) return toast('Превышен бюджет 2M $ — уменьши стадион');
      clubName=S.createClub.name;
    }
    // create club object
    S.club = {
      name: clubName,
      country: S.selectedCountry.name,
      league: S.selectedLeague,
      colors: S.mode==='create'? S.createClub.colors : ['#22E6A0','#0B1020'],
      shape: S.createClub.shape,
      icon: S.createClub.icon,
      stadium: S.mode==='create'? S.createClub.stadiumCap : 28000 + Math.floor(Math.random()*25000),
      budget: S.mode==='create'? S.createClub.budgetLeft : 5000000 + Math.floor(Math.random()*6000000)
    };
    S.squad = genSquad();
    S.table = genTable(S.selectedLeague, S.club, S.selectedCountry);
    S.finances.balance = S.club.budget;
    S.news = genInitialNews();
    S.calendarEvents = genCalendarEvents();
    S.nextMatch = {opponent: clubListFor(S.selectedCountry,S.selectedLeague).filter(n=>n!==clubName)[0] || 'Соперник', date: new Date(2026,8,12)};
    S.screen='game';
    S.gameDate=new Date(2026,7,27);
    save();
    render();
    toast(`Добро пожаловать в ${clubName}!`);
  });
}

function clubListFor(country, league){
  const names = CLUB_NAMES_BY_COUNTRY[country.code] || ['ФК Аврора','ФК Вектор','ФК Горизонт','ФК Динамо','ФК Зенит','ФК Импульс','ФК Комета','ФК Легенда','ФК Меридиан','ФК Нова','ФК Орион','ФК Пульс'];
  const leagueIdx = country.leagues.indexOf(league);
  const start = (leagueIdx * 6) % names.length;
  const rotated = [...names.slice(start), ...names.slice(0, start)];
  return rotated.slice(0, 12);
}

function genInitialNews(){
  return [
    {id:1, title:'Совет директоров верит в проект', text:'Болельщики ждут атакующего футбола. Контракты и тактика — твой первый шаг.', time:'Сегодня 09:41', img:'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=200&auto=format&fit=crop'},
    {id:2, title:'Запрос на трансфер: юный талант', text:'Скауты нашли вингера 17 лет с талантом 9 ★. Требует шанс в основе.', time:'Сегодня 08:12', img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=200&auto=format&fit=crop'},
    {id:3, title:'Спонсор предложил контракт', text:'Технический спонсор готов платить 620k $/год за размещение на форме.', time:'Вчера 19:04', img:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=200&auto=format&fit=crop'},
  ];
}
function genCalendarEvents(){
  const ev={};
  // put 6 matches in September
  [2,6,13,17,24,28].forEach(d=> ev[`2026-09-${String(d).padStart(2,'0')}`]= {type:'match', opponent: FIRST_NAMES[Math.floor(Math.random()*FIRST_NAMES.length)]+' Сити' });
  [5,19].forEach(d=> ev[`2026-09-${String(d).padStart(2,'0')}`]= {type:'train', label:'Тренировка'});
  return ev;
}

// ----- GAME RENDER -----
function renderGame(){
  const d = S.gameDate instanceof Date ? S.gameDate : new Date(S.gameDate);
  const monthName = d.toLocaleDateString('ru-RU',{month:'long', year:'numeric'});
  const daysInMonth = new Date(d.getFullYear(), d.getMonth()+1,0).getDate();
  const today = d.getDate();
  const calDays = Array.from({length: daysInMonth}, (_,i)=>{
    const day=i+1;
    const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const ev=S.calendarEvents[key];
    return {day, ev, key, isToday: day===today};
  });

  const squad = S.squad;
  const club = S.club;

  $app.innerHTML = `
  <div class="topbar">
    <div style="display:flex; align-items:center; gap:12px; min-width:0">
      <div class="brand-mark" style="width:36px;height:36px; font-size:14px; flex-shrink:0">${club.icon||'FM'}</div>
      <div style="min-width:0">
        <div style="font-weight:800; letter-spacing:-0.02em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${club.name} <span class="muted" style="font-weight:600">• ${club.league}</span></div>
        <div class="small muted">${fmtDate(d)} • ${S.tactic==='attacking'?'Атакующая':S.tactic==='defensive'?'Защитная':'Сбалансированная'} • ${S.formation}</div>
      </div>
    </div>

    <div class="calendar-strip">
      ${calDays.map(cd=> `<div class="day ${cd.isToday?'active':''} ${cd.ev?'match has-match':''}" data-day="${cd.key}"><b>${String(cd.day).padStart(2,'0')}</b><span>${cd.ev? (cd.ev.type==='match'?'матч':'трени') : d.toLocaleDateString('ru-RU',{month:'short'})}</span></div>`).join('')}
    </div>

    <div class="row" style="flex-shrink:0">
      <button class="btn btn-ghost btn-sm" data-act="prevDay">←</button>
      <button class="btn btn-sm" data-act="nextDay">Далее →</button>
      <button class="btn btn-ghost btn-sm" data-act="save">Сохранить</button>
    </div>
  </div>

  <div class="game">
    <div class="game-left">
      <div class="club-card glass">
        <div class="club-badge" style="background: linear-gradient(135deg, ${club.colors[0]}, ${club.colors[1]});">${club.icon||'★'}</div>
        <div style="min-width:0">
          <b style="display:block; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${club.name}</b>
          <span class="small muted">${club.country} • ${club.stadium.toLocaleString('ru-RU')} мест</span>
        </div>
        <span class="badge" style="margin-left:auto">${fmtMoney(S.finances.balance)}</span>
      </div>

      <div class="nav-group">
        <div class="nav-title">Команда</div>
        ${navItem('news','📰','Центр новостей')+navItem('calendar','📅','Календарь')+navItem('tables','🏆','Таблицы')+navItem('first','👥','Основная команда')+navItem('reserve','🛡️','Резервная команда')+navItem('youth','🌱','Юношеская команда')+navItem('training','🏋️','Тренировки')+navItem('roles','⭐','Роли')+navItem('tactics','♟️','Тактика')}
        <div class="nav-title">Трансферы</div>
        ${navItem('contracts','📄','Контракты')}
        <div class="nav-title">Клуб</div>
        ${navItem('staff','👔','Персонал')+navItem('finances','💰','Финансы')+navItem('marketing','🛍️','Маркетинг')+navItem('kit','👕','Футболка')+navItem('tickets','🎟️','Билеты')+navItem('sponsors','🤝','Спонсоры')+navItem('trophies','🏅','Достижения')+navItem('fans','💬','Болельщики')}
        <div class="nav-title">Система</div>
        ${navItem('infra','🏟️','Инфраструктура')+navItem('career','📈','Карьера')+navItem('settings','⚙','Настройки')}
      </div>

      <div class="card" style="padding:12px; margin-top:auto">
        <div class="kicker">Ближайший матч</div>
        <div style="display:flex; align-items:center; gap:10px; margin-top:8px">
          <div class="avatar" style="background: linear-gradient(135deg, #F0C75E, #FF8A3D)">VS</div>
          <div><b>${S.nextMatch.opponent}</b><div class="small muted">${fmtDate(S.nextMatch.date)} • Дома</div></div>
        </div>
        <button class="btn btn-sm" style="width:100%; margin-top:10px" data-act="simMatch">Симулировать →</button>
      </div>
    </div>

    <div class="game-center">
      ${renderCenter()}
    </div>

    <div class="game-right">
      ${renderRight()}
    </div>
  </div>`;

  bindGameEvents();
}

function navItem(id, icon, label){
  return `<button class="nav-item ${S.view===id?'on':''}" data-view="${id}"><i>${icon}</i> ${label}</button>`;
}

function renderCenter(){
  const v=S.view;
  if(v==='news') return `
    <div class="section-head"><h3>Центр новостей</h3><span class="pill">${fmtDate(S.gameDate)}</span></div>
    <div class="news">
      ${S.news.map(n=> `<div class="card news-item"><img src="${n.img}"><div><h4>${n.title}</h4><p>${n.text}</p><div class="small muted" style="margin-top:6px">${n.time}</div></div></div>`).join('')}
    </div>
    <div class="card" style="padding:16px">
      <div class="kicker">Симуляция мира</div>
      <h4 style="margin:6px 0 6px">Все федерации в деле</h4>
      <p class="small muted" style="line-height:1.5; margin:0">Каждый день симулируются матчи по всем странам — таблицы обновляются. Твои юноши 10–13, 14–16, 17–19 прокачиваются по таланту.</p>
      <div class="row" style="margin-top:12px">
        <span class="tag accent">Талант 10 — ~1%</span><span class="tag gold">Level 90+ — элита</span><span class="tag">Зарплата / год</span>
      </div>
    </div>
  `;
  if(v==='calendar') return `
    <div class="section-head"><h3>Календарь — ${S.gameDate.toLocaleDateString('ru-RU',{month:'long', year:'numeric'})}</h3><button class="btn btn-ghost btn-sm" data-act="nextDay">Следующий день →</button></div>
    <div class="card" style="padding:12px">
      <div style="display:grid; grid-template-columns: repeat(7,1fr); gap:8px; font-family: JetBrains Mono; font-size:11px; color:var(--dim); text-align:center"><span>ПН</span><span>ВТ</span><span>СР</span><span>ЧТ</span><span>ПТ</span><span>СБ</span><span>ВС</span></div>
      <div style="display:grid; grid-template-columns: repeat(7,1fr); gap:8px; margin-top:10px">
        ${calendarGridHTML()}
      </div>
    </div>
  `;
  if(v==='tables') return `
    <div class="section-head"><h3>Таблицы</h3><div class="row"><select class="input" style="width:180px" data-table-country>${COUNTRIES.map(c=> `<option ${c.name===S.club.country?'selected':''}>${c.name}</option>`).join('')}</select><select class="input" style="width:180px" data-table-league>${S.selectedCountry.leagues.map(l=> `<option ${l===S.club.league?'selected':''}>${l}</option>`).join('')}</select></div></div>
    <div class="card" style="overflow:hidden">
      <table class="table"><thead><tr><th>#</th><th>Клуб</th><th>И</th><th>В</th><th>Н</th><th>П</th><th>Г</th><th>О</th></tr></thead><tbody>
        ${S.table.map((c,i)=> `<tr style="${c.name===S.club.name?'background: rgba(34,230,160,0.07)':''}"><td>${i+1}</td><td><b>${c.name}</b> ${c.name===S.club.name?'<span class="tag accent">ВЫ</span>':''}</td><td>${c.pld}</td><td>${c.w}</td><td>${c.d}</td><td>${c.l}</td><td>${c.gf}:${c.ga}</td><td><b>${c.pts}</b></td></tr>`).join('')}
      </tbody></table>
    </div>
    <div class="card" style="padding:14px">
      <div class="kicker">Международные турниры</div>
      <div class="hscroll" style="margin-top:10px">${TOURNAMENTS.map(t=> `<span class="pill">${t}</span>`).join('')}</div>
    </div>
  `;
  if(v==='first' || v==='reserve' || v==='youth') return renderSquadView(v);
  if(v==='training') return renderTraining();
  if(v==='roles') return renderRoles();
  if(v==='tactics') return renderTactics();
  if(v==='contracts') return renderContracts();
  if(v==='staff') return renderStaff();
  if(v==='finances') return renderFinances();
  if(v==='marketing') return renderMarketing();
  if(v==='kit') return renderKit();
  if(v==='tickets') return renderTickets();
  if(v==='sponsors') return renderSponsors();
  if(v==='trophies') return renderTrophies();
  if(v==='fans') return renderFans();
  if(v==='infra') return renderInfra();
  if(v==='career') return renderCareer();
  if(v==='settings') return renderSettingsCenter();
  return `<div class="card" style="padding:20px"><h3>Раздел в разработке</h3><p class="muted">Скоро здесь будет больше деталей.</p></div>`;
}

function calendarGridHTML(){
  const d=S.gameDate;
  const year=d.getFullYear(), month=d.getMonth();
  const firstDay = new Date(year, month, 1);
  let start = (firstDay.getDay()+6)%7; // Mon=0
  const days = new Date(year, month+1,0).getDate();
  let html='';
  for(let i=0;i<start;i++) html+=`<div style="height:86px; border-radius:16px; background: transparent"></div>`;
  for(let day=1; day<=days; day++){
    const key=`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const ev=S.calendarEvents[key];
    const isToday = day===d.getDate();
    html+=`<div style="height:86px; border-radius:16px; padding:10px; background:${isToday?'var(--accent)':'rgba(255,255,255,0.03)'}; border:1px solid ${isToday?'transparent':'rgba(255,255,255,0.06)'}; display:flex; flex-direction:column; justify-content:space-between">
      <b style="color:${isToday?'#05120D':'var(--text)'}">${String(day).padStart(2,'0')}</b>
      ${ev? `<span style="font-size:11px; padding:6px 8px; border-radius:999px; background:${ev.type==='match'?'var(--gold)':'rgba(79,124,255,0.18)'}; color:${ev.type==='match'?'#1A1400':'#C5D2FF'}; border:1px solid rgba(255,255,255,0.08); display:inline-flex; align-items:center; gap:4px">${ev.type==='match'?'⚽ '+ev.opponent: ev.label}</span>` : `<span class="small muted">—</span>`}
    </div>`;
  }
  return html;
}

function renderSquadView(view){
  let list=[], title='', sub='';
  if(view==='first'){ list=S.squad.first; title='Основная команда'; sub='22 игрока • стартовые 11 отмечены';}
  if(view==='reserve'){ list=S.squad.reserve; title='Резервная команда'; sub='Ближайший резерв — уровень чуть ниже основы';}
  if(view==='youth'){
    const tabs = [{id:'y10',label:'10–13 лет'},{id:'y14',label:'14–16 лет'},{id:'y17',label:'17–19 лет'}];
    const cur = S.youthTab;
    const curList = S.squad[cur];
    return `
    <div class="section-head"><div><h3>Юношеская команда</h3><div class="small muted">Академия • таланты растут со временем</div></div><div class="row">${tabs.map(t=> `<button class="btn ${cur===t.id?'':'btn-ghost'} btn-sm" data-youth="${t.id}">${t.label}</button>`).join('')}</div></div>
    <div class="squad-layout">
      <div class="card" style="padding:12px">
        <div class="kicker" style="margin-bottom:8px">${tabs.find(t=>t.id===cur).label} — ${curList.length} игроков</div>
        <div style="display:flex; flex-direction:column; gap:8px; max-height:560px; overflow:auto; padding-right:4px">
          ${curList.map(p=> playerRow(p)).join('')}
        </div>
      </div>
      <div class="pitch">
        <div class="kicker" style="color:rgba(255,255,255,0.6)">Схема ${S.formation} • Просмотр академии</div>
        <div class="pitch-grid">
          <div class="pitch-row">${curList.slice(0,1).map(p=> pitchChip(p)).join('')}</div>
          <div class="pitch-row">${curList.slice(1,4).map(p=> pitchChip(p)).join('')}</div>
          <div class="pitch-row">${curList.slice(4,7).map(p=> pitchChip(p)).join('')}</div>
          <div class="pitch-row">${curList.slice(7,11).map(p=> pitchChip(p)).join('')}</div>
        </div>
        <div class="row" style="position:relative; z-index:2; margin-top:12px"><button class="btn btn-ghost btn-sm" data-act="promote">Перевести в резерв ↑</button><span class="small muted">Талант 8–10 — береги, прокачка ×1.6</span></div>
      </div>
    </div>`;
  }
  // first / reserve
  return `
  <div class="section-head"><div><h3>${title}</h3><div class="small muted">${sub}</div></div>
    <div class="row"><button class="btn btn-ghost btn-sm" data-act="roles">Роли ⭐</button><button class="btn btn-ghost btn-sm" data-act="tactics">Тактика ♟️</button></div>
  </div>
  <div class="squad-layout">
    <div class="card" style="padding:12px">
      <div class="row" style="justify-content:space-between; margin-bottom:8px"><span class="kicker">Список игроков</span><span class="pill">${list.length} игроков</span></div>
      <div style="display:flex; flex-direction:column; gap:8px; max-height:560px; overflow:auto; padding-right:4px">
        ${list.map(p=> playerRow(p)).join('')}
      </div>
    </div>
    <div class="pitch">
      <div class="kicker" style="color:rgba(255,255,255,0.6)">Расстановка • ${S.formation}</div>
      <div class="pitch-grid">
        <div class="pitch-row">${list.slice(9,10).map(p=> pitchChip(p)).join('')}</div>
        <div class="pitch-row">${[list[8],list[10]].filter(Boolean).map(p=> pitchChip(p)).join('')}</div>
        <div class="pitch-row">${[list[5],list[6],list[7]].filter(Boolean).map(p=> pitchChip(p)).join('')}</div>
        <div class="pitch-row">${[list[1],list[2],list[3],list[4]].filter(Boolean).map(p=> pitchChip(p)).join('')}</div>
        <div class="pitch-row">${[list[0]].filter(Boolean).map(p=> pitchChip(p)).join('')}</div>
      </div>
      <div class="row" style="position:relative; z-index:2; margin-top:12px">
        <select class="input" style="width:160px" data-formation><option>4-3-3</option><option>4-4-2</option><option>3-5-2</option><option>4-2-3-1</option></select>
        <button class="btn btn-sm" data-act="autoPick">Авто-состав</button>
      </div>
    </div>
  </div>`;
}
function playerRow(p){
  return `<div class="player-row">
    <div class="avatar" style="background: linear-gradient(135deg, ${levelColor(p.level)}, #1A2540)">${p.name.split(' ').map(s=>s[0]).join('')}</div>
    <div style="flex:1; min-width:0"><b style="font-size:13px">${p.name} <span class="muted" style="font-weight:600">• ${p.pos}</span></b><div class="small muted">${p.age} лет • ${fmtMoney(p.salary)}/год • до ${p.contract} ${p.injury?'• <span style="color:var(--red)">травма</span>':''}</div></div>
    <div style="text-align:right">
      <div style="font-weight:800; color:${levelColor(p.level)}">${p.level}</div>
      <div class="tag ${p.talent>=8?'gold': p.talent>=6?'accent':''}" style="font-size:11px">${p.talent}★</div>
    </div>
  </div>`;
}
function pitchChip(p){
  if(!p) return '';
  return `<div class="player-chip"><b>${p.name.split(' ')[0]}</b><span>${p.pos} • ${p.age}л</span><div class="lvl" style="background:${p.level>=80?'rgba(240,199,94,0.18)':'rgba(34,230,160,0.14)'}; color:${p.level>=80?'var(--gold)':'var(--accent)'}">${p.level} • ${p.talent}★</div></div>`;
}

function renderTraining(){
  return `
  <div class="section-head"><h3>Тренировки</h3><span class="badge">Неделя ${Math.floor((S.gameDate.getDate()/7))+1}</span></div>
  <div class="grid2">
    ${[
      {icon:'⚡', title:'Физика', desc:'Выносливость, скорость, сила. +1 к уровню/месяц для молодёжи.'},
      {icon:'🎯', title:'Техника', desc:'Пас, дриблинг, удар. Влияет на форму.'},
      {icon:'🧠', title:'Тактика', desc:'Позиционная игра, прессинг, стандарты.'},
      {icon:'🥅', title:'Вратари', desc:'Реакция, игра на выходах, пенальти.'},
      {icon:'🩺', title:'Восстановление', desc:'Снижает травмы, ускоряет форму.'},
      {icon:'👥', title:'Командная', desc:'Сыграность, мораль, прессинг.'},
    ].map(c=> `<div class="card" style="padding:14px"><div style="display:flex; gap:10px; align-items:center"><span style="width:36px;height:36px; border-radius:11px; display:grid; place-items:center; background: rgba(34,230,160,0.12); border:1px solid rgba(34,230,160,0.16)">${c.icon}</span><b>${c.title}</b><span class="tag" style="margin-left:auto">Настроить</span></div><p class="small muted" style="margin:8px 0 0; line-height:1.5">${c.desc}</p><div style="margin-top:10px; height:6px; border-radius:999px; background: rgba(255,255,255,0.06); overflow:hidden"><div style="width:${40+Math.floor(Math.random()*50)}%; height:100%; background: linear-gradient(90deg, var(--accent), var(--gold))"></div></div></div>`).join('')}
  </div>
  <div class="card" style="padding:14px; display:flex; gap:10px; align-items:center"><b>Интенсивность:</b> <input type="range" style="flex:1; accent-color: var(--accent)" value="62"><span class="pill">Сбалансировано</span><button class="btn btn-sm">Сохранить</button></div>`;
}
function renderRoles(){
  const all = [...S.squad.first, ...S.squad.reserve];
  const opts = all.map(p=> `<option value="${p.id}" ${S.roles.captain===p.id?'selected':''}>${p.name} • ${p.level} • ${p.pos}</option>`).join('');
  return `
  <div class="section-head"><h3>Роли</h3><span class="muted small">Назначь лидеров стандартов</span></div>
  <div class="card" style="padding:16px; display:grid; gap:14px">
    ${[
      {k:'captain', label:'Капитан', icon:'©'},
      {k:'freekick', label:'Исполнитель штрафных', icon:'🎯'},
      {k:'penalty', label:'Исполнитель пенальти', icon:'⚽'},
      {k:'corners', label:'Исполнитель угловых', icon:'↗'},
    ].map(r=> `<label style="display:grid; gap:6px"><span class="kicker">${r.icon} ${r.label}</span><select class="input" data-role="${r.k}"><option value="">— не выбрано —</option>${all.map(p=> `<option value="${p.id}" ${S.roles[r.k]===p.id?'selected':''}>${p.name} • ${p.level}</option>`).join('')}</select></label>`).join('')}
    <label style="display:grid; gap:6px"><span class="kicker">Серия пенальти (5 игроков, порядок)</span><div class="row">${[0,1,2,3,4].map(i=> `<select class="input" data-pen="${i}" style="flex:1"><option value="">—</option>${all.map(p=> `<option value="${p.id}" ${S.roles.pens[i]===p.id?'selected':''}>${p.name}</option>`).join('')}</select>`).join('')}</div></label>
    <button class="btn" data-act="saveRoles">Сохранить роли</button>
  </div>`;
}
function renderTactics(){
  return `
  <div class="section-head"><h3>Тактика</h3><span class="pill">${S.formation} • ${S.tactic}</span></div>
  <div class="card" style="padding:16px">
    <div class="kicker">Стиль</div>
    <div class="opt-grid" style="margin-top:10px">
      ${[{id:'defensive', title:'Защитная', desc:'Низкий блок, контратаки, плотность сзади.'},{id:'balanced', title:'Сбалансированная', desc:'Контроль и переходы. Универсально.'},{id:'attacking', title:'Атакующая', desc:'Высокий прессинг, владение, риск сзади.'}].map(o=> `<div class="opt ${S.tactic===o.id?'sel':''}" data-tactic="${o.id}"><h4>${o.title}</h4><p>${o.desc}</p></div>`).join('')}
    </div>
    <div class="divider"></div>
    <div class="kicker">Детальные настройки</div>
    <div class="grid2" style="margin-top:10px">
      <label>Линия обороны<input type="range" data-detail="defLine" style="width:100%; accent-color: var(--accent)"></label>
      <label>Прессинг<input type="range" data-detail="press" style="width:100%; accent-color: var(--accent)"></label>
      <label>Темп<input type="range" data-detail="tempo" style="width:100%; accent-color: var(--accent)"></label>
      <label>Ширина<input type="range" data-detail="width" style="width:100%; accent-color: var(--accent)"></label>
    </div>
    <button class="btn" style="margin-top:14px" data-act="saveTactic">Применить →</button>
  </div>`;
}
function renderContracts(){
  const list=[...S.squad.first, ...S.squad.reserve].sort((a,b)=> b.salary-a.salary);
  return `
  <div class="section-head"><h3>Контракты</h3><span class="pill">${list.length} игроков • зарплаты за год</span></div>
  <div class="card" style="overflow:auto">
    <table class="table"><thead><tr><th>Игрок</th><th>Позиция</th><th>Уровень</th><th>Талант</th><th>Зарплата / год</th><th>До</th><th></th></tr></thead><tbody>
      ${list.map(p=> `<tr><td><b>${p.name}</b></td><td>${p.pos}</td><td style="color:${levelColor(p.level)}"><b>${p.level}</b></td><td>${p.talent}★</td><td>${fmtMoney(p.salary)}</td><td>${p.contract}</td><td><button class="btn btn-ghost btn-sm" data-contract="${p.id}">⋯</button></td></tr>`).join('')}
    </tbody></table>
  </div>`;
}
function renderStaff(){
  const staff = [
    ['Ассистент менеджера','Помогает с тактикой и прессой', '92', '—'],
    ['Тренер резерва','Готовит ближайший резерв','78','—'],
    ['Тренер молодёжки','Академия 10–19 лет','84','—'],
    ['Тренер вратарей','Реакция и выходы','81','—'],
    ['Тренер по физподготовке','Выносливость','79','—'],
    ['Врач','Снижает травмы','88','—'],
    ['Массажист','Восстановление','76','—'],
    ['Психолог','Мораль и стресс','82','—'],
    ['Технический директор','Селекция','90','—'],
    ['Директор по маркетингу','Продажи атрибутики','85','—'],
    ['Спортивный директор','Трансферы','87','—'],
    ['Директор по строительству','Стадион и база','80','—'],
    ['Координатор болельщиков','Настроение трибун','77','—'],
    ['Пресс-атташе','Медиа','75','—'],
    ['Юрист','Контракты','83','—'],
    ['Скаут','Поиск талантов','89','—'],
  ];
  return `<div class="section-head"><h3>Персонал</h3><span class="badge">${staff.length} сотрудников</span></div>
  <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); gap:12px">
    ${staff.map(([role,desc,lvl])=> `<div class="card" style="padding:14px"><div style="display:flex; gap:10px; align-items:center"><div class="avatar" style="background: linear-gradient(135deg, #1A2540, #0E1420); border:1px solid rgba(255,255,255,0.06)">👔</div><div><b style="font-size:13px">${role}</b><div class="small muted">${desc}</div></div><span class="tag accent" style="margin-left:auto">${lvl}</span></div><div class="row" style="margin-top:10px"><button class="btn btn-ghost btn-sm">Профиль</button><button class="btn btn-ghost btn-sm">Контракт</button></div></div>`).join('')}
  </div>`;
}
function renderFinances(){
  return `
  <div class="section-head"><h3>Финансы</h3><span class="pill">Баланс ${fmtMoney(S.finances.balance)}</span></div>
  <div class="grid2">
    <div class="card kpi"><span class="kicker">Баланс</span><b style="color:var(--accent)">${fmtMoney(S.finances.balance)}</b><span class="small muted">Доходы – расходы</span></div>
    <div class="card kpi"><span class="kicker">Доходы / год</span><b>${fmtMoney(S.finances.income)}</b><span class="small muted">Билеты, ТВ, спонсоры, мерч</span></div>
    <div class="card kpi"><span class="kicker">Расходы / год</span><b style="color:var(--red)">${fmtMoney(S.finances.expenses)}</b><span class="small muted">Зарплаты, инфраструктура</span></div>
    <div class="card kpi"><span class="kicker">Зарплатная ведомость</span><b>${fmtMoney([...S.squad.first,...S.squad.reserve].reduce((s,p)=>s+p.salary,0))} / год</b><span class="small muted">${S.squad.first.length+S.squad.reserve.length} контрактов</span></div>
  </div>
  <div class="card" style="padding:14px; margin-top:14px"><div class="kicker">Детализация</div><div style="height:120px; display:flex; align-items:end; gap:8px; margin-top:12px">${[60,72,44,88,66,54,92,78].map(h=> `<div style="flex:1; height:${h}%; background: linear-gradient(180deg, var(--accent), #0DBF88); border-radius:8px 8px 0 0"></div>`).join('')}</div><div class="small muted" style="margin-top:8px">Прогноз: +${fmtMoney(Math.round(S.finances.income*0.18))} к концу сезона при удержании места в лиге.</div></div>`;
}
function renderMarketing(){
  const items=[
    ['Футболки','1 240 шт/мес','42% маржа'],
    ['Куртки','420 шт/мес','38%'],
    ['Шарфы','980 шт/мес','55%'],
    ['Спортивные костюмы','310 шт/мес','35%'],
    ['Кружки','760 шт/мес','62%'],
    ['Кепки','540 шт/мес','48%'],
    ['Рюкзаки','210 шт/мес','40%'],
    ['Мячи с лого','330 шт/мес','36%'],
  ];
  return `<div class="section-head"><h3>Маркетинг</h3><span class="badge">Мерч • бренд</span></div>
  <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(210px,1fr)); gap:12px">
    ${items.map(([name,vol,margin])=> `<div class="card" style="padding:14px"><b>${name}</b><div class="small muted">${vol}</div><div class="tag" style="margin-top:8px; display:inline-flex">${margin}</div><div style="margin-top:10px; height:6px; border-radius:999px; background: rgba(255,255,255,0.06); overflow:hidden"><div style="width:${36+Math.floor(Math.random()*54)}%; height:100%; background: linear-gradient(90deg, var(--gold), var(--accent))"></div></div></div>`).join('')}
  </div>
  <div class="card" style="padding:14px; margin-top:14px; display:flex; gap:12px; align-items:center"><b>Бренд-сила:</b><div style="flex:1; height:8px; border-radius:999px; background: rgba(255,255,255,0.06); overflow:hidden"><div style="width:68%; height:100%; background: linear-gradient(90deg, var(--accent), var(--gold))"></div></div><span class="pill">68 / 100</span></div>`;
}
function renderKit(){
  return `<div class="section-head"><h3>Футболка</h3><span class="pill">Домашний • Гостевой</span></div>
  <div class="grid2">
    ${['Домашний комплект','Гостевой комплект'].map((t,i)=> `<div class="card" style="padding:16px; text-align:center"><div class="kicker">${t}</div><div style="width:120px;height:140px; margin:12px auto; border-radius:18px; background: linear-gradient(180deg, ${S.club.colors[i%2]}, #0E1420); border:1px solid rgba(255,255,255,0.08); display:grid; place-items:center; font-size:36px; color:white">${S.club.icon}</div><div class="row" style="justify-content:center"><input type="color" value="${S.club.colors[0]}" data-kit="${i}" class="input" style="width:80px; height:40px; padding:4px"><select class="input" style="width:140px"><option>Полосы</option><option>Однотон</option><option>Диагональ</option><option>Классика</option></select></div></div>`).join('')}
  </div>`;
}
function renderTickets(){
  const sectors=[['VIP','12 000 ₸','92% заполняемость'],['Запад','7 500 ₸','84%'],['Восток','5 000 ₸','78%'],['Север','3 500 ₸','71%'],['Юг (фанатский)','2 000 ₸','96%'],['Семейный','4 000 ₸','69%']];
  return `<div class="section-head"><h3>Билеты</h3><span class="badge">Гибкая цена</span></div>
  <div class="card" style="overflow:hidden"><table class="table"><thead><tr><th>Сектор</th><th>Цена</th><th>Заполнение</th><th></th></tr></thead><tbody>${sectors.map(([name,price,fill])=> `<tr><td><b>${name}</b></td><td>${price}</td><td>${fill}</td><td><input type="range" style="accent-color: var(--accent)"></td></tr>`).join('')}</tbody></table></div>
  <div class="small muted" style="margin-top:8px">Повышай цену на дерби, снижай — на кубковые матчи с андердогами.</div>`;
}
function renderSponsors(){
  return `<div class="section-head"><h3>Спонсоры</h3><span class="pill">Текущие + предложения</span></div>
  <div class="grid2">
    <div class="card" style="padding:14px"><div class="kicker">Титульный</div><h4 style="margin:6px 0">AERON • 620k $/год</h4><p class="small muted">Лого на груди. Бонус за ЛЧ: +180k $</p><span class="tag accent">Активен до 2028</span></div>
    <div class="card" style="padding:14px"><div class="kicker">Технический</div><h4 style="margin:6px 0">STRIDE • экипировка + 240k $/год</h4><p class="small muted">Поставка формы и мячей</p><span class="tag accent">Активен</span></div>
  </div>
  <div class="card" style="padding:14px; margin-top:12px"><div class="kicker">Предложения</div>
    ${[
      ['NOVA Bank','540k $/год','Требует 3 поста в соцсетях/мес'],
      ['Volt Energy','480k $/год','Бонус за топ-4'],
      ['City Motors','510k $/год','Лого на рукаве'],
    ].map(([name,money,cond])=> `<div class="player-row" style="justify-content:space-between"><div><b>${name}</b><div class="small muted">${cond}</div></div><div style="text-align:right"><b style="color:var(--gold)">${money}</b><div><button class="btn btn-sm" style="margin-top:6px">Принять</button></div></div></div>`).join('')}
  </div>`;
}
function renderTrophies(){
  return `<div class="section-head"><h3>Достижения</h3><span class="pill">${S.club.name}</span></div>
  <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap:12px">
    ${[
      ['🏆','Чемпионат','0 титулов','Золото лиги'],
      ['🏆','Кубок страны','0','Нокаут-турнир'],
      ['✨','Лига Чемпионов','0','Европа • элита'],
      ['🌍','Лига Европы','0','Второй евро-трофей'],
      ['🔷','Суперкубок','0','Чемпион vs Обладатель кубка'],
    ].map(([icon,title,count,desc])=> `<div class="card" style="padding:16px; text-align:center"><div style="font-size:28px">${icon}</div><b>${title}</b><div class="small muted">${desc}</div><div class="tag" style="margin-top:8px">${count}</div></div>`).join('')}
  </div>
  <div class="card" style="padding:14px; margin-top:12px"><div class="kicker">Зал славы</div><p class="small muted" style="margin:6px 0 0">Пока пусто — но твой первый кубок появится здесь с датой и счётом финала. Дизайн кубков — минимализм с золотым градиентом и гравировкой сезона.</p></div>`;
}
function renderFans(){
  const good = S.squad.first.filter(p=> p.level>=78).slice(0,2);
  const bad = S.squad.first.filter(p=> p.level<=55).slice(0,1);
  return `<div class="section-head"><h3>Болельщики</h3><span class="badge">Настроение 74 / 100 • Довольны</span></div>
  <div class="card" style="padding:14px"><div style="height:8px; border-radius:999px; background: rgba(255,255,255,0.06); overflow:hidden"><div style="width:74%; height:100%; background: linear-gradient(90deg, var(--accent), var(--gold))"></div></div><div class="row" style="margin-top:10px"><span class="pill">Ожидают топ-6</span><span class="pill">Хотят атакующий футбол</span><span class="pill">Любят воспитанников</span></div></div>
  <div style="display:grid; gap:10px; margin-top:12px">
    ${good.map(p=> `<div class="card" style="padding:12px"><b>💚 @fan_${p.name.split(' ')[0].toLowerCase()}</b><p class="small" style="margin:6px 0 0; line-height:1.5">«${p.name} — просто космос! Уровень ${p.level}, техника на высоте. Дайте ему капитанскую повязку!»</p><span class="tag accent">${p.level} • ${p.talent}★ • хвалят</span></div>`).join('')}
    ${bad.map(p=> `<div class="card" style="padding:12px"><b>😤 @ultra_voice</b><p class="small" style="margin:6px 0 0; line-height:1.5">«${p.name} выпадает, уровень ${p.level} — не тянет. Может в аренду? Ждём прогресса.»</p><span class="tag" style="background: rgba(255,77,106,0.12); color:var(--red); border-color: rgba(255,77,106,0.18)">${p.level} • критика</span></div>`).join('')}
    <div class="card" style="padding:12px"><b>🗣️ @neutral</b><p class="small" style="margin:6px 0 0; line-height:1.5">«Тренировки наконец-то сбалансированы, молодёжь 17–19 лет прибавляет. Верим в проект!»</p></div>
  </div>`;
}
function renderInfra(){
  return `<div class="section-head"><h3>Инфраструктура</h3><span class="pill">Уровень 3 / 10</span></div>
  <div class="grid2">
    ${[
      ['Стадион',`${S.club.stadium.toLocaleString('ru-RU')} мест`,'Расширить до 18k — 1.1M $'],
      ['База','Поля и тренажёрка','Апгрейд — 420k $'],
      ['Академия','Юноши 10–19','Скауты +2 — 260k $/год'],
      ['Медцентр','Восстановление','Снижает травмы на 18%'],
      ['Аналитика','xG, трекинг','Подписка — 85k $/год'],
      ['Фан-зона','Магазин и музей','Доход +12% к мерчу'],
    ].map(([t,d,act])=> `<div class="card" style="padding:14px"><b>${t}</b><div class="small muted">${d}</div><div class="pill" style="margin-top:8px; display:inline-flex">${act}</div><button class="btn btn-ghost btn-sm" style="margin-top:10px; width:100%">Улучшить</button></div>`).join('')}
  </div>`;
}
function renderCareer(){
  return `<div class="section-head"><h3>Карьера</h3><span class="pill">${S.manager.first} ${S.manager.last} • ${S.manager.nat}</span></div>
  <div class="card" style="padding:14px"><div class="kicker">Статистика</div><div class="grid2" style="margin-top:10px">
    <div class="kpi" style="background: rgba(255,255,255,0.03)"><b>0 — 0 — 0</b><span>В-Н-П • первый сезон</span></div>
    <div class="kpi" style="background: rgba(255,255,255,0.03)"><b>74</b><span>Рейтинг менеджера</span></div>
  </div>
  <div class="row" style="margin-top:12px"><span class="tag accent">${S.owner?'Владелец':'Менеджер'}</span><span class="tag">${S.dismissal?'С увольнением':'Без увольнения'}</span><span class="tag gold">${S.club.country}</span></div></div>
  <div class="card" style="padding:14px; margin-top:12px"><div class="kicker">История</div><p class="small muted" style="margin:6px 0 0">Сезон 2026/27 — назначение в ${S.club.name}. Первая цель: закрепиться в ${S.club.league}.</p></div>`;
}
function renderSettingsCenter(){
  return `<div class="section-head"><h3>Настройки</h3><span class="pill">Elite Dark</span></div>
  <div class="card" style="padding:16px; display:grid; gap:12px">
    <label class="checkrow"><input type="checkbox" checked> Тёмная тема Eye-Care (уже включена)</label>
    <label class="checkrow"><input type="checkbox" checked> Автосохранение каждый день</label>
    <label class="checkrow"><input type="checkbox"> Уведомления о травмах</label>
    <div class="row"><button class="btn btn-ghost" data-act="reset">Сбросить прогресс</button><button class="btn" data-act="save">Сохранить сейчас</button></div>
  </div>`;
}

function renderRight(){
  // dynamic right panel based on view
  if(S.view==='first' || S.view==='reserve' || S.view==='youth'){
    const topTalent = [...S.squad.first].sort((a,b)=> b.talent-a.talent).slice(0,3);
    const squadList = S.view==='youth' ? S.squad[S.youthTab] : S.squad.first;
    return `
    <div class="card" style="padding:14px">
      <div class="kicker">Скаут-отчёт</div>
      <h4 style="margin:6px 0 4px">Таланты недели</h4>
      ${topTalent.map(p=> `<div class="player-row" style="padding:8px 10px"><div><b style="font-size:12px">${p.name}</b><div class="small muted">${p.pos} • ${talentStars(p.talent)}</div></div><b style="margin-left:auto; color:${levelColor(p.level)}">${p.level}</b></div>`).join('')}
    </div>
    <div class="card" style="padding:14px">
      <div class="kicker">Зарплатная ведомость</div>
      <div class="kpi" style="padding:10px"><b>${fmtMoney([...S.squad.first, ...S.squad.reserve].reduce((s,p)=>s+p.salary,0))} / год</b><span>Средний уровень основы: ${Math.round(S.squad.first.reduce((s,p)=>s+p.level,0)/S.squad.first.length)}</span></div>
      <button class="btn btn-ghost btn-sm" style="width:100%; margin-top:10px" data-view-go="contracts">К контрактам →</button>
    </div>
    <div class="card" style="padding:14px">
      <div class="kicker">Совет</div><p class="small muted" style="margin:6px 0 0; line-height:1.5">Резерв в среднем слабее основы на старте — это норма. Переводи лучших юношей 17–19 в резерв, а из резерва — в основу.</p>
    </div>
    `;
  }
  // default right for news
  return `
  <div class="card" style="padding:14px">
    <div class="kicker">Детали дня</div>
    <h4 style="margin:6px 0 4px">${fmtDate(S.gameDate)}</h4>
    <p class="small muted" style="margin:0; line-height:1.5">${S.calendarEvents[`${S.gameDate.getFullYear()}-${String(S.gameDate.getMonth()+1).padStart(2,'0')}-${String(S.gameDate.getDate()).padStart(2,'0')}`]?.type==='match' ? 'Матч дня — не забудь выбрать состав и тактику.' : 'Тренировочный день — прокачка талантов.'}</p>
    <div class="row" style="margin-top:10px"><button class="btn btn-sm" data-act="nextDay">Прожить день →</button><button class="btn btn-ghost btn-sm" data-view-go="calendar">Календарь</button></div>
  </div>
  <div class="card" style="padding:14px">
    <div class="kicker">Финансы кратко</div>
    <div style="display:grid; gap:8px; margin-top:8px">
      <div class="player-row" style="padding:8px 10px"><span class="small">Баланс</span><b style="margin-left:auto; color:var(--accent)">${fmtMoney(S.finances.balance)}</b></div>
      <div class="player-row" style="padding:8px 10px"><span class="small">Доходы</span><b style="margin-left:auto">${fmtMoney(S.finances.income)}</b></div>
      <div class="player-row" style="padding:8px 10px"><span class="small">Расходы</span><b style="margin-left:auto; color:var(--red)">${fmtMoney(S.finances.expenses)}</b></div>
    </div>
  </div>
  <div class="card" style="padding:14px">
    <div class="kicker">Турниры</div>
    <div class="hscroll" style="margin-top:8px">${TOURNAMENTS.slice(0,4).map(t=> `<span class="pill">${t}</span>`).join('')}</div>
    <button class="btn btn-ghost btn-sm" style="width:100%; margin-top:10px" data-view-go="tables">К таблицам →</button>
  </div>
  `;
}

function bindGameEvents(){
  $app.querySelectorAll('[data-view]').forEach(b=> b.addEventListener('click', ()=>{ S.view=b.dataset.view; save(); render(); }));
  $app.querySelectorAll('[data-view-go]').forEach(b=> b.addEventListener('click', ()=>{ S.view=b.dataset.viewGo; save(); render(); }));
  $app.querySelector('[data-act="nextDay"]')?.addEventListener('click', nextDay);
  $app.querySelector('[data-act="prevDay"]')?.addEventListener('click', prevDay);
  $app.querySelectorAll('[data-act="save"]').forEach(b=> b.addEventListener('click', ()=>{ save(); toast('Сохранено'); }));
  $app.querySelector('[data-act="reset"]')?.addEventListener('click', ()=>{ localStorage.removeItem('fm_elite_save'); location.reload(); });
  $app.querySelector('[data-act="simMatch"]')?.addEventListener('click', simMatch);
  $app.querySelectorAll('[data-day]').forEach(el=> el.addEventListener('click', ()=>{
    const [y,m,d]=el.dataset.day.split('-').map(Number);
    S.gameDate=new Date(y,m-1,d); save(); render();
  }));
  $app.querySelectorAll('[data-youth]').forEach(b=> b.addEventListener('click', ()=>{ S.youthTab=b.dataset.youth; render(); }));
  $app.querySelector('[data-act="promote"]')?.addEventListener('click', ()=>{
    const src=S.squad[S.youthTab][0];
    if(!src) return;
    S.squad.reserve.unshift({...src, id: Math.random().toString(36).slice(2,9)});
    S.squad[S.youthTab].shift();
    S.squad[S.youthTab].push(genPlayer(S.youthTab));
    toast(`${src.name} переведён в резерв`);
    save(); render();
  });
  $app.querySelector('[data-formation]')?.addEventListener('change', e=>{ S.formation=e.target.value; save(); render(); });
  $app.querySelector('[data-act="autoPick"]')?.addEventListener('click', ()=>{
    S.squad.first.sort((a,b)=> b.level-a.level);
    toast('Состав отсортирован по уровню');
    save(); render();
  });
  $app.querySelectorAll('[data-tactic]').forEach(el=> el.addEventListener('click', ()=>{ S.tactic=el.dataset.tactic; render(); }));
  $app.querySelector('[data-act="saveTactic"]')?.addEventListener('click', ()=>{ save(); toast('Тактика сохранена: '+S.tactic); });
  $app.querySelector('[data-act="saveRoles"]')?.addEventListener('click', ()=>{
    // collect roles
    $app.querySelectorAll('[data-role]').forEach(sel=>{ S.roles[sel.dataset.role]= sel.value || null; });
    $app.querySelectorAll('[data-pen]').forEach(sel=>{ S.roles.pens[parseInt(sel.dataset.pen)]= sel.value || null; });
    save(); toast('Роли сохранены');
  });
  $app.querySelector('[data-act="roles"]')?.addEventListener('click', ()=>{ S.view='roles'; save(); render(); });
  $app.querySelector('[data-act="tactics"]')?.addEventListener('click', ()=>{ S.view='tactics'; save(); render(); });
  $app.querySelectorAll('[data-contract]').forEach(b=> b.addEventListener('click', ()=>{
    const p=[...S.squad.first,...S.squad.reserve].find(x=> x.id===b.dataset.contract);
    if(!p) return;
    openModal(`
      <div class="kicker">${p.pos} • ${p.level} • ${p.talent}★</div>
      <h3 style="margin:6px 0">${p.name}</h3>
      <p class="small muted">Контракт до ${p.contract} • ${fmtMoney(p.salary)}/год • ${p.age} лет</p>
      <div class="row" style="margin-top:12px">
        <button class="btn btn-sm" data-contract-act="extend">Продлить +1 год</button>
        <button class="btn btn-ghost btn-sm" data-contract-act="raise">Повысить зарплату +12%</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--red); border-color: rgba(255,77,106,0.18)" data-contract-act="terminate">Расторгнуть</button>
      </div>
    `, (modal)=>{
      modal.querySelector('[data-contract-act="extend"]')?.addEventListener('click', ()=>{
        p.contract+=1; p.salary=Math.round(p.salary*1.06); toast('Контракт продлён до '+p.contract); save(); render(); closeModal();
      });
      modal.querySelector('[data-contract-act="raise"]')?.addEventListener('click', ()=>{
        p.salary=Math.round(p.salary*1.12); toast('Зарплата повышена'); save(); render(); closeModal();
      });
      modal.querySelector('[data-contract-act="terminate"]')?.addEventListener('click', ()=>{
        S.squad.first=S.squad.first.filter(x=> x.id!==p.id);
        S.squad.reserve=S.squad.reserve.filter(x=> x.id!==p.id);
        toast('Контракт расторгнут'); save(); render(); closeModal();
      });
    });
  }));
  // kit color
  $app.querySelectorAll('[data-kit]').forEach(inp=> inp.addEventListener('input', e=>{
    S.club.colors[parseInt(e.target.dataset.kit)] = e.target.value;
    save(); render();
  }));
}

function nextDay(){
  const d = S.gameDate instanceof Date ? new Date(S.gameDate) : new Date(S.gameDate);
  d.setDate(d.getDate()+1);
  S.gameDate=d;
  // simulate day: random news, maybe match
  const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const ev=S.calendarEvents[key];
  if(ev?.type==='match'){
    // proper round-robin simulation: each team plays one match per round
    const n = S.table.length;
    const round = [];
    for(let i=0;i<n/2;i++){
      const a = S.table[i];
      const b = S.table[n-1-i];
      round.push([a,b]);
    }
    for(const [a,b] of round){
      const res = simScore(a.form,b.form);
      a.gf+=res.a; b.gf+=res.b; a.ga+=res.b; b.ga+=res.a;
      a.pld++; b.pld++;
      if(res.a>res.b){a.w++;a.pts+=3;b.l++}
      else if(res.b>res.a){b.w++;b.pts+=3;a.l++}
      else {a.d++;b.d++;a.pts++;b.pts++}
    }
    S.table.sort((a,b)=> b.pts-a.pts || (b.gf-b.ga)-(a.gf-a.ga));
    S.news.unshift({id: Date.now(), title:`Матч-день: ${S.club.name} — ${ev.opponent}`, text:'Силовой прессинг и стандарты решат исход. Выбери тактику и роли.', time:'Сегодня '+d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}), img:'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=200&auto=format&fit=crop'});
  } else {
    // small training progress for youths
    ['y10','y14','y17'].forEach(g=>{
      S.squad[g].forEach(p=>{ if(p.talent>=7 && Math.random()<0.18) p.level=Math.min(99,p.level+1); else if(Math.random()<0.08) p.level=Math.min(99,p.level+1); });
    });
    if(Math.random()<0.15){
      S.news.unshift({id: Date.now(), title:'Академия прогрессирует', text:'Юноши 17–19 прибавили в технике. Талант решает скорость роста.', time:'Сегодня '+d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}), img:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=200&auto=format&fit=crop'});
    }
  }
  // finances tick
  if(d.getDate()===1) S.finances.balance += Math.round((S.finances.income - S.finances.expenses)/12);

  // trim news
  if(S.news.length>12) S.news=S.news.slice(0,12);
  save(); render();
  toast(ev?.type==='match' ? 'Матч-день!' : 'День прожит • прогресс сохранён');
}
function prevDay(){
  const d = S.gameDate instanceof Date ? new Date(S.gameDate) : new Date(S.gameDate);
  d.setDate(d.getDate()-1);
  S.gameDate=d; save(); render();
}
function simMatch(){
  const myForm = Math.round(S.squad.first.slice(0,11).reduce((s,p)=>s+p.level,0)/11);
  const oppForm = 68 + Math.floor(Math.random()*16);
  const res = simScore(myForm, oppForm);
  const win = res.a>res.b ? 'Победа' : res.a===res.b ? 'Ничья' : 'Поражение';
  const color = win==='Победа'?'var(--accent)': win==='Ничья'?'var(--gold)':'var(--red)';
  // update table - proper round: my team + opponent + 5 other matches
  const me = S.table.find(c=> c.name===S.club.name);
  const opp = S.table.find(c=> c.name===S.nextMatch.opponent);
  if(me){ me.pld++; me.gf+=res.a; me.ga+=res.b; if(res.a>res.b){me.w++;me.pts+=3} else if(res.a===res.b){me.d++;me.pts+=1}else{me.l++} }
  if(opp){ opp.pld++; opp.gf+=res.b; opp.ga+=res.a; if(res.b>res.a){opp.w++;opp.pts+=3} else if(res.a===res.b){opp.d++;opp.pts+=1}else{opp.l++} }
  // simulate other 5 matches in the round
  const others = S.table.filter(c=> c!==me && c!==opp);
  for(let i=0;i<others.length;i+=2){
    if(!others[i+1]) continue;
    const a=others[i], b=others[i+1];
    const r2 = simScore(a.form,b.form);
    a.gf+=r2.a; b.gf+=r2.b; a.ga+=r2.b; b.ga+=r2.a;
    a.pld++; b.pld++;
    if(r2.a>r2.b){a.w++;a.pts+=3;b.l++}
    else if(r2.b>r2.a){b.w++;b.pts+=3;a.l++}
    else {a.d++;b.d++;a.pts++;b.pts++}
  }
  S.table.sort((a,b)=> b.pts-a.pts || (b.gf-b.ga)-(a.gf-a.ga));
  S.news.unshift({id: Date.now(), title:`${win} ${res.a}:${res.b} vs ${S.nextMatch.opponent}`, text:`Твоя схема ${S.formation} • ${S.tactic} • Средний уровень ${myForm} против ${oppForm}.`, time:'Только что', img:'https://images.unsplash.com/photo-1574629810360-214f3774381b?q=80&w=200&auto=format&fit=crop'});
  // next opponent
  S.nextMatch.opponent = clubListFor(S.selectedCountry, S.selectedLeague).filter(n=> n!==S.club.name)[Math.floor(Math.random()*5)];
  S.nextMatch.date = new Date(S.gameDate); S.nextMatch.date.setDate(S.nextMatch.date.getDate()+7);
  save();
  openModal(`
    <div style="text-align:center; padding:10px">
      <div class="badge" style="background:${color}20; color:${color}; border-color:${color}40">${win}</div>
      <h2 class="h1" style="font-size:42px; margin:10px 0">${S.club.name} <span style="color:${color}">${res.a} : ${res.b}</span> ${S.nextMatch.opponent}</h2>
      <p class="small muted">Симуляция по уровням игроков и тактике. Международные турниры — на вкладке Таблицы.</p>
      <button class="btn" style="margin-top:14px" data-close>Продолжить →</button>
    </div>
  `, m=> m.querySelector('[data-close]')?.addEventListener('click', ()=>{ closeModal(); render(); }));
}

function openModal(html, bind){
  const bg=document.createElement('div'); bg.className='modal-bg'; bg.innerHTML=`<div class="modal glass">${html}</div>`;
  bg.addEventListener('click', e=>{ if(e.target===bg) closeModal(); });
  document.body.appendChild(bg);
  if(bind) bind(bg);
}
function closeModal(){ document.querySelector('.modal-bg')?.remove(); }

// init
render();
window.addEventListener('keydown', e=>{
  if(e.key==='Escape') closeModal();
});
