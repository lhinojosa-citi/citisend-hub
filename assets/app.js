let currentFilter = 'todos';
let manuals = [];

const fallbackManuals = [
  {id:'gestion-proyectos',titulo:'Manual de Gestión de Proyectos',categoria:'Planner',icono:'📋',tipo:'HTML',version:'v1.2',proyecto:'General',actualizado:'27/06/2026',tiempo:'8 min',autor:'Project Management',descripcion:'Guía interna para gestionar proyectos con Planner, Teams y seguimiento por fases.',archivo:'manuales/gestion-proyectos.html',destacado:true,keywords:'manual gestion proyectos planner teams fases seguimiento project management implantacion'},
  {id:'configuracion-dispositivos',titulo:'Manual de Configuración de Dispositivos',categoria:'Software',icono:'📱',tipo:'HTML',version:'v1.2',proyecto:'Campo',actualizado:'27/06/2026',tiempo:'10 min',autor:'Operaciones',descripcion:'Procedimiento de configuración, Bluetooth, aplicación Citiservice y validación de dispositivos.',archivo:'manuales/configuracion-dispositivos.html',destacado:true,keywords:'manual configuracion dispositivos citiservice bluetooth instalacion app dispositivos campo'},
  {id:'mantenimiento-citisend',titulo:'Manual de Mantenimiento Citisend',categoria:'Mantenimiento',icono:'🛠️',tipo:'HTML',version:'v1.2',proyecto:'Operaciones',actualizado:'27/06/2026',tiempo:'7 min',autor:'Operaciones',descripcion:'Guía operativa para preventivos, correctivos, revisiones, incidencias e informes de servicio.',archivo:'manuales/mantenimiento-citisend.html',destacado:true,keywords:'manual mantenimiento citisend preventivo correctivo incidencias servicio auditorias calidad'},
  {id:'tarjetas-citisend',titulo:'Manual Tarjetas Citisend',categoria:'Tarjetas',icono:'💳',tipo:'HTML',version:'v1.2',proyecto:'Operación',actualizado:'27/06/2026',tiempo:'6 min',autor:'Operaciones',descripcion:'Guía de operación para el uso, gestión y explicación de tarjetas ciudadanas.',archivo:'manuales/tarjetas-citisend.html',destacado:false,keywords:'manual tarjetas ciudadanas citisend guia operacion usuarios tarjetas'},
  {id:'generador-cae',titulo:'CitiDocs · Generador CAE',categoria:'CAE',icono:'🦺',tipo:'HTML',version:'v1.2',proyecto:'CAE',actualizado:'27/06/2026',tiempo:'Herramienta',autor:'Project Management',descripcion:'Herramienta HTML para generar documentación CAE de forma guiada.',archivo:'manuales/generador-cae.html',destacado:true,keywords:'generador cae citidocs coordinacion actividades empresariales subcontratas documento'}
];

async function initLibrary(){
  try{
    const response = await fetch('data/manuales.json?v=1.2', {cache:'no-store'});
    if(!response.ok) throw new Error('No se pudo cargar manuales.json');
    manuals = await response.json();
  }catch(error){
    manuals = fallbackManuals;
  }

  renderFilters();
  renderFeatured();
  renderManuals();
  updateStats();
  attachEvents();
}

function normalize(value){
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function categories(){
  return [...new Set(manuals.map(item => item.categoria))];
}

function renderFilters(){
  const row = document.getElementById('filterRow');
  if(!row) return;
  const buttons = ['todos', ...categories()].map(category => {
    const label = category === 'todos' ? 'Todos' : category;
    return `<button class="filter-btn ${category === 'todos' ? 'active' : ''}" data-filter="${category}" type="button">${label}</button>`;
  }).join('');
  row.innerHTML = buttons;
}

function renderFeatured(){
  const list = document.getElementById('featuredList');
  if(!list) return;
  const featured = manuals.filter(item => item.destacado).slice(0,4);
  list.innerHTML = featured.map(item => `
    <a class="featured-chip" href="${item.archivo}">
      <span>${item.icono || '📄'}</span>
      <b>${item.titulo}</b>
    </a>
  `).join('');
}

function renderManuals(){
  const grid = document.getElementById('manualesGrid');
  if(!grid) return;
  grid.innerHTML = manuals.map(item => `
    <article class="manual-card" data-category="${item.categoria}" data-search="${escapeHtml([item.titulo,item.categoria,item.proyecto,item.descripcion,item.keywords,item.autor].join(' '))}">
      <div class="manual-top">
        <span class="category-pill">${item.categoria}</span>
        <span class="manual-type">${item.tipo}</span>
      </div>
      <div class="manual-card-icon">${item.icono || '📄'}</div>
      <h3>${item.titulo}</h3>
      <p>${item.descripcion}</p>
      <div class="manual-details">
        <div><small>Versión</small><strong>${item.version}</strong></div>
        <div><small>Proyecto</small><strong>${item.proyecto}</strong></div>
        <div><small>Actualizado</small><strong>${item.actualizado}</strong></div>
        <div><small>Lectura</small><strong>${item.tiempo}</strong></div>
      </div>
      <div class="manual-actions">
        <a href="${item.archivo}" class="open-btn">Abrir manual →</a>
      </div>
    </article>
  `).join('');
  filterLibrary();
}

function updateStats(){
  const total = document.getElementById('statTotal');
  const cats = document.getElementById('statCategories');
  if(total) total.textContent = manuals.length;
  if(cats) cats.textContent = categories().length;
}

function attachEvents(){
  const searchInput = document.getElementById('searchInput');
  if(searchInput) searchInput.addEventListener('input', filterLibrary);

  const filterRow = document.getElementById('filterRow');
  if(filterRow){
    filterRow.addEventListener('click', event => {
      const btn = event.target.closest('.filter-btn');
      if(!btn) return;
      setFilter(btn.dataset.filter);
    });
  }
}

function setFilter(category){
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
  filterLibrary();
}

function filterLibrary(){
  const query = normalize(document.getElementById('searchInput')?.value || '').trim();
  const cards = document.querySelectorAll('.manual-card');
  let visible = 0;

  cards.forEach(card => {
    const category = card.dataset.category || '';
    const text = normalize(card.innerText + ' ' + (card.dataset.search || ''));
    const matchesFilter = currentFilter === 'todos' || category === currentFilter;
    const matchesSearch = !query || text.includes(query);
    const show = matchesFilter && matchesSearch;
    card.style.display = show ? 'flex' : 'none';
    if(show) visible++;
  });

  const empty = document.getElementById('emptyState');
  if(empty) empty.hidden = visible !== 0;

  const counter = document.getElementById('resultCounter');
  if(counter) counter.textContent = `${visible} manual${visible === 1 ? '' : 'es'} visible${visible === 1 ? '' : 's'}`;
}

function escapeHtml(value){
  return String(value || '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

document.addEventListener('DOMContentLoaded', initLibrary);
