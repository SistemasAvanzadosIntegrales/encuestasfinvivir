var sincronizar={};
//var dominio="http://encuestafinvivir.solucionesoftware.com.mx/";
var dominio="http://172.16.0.16:8080/encuestador/";  //nuestro servidor
//var dominio="http://avansys-admin.dyndns.org:8080/encuestador/";
//var dominio="http://201.163.100.84:8080/encuestador/"; //finvivir produccion

sincronizar.dameUsuarios=function(callback, callbackError){
    $.ajax({
		url:      dominio+"sincronizar/dame-usuarios",
		type:     'POST',
        dataType: "json",
		data:	{
		},
        processData:true,
		success:	function(re){
            base.selecciona("SELECT id FROM usuario",
                function(tx, resultado){
                    var cons=new Array();
                    for(var i=0; i<=re.length-1; i++){
                        var esta=false;
                        for(var j=0; j<=resultado.rows.length-1; j++){
                            if(resultado.rows.item(j).id==re[i].id){
                                esta=true;
                                break;
                            }//if
                        }//for
                        if(!esta){
                            cons[cons.length]="INSERT INTO usuario(id, nombre) VALUES('"+re[i].id+"','"+re[i].nombre+"')";
                        }else{
                            cons[cons.length]="UPDATE usuario SET id='"+re[i].id+"',nombre='"+re[i].nombre+"' WHERE id='"+re[i].id+"';";
                        }//if
                    }//for
                    for(var k=0; k<=resultado.rows.length-1; k++){
                        var esta=false;
                        for(var l=0; l<=re.length-1; l++){
                            if(resultado.rows.item(k).id==re[l].id){
                                esta=true;
                                break;
                            }//if
                        }//for
                        if(!esta){
                            cons[cons.length]="DELETE FROM usuario WHERE id='"+resultado.rows.item(k).id+"';";
                        }//if
                    }//for
                    if(cons.length!=0){
                        base.ejecuta(cons,callback);
                    }else{
                        callback();
                    }//if
                }//function
            );
		},
		error: function(re){
            alert("No hay internet, no se pudo sincronizar usuarios con el servidor.");
            callbackError();
		}
	});
}//function

sincronizar.dameEncuestas=function(idUsuario, callback, callbackError){
    $.ajax({
		url:      dominio+"sincronizar/dame-encuestas",
		type:     'POST',
        dataType: "json",
		data:	{
            idUsuario: idUsuario
		},
        processData:true,
		success:	function(re){
            base.selecciona("SELECT id FROM encuesta",
                function(tx, resultado){
                    var cons=new Array();
                    for(var i=0; i<=re.length-1; i++){
                        var esta=false;
                        for(var j=0; j<=resultado.rows.length-1; j++){
                            if(resultado.rows.item(j).id==re[i].id){
                                esta=true;
                                break;
                            }//if
                        }//for
                        if(!esta){
                            cons[cons.length]="INSERT INTO encuesta(id, folio, nombre, encabezado, inicio,"
                            +" fin, preguntaColorFondo, preguntaColorFuente, respuestaColorFuente, imagen, veces "
                            +")VALUES("
                            +"'"+re[i].id+"','"+re[i].folio+"','"+re[i].nombre+"','"+re[i].encabezado+"','"+re[i].inicio+"',"
                            +"'"+re[i].fin+"','"+re[i].preguntaColorFondo+"','"+re[i].preguntaColorFuente+"','"+re[i].respuestaColorFuente+"','"+re[i].imagen+"', '0' "
                            +")";
                        }else{
                            cons[cons.length]="UPDATE encuesta SET id='"+re[i].id+"', folio='"+re[i].folio+"'"
                            +", nombre='"+re[i].nombre+"', encabezado='"+re[i].encabezado+"', inicio='"+re[i].inicio+"'"
                            +", fin='"+re[i].fin+"', preguntaColorFondo='"+re[i].preguntaColorFondo+"', preguntaColorFuente='"+re[i].preguntaColorFuente+"' "
                            +", respuestaColorFuente='"+re[i].respuestaColorFuente+"', imagen='"+re[i].imagen+"' "
                            +" WHERE id='"+re[i].id+"'; "
                        }//if
                        for(var k=0; k<=resultado.rows.length-1; k++){
                            var esta=false;
                            for(var l=0; l<=re.length-1; l++){
                                if(resultado.rows.item(k).id==re[l].id){
                                    esta=true;
                                    break;
                                }//if
                            }//for
                            if(!esta){
                                cons[cons.length]="DELETE FROM encuesta WHERE id='"+resultado.rows.item(k).id+"';";
                            }//if
                        }//for
                    }//for
                    if(cons.length!=0){
                        base.ejecuta(cons,callback);
                    }else{
                        callback();
                    }//if
                }//function
            );
		},
		error: function(re){
			alert("Error al sincronizar encuestas con el servidor");
            callbackError();
            //_mensaje("Ooops!","No se pudo sincronizar usuarios con el servidor.","Entendido");
		}
	});
}//function

