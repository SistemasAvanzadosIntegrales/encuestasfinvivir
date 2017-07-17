document.writeln("<div class=\"statusbar-overlay\"></div>");
document.writeln("<div class=\"panel-overlay\"></div>");
document.writeln("<div class=\"panel panel-left panel-reveal\" style=\"background: #fff;\">");
document.writeln("<div class=\"list-block\" style=\"margin-top:0px\">");
document.writeln("<div class=\"list-group\">");
document.writeln("  <ul>");
document.writeln("    <li class=\"list-group-title\">Menú<span id='lblMenu' style='float:right;'></span></li>");
document.writeln("    <li onclick=\"window.location='listaEncuestas.html'\" >");
document.writeln("      <a  class=\"item-link item-content close-panel\">");
document.writeln("        <div class=\"item-media\"></div>");
document.writeln("        <div class=\"item-inner\">");
document.writeln("          <div class=\"item-title close-panel\">Inicio</div>");
document.writeln("        </div>");
document.writeln("      </a>");
document.writeln("    </li>");
document.writeln("  </ul>");
document.writeln("  <ul>");
document.writeln("    <li onclick=\"window.location='encuestasAplicadas.html'\" >");
document.writeln("      <a  class=\"item-link item-content close-panel\">");
document.writeln("        <div class=\"item-media\"></div>");
document.writeln("        <div class=\"item-inner\">");
document.writeln("          <div class=\"item-title close-panel\">Encuestas aplicadas</div>");
document.writeln("        </div>");
document.writeln("      </a>");
document.writeln("    </li>");
document.writeln("  </ul>");
document.writeln("  <ul>");
document.writeln("    <li onclick=\"window.location='sincronizacion.html'\" >");
document.writeln("      <a  class=\"item-link item-content close-panel\">");
document.writeln("        <div class=\"item-media\"></div>");
document.writeln("        <div class=\"item-inner\">");
document.writeln("          <div class=\"item-title close-panel\">Sincronización</div>");
document.writeln("        </div>");
document.writeln("      </a>");
document.writeln("    </li>");
document.writeln("  </ul>");
document.writeln("  <ul>");
document.writeln("    <li onclick=\"window.location='acercaDeEstaApp.html'\" >");
document.writeln("      <a  class=\"item-link item-content close-panel\">");
document.writeln("        <div class=\"item-media\"></div>");
document.writeln("        <div class=\"item-inner\">");
document.writeln("          <div class=\"item-title close-panel\">Acerca de esta app</div>");
document.writeln("        </div>");
document.writeln("      </a>");
document.writeln("    </li>");
document.writeln("  </ul>");
document.writeln("  <ul>");
document.writeln("    <li onclick=\"\" id=\"salir\" >");
document.writeln("      <a  class=\"item-link item-content close-panel\">");
document.writeln("        <div class=\"item-media\"></div>");
document.writeln("        <div class=\"item-inner\">");
document.writeln("          <div class=\"item-title close-panel\">Salir</div>");
document.writeln("        </div>");
document.writeln("      </a>");
document.writeln("    </li>");
document.writeln("  </ul>");
document.writeln("</div>");
document.writeln("</div>");
document.writeln("<div class=\"panel panel-right panel-cover\">");
document.writeln("  <div class=\"content-block\">");
document.writeln("    <p>Right panel content goes here</p>");
document.writeln("  </div>");
document.writeln("</div>");
document.writeln("</div>");
document.writeln("</div>");

document.writeln("<div class='modal {{#unless buttons}}modal-no-buttons{{/unless}}'>  ");
document.writeln("                  <div class='modal-inner'>  ");
document.writeln("                    {{#if title}}  ");
document.writeln("                      <div class='modal-title'>{{title}}</div>  ");
document.writeln("                    {{/if}}  ");
document.writeln("                    {{#if text}}  ");
document.writeln("                       <div class='modal-text'>{{text}}</div> ");
document.writeln("                    {{/if}}  ");
document.writeln("                    {{#if afterText}} ");
document.writeln("                      {{afterText}} ");
document.writeln("                    {{/if}} ");
document.writeln("                  </div> ");
document.writeln("                  {{#if buttons}} ");
document.writeln("                    <div class='modal-buttons'> ");
document.writeln("                      {{#each buttons}} ");
document.writeln("                        <span class='modal-button {{#if bold}}modal-button-bold{{/if}}'>{{text}}</span> ");
document.writeln("                      {{/each}}  ");
document.writeln("                    </div>  ");
document.writeln("                  {{/if}}  ");
document.writeln("                </div> ");

$(document).ready(function(){
            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                var usuario=almacenamiento.dameUsuario();
                //$("#lblMenu").html("Usuario:"+usuario.nombre);
                document.getElementById('salir').addEventListener('click', salirAplicacion);                
                //$(".salir").bind('click',salirAplicacion);
                document.addEventListener("backbutton", function(e){
	               e.preventDefault();
                }, false);
            }
});//function

function salirAplicacion(){
    myApp.confirm("¿Está seguro de salir de la aplicación?<br><br>Los datos no sincronizados, pueden perderse.", 'Salir',function(){
        almacenamiento.desloguear();
        navigator.app.exitApp();
    },function(){}
    );
}//function

function actualizarDatos(){
    almacenamiento.actualizo2(false);
    almacenamiento.guardaDeDonde(window.location);
    window.location="actualizar.html";
}//function