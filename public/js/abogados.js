
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
    type: 'post',
    data: { "usuario": sessionStorage.getItem('usuario') },
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
    sessionStorage.setItem('usuarioAdmin', 'Guillermo');

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
  userSelected: function userSelected(e) {
    sessionStorage.setItem('usuario', e.target.getAttribute('data-key'));
    downloadData();
  },

  render: function render() {
    instance = this;
    downloadUsers();
    var users = this.state.simpleList;
    var listUs = users.map(function (element) {
      if (element.usuario) {
        return React.createElement(
          'button',
          { className: 'BtnPreguntas', 'data-key': element.usuario, onClick: this.userSelected },
          element.usuario
        );
      }
    }, this);

    return React.createElement(
      'div',
      null,
      listUs
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
  realizarRespuesta: function realizarRespuesta(evt) {
    this.setState({ respuesta: evt.target.value });
    $.ajax({
      url: "/api/add",
      type: "post",
      data: { "mensaje": this.state.respuesta, "usuario": sessionStorage.getItem('usuario'), "class": "self", "admin": sessionStorage.getItem('usuarioAdmin') }
    });
  },
  actualizarRespuesta: function actualizarRespuesta(evt) {
    this.setState({ respuesta: evt.target.value });
  },
  actualizarAdmin: function actualizarAdmin(evt) {
    sessionStorage.setItem('usuarioAdmin', evt.target.value);
  },

  render: function render() {
    instanceConv = this;
    downloadData();
    var tablero = this.state.conversacion;
    var styleOv = {
      overflow: 'scroll'
    };
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { style: styleOv },
        React.createElement(
          'ol',
          { className: 'chat' },
          tablero.map(function (element) {
            if (element.mensaje) {
              if (element.admin) {
                return React.createElement(
                  'div',
                  { className: 'row message-body' },
                  React.createElement(
                    'div',
                    { className: 'col-sm-12 message-main-receiver' },
                    React.createElement(
                      'div',
                      { className: element.class },
                      React.createElement(
                        'div',
                        { className: 'message-text' },
                        element.mensaje
                      ),
                      React.createElement(
                        'span',
                        { className: 'message-time pull-right' },
                        element.admin
                      )
                    )
                  )
                );
              } else {
                return React.createElement(
                  'div',
                  { className: 'row message-body' },
                  React.createElement(
                    'div',
                    { className: 'col-sm-12 message-main-receiver' },
                    React.createElement(
                      'div',
                      { className: element.class },
                      React.createElement(
                        'div',
                        { className: 'message-text' },
                        element.mensaje
                      ),
                      React.createElement(
                        'span',
                        { className: 'message-time pull-right' },
                        element.usuario
                      )
                    )
                  )
                );
              }
            }
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'row reply' },
        React.createElement(
          'div',
          { className: 'col-sm-4 col-xs-4 reply-main' },
          React.createElement('input', { type: 'text', onChange: this.actualizarAdmin, className: 'form-control' })
        ),
        React.createElement(
          'div',
          { className: 'col-sm-4 col-xs-4 reply-main' },
          React.createElement('textarea', { className: 'form-control', rows: '1', id: 'comment', value: this.state.respuesta, onChange: this.actualizarRespuesta })
        ),
        React.createElement(
          'div',
          { className: 'col-sm-4 col-xs-4 reply-send' },
          React.createElement(
            'button',
            { onClick: this.realizarRespuesta },
            'Responder'
          )
        )
      )
    );
  }
});

var UsuarioOnline = React.createClass({
  displayName: 'UsuarioOnline',


  getInitialState: function getInitialState() {
    return {
      conversacion: [{ mensaje: "cargando..." }],
      tipoUsuario: sessionStorage.getItem('myData')
    };
  },
  render: function render() {
    instanceConv = this;
    var userSelect = sessionStorage.getItem('usuario');
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-sm-2 col-md-1 col-xs-3 heading-avatar' },
        React.createElement(
          'div',
          { className: 'heading-avatar-icon' },
          React.createElement('img', { src: 'Images/usuario-sin-foto.png' })
        )
      ),
      React.createElement(
        'div',
        { className: 'col-sm-8 col-xs-7 heading-name' },
        React.createElement(
          'a',
          { className: 'heading-name-meta' },
          'INVITADO'
        )
      )
    );
  }
});
React.render(React.createElement(ListadoUsuario, null), document.getElementById('listadoUsuarios'));

React.render(React.createElement(UsuarioOnline, null), document.getElementById('usuarioOnline'));
React.render(React.createElement(PanelDePreguntas, null), document.getElementById('mensajes'));