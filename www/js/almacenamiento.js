var almacenamiento={};
almacenamiento.loguear=function(id, nombre){
    localStorage.setItem("usuario",JSON.stringify({id:id,nombre:nombre}))
}//function

almacenamiento.dameUsuario=function(){
    var usuario=localStorage.getItem("usuario")
    if(usuario!=null){
        eval("usuario="+usuario+";");
        return usuario;
    }//if
    return null;
}//function

almacenamiento.desloguear=function(){
    try{
        localStorage.removeItem("usuario");
        localStorage.removeItem("actualizo");
        localStorage.removeItem("actualizo2");
        //navigator.app.exitApp();
    }catch(error){
        return false;
    }//try
};

almacenamiento.actualizo=function(val){
    localStorage.setItem("actualizo",val+"");
}//function

almacenamiento.dameActualizo=function(){
    var actualizo=localStorage.getItem("actualizo");
    if(actualizo!=null){
        eval("actualizo="+actualizo+";");
        return actualizo;
    }//if
    return null;
}//function

almacenamiento.actualizo2=function(val){
    localStorage.setItem("actualizo2",val+"");
}//function

almacenamiento.dameActualizo2=function(){
    var actualizo2=localStorage.getItem("actualizo2");
    if(actualizo2!=null){
        eval("actualizo2="+actualizo2+";");
        return actualizo2;
    }//if
    return null;
}//function

almacenamiento.guardaDeDonde=function(){
    localStorage.setItem("deDonde", window.location);
}//function

almacenamiento.dameDeDonde=function(){
    var deDonde=localStorage.getItem("deDonde");
    if(deDonde!=null){
        eval("deDonde='"+deDonde+"';");
        localStorage.removeItem("deDonde");
        return deDonde;
    }//if
    return null;
}//function