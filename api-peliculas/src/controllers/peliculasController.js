// src/controllers/ peliculasController.js Debo acostumbrarme a comentar la dirección para las IAs.

const db = require("../data/peliculas.js");

// Copio de del index directamente.
const listarPeliculas = (req, res) => {
  const { genero } = req.query;
  const peliculas = db.getAll(genero);
  res.json(peliculas);
};

const obtenerPeliculas = (req, res) => {
  const id = Number(req.params.id);
  const pelicula = db.getById(id);

  if (!pelicula)
    return res.status(404).json({ error: "Película no encontrada." });
  res.json(pelicula);
};

const crearPelicula = (req, res) => {
  const { titulo, director, anio, genero, nota } = req.body;

  if (!titulo || !director || !anio || !genero) {
    // Menos mal que la nota es opcional
    return res.status(400).json({
      error: "Los campos de título, director, año y género son obligatorios.",
    });
  }
  if (nota !== undefined && (nota < 0 || nota > 10)) {
    return res.sendStatus(400).json({
      error: "La nota debe tener un valor entre 0 y 10",
    });
  }

  const nuevaPelicula = db.create({
    id: nextId++,
    titulo,
    director,
    anio: Number(anio),
    genero,
    nota: nota? Number(nota) : null, // Modificado
  });

  res.status(201).json(nuevaPelicula);
};

const actualizarPelicula = (req, res) => {
  const id = Number(req.params.id);

  const { titulo, director, anio, genero, nota } = req.body;

  if (!titulo || !director || !anio || !genero) {
    // Menos mal que la nota es opcional
    return res.status(400).json({
      error: "PUT requiere todos los campos: título, director, año y género.",
    });
  }

  const actualizada = db.update(id, { titulo, director, anio: Number(anio), genero, nota: nota? Number(nota) : null});
  // Si la linea 60 funciona, en la linea 42 también debe funcionar
  if (actualizada) return res.status(404).json({error: 'Película no encontrada'});
   res.json(actualizada);
  

};

const eliminarPelicula = (req, res) => { //Casi idéntica a búsqueda de películas por id.
  const id = Number(req.params.id);
  const eliminada = db.delete(id);

  if (!eliminada) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }
  // [0] es para eliminar el array y que sólo salga el elemento resultante.

  res.json({ mensaje: 'Película eliminada', pelicula: eliminada });
}

const obtenerEstadisticas = (req,res) => res.json(db.getStats());
// Hacerlo sin corchetes puede provocar un riesgo, ya que esta función va a devolver la respuesta de la petición.

const listarResenias = (req,res) => {
    const peliculaId = Number(req.params.id);
    const pelicula = db.getById(peliculaId);

    if (!pelicula) return res.status(404).json({ error: 'Película no encontrda'});
    const resenias = db.getResenias(peliculaid);
    res.json({ pelicula: pelicula.titulo, resenias});
}
const crearResenias = (req, res) => {
    const peliculaId = Number(req.params.id);
    const pelicula = db.getById(peliculaId);

    if (!pelicula) return res.status(404).json({ error: 'Película no encontrda'});
    const { autor, texto, puntuacion } = req.body;
    if (!autor || !texto || !puntuacion) return res.status(400).json({error: 'Los campos autor, texto y puntuación son obligatorios.'});
    if (puntuacion < 1 || puntuacion > 10) return res.status(400).json({ error: "La puntuación debe estar del 0 al 10"});
    const nueva = db.createResenia(peliculaId, {autor, texto, puntuacion: Number(puntuacion)});
    res.status(201).json(nueva);
}

module.exports = {listarPeliculas,obtenerPeliculas,crearPelicula,actualizarPelicula,eliminarPelicula,obtenerEstadisticas,listarResenias,crearResenias}