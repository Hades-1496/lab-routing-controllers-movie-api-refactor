// src/routes/peliculas.js Que se llame igual que data me parece feo. Lo mantengo para no liar la IA al corregirlo.

const { Router } = require('express');

import { listarPeliculas, obtenerPeliculas, crearPelicula, actualizarPelicula, eliminarPelicula, listarResenias, crearResenias } from '..controllers/peliculasController.js'

