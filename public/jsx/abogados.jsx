
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
      type: 'post',
      data: { "usuario": sessionStorage.getItem('usuario') },
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
     sessionStorage.setItem('usuarioAdmin', 'Guillermo' );
       
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
   userSelected: function(e) {
    sessionStorage.setItem('usuario', e.target.getAttribute('data-key') );
    downloadData();
   },

   render            : function(){
     instance=this;
     downloadUsers();
      var users = this.state.simpleList;
      var listUs =   users.map(function(element){
        if (element.usuario){
        return (
          
            <div className="row sideBar-body" >
              <div className="col-sm-3 col-xs-3 sideBar-avatar">
                <div className="avatar-icon">
                   <button className="BtnPreguntas" data-key={element.usuario} onClick={ this.userSelected } >Select</button>
                </div>
              </div>
              <div className="col-sm-9 col-xs-9 sideBar-main">
                <div className="row">
                  <div className="col-sm-8 col-xs-8 sideBar-name">
                    <span className="name-meta">{element.usuario}
                  </span>
                  </div>
                  <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                    <span className="time-meta pull-right">
                  </span>
                  </div>
                </div>
              </div>
            </div>

        );
        }
      },this);


      return (
            <div>
              {listUs}
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
   realizarRespuesta(evt) {
      this.setState({respuesta:evt.target.value});
       $.ajax({
                    url   : "/api/add",
                    type  : "post",
                    data  : {"mensaje": this.state.respuesta, "usuario": sessionStorage.getItem('usuario'), "class": "self", "admin": sessionStorage.getItem('usuarioAdmin')}
                });    
   },
    actualizarRespuesta(evt) {
    this.setState({respuesta:evt.target.value});    
  },
  actualizarAdmin(evt) {
    sessionStorage.setItem('usuarioAdmin', evt.target.value );    
    },
   render: function() {
     instanceConv=this;
     downloadData();
      var tablero = this.state.conversacion;
      return (
        <div>
        <div>
         <ol className="chat">
            {tablero.map(function(element){
               if (element.mensaje){
                 if(element.admin){
                     return (

          <div className="row message-body">
            <div className="col-sm-12 message-main-receiver">
              <div className={element.class}>
                <div className="message-text">
                 {element.mensaje}
                </div>
                <span className="message-time pull-right">
                  {element.admin}
                </span>
              </div>
            </div>
          </div>
                      );
                 }else{
                     return (
          <div className="row message-body">
            <div className="col-sm-12 message-main-receiver">
              <div className={element.class}>
                <div className="message-text">
                 {element.mensaje}
                </div>
                <span className="message-time pull-right">
                  {element.usuario}
                </span>
              </div>
            </div>
          </div>
                      
                      
                      );
        


                 }
                     
               }
            })}
         </ol> 
        </div>
        <div className="row reply">
          <div className="col-sm-4 col-xs-4 reply-main">
            <input type="text" onChange={ this.actualizarAdmin } className="form-control"  />
          </div>
          <div className="col-sm-4 col-xs-4 reply-main">
            <textarea className="form-control" rows="1" id="comment" value={this.state.respuesta}  onChange={ this.actualizarRespuesta }></textarea>            
          </div>
          <div className="col-sm-4 col-xs-4 reply-send">
            <button className="BtnPreguntas" onClick={ this.realizarRespuesta } >Responder</button>
          </div>
        </div>   
        </div>             
      );
   }
});

var UsuarioOnline  = React.createClass({
  
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
     var userSelect = sessionStorage.getItem('usuario');
      return (
        <div className="row" >
          <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
            <div className="heading-avatar-icon">
              <img src="http://shurl.esy.es/y" />
            </div>
          </div>
          <div className="col-sm-8 col-xs-7 heading-name">
            <a className="heading-name-meta">INVITADO</a>
          </div>
        </div>
                 
      );
   }
});
React.render(
   <ListadoUsuario />,
   document.getElementById('listadoUsuarios')
)

React.render(
   <UsuarioOnline />,
   document.getElementById('usuarioOnline')
)
React.render(
   <PanelDePreguntas />,
   document.getElementById('mensajes')
)