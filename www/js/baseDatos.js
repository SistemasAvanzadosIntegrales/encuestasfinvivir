var db;
var base={};
base.consulta="";
$(document).ready(function(){
    document.addEventListener("deviceready",
    function(){
        db=window.openDatabase("Encuestador", "1.0", "Encuestador", 50000000);
    }
    ,false);
});

base.crearBaseDeDatos=function(callback){
    //$("#txtSalida").val($("#txtSalida").val()+"*Creando base de datos...");
    consultas=[
        //"DROP TABLE IF EXISTS usuario"
        //,"DROP TABLE IF EXISTS encuesta"
        //,"DROP TABLE IF EXISTS usuarioencuesta"
        //"DROP TABLE IF EXISTS pregunta",
        //"DROP TABLE IF EXISTS respuesta",
        //"DROP TABLE IF EXISTS encuestaencuestado"
        //,"DROP TABLE IF EXISTS encuestaencuestadopregunta"
        "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY, nombre)"
        ,"CREATE TABLE IF NOT EXISTS encuesta(id INTEGER PRIMARY KEY, folio INT, nombre, encabezado, inicio, fin, preguntaColorFondo, preguntaColorFuente, respuestaColorFuente, imagen, veces INT)"
        ,"CREATE TABLE IF NOT EXISTS usuarioencuesta(id INTEGER PRIMARY KEY, usuario_id INT, encuesta_id INT, fecha)"
        ,"CREATE TABLE IF NOT EXISTS pregunta(id INTEGER PRIMARY KEY, encabezado, nombre, respuesta_padre_id INT, pregunta_tipo_id, obligatoria INT, encuesta_id INT, prioridad INT, finalizara INT)"
        ,"CREATE TABLE IF NOT EXISTS respuesta(id INTEGER PRIMARY KEY, nombre, nombreObservaciones, pregunta_id INT, finalizara INT, esImagen INT, imagen, ponderacion)"
        ,"CREATE TABLE IF NOT EXISTS encuestaencuestado(id INTEGER PRIMARY KEY AUTOINCREMENT, usuario_id INT, encuesta_id INT, fecha, actualizando)"
        ,"CREATE TABLE IF NOT EXISTS encuestaencuestadopregunta(id INTEGER PRIMARY KEY AUTOINCREMENT, encuestaencuestado_id INT, pregunta_id INT, respuesta_id INT, valor_texto)"
    ];
    base.ejecuta(consultas, callback);
    
}//function

function leerTabla(tabla){
    base.selecciona("SELECT * FROM "+tabla,
        function(tx, resultado){
            for(var i=0; i<=resultado.rows.length-1; i++){
                var temp="\r\n*";
                for(var prop in resultado.rows.item(i)){
                    temp+="'"+resultado.rows.item(i)[prop]+"', ";
                }//for
                $("#txtSalida").val($("#txtSalida").val()+temp);
            }//for
        }//function
    );
}//function

base.inserta=function(cons, respuesta){
    db.transaction(function(tx){
        tx.executeSql(cons, [], respuesta, base.errorConsulta);
    },
    base.errorConsulta, base.bienConsulta);
}//function

base.ejecuta=function(cons, callback){
    db.transaction(function(tx){
        for(var i=0; i<=cons.length-1; i++){
            //$("#txtSalida").val($("#txtSalida").val()+"\r\n*"+cons[i]);
            tx.executeSql(cons[i]);
        }//for
    },
    base.errorConsulta, callback);
}//function

base.selecciona=function(cons, respuesta){
    db.transaction(function(tx){
        //alert(cons);
        tx.executeSql(cons, [], respuesta, base.errorConsulta2);
    },
    base.errorConsulta, base.bienConsulta);
}//function

base.bienConsulta=function(e){
    
}//function

base.errorConsulta2=function(e){
    _mensaje("","Error al obtener los datos. Inténtelo de nuevo mas tarde.<br />Descripción del error: "+JSON.stringify(e),"Entendido");
    //alert("Error2:"+JSON.stringify(e));
}//function

base.errorConsulta=function(e){
    _mensaje("","Error al obtener los datos. No se pudo establecer conexión.<br />Descripción del error: "+JSON.stringify(e),"Entendido");
    //alert("Error:"+JSON.stringify(e));
}//function