sincronizar.dameUsuarioEncuestas=function(idUsuario, callback){
    $.ajax({
		url:      dominio+"sincronizar/dame-usuarioencuestas",
		type:     'POST',
        dataType: "json",
		data:	{
            idUsuario: idUsuario
		},
        processData:true,
		success:	function(re){
            base.ejecuta(["DELETE FROM usuarioencuesta WHERE 1=1;"],
                function(tx, resultado){
                    var cons=new Array();
                    for(var i=0; i<=re.length-1; i++){
                        cons[cons.length]="INSERT INTO usuarioencuesta(id, usuario_id, encuesta_id, fecha "
                        +")VALUES("
                        +"'"+re[i].id+"','"+re[i].usuario_id+"','"+re[i].encuesta_id+"','"+re[i].fecha+"'"
                        +")";
                    }//for
                    if(cons.length!=0){
                        base.ejecuta(cons,callback);
                    }else{
                        callback();
                    }//if
                }//function
            );
		},
		error: function(re){
			alert("Error al sincronizar encuestas con el servidor");
            //_mensaje("Ooops!","No se pudieron sincronizar las encuestas con el servidor.","Entendido");
		}
	});
}//function

sincronizar.damePreguntas=function(idUsuario, callback){
    $.ajax({
		url:      dominio+"sincronizar/dame-preguntas",
		type:     'POST',
        dataType: "json",
		data:	{
            idUsuario: idUsuario
		},
        processData:true,
		success:	function(re){
            base.selecciona("SELECT id FROM pregunta",
                function(tx, resultado){
                    var cons=new Array();
                    for(var i=0; i<=re.length-1; i++){
                        var esta=false;
                        for(var j=0; j<=resultado.rows.length-1; j++){
                            if(resultado.rows.item(j).id==re[i].id){
                                esta=true;
                                break;
                            }//if
                        }//for
                        if(!esta){
                            cons[cons.length]="INSERT INTO pregunta(id, nombre, respuesta_padre_id, pregunta_tipo_id, obligatoria,	encuesta_id, prioridad, finalizara "
                            +")VALUES("
                            +"'"+re[i].id+"','"+re[i].nombre+"','"+re[i].respuesta_padre_id+"','"+re[i].pregunta_tipo_id+"','"+re[i].obligatoria+"',"
                            +"'"+re[i].encuesta_id+"','"+re[i].prioridad+"','"+re[i].finalizara+"'"
                            +")";
                        }else{
                            cons[cons.length]="UPDATE pregunta SET id='"+re[i].id+"', nombre='"+re[i].nombre+"' "
                            +", respuesta_padre_id='"+re[i].respuesta_padre_id+"', pregunta_tipo_id='"+re[i].pregunta_tipo_id+"', obligatoria='"+re[i].obligatoria+"' "
                            +", encuesta_id='"+re[i].encuesta_id+"', prioridad='"+re[i].prioridad+"', finalizara='"+re[i].finalizara+"' "
                            +" WHERE id='"+re[i].id+"'; ";
                        }//if
                    }//for
                    for(var k=0; k<=resultado.rows.length-1; k++){
                        var esta=false;
                        for(var l=0; l<=re.length-1; l++){
                            if(resultado.rows.item(k).id==re[l].id){
                                esta=true;
                                break;
                            }//if
                        }//for
                        if(!esta){
                            cons[cons.length]="DELETE FROM pregunta WHERE id='"+resultado.rows.item(k).id+"';";
                        }//if
                    }//for
                    if(cons.length!=0){
                        base.ejecuta(cons,callback);
                    }else{
                        callback();
                    }//if
                }//function
            );
		},
		error: function(re){
			alert("Error al sincronizar preguntas con el servidor");
            //_mensaje("Ooops!","No se pudieron sincronizar las preguntas con el servidor.","Entendido");
		}
	});
}//function

