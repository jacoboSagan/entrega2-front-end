// Cache para no hacer fetch múltiples veces en la misma sesión
let _cursosCache = null;

// Lee los cursos desde data/cursos.json
async function getCursos() {
  if (_cursosCache) return _cursosCache;
  try {
    const res = await fetch('data/cursos.json');
    _cursosCache = await res.json();
    return _cursosCache;
  } catch (e) {
    console.warn('No se pudo cargar cursos.json');
    return [];
  }
}

// Busca un curso por su id
async function getCursoById(id) {
  const cursos = await getCursos();
  return cursos.find(c => c.id === Number(id));
}

// Favoritos usando localStorage
function getFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos') || '[]');
}

function toggleFavorito(id) {
  const favs = getFavoritos();
  const idx = favs.indexOf(Number(id));
  if (idx === -1) {
    favs.push(Number(id));
    localStorage.setItem('favoritos', JSON.stringify(favs));
    return true;
  } else {
    favs.splice(idx, 1);
    localStorage.setItem('favoritos', JSON.stringify(favs));
    return false;
  }
}

function esFavorito(id) {
  return getFavoritos().includes(Number(id));
}

// Muestra un mensaje flotante en la esquina inferior derecha
function mostrarToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('visible'), 3000);
}

// Actualiza el número del badge de favoritos en el nav
function actualizarBadge() {
  const badge = document.getElementById('badge-fav');
  if (!badge) return;
  const n = getFavoritos().length;
  badge.textContent = n;
  badge.style.display = n > 0 ? 'flex' : 'none';
}

// Marca el link activo en el nav según la página actual
function marcarNavActivo() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('activo');
  });
}

// Genera el HTML de una card de curso
function crearCard(curso) {
  const fav = esFavorito(curso.id);
  return `
    <div class="card">
      <div class="card-img">
        <span>${curso.emoji}</span>
        <a href="detalle.html?id=${curso.id}" class="card-revisar">Revisar</a>
      </div>
      <div class="card-body">
        <div class="card-nombre">${curso.nombre}</div>
        <div class="card-desc">${curso.descripcion}</div>
        <div class="card-footer">
          <a href="detalle.html?id=${curso.id}" class="btn btn-verde btn-sm" style="flex:1; text-align:center;">Ver más</a>
          <button class="btn-fav ${fav ? 'activo' : ''}" onclick="onToggleFav(${curso.id}, this)" title="Agregar a favoritos">♥</button>
        </div>
      </div>
    </div>
  `;
}

// Maneja el clic en el botón de favoritos
function onToggleFav(id, btn) {
  const agrego = toggleFavorito(id);
  btn.classList.toggle('activo', agrego);
  mostrarToast(agrego ? '❤️ Agregado a favoritos' : '🗑️ Eliminado de favoritos');
  actualizarBadge();
}

// Renderiza el catálogo en cursos.html con filtro y buscador
async function renderCatalogo() {
  const grid = document.getElementById('grid-catalogo');
  if (!grid) return;

  const cursos = await getCursos();

  const inputBusqueda = document.getElementById('input-busqueda');
  const selectCategoria = document.getElementById('select-categoria');

  function filtrarYRenderizar() {
    const texto = inputBusqueda.value.toLowerCase();
    const categoria = selectCategoria.value;

    const resultado = cursos.filter(c => {
      const coincideTexto = c.nombre.toLowerCase().includes(texto) ||
                            c.descripcion.toLowerCase().includes(texto);
      const coincideCategoria = categoria === 'todos' || c.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });

    if (resultado.length === 0) {
      grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--texto-suave); padding:4rem;">No se encontraron cursos.</p>`;
    } else {
      grid.innerHTML = resultado.map(crearCard).join('');
    }
  }

  inputBusqueda.addEventListener('input', filtrarYRenderizar);
  selectCategoria.addEventListener('change', filtrarYRenderizar);

  filtrarYRenderizar();
}

// Al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
  marcarNavActivo();
  actualizarBadge();
  renderCatalogo();
});
