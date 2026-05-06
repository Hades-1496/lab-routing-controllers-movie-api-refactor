let peliculas = [
  { id: 1, titulo: 'Inception', director: 'Christopher Nolan', anio: 2010, genero: 'ciencia-ficcion', nota: 8.8 },
  { id: 2, titulo: 'Pulp Fiction', director: 'Quentin Tarantino', anio: 1994, genero: 'crimen', nota: 8.9 },
  { id: 3, titulo: 'El Señor de los Anillos', director: 'Peter Jackson', anio: 2001, genero: 'fantasia', nota: 8.8 }
];

let resenias = [
  { id: 1, pelicula_id: 1, autor: 'María', texto: 'Obra maestra', puntuacion: 9 },
  { id: 2, pelicula_id: 1, autor: 'Carlos', texto: 'Confusa pero brillante', puntuacion: 8 },
  { id: 3, pelicula_id: 2, autor: 'Ana', texto: 'Clásico imprescindible', puntuacion: 10 }
];


let nextPeliculaId = [...peliculas].length++; // A riesgo de que manipule la longitud del vector.
let nextResenaId = [...resenias].length++;

// En vez de invocar las funciones dentro de otra, se hace un objeto de funciones. 
const db = {
    getAll: (genero) => {
        if (genero) return peliculas.filter(p => p.genero == genero); //Me suena
        return peliculas;
    },
    getById: (id) => peliculas.find((p) => p.id == id) || null, 
    create: (datos) => {
        const nueva = {id: nextPeliculaId++, ...datos };
        peliculas. push(nueva);
        return nueva;
    },
    update: (id,datos) => {
        const index = peliculas.findIndex(p => p.id == id);
        if (index == -1) return null;
        peliculas[index] = {...peliculas[index], ...datos};
        return peliculas[index];
    },
    delete: (id) => {
        const index = peliculas.findIndex(p => p.id == id);
        if (index == -1) return null;
        return peliculas.splice(index, 1)[0];
    },
    getStats: () => {
        const conNota = peliculas.filter(p => p.nota !== null)
        if (conNota.length == 0) return {media: null, total: peliculas.length}
        const media = Number((conNota.reduce((acc,p) => acc+p.nota, 0)/conNota.length).toFixed(2));
        return {media: media, total: peliculas.length }; // ¿Devuelve

    },
    getResenias: (peliculaId) => resenias.filter(r => r.pelicula_id == peliculaId) || null, //Pueden no existir
    createResenia: (peliculaId, datos) => { const nueva = {id: nextResenaId++, pelicula_id: peliculaId, ...datos}
    resenias.push(nueva);
    return nueva;}
}

module.exports = db;