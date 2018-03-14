
"use strict";

var socket = null;
var startSocket = function startSocket() {
   socket = io(window.location.hostname);
};
var instance = undefined;
var instanceConv = undefined;
var downloadUsers = function downloadUsers() {
   $.ajax({
      url: '/api/listUsers',
      dataType: 'json',
      success: function (data) {
         instance.setState({ simpleList: data });
      }.bind(instance),
      error: function (xhr, status, err) {
         console.error(instance.props.url, status, err.toString());
      }.bind(instance)
   });
};

var downloadData = function downloadData() {
   $.ajax({
      url: '/api/list',
      dataType: 'json',
      success: function (data) {
         instanceConv.setState({ conversacion: data });
      }.bind(instanceConv),
      error: function (xhr, status, err) {
         console.error(instanceConv.props.url, status, err.toString());
      }.bind(instanceConv)
   });
};

var ListadoUsuario = React.createClass({
   displayName: 'ListadoUsuario',


   componentDidMount: function componentDidMount() {
      sessionStorage.setItem('tipoUsuario', 'admin');
      sessionStorage.setItem('usuario', 'Guillermo');

      // startSocket();
      // instance = this;
      // downloadData();
      // socket.on('change', function (data) {
      //    downloadData();
      // });
   },
   getInitialState: function getInitialState() {
      return {
         simpleList: [{ usuario: "cargando..." }]
      };
   },
   userSelected: function userSelected() {
      console.log('evt');
   },

   render: function render() {
      instance = this;
      downloadUsers();
      var users = this.state.simpleList;

      return React.createElement(
         'div',
         null,
         React.createElement(
            'select',
            { size: '10', name: 'users' },
            users.map(function (element) {
               if (element.usuario) {
                  return React.createElement(
                     'option',
                     null,
                     element.usuario
                  );
               }
            })
         )
      );
   }
});

var PanelDePreguntas = React.createClass({
   displayName: 'PanelDePreguntas',


   getInitialState: function getInitialState() {
      return {
         conversacion: [{ mensaje: "cargando..." }],
         tipoUsuario: sessionStorage.getItem('myData')
      };
   },
   render: function render() {
      instanceConv = this;
      downloadData();
      var tablero = this.state.conversacion;
      return React.createElement(
         'div',
         null,
         React.createElement(
            'ol',
            { className: 'chat' },
            tablero.map(function (element) {
               if (element.mensaje) {
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

React.render(React.createElement(ListadoUsuario, null), document.getElementById('listadoUsuarios'));
React.render(React.createElement(PanelDePreguntas, null), document.getElementById('mensajes'));