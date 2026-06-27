let currentFilter = 'todos';
let manuals = [];
let projects = [];

const fallbackManuals = [
  {id:'gestion-proyectos',titulo:'Manual de Gestión de Proyectos',categoria:'Planner',icono:'📋',tipo:'HTML',version:'v1.4',proyecto:'General / Granada',actualizado:'27/06/2026',tiempo:'8 min',autor:'Project Management',descripcion:'Guía interna para gestionar proyectos con Planner, Teams y seguimiento por fases.',archivo:'manuales/gestion-proyectos.html',destacado:true,keywords:'manual gestion proyectos planner teams fases seguimiento project management implantacion granada'},
  {id:'configuracion-dispositivos',titulo:'Manual de Configuración de Dispositivos',categoria:'Software',icono:'📱',tipo:'HTML',version:'v1.4',proyecto:'Granada',actualizado:'27/06/2026',tiempo:'10 min',autor:'Operaciones',descripcion:'Procedimiento de configuración, Bluetooth, aplicación Citiservice y validación de dispositivos.',archivo:'manuales/configuracion-dispositivos.html',destacado:true,keywords:'manual configuracion dispositivos citiservice bluetooth instalacion app dispositivos campo granada'},
  {id:'mantenimiento-citisend',titulo:'Manual de Mantenimiento Citisend',categoria:'Mantenimiento',icono:'🛠️',tipo:'HTML',version:'v1.4',proyecto:'Granada',actualizado:'27/06/2026',tiempo:'7 min',autor:'Operaciones',descripcion:'Guía operativa para preventivos, correctivos, revisiones, incidencias e informes de servicio.',archivo:'manuales/mantenimiento-citisend.html',destacado:true,keywords:'manual mantenimiento citisend preventivo correctivo incidencias servicio auditorias calidad granada'},
  {id:'tarjetas-citisend',titulo:'Manual Tarjetas Citisend',categoria:'Tarjetas',icono:'💳',tipo:'HTML',version:'v1.4',proyecto:'Operación',actualizado:'27/06/2026',tiempo:'6 min',autor:'Operaciones',descripcion:'Guía de operación para el uso, gestión y explicación de tarjetas ciudadanas.',archivo:'manuales/tarjetas-citisend.html',destacado:false,keywords:'manual tarjetas ciudadanas citisend guia operacion usuarios tarjetas'},
  {id:'generador-cae',titulo:'CitiDocs · Generador CAE',categoria:'CAE',icono:'🦺',tipo:'HTML',version:'v1.4',proyecto:'CAE',actualizado:'27/06/2026',tiempo:'Herramienta',autor:'Project Management',descripcion:'Herramienta HTML para generar documentación CAE de forma guiada.',archivo:'manuales/generador-cae.html',destacado:true,keywords:'generador cae citidocs coordinacion actividades empresariales subcontratas documento'}
];

const fallbackProjects = [
  {id:'granada',nombre:'Granada',cliente:'FCC Medio Ambiente',estado:'En ejecución',estadoIcono:'🟢',responsable:'Luis Hinojosa',dispositivos:3500,instalados:2485,manuales:['gestion-proyectos','configuracion-dispositivos','mantenimiento-citisend'],fotografias:0,planner:'#',galeria:'proyectos/granada/galeria/',galeriaFotos:[],contactos:[{nombre:'Luis Hinojosa',rol:'Project Manager',empresa:'Citisend',tipo:'Interno'},{nombre:'Diego',rol:'Seguimiento de proyecto',empresa:'FCC',tipo:'Cliente'},{nombre:'Félix',rol:'Incidencias y zonas',empresa:'FCC',tipo:'Cliente'}],software:['SLOC','Komtainer','Citiservice','Planner']}
];

async function loadJson(path, fallback){
  try{
    const response = await fetch(`${path}?v=1.4`, {cache:'no-store'});
    if(!response.ok) throw new Error(`No se pudo cargar ${path}`);
    return await response.json();
  }catch(error){
    return fallback;
  }
}

async function init(){
  manuals = await loadJson('data/manuales.json', fallbackManuals);
  projects = await loadJson('data/proyectos.json', fallbackProjects);

  if(document.getElementById('manualesGrid')) initLibrary();
  if(document.getElementById('projectsGrid')) renderProjects();
  if(document.getElementById('projectPage')) renderProjectPage();
}

function initLibrary(){
  renderFilters();
  renderFeatured();
  renderManuals();
  updateStats();
  attachEvents();
  applyUrlFilters();
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
    <article class="manual-card" data-category="${item.categoria}" data-project="${escapeHtml(item.proyecto)}" data-search="${escapeHtml([item.titulo,item.categoria,item.proyecto,item.descripcion,item.keywords,item.autor].join(' '))}">
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

function applyUrlFilters(){
  const params = new URLSearchParams(window.location.search);
  const project = params.get('proyecto');
  const category = params.get('categoria');
  const q = params.get('q');
  const search = document.getElementById('searchInput');
  if(category) setFilter(category);
  if(project && search) search.value = project;
  if(q && search) search.value = q;
  filterLibrary();
}

function setFilter(category){
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === category));
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

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  const active = projects.filter(project => normalize(project.estado).includes('ejecucion')).length;
  const total = document.getElementById('statProjects');
  const activeStat = document.getElementById('statActiveProjects');
  if(total) total.textContent = projects.length;
  if(activeStat) activeStat.textContent = active;

  grid.innerHTML = projects.map(project => {
    const percent = project.dispositivos ? Math.round((project.instalados / project.dispositivos) * 100) : 0;
    return `
      <a class="project-card-link" href="proyecto.html?id=${encodeURIComponent(project.id)}">
        <article class="project-card-premium">
          <div class="project-cover"><span>📦</span><b>${project.estadoIcono || '🟢'} ${project.estado}</b></div>
          <div class="project-card-body">
            <h3>${project.nombre}</h3>
            <p>${project.cliente}</p>
            <span class="responsible">Responsable: ${project.responsable}</span>
            <div class="project-mini-kpis">
              <div><strong>${formatNumber(project.dispositivos)}</strong><small>Dispositivos</small></div>
              <div><strong>${formatNumber(project.instalados)}</strong><small>Instalados</small></div>
              <div><strong>${project.manuales?.length || 0}</strong><small>Manuales</small></div>
            </div>
            <div class="bar project-progress"><i style="width:${Math.min(percent,100)}%"></i></div>
            <span class="open-project">Abrir proyecto →</span>
          </div>
        </article>
      </a>
    `;
  }).join('');
}

