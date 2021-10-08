const express = require('express');//Exportar express
const conectarDB = require('./config/db'); //importar fx
const cors = require('cors');

//Crear el servidor
const app = express(); //ahora utilizamos fx de express

// Conectar a la base de datos
conectarDB();

//Habilitar cors
app.use(cors());


//Habilitar express.json
app.use(express.json({extended: true}));

// puerto de la app
const port = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


// arrancar la app
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});