sincronizar.dameRespuestas=function(idUsuario,callback){
    $.ajax({
		url:      dominio+"sincronizar/dame-respuestas",
		type:     'POST',
        dataType: "json",
		data:	{
            idUsuario: idUsuario
		},
        processData:true,
		success:	function(re){
            base.selecciona("SELECT id FROM respuesta",
                function(tx, resultado){
                    var cons=new Array();
                    for(var i=0; i<=re.length-1; i++){
                        var esta=false;
                        for(var j=0; j<=resultado.rows.length-1; j++){
                            if(resultado.rows.item(j).id==re[i].id){
                                esta=true;
                                break;
                            }//if
                        }//for
                        if(!esta){
                            cons[cons.length]="INSERT INTO respuesta(id, nombre, nombreObservaciones, pregunta_id, finalizara "
                            +")VALUES("
                            +"'"+re[i].id+"','"+re[i].nombre+"','"+re[i].nombreObservaciones+"','"+re[i].pregunta_id+"','"+re[i].finalizara+"'"
                            +")";
                        }else{
                            cons[cons.length]="UPDATE respuesta SET id='"+re[i].id+"', nombre='"+re[i].nombre+"'"
                            +", nombreObservaciones='"+re[i].nombreObservaciones+"', pregunta_id='"+re[i].pregunta_id+"', finalizara='"+re[i].finalizara+"' "
                            +" WHERE id='"+re[i].id+"'; ";
                        }//if
                    }//for
                    for(var k=0; k<=resultado.rows.length-1; k++){
                        var esta=false;
                        for(var l=0; l<=re.length-1; l++){
                            if(resultado.rows.item(k).id==re[l].id){
                                esta=true;
                                break;
                            }//if
                        }//for
                        if(!esta){
                            cons[cons.length]="DELETE FROM respuesta WHERE id='"+resultado.rows.item(k).id+"';";
                        }//if
                    }//for
                    if(cons.length!=0){
                        base.ejecuta(cons,callback);
                    }else{
                        callback();
                    }//if
                }//function
            );
		},
		error: function(re){
			alert("Error al sincronizar respuestas con el servidor");
            //_mensaje("Ooops!","No se pudieron sincronizar las respuestas con el servidor.","Entendido");
		}
	});
}//function

sincronizar.idsEncu=new Array();
sincronizar.callEncu;
sincronizar.encuestas=function(ids, callback){
    if(ids.length==0){
        _mensaje("Alerta","Tienes que seleccionar al menos una encuesta para sincronizar.","Entendido");
        estaSinc=false;
        return null;
    }//if
    sincronizar.idsEncu=ids;
    sincronizar.callEncu=callback;
    //alert(sincronizar.idsEncu);
    //sincronizar.idsEncu.splice(0,1);
    //alert(sincronizar.idsEncu);
    sincronizar.sincEncu();
}//function

var contador=0

