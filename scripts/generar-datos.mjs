// Genera src/data/ofertas.json con tiendas y ofertas 100% ficticias.
import { writeFileSync } from 'node:fs';

const categorias = [
  ['moda', 'Moda'], ['tecnologia', 'Tecnología'], ['hogar', 'Hogar'],
  ['gastronomia', 'Gastronomía'], ['salud-belleza', 'Salud y belleza'],
  ['deportes', 'Deportes'], ['libros', 'Libros y papelería'],
  ['mascotas', 'Mascotas'], ['ocio', 'Ocio y juegos'],
];
const zonas = ['Centro', 'Costa', 'Norte', 'Sur', 'Oeste', 'Online'];
const T = 'todos';
const L = ['lunes', 'martes', 'miércoles'];
const F = ['viernes', 'sábado', 'domingo'];
const M = ['martes', 'jueves'];

// [nombre, categoría, dto, tipo, zonas, días, descripción corta]
const filas = [
  ['Hilo & Aguja', 'moda', 25, '%', ['Centro', 'Norte'], L, 'Ropa de temporada con descuento los primeros días de la semana.'],
  ['Zapatería Los Pinos', 'moda', 20, '%', ['Centro', 'Sur', 'Online'], T, 'Calzado urbano y de vestir en toda la tienda.'],
  ['Mar de Telas', 'moda', 15, '%', ['Costa'], M, 'Telas, mercería y accesorios para coser en casa.'],
  ['Pasarela 9', 'moda', 30, '%', ['Centro', 'Costa'], F, 'Liquidación de colección pasada, fines de semana.'],
  ['Denim Norte', 'moda', 10, '%', ['Norte', 'Online'], T, 'Jeans y camperas, envío gratis en compras online.'],
  ['Pequeños Pasos', 'moda', 2, '2x1', ['Oeste', 'Sur'], ['sábado', 'domingo'], 'Ropa infantil: llevás dos prendas y pagás una.'],
  ['Maletas del Sur', 'moda', 35, '%', ['Sur', 'Online'], F, 'Valijas, mochilas y bolsos de viaje.'],
  ['Byte Taller', 'tecnologia', 15, '%', ['Centro', 'Online'], T, 'Accesorios, cables y periféricos para tu escritorio.'],
  ['Pixel Casa', 'tecnologia', 10, '%', ['Online'], T, 'Domótica y bombillas inteligentes con envío sin costo.'],
  ['Circuito Sur', 'tecnologia', 20, '%', ['Sur'], L, 'Reparación de celulares y cambio de pantallas.'],
  ['Onda Corta', 'tecnologia', 12, '%', ['Centro', 'Costa', 'Norte'], M, 'Auriculares, parlantes y radios portátiles.'],
  ['Nube Gadgets', 'tecnologia', 18, '%', ['Online'], F, 'Gadgets de oficina y regalos tecnológicos.'],
  ['Casa Tilo', 'hogar', 20, '%', ['Centro', 'Oeste'], T, 'Muebles de madera maciza hechos a pedido.'],
  ['Lámparas del Faro', 'hogar', 25, '%', ['Costa'], L, 'Iluminación decorativa para interior y jardín.'],
  ['Ropa Blanca Aurora', 'hogar', 30, '%', ['Norte', 'Sur'], F, 'Sábanas, toallas y acolchados de algodón.'],
  ['El Rincón Verde', 'hogar', 15, '%', ['Oeste', 'Online'], T, 'Plantas, macetas y herramientas de jardinería.'],
  ['Cocina Maestra', 'hogar', 2, '2x1', ['Centro'], ['miércoles'], 'Utensilios de cocina: 2x1 en la línea básica.'],
  ['Florería Pétalo', 'hogar', 10, '%', ['Centro', 'Costa', 'Online'], T, 'Ramos, arreglos florales y suscripción mensual.'],
  ['Pan de Barrio', 'gastronomia', 20, '%', ['Centro', 'Norte', 'Sur'], M, 'Panadería artesanal, panes de masa madre y facturas.'],
  ['Heladería Polo Sur', 'gastronomia', 2, '2x1', ['Costa', 'Sur'], ['jueves', 'viernes'], 'Helados artesanales en cucurucho o pote de medio kilo.'],
  ['Tostadores del Puerto', 'gastronomia', 15, '%', ['Costa', 'Online'], T, 'Café de especialidad en grano y molido.'],
  ['La Parrilla de Ana', 'gastronomia', 25, '%', ['Oeste'], L, 'Parrilla completa para dos, almuerzos de lunes a miércoles.'],
  ['Sushi Marea', 'gastronomia', 30, '%', ['Centro', 'Costa'], ['martes'], 'Rolls y combinados para compartir.'],
  ['Pizzería Doce Lunas', 'gastronomia', 2, '2x1', ['Norte', 'Oeste'], ['miércoles', 'jueves'], 'Pizzas medianas 2x1 comiendo en el local.'],
  ['Dulce Gusto', 'gastronomia', 12, '%', ['Sur', 'Online'], T, 'Tortas, alfajores y cajas de regalo.'],
  ['Botica Brisa', 'salud-belleza', 15, '%', ['Centro', 'Norte', 'Costa'], T, 'Cosmética natural y cuidado de la piel.'],
  ['Óptica Mirador', 'salud-belleza', 30, '%', ['Centro', 'Sur'], L, 'Armazones y lentes de sol, examen visual sin costo.'],
  ['Estudio Luma', 'salud-belleza', 20, '%', ['Costa'], M, 'Peluquería, color y tratamientos capilares.'],
  ['Herbolario Raíz', 'salud-belleza', 10, '%', ['Oeste', 'Online'], T, 'Infusiones, suplementos y aceites esenciales.'],
  ['Spa Quietud', 'salud-belleza', 25, '%', ['Norte'], ['viernes'], 'Masajes y circuitos de relax de 90 minutos.'],
  ['Pedal Alto', 'deportes', 20, '%', ['Costa', 'Sur'], T, 'Bicicletas, cascos y service completo.'],
  ['Cancha 5', 'deportes', 15, '%', ['Norte', 'Oeste'], L, 'Alquiler de canchas de fútbol 5 en horario de día.'],
  ['Trail Montaña', 'deportes', 25, '%', ['Online', 'Centro'], F, 'Calzado y mochilas para caminatas y trekking.'],
  ['Remo y Sal', 'deportes', 10, '%', ['Costa'], T, 'Clases de remo y alquiler de kayaks.'],
  ['Gimnasio Cumbre', 'deportes', 40, '%', ['Centro'], T, 'Matrícula con descuento en el primer trimestre.'],
  ['Papel y Tinta', 'libros', 20, '%', ['Centro', 'Online'], T, 'Libros de narrativa y ensayo, ediciones de bolsillo.'],
  ['Cuaderno Abierto', 'libros', 15, '%', ['Norte', 'Sur'], M, 'Cuadernos, agendas y útiles para la vuelta a clases.'],
  ['Librería Faro Viejo', 'libros', 2, '2x1', ['Costa'], ['sábado'], 'Libros usados y de ocasión: llevá dos y pagá uno.'],
  ['Comiquería Órbita', 'libros', 10, '%', ['Centro', 'Oeste', 'Online'], T, 'Historietas, mangas y novelas gráficas.'],
  ['Huellas', 'mascotas', 15, '%', ['Centro', 'Norte', 'Sur'], T, 'Alimento balanceado y accesorios para perros y gatos.'],
  ['Veterinaria Patitas', 'mascotas', 20, '%', ['Oeste'], L, 'Consultas, vacunas y desparasitación.'],
  ['Peluquería Canina Bigotes', 'mascotas', 25, '%', ['Costa', 'Sur'], M, 'Baño, corte y cepillado con turno previo.'],
  ['Mundo Acuario', 'mascotas', 10, '%', ['Norte', 'Online'], T, 'Peceras, filtros y alimento para peces.'],
  ['Cine Club Esquina', 'ocio', 2, '2x1', ['Centro'], ['martes', 'miércoles'], 'Entradas 2x1 a funciones de cine independiente.'],
  ['Mesa de Juegos', 'ocio', 20, '%', ['Norte', 'Online'], T, 'Juegos de mesa y rompecabezas para toda la familia.'],
  ['Escape Room Laberinto', 'ocio', 30, '%', ['Sur', 'Oeste'], L, 'Salas de escape para grupos de 3 a 6 personas.'],
  ['Parque Aventura Copa', 'ocio', 25, '%', ['Costa'], F, 'Circuitos de tirolesa y puentes colgantes.'],
  ['Karaoke Eco', 'ocio', 2, '2x1', ['Centro', 'Sur'], ['jueves'], 'Sala privada: la segunda hora va por la casa.'],
  ['Taller Cerámica Barro', 'ocio', 15, '%', ['Oeste', 'Norte'], ['sábado', 'domingo'], 'Talleres de torno para principiantes.'],
];

