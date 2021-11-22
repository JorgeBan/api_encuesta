const { Router } = require("express");
const router = new Router();


var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sistemaencuesta-3c002-default-rtdb.firebaseio.com"
});

const dbRef = admin.database().ref();

router.get("/", async (req, res)=>{
    dbRef.child("ModeloEncuesta").get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            res.status(200).json(snapshot.val());
        } else {
            res.status(404).json({
                error: 404,
                descripcion: "No hay datos disponibles"
            });
            console.log("No hay datos disponibles");
        }
    }).catch((error) => {
        res.status(500).json({
            error: 500,
            descripcion: "Error en el servidor"
        });
        console.error(error);
    });
});


router.get("/:id", async (req, res)=>{
    const { id } = req.params
    dbRef.child("ModeloEncuesta").child(id).get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            res.status(200).json(snapshot.val());
        } else {
            res.status(404).json({
                error: 404,
                descripcion: "No hay datos disponibles"
            });
            console.log("No hay datos disponibles");
        }
    }).catch((error) => {
        res.status(500).json({
            error: 500,
            descripcion: "Error en el servidor"
        });
        console.error(error);
    });
});



module.exports = router;
 