sincronizar.sincEncu=function(){

    //alert(sincronizar.idsEncu);
    //alert(sincronizar.idsEncu.length);

    contador++;
    if(contador==30){
        return null;
    }//if
    if(sincronizar.idsEncu.length==0){
        //alert("entro termino");
        sincronizar.callEncu();
        return null;
    }//if
    base.selecciona("SELECT "
    +"    e.id, "
    +"    e.usuario_id, "
    +"    e.encuesta_id, "
    +"    e.fecha, "
    +"    e.actualizando, "
    +"    ep.pregunta_id, "
    +"    ep.respuesta_id, "
    +"    ep.valor_texto "
    +"FROM "
    +"    encuestaencuestado e "
    +"    INNER JOIN encuestaencuestadopregunta ep ON ep.encuestaencuestado_id=e.id "
    +"WHERE "
    +"    e.encuesta_id='"+sincronizar.idsEncu[0]+"' ", function(tx, resu){
        //alert("De consuta");

try{

        if(resu.rows.length==0){
            sincronizar.idsEncu.splice(0,1);
            sincronizar.sincEncu();
            return null;
        }//if
        
        var encuestados=new Array();
        var encuestado={};
        encuestado.respuestas=new Array();
        var idEncu=0;
        for(var i=0; i<=resu.rows.length-1; i++){
            if(i==0){
                idEncu=resu.rows.item(i).id;
            }//if
            if(idEncu!=resu.rows.item(i).id){
                encuestados[encuestados.length]=encuestado;
                encuestado={}
                encuestado.respuestas=new Array();
                idEncu=resu.rows.item(i).id;
            }//if

            encuestado.usuario_id  =resu.rows.item(i).usuario_id;
            encuestado.encuesta_id =resu.rows.item(i).encuesta_id;
            encuestado.fecha       =resu.rows.item(i).fecha;
            encuestado.actualizando=resu.rows.item(i).actualizando;
            encuestado.dispositivo=device.uuid

            encuestado.respuestas[encuestado.respuestas.length]={
                pregunta_id: resu.rows.item(i).pregunta_id,
                respuesta_id:resu.rows.item(i).respuesta_id,
                valor_texto: resu.rows.item(i).valor_texto
            };
        }//for
        encuestados[encuestados.length]=encuestado;
        console.log(JSON.stringify(encuestados));
        console.log("---enviara encuesta---");
        //alert("Enviara encuesta");
        $.ajax({
            url:        dominio+"sincronizar/toma-encuestas",
            type:       'POST',
            dataType:   "json",
            data:	{
                encuestas: JSON.stringify(encuestados)
		    },
            processData:true,
		    success:	function(re){
                var actualizadas=re;
                //alert("dio encuestas");
                //console.log(re);
                base.selecciona("SELECT "
                +"    id "
                +"FROM "
                +"    encuestaencuestado "
                +"WHERE "
                +"    actualizando IN ("+JSON.stringify(re).replace('[','').replace(']','')+") ", function(tx, resu){
                    var encuSinc=new Array();
                    for(var i=0; i<=resu.rows.length-1; i++){
                        encuSinc[i]=resu.rows.item(i).id;
                    }//for
                    //alert("DELETE FROM encuestaencuestadopregunta WHERE encuestaencuestado_id IN ("+encuSinc+")");
                    //console.log("DELETE FROM encuestaencuestadopregunta WHERE encuestaencuestado_id IN ("+encuSinc+")");
                    base.ejecuta(
                        ["DELETE FROM encuestaencuestadopregunta WHERE encuestaencuestado_id IN ("+encuSinc+")"
                        ,"DELETE FROM encuestaencuestado WHERE id IN ("+encuSinc+")"
                        ],
                        function(){
                            
                            
                            //alert(JSON.stringify(actualizadas));
                            $.ajax({
                                url:        dominio+"sincronizar/quita-actualizado",
                                type:       'POST',
                                dataType:   "json",
                                data:	{
                                    actualizadas: JSON.stringify(actualizadas)
                                },
                                processData:true,
                                success:	function(re){
                                    console.log(re);
                                    sincronizar.idsEncu.splice(0,1);
                                    sincronizar.sincEncu();  
                                }//function
                                ,error: function(re){
                                    alert("No se pudieron sincronizar encuestas, puesto que no hay conexión a internet..");
                                    estaSinc=false;
                                    //sincronizar.callEncu();
                                }
                            });
                            
                            
                    });
                });
            }//function
            ,error: function(re){
			    alert("No se pudieron sincronizar encuestas, puesto que no hay conexión a internet.");
                estaSinc=false;
                //sincronizar.callEncu();
		    }
        });
}catch(e){
    alert(e.message);
    //_mensaje("Ooops!","Error: "+e.message,"Entendido");
}//try
    });
}//function

archDesc=new Array();
archCall=null;
sincronizar.cargarImagenesEncuestas=function(callback){
    archCall=callback;
    base.selecciona("SELECT "
    +"  id, "
    +"  imagen "
    +"FROM "
    +"  encuesta ", function(tx, resu){
        archDesc=new Array();
        for(var i=0; i<=resu.rows.length-1; i++){
            archDesc[i]=resu.rows.item(i).imagen;
        }//for
        sincronizar.descargarImagen();
    });
}//function

sincronizar.descargarImagen=function(){
    if(archDesc.length==0){
        archCall();
        return null;
    }//if
    
try{
    archivo.sistema.root.getFile(archivo.sistema.root.toNativeURL()+"Finvivir encuestador/logotipos/"+archDesc[0],{create: false},
    function(){//Archivo existe
        //alert("archivo ya existe: "+archivo.sistema.root.toNativeURL()+"Finvivir encuestador/logotipos/"+archDesc[0]);
        archDesc.splice(0,1);
        sincronizar.descargarImagen();
    },function(){//Archivo no existe
        //alert("archivo no existe: "+archivo.sistema.root.toNativeURL()+"Finvivir encuestador/logotipos/"+archDesc[0]);
        var ftr=new FileTransfer();
        var dataDir=archivo.sistema.root.getDirectory("Finvivir encuestador",{create:true, exclusive:false});
        var uri=encodeURI(dominio+"cargas/logotipos/"+archDesc[0]);
        var downloadPath=archivo.sistema.root.toNativeURL()+"Finvivir encuestador/logotipos/"+archDesc[0];
        ftr.download(uri,downloadPath,function(e){
            //alert("Descargo imagen"+archDesc[0]);
            archDesc.splice(0,1);
            sincronizar.descargarImagen();
        },function(error){
            //alert("Error al momento de descargar "+downloadPath);
            //_mensaje("Ooops!","No se pudo descargar "+downloadPath,"Entendido");
            archCall();
        });
    },function(e){//Error al obtenerlo
        alert("Error al obtenerlo");
        //_mensaje("Ooops!","Error al obtener la imagen. Inténtelo de nuevo más tarde","Entendido");
    });
}catch(e){
    //alert(e);
    archCall();
}
}//function