const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, 'y').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const catNombre = Object.fromEntries(categorias);
const vigencias = ['2027-03-31', '2027-02-28', '2027-06-30', '2027-01-31', '2027-12-31'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const ofertas = filas.map(([nombre, cat, dto, tipo, zs, dias, desc], i) => {
  const diasTxt = dias === T ? 'todos los días' : dias.join(', ');
  const valor = tipo === '2x1' ? '2x1' : `${dto}%`;
  return {
    slug: slug(nombre),
    nombre,
    categoria: cat,
    categoriaNombre: catNombre[cat],
    zonas: zs,
    dias: dias === T ? ['todos'] : dias,
    diasTexto: cap(diasTxt),
    tipo,
    dto: tipo === '2x1' ? 50 : dto,
    etiqueta: valor,
    descripcion: desc,
    detalle: `${valor === '2x1' ? 'Promoción 2x1' : valor + ' de descuento'} en ${nombre}: ${diasTxt}. ${desc}`,
    condiciones: [
      `Válido: ${diasTxt}.`,
      'Mostrá el código de oferta de Chiripa en caja, o ingresalo al finalizar tu compra online.',
      'No acumulable con otras promociones ni con liquidaciones.',
      'Sujeto a disponibilidad de stock. Las tiendas son ficticias: este sitio es una demostración.',
    ],
    vigencia: vigencias[i % vigencias.length],
    destacada: i % 6 === 0,
  };
});

writeFileSync('src/data/ofertas.json', JSON.stringify({ categorias: categorias.map(([id, nombre]) => ({ id, nombre })), zonas, ofertas }, null, 1));
console.log(`${ofertas.length} ofertas generadas`);
