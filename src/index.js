const express = require("express");
const morgan = require("morgan");

const app = express();


const dotenv = require("dotenv");
dotenv.config({path: "./env/.env"});


app.set("port", 4000 || process.env.PORT);
app.set("json spaces", 2);


app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//rutas

app.use('/api/firebase/encuestas',require('./routes/encuestas_firebase'));


app.listen(app.get('port'), ()=>{
    console.log(`Servidor en el puerto ${app.get('port')}`);
    console.log(__dirname);
});
