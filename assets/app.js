let currentFilter = 'todos';

function setFilter(category){
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
  filterLibrary();
}

function filterLibrary(){
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.manual-card');
  let visible = 0;

  cards.forEach(card => {
    const category = card.dataset.category || '';
    const text = (card.innerText + ' ' + (card.dataset.search || '')).toLowerCase();
    const matchesFilter = currentFilter === 'todos' || category === currentFilter;
    const matchesSearch = !query || text.includes(query);
    const show = matchesFilter && matchesSearch;
    card.style.display = show ? 'flex' : 'none';
    if(show) visible++;
  });

  const empty = document.getElementById('emptyState');
  if(empty) empty.hidden = visible !== 0;
}