function renderProjectPage(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'granada';
  const project = projects.find(item => item.id === id) || projects[0];
  if(!project) return;

  document.title = `Citisend HUB · ${project.nombre}`;
  const percent = project.dispositivos ? Math.round((project.instalados / project.dispositivos) * 100) : 0;
  const relatedManuals = manuals.filter(manual => (project.manuales || []).includes(manual.id));

  setText('projectName', project.nombre);
  setText('projectClient', project.cliente);
  setText('projectStatus', `${project.estadoIcono || ''} ${project.estado}`.trim());
  setText('projectResponsible', `Responsable: ${project.responsable}`);
  setText('kpiDevices', formatNumber(project.dispositivos));
  setText('kpiInstalled', formatNumber(project.instalados));
  setText('kpiManuals', relatedManuals.length);
  setText('kpiPhotos', (project.galeriaFotos && project.galeriaFotos.length) ? project.galeriaFotos.length : (project.fotografias || 0));

  const progress = document.getElementById('projectProgress');
  if(progress) progress.style.width = `${Math.min(percent,100)}%`;
  setText('projectPercent', `${percent}% instalado`);

  const planner = document.getElementById('plannerLink');
  if(planner) planner.href = project.planner || '#';
  const library = document.getElementById('libraryLink');
  if(library) library.href = `index.html?proyecto=${encodeURIComponent(project.nombre)}#biblioteca`;
  const gallery = document.getElementById('galleryLink');
  if(gallery) gallery.href = '#galeria';

  renderRelatedManuals(relatedManuals, project);
  renderContacts(project.contactos || []);
  renderSoftware(project.software || []);
  renderGallery(project);
}

function renderRelatedManuals(relatedManuals, project){
  const box = document.getElementById('relatedManuals');
  if(!box) return;
  box.innerHTML = relatedManuals.map(item => `
    <a class="module-row" href="${item.archivo}">
      <span>${item.icono || '📄'}</span>
      <div><strong>${item.titulo}</strong><small>${item.categoria} · ${item.version}</small></div>
      <b>→</b>
    </a>
  `).join('') || `<p class="muted-text">No hay manuales asociados todavía.</p>`;

  const all = document.getElementById('allProjectManuals');
  if(all) all.href = `index.html?proyecto=${encodeURIComponent(project.nombre)}#biblioteca`;
}

function renderContacts(contacts){
  const box = document.getElementById('projectContacts');
  if(!box) return;
  box.innerHTML = contacts.map(contact => `
    <article class="contact-card">
      <div class="contact-initials">${initials(contact.nombre)}</div>
      <div><strong>${contact.nombre}</strong><span>${contact.rol}</span><small>${contact.empresa} · ${contact.tipo}</small></div>
    </article>
  `).join('') || `<p class="muted-text">No hay contactos cargados.</p>`;
}

function renderSoftware(software){
  const box = document.getElementById('projectSoftware');
  if(!box) return;
  box.innerHTML = software.map(item => `<span class="software-chip">💻 ${item}</span>`).join('') || `<p class="muted-text">No hay software asociado.</p>`;
}

function renderGallery(project){
  const box = document.getElementById('projectGallery');
  if(!box) return;
  const basePath = project.galeria || `proyectos/${project.id}/galeria/`;
  const photos = Array.isArray(project.galeriaFotos) ? project.galeriaFotos : [];

  if(!photos.length){
    box.innerHTML = `
      <div class="gallery-placeholder">
        <div>📷</div>
        <h3>Galería preparada</h3>
        <p>Sube tus imágenes a <strong>${basePath}</strong> y añade los nombres de archivo desde <strong>Administración</strong>.</p>
        <a href="admin.html" class="btn secondary">Abrir administración</a>
      </div>
    `;
    return;
  }

  box.innerHTML = `
    <div class="gallery-grid">
      ${photos.map(photo => {
        const file = photo.archivo || photo;
        const title = photo.titulo || file;
        const category = photo.categoria || 'Instalación';
        const description = photo.descripcion || '';
        return `
          <a class="gallery-card" href="${basePath}${file}" target="_blank" rel="noopener">
            <img src="${basePath}${file}" alt="${escapeHtml(title)}" loading="lazy" />
            <div>
              <span>${category}</span>
              <strong>${title}</strong>
              ${description ? `<small>${description}</small>` : ''}
            </div>
          </a>
        `;
      }).join('')}
    </div>
  `;
}

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value;
}

function formatNumber(value){
  return Number(value || 0).toLocaleString('es-ES');
}

function initials(name){
  return String(name || '').split(' ').filter(Boolean).slice(0,2).map(part => part[0]).join('').toUpperCase() || 'CT';
}

function escapeHtml(value){
  return String(value || '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

document.addEventListener('DOMContentLoaded', init);
