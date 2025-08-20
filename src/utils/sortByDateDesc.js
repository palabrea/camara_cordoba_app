// utils/sortByDateDesc.js
// Ordena descendente por fecha (más nuevo primero)

const FIELD_MAP = {
  noticias: ['publishedAt', 'createdAt', 'fecha', 'date'],
  cursos:   ['createdAt', 'publishedAt', 'fecha', 'date'],
  ofertas:  ['publishedAt', 'createdAt', 'fecha', 'date'],
  default:  ['publishedAt', 'createdAt', 'fecha', 'date'],
};

// Extrae el mejor campo de fecha posible del item
export function getItemDate(item, seccion = 'default') {
  const attrs = item?.attributes || item || {};
  const fields = FIELD_MAP[seccion] || FIELD_MAP.default;

  for (const f of fields) {
    const v = attrs?.[f];
    if (v) return v;
  }
  return null;
}

// Convierte a Date de forma segura
function toDateSafe(value) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Ordena una lista por fecha desc.
 * @param {Array} items  Lista original (no se muta)
 * @param {String} seccion  'noticias' | 'cursos' | 'ofertas' | ...
 * @returns {Array} nueva lista ordenada
 */
export function sortByDateDesc(items = [], seccion = 'default') {
  return [...items].sort((a, b) => {
    const da = toDateSafe(getItemDate(a, seccion));
    const db = toDateSafe(getItemDate(b, seccion));

    // Sin fecha -> al final
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;

    // Descendente (más nuevo primero)
    const diff = db - da;
    if (diff !== 0) return diff;

    // Empate: desempatamos por id (opcional)
    const ida = a?.id ?? 0;
    const idb = b?.id ?? 0;
    return idb - ida;
  });
}
