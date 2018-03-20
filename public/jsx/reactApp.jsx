
"use strict"
var socket                 = null;
var startSocket            = function() {
   socket   = io(window.location.hostname);
}
var instance               = this;
var downloadData           = function(){
   $.ajax({
      url      : '/api/list',
      type: 'post',
      data: { "usuario": sessionStorage.getItem('usuario') },
      success  : function(data) {
         instance.setState({simpleList: data});
      }.bind(instance),
      error: function(xhr, status, err) {
         console.error(instance.props.url, status, err.toString())
      }.bind(instance)
   });
};
var CargaPreguntas   = React.createClass({

   componentDidMount : function() {
     sessionStorage.setItem('tipoUsuario', 'invitado' );
    if (!sessionStorage.getItem('usuario')) {
         this.crearUsuarioInvitado();
      }
 
     // startSocket();
     // instance = this;
     // downloadData();
     // socket.on('change', function (data) {
     //    downloadData();
     // });
   },

   getInitialState   : function() {
      return {
      pregunta: "",
      usuario: ""
      };
   },

  actualizarPregunta(evt) {
      this.setState({pregunta:evt.target.value});    
  },
  actualizarUsuario(evt) {
      this.setState({usuario:evt.target.value});    
  },
  crearUsuarioInvitado(){
      sessionStorage.setItem('usuario', "Invitado"+Math.floor((Math.random() * 100) + 1) );
      
        $.ajax({
                    url   : "/api/addUsuario",
                    type  : "post",
                    data  : {"usuario": sessionStorage.getItem('usuario'), "tipoUsuario": "invitado", "estaActivo": "si"}
                });
        
  },
  realizarPregunta() {
      //this.setState({mostrarPregunta:mostrarPregunta + '<br/>' + pregunta});
     // this.setState({mostrarPregunta:this.state.mostrarPregunta + '\n\n' + this.state.pregunta});
      
      //sessionStorage.setItem('myData', this.state.mostrarPregunta );
      //sessionStorage.getItem('myData');
      if(sessionStorage.getItem('usuario')==""){
          this.crearUsuarioInvitado();
      }

      if(sessionStorage.getItem('tipoUsuario') == "invitado"){
        $.ajax({
                    url   : "/api/add",
                    type  : "post",
                    data  : {"mensaje": this.state.pregunta, "usuario": sessionStorage.getItem('usuario'), "class": "other"}
                });
      }else
      {
        $.ajax({
                    url   : "/api/add",
                    type  : "post",
                    data  : {"mensaje": this.state.pregunta, "usuario": sessionStorage.getItem('usuario'), "class": "self"}
                });

      }
      this.setState({pregunta:""});
      downloadData();
  },
   render            : function(){
      return (
         <div>

            <div>
        
            <textarea className="CargarPreguntas" type="text" value={this.state.pregunta}  onChange={ this.actualizarPregunta } />

            <button className="BtnPreguntas" onClick={ this.realizarPregunta } >Enviar</button><br/>
            </div>
         </div>

      );
   }
});

var PanelDePreguntas  = React.createClass({
  
  getInitialState   : function() {
      return {
         simpleList  : [
            { mensaje : "cargando..." }
         ],
         tipoUsuario : sessionStorage.getItem('myData'),
      };
   },
   render: function() {
     instance=this;
     downloadData();
      var informacion = this.state.simpleList;
      return (
        <div>
         <ol className="chat">
            {informacion.map(function(element){
               if (element.mensaje){
                 if(element.admin){
                     return (
                      <li className={element.class}>
                        <div className="msg">
                      <p><b>{element.admin}</b></p>
                      <p>{element.mensaje}</p>
                      </div>
                      </li>);
                 }else{
                     return (
                      <li className={element.class}>
                        <div className="msg">
                      <p><b>{element.usuario}</b></p>
                      <p>{element.mensaje}</p>
                      </div>
                      </li>);

                 }
               }
            })}
         </ol>
            <p>{this.state.tipoUsuario}</p>
        </div>                
      );
   }
});

var CargaPreguntasChat   = React.createClass({

   componentDidMount : function() {
     sessionStorage.setItem('tipoUsuario', 'invitado' );
    if (!sessionStorage.getItem('usuario')) {
         this.crearUsuarioInvitado();
      }
 
     // startSocket();
     // instance = this;
     // downloadData();
     // socket.on('change', function (data) {
     //    downloadData();
     // });
   },

   getInitialState   : function() {
      return {
      pregunta: "",
      usuario: ""
      };
   },

  actualizarPregunta(evt) {
      this.setState({pregunta:evt.target.value});    
  },
  actualizarUsuario(evt) {
      this.setState({usuario:evt.target.value});    
  },
  crearUsuarioInvitado(){
      sessionStorage.setItem('usuario', "Invitado"+Math.floor((Math.random() * 100) + 1) );
      
        $.ajax({
                    url   : "/api/addUsuario",
                    type  : "post",
                    data  : {"usuario": sessionStorage.getItem('usuario'), "tipoUsuario": "invitado", "estaActivo": "si"}
                });
        
  },
  realizarPregunta() {
      //this.setState({mostrarPregunta:mostrarPregunta + '<br/>' + pregunta});
     // this.setState({mostrarPregunta:this.state.mostrarPregunta + '\n\n' + this.state.pregunta});
      
      //sessionStorage.setItem('myData', this.state.mostrarPregunta );
      //sessionStorage.getItem('myData');
      if(sessionStorage.getItem('usuario')==""){
          this.crearUsuarioInvitado();
      }

      if(sessionStorage.getItem('tipoUsuario') == "invitado"){
        $.ajax({
                    url   : "/api/add",
                    type  : "post",
                    data  : {"mensaje": this.state.pregunta, "usuario": sessionStorage.getItem('usuario'), "class": "other"}
                });
      }else
      {
        $.ajax({
                    url   : "/api/add",
                    type  : "post",
                    data  : {"mensaje": this.state.pregunta, "usuario": sessionStorage.getItem('usuario'), "class": "self"}
                });

      }
      this.setState({pregunta:""});
      downloadData();
  },
   render            : function(){
        var estilo1 = {
        width:'90%'
        };
        var estilo2 = {
        width: '4%',
        padding: '0 10px 0 0'
        };
      return (
         <div>

            <input style={estilo1} type="text" value={this.state.pregunta}  onChange={ this.actualizarPregunta }  />
            <input type="image" src="Images/Enviar.png" style={estilo2} onClick={ this.realizarPregunta } /> 

         </div>

      );
   }
});
React.render(
   <CargaPreguntas />,
   document.getElementById('formulario')
)
React.render(
   <PanelDePreguntas  />,
   document.getElementById('tablero')
)
React.render(
   <CargaPreguntasChat />,
   document.getElementById('formularioChat')
)
