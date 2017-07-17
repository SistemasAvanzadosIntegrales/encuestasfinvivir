archivo={};
archivo.sistema=null;
$(document).ready(function() {
    document.addEventListener("deviceready", function() { 
        window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
            archivo.sistema=fs;
        }, function(e){
            _mensaje("","No se puede acceder al sistema de archivos.Inténtelo de nuevo mas tarde.<br />"+JSON.stringify(e),"Entendido");
            //alert(JSON.stringify(e));
        });
    }, false);
});