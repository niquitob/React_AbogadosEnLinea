
"use strict";

var socket = null;
var startSocket = function startSocket() {
   socket = io(window.location.hostname);
};
var instance = undefined;
var downloadData = function downloadData() {
   $.ajax({
      url: 'http://abogadosenlinea.azurewebsites.net/users',
      type: 'post',
      data: { "usuario": sessionStorage.getItem('usuario') },
      success: function (data) {
         instance.setState({ simpleList: data });
      }.bind(instance),
      error: function (xhr, status, err) {
         console.error(instance.props.url, status, err.toString());
      }.bind(instance)
   });
};
var CargaPreguntas = React.createClass({
   displayName: 'CargaPreguntas',


   componentDidMount: function componentDidMount() {
      sessionStorage.setItem('tipoUsuario', 'invitado');
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

   getInitialState: function getInitialState() {
      return {
         pregunta: "",
         usuario: ""
      };
   },

   actualizarPregunta: function actualizarPregunta(evt) {
      this.setState({ pregunta: evt.target.value });
   },
   actualizarUsuario: function actualizarUsuario(evt) {
      this.setState({ usuario: evt.target.value });
   },
   crearUsuarioInvitado: function crearUsuarioInvitado() {
      sessionStorage.setItem('usuario', "Invitado" + Math.floor(Math.random() * 100 + 1));

      $.ajax({
         url: "/api/addUsuario",
         type: "post",
         data: { "usuario": sessionStorage.getItem('usuario'), "tipoUsuario": "invitado", "estaActivo": "si" }
      });
   },
   realizarPregunta: function realizarPregunta() {
      //this.setState({mostrarPregunta:mostrarPregunta + '<br/>' + pregunta});
      // this.setState({mostrarPregunta:this.state.mostrarPregunta + '\n\n' + this.state.pregunta});

      //sessionStorage.setItem('myData', this.state.mostrarPregunta );
      //sessionStorage.getItem('myData');
      if (sessionStorage.getItem('usuario') == "") {
         this.crearUsuarioInvitado();
      }

      if (sessionStorage.getItem('tipoUsuario') == "invitado") {
         $.ajax({
            url: "/api/add",
            type: "post",
            data: { "mensaje": this.state.pregunta, "usuario": sessionStorage.getItem('usuario'), "class": "other" }
         });
      } else {
         $.ajax({
            url: "/api/add",
            type: "post",
            data: { "mensaje": this.state.pregunta, "usuario": sessionStorage.getItem('usuario'), "class": "self" }
         });
      }
      this.setState({ pregunta: "" });
      downloadData();
   },

   render: function render() {
      return React.createElement(
         'div',
         null,
         React.createElement(
            'div',
            null,
            React.createElement('textarea', { className: 'CargarPreguntas', type: 'text', value: this.state.pregunta, onChange: this.actualizarPregunta }),
            React.createElement(
               'button',
               { className: 'BtnPreguntas', onClick: this.realizarPregunta },
               'Enviar'
            ),
            React.createElement('br', null)
         )
      );
   }
});

var PanelDePreguntas = React.createClass({
   displayName: 'PanelDePreguntas',


   getInitialState: function getInitialState() {
      return {
         simpleList: [{ mensaje: "cargando..." }],
         tipoUsuario: sessionStorage.getItem('myData')
      };
   },
   render: function render() {
      instance = this;
      downloadData();
      var informacion = this.state.simpleList;
      return React.createElement(
         'div',
         null,
         React.createElement(
            'ol',
            { className: 'chat' },
            informacion.map(function (element) {
               if (element.mensaje) {
                  if (element.admin) {
                     return React.createElement(
                        'li',
                        { className: element.class },
                        React.createElement(
                           'div',
                           { className: 'msg' },
                           React.createElement(
                              'p',
                              null,
                              React.createElement(
                                 'b',
                                 null,
                                 element.admin
                              )
                           ),
                           React.createElement(
                              'p',
                              null,
                              element.mensaje
                           )
                        )
                     );
                  } else {
                     return React.createElement(
                        'li',
                        { className: element.class },
                        React.createElement(
                           'div',
                           { className: 'msg' },
                           React.createElement(
                              'p',
                              null,
                              React.createElement(
                                 'b',
                                 null,
                                 element.usuario
                              )
                           ),
                           React.createElement(
                              'p',
                              null,
                              element.mensaje
                           )
                        )
                     );
                  }
               }
            })
         ),
         React.createElement(
            'p',
            null,
            this.state.tipoUsuario
         )
      );
   }
});

var CargaPreguntasChat = React.createClass({
   displayName: 'CargaPreguntasChat',


   componentDidMount: function componentDidMount() {
      sessionStorage.setItem('tipoUsuario', 'invitado');
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

   getInitialState: function getInitialState() {
      return {
         pregunta: "",
         usuario: ""
      };
   },

   actualizarPregunta: function actualizarPregunta(evt) {
      this.setState({ pregunta: evt.target.value });
   },
   actualizarUsuario: function actualizarUsuario(evt) {
      this.setState({ usuario: evt.target.value });
   },
   crearUsuarioInvitado: function crearUsuarioInvitado() {
      sessionStorage.setItem('usuario', "Invitado" + Math.floor(Math.random() * 100 + 1));

      $.ajax({
         url: "/api/addUsuario",
         type: "post",
         data: { "usuario": sessionStorage.getItem('usuario'), "tipoUsuario": "invitado", "estaActivo": "si" }
      });
   },
   realizarPregunta: function realizarPregunta() {
      //this.setState({mostrarPregunta:mostrarPregunta + '<br/>' + pregunta});
      // this.setState({mostrarPregunta:this.state.mostrarPregunta + '\n\n' + this.state.pregunta});

      //sessionStorage.setItem('myData', this.state.mostrarPregunta );
      //sessionStorage.getItem('myData');
      if (sessionStorage.getItem('usuario') == "") {
         this.crearUsuarioInvitado();
      }

      if (sessionStorage.getItem('tipoUsuario') == "invitado") {
         $.ajax({
            url: "/api/add",
            type: "post",
            data: { "mensaje": this.state.pregunta, "usuario": sessionStorage.getItem('usuario'), "class": "other" }
         });
      } else {
         $.ajax({
            url: "/api/add",
            type: "post",
            data: { "mensaje": this.state.pregunta, "usuario": sessionStorage.getItem('usuario'), "class": "self" }
         });
      }
      this.setState({ pregunta: "" });
      downloadData();
   },

   render: function render() {
      var estilo1 = {
         width: '90%'
      };
      var estilo2 = {
         width: '4%',
         padding: '0 10px 0 0'
      };
      return React.createElement(
         'div',
         null,
         React.createElement('input', { style: estilo1, type: 'text', value: this.state.pregunta, onChange: this.actualizarPregunta }),
         React.createElement('input', { type: 'image', src: 'Images/Enviar.png', style: estilo2, onClick: this.realizarPregunta })
      );
   }
});
React.render(React.createElement(CargaPreguntas, null), document.getElementById('formulario'));
React.render(React.createElement(PanelDePreguntas, null), document.getElementById('tablero'));
React.render(React.createElement(CargaPreguntasChat, null), document.getElementById('formularioChat'));