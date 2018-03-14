
"use strict"
var socket                 = null;
var startSocket            = function() {
   socket   = io(window.location.hostname);
}
var instance               = this;
var instanceConv = this;
var downloadUsers           = function(){
   $.ajax({
      url      : '/api/listUsers',
      dataType : 'json',
      success  : function(data) {
         instance.setState({simpleList: data});
      }.bind(instance),
      error: function(xhr, status, err) {
         console.error(instance.props.url, status, err.toString())
      }.bind(instance)
   });
};

var downloadData           = function(){
   $.ajax({
      url      : '/api/list',
      dataType : 'json',
      success  : function(data) {
         instanceConv.setState({conversacion: data});
      }.bind(instanceConv),
      error: function(xhr, status, err) {
         console.error(instanceConv.props.url, status, err.toString())
      }.bind(instanceConv)
   });
};

var ListadoUsuario   = React.createClass({

   componentDidMount : function() {
     sessionStorage.setItem('tipoUsuario', 'admin' );
     sessionStorage.setItem('usuario', 'Guillermo' );
       
     // startSocket();
     // instance = this;
     // downloadData();
     // socket.on('change', function (data) {
     //    downloadData();
     // });
   },
   getInitialState   : function() {
      return {
         simpleList  : [
            { usuario : "cargando..." }
         ],
      };
   },
   userSelected(){
    console.log('evt');
   },
   render            : function(){
     instance=this;
     downloadUsers();
      var users = this.state.simpleList;

      return (
         <div>
            <select size="10" name="users" >
            {users.map(function(element){
               if (element.usuario){
                     return (
                      <option >
                        {element.usuario}
                      </option>
                     );
               }
            })}
            </select>
         </div>

      );
   }
});

var PanelDePreguntas  = React.createClass({
  
  getInitialState   : function() {
      return {
         conversacion  : [
            { mensaje : "cargando..." }
         ],
         tipoUsuario : sessionStorage.getItem('myData'),
      };
   },
   render: function() {
     instanceConv=this;
     downloadData();
      var tablero = this.state.conversacion;
      return (
        <div>
         <ol className="chat">
            {tablero.map(function(element){
               if (element.mensaje){
                     return (
                      <li className={element.class}>
                        <div className="msg">
                      <p><b>{element.usuario}</b></p>
                      <p>{element.mensaje}</p>
                      </div>
                      </li>
                     );
               }
            })}
         </ol>
            <p>{this.state.tipoUsuario}</p> 
        </div>                
      );
   }
});

React.render(
   <ListadoUsuario />,
   document.getElementById('listadoUsuarios')
)
React.render(
   <PanelDePreguntas />,
   document.getElementById('mensajes')
)