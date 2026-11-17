const courses = [
  {
    id: 1,
    symbol: 'Py',
    category: 'Программирование',
    title: 'Python с нуля',
    description: 'От первой строки до собственного проекта.',
    duration: 3,
    level: 'beginner',
    levelLabel: 'С нуля',
    badge: 'Популярный',
    start: '#0347e7',
    end: '#134de8',
    symbolColor: '#c7f000',
    accent: '#a8ec00',
    popularity: 100
  },
  {
    id: 2,
    symbol: 'UX/UI',
    category: 'Дизайн',
    title: 'UX/UI-дизайн',
    description: 'Создавай понятные и красивые интерфейсы.',
    duration: 4,
    level: 'beginner',
    levelLabel: 'С нуля',
    badge: 'Практика',
    start: '#7771c4',
    end: '#535bb3',
    symbolColor: '#ffffff',
    accent: '#b6b3ff',
    popularity: 95
  },
  {
    id: 3,
    symbol: 'R/01',
    category: 'Технологии',
    title: 'Робототехника',
    description: 'Изучай технологии и собирай свои устройства.',
    duration: 4,
    level: 'beginner',
    levelLabel: 'С нуля',
    badge: 'Технологии',
    start: '#008e9c',
    end: '#157d9c',
    symbolColor: '#00f5ef',
    accent: '#00e7e5',
    popularity: 90
  },
  {
    id: 4,
    symbol: '</>',
    category: 'Программирование',
    title: 'Веб-разработка',
    description: 'Создай свой первый сайт с нуля.',
    duration: 5,
    level: 'beginner',
    levelLabel: 'С нуля',
    badge: 'Практика',
    start: '#7153ad',
    end: '#554b9a',
    symbolColor: '#e8cbff',
    accent: '#d3b6ff',
    popularity: 85
  },
  {
    id: 5,
    symbol: 'AI',
    category: 'Технологии',
    title: 'Нейросети в работе',
    description: 'Превращай идеи в результат с помощью ИИ.',
    duration: 1,
    level: 'any',
    levelLabel: 'Любой уровень',
    badge: 'Новый курс',
    start: '#008e82',
    end: '#207eaa',
    symbolColor: '#c7f000',
    accent: '#c7f000',
    popularity: 80
  },
  {
    id: 6,
    symbol: 'SMM',
    category: 'Маркетинг',
    title: 'Интернет-маркетинг',
    description: 'Находи аудиторию и продвигай свои проекты.',
    duration: 3,
    level: 'beginner',
    levelLabel: 'С нуля',
    badge: 'Практика',
    start: '#2267a7',
    end: '#4854a5',
    symbolColor: '#00f5ef',
    accent: '#00e7e5',
    popularity: 75
  }
];


let selectedCategory = 'Все курсы';

const grid = document.getElementById('courseGrid');
const count = document.getElementById('courseCount');
const empty = document.getElementById('emptyState');
const search = document.getElementById('siteSearch');
const level = document.getElementById('levelFilter');
const sort = document.getElementById('sortFilter');
const dialog = document.getElementById('courseDialog');
const dialogContent = document.getElementById('dialogContent');


function plural(n) {
  return n === 1 ? 'курс' : n >= 2 && n <= 4 ? 'курса' : 'курсов';
}

function openCourse(c) {
  dialogContent.querySelector('.dialog-category').textContent = c.category;
  dialogContent.querySelector('h2').textContent = c.title;
  dialogContent.querySelector('.dialog-note').textContent =
    `${c.duration} ${c.duration === 1 ? 'месяц' : c.duration < 5 ? 'месяца' : 'месяцев'} · ${c.levelLabel}`;
  dialog.showModal();
}


function render() {
  const q = search.value.trim().toLocaleLowerCase('ru');

  const filtered = courses.filter(c =>
    (selectedCategory === 'Все курсы' || c.category === selectedCategory) &&
    (level.value === 'all' || c.level === level.value) &&
    `${c.title} ${c.category} ${c.description}`.toLocaleLowerCase('ru').includes(q)
  );

  if (sort.value === 'duration') filtered.sort((a, b) => a.duration - b.duration);
  if (sort.value === 'name') filtered.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  if (sort.value === 'popular') filtered.sort((a, b) => b.popularity - a.popularity);

  grid.replaceChildren();

  filtered.forEach(c => {
    const article = document.createElement('article');
    article.className = 'course-card';

    article.style.setProperty('--start', c.start);
    article.style.setProperty('--end', c.end);
    article.style.setProperty('--symbol', c.symbolColor);
    article.style.setProperty('--accent', c.accent);

    article.innerHTML = `
      <div class="course-top">
        <span class="course-symbol"></span>
        <span class="course-badge"></span>
        <span class="course-index"></span>
      </div>
      <div class="course-body">
        <span class="course-category"></span>
        <h3></h3>
        <p class="course-description"></p>
        <p class="course-details"></p>
        <button class="course-more" type="button">
          <span>Подробнее о курсе</span>
          <span>➜</span>
        </button>
      </div>
    `;

    article.querySelector('.course-symbol').textContent = c.symbol;
    article.querySelector('.course-badge').textContent = c.badge;
    article.querySelector('.course-index').textContent = String(c.id).padStart(2, '0');
    article.querySelector('.course-category').textContent = c.category;
    article.querySelector('h3').textContent = c.title;
    article.querySelector('.course-description').textContent = c.description;
    article.querySelector('.course-details').textContent =
      `${c.duration} ${c.duration === 1 ? 'месяц' : c.duration < 5 ? 'месяца' : 'месяцев'} · ${c.levelLabel}`;

    article.querySelector('.course-more').addEventListener('click', () => openCourse(c));
    grid.appendChild(article);
  });

  count.textContent = `${filtered.length} ${plural(filtered.length)}`;
  empty.hidden = filtered.length !== 0;
  document.getElementById('pageCaption').textContent =
    filtered.length ? 'Показаны все курсы' : 'Нет результатов';
}


document.getElementById('closeDialog').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

document.querySelectorAll('[data-category]').forEach(button =>
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(b =>
      b.classList.toggle('selected', b === button)
    );
    render();
  })
);

search.addEventListener('input', render);
level.addEventListener('change', render);
sort.addEventListener('change', render);

document.getElementById('subscribeForm').addEventListener('submit', event => {
  event.preventDefault();
  alert('Спасибо за подписку!');
  event.currentTarget.reset();
});

render();
