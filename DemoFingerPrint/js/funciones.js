var timestamp = null;

function activarSensor(srn) {
  $.ajax({
    async: true,
    type: "POST",
    url: "Model/ActivarSensorAdd.php",
    data: "&token=" + srn,
    dataType: "json",
    success: function (data) {
      var json = JSON.parse(data);
      console.log(json);
      if (json["filas"] === 1) {
        $("#activeSensorLocal").attr("disabled", true);
        $("#fingerPrint").css("display", "block");
      }
    },
  });
}

function addUser(srn) {
  var data = {
    token: srn,
    documento: $("#documento").val(),
    nombre: $("#nombre").val(),
    telefono: $("#tel").val(),
  };

  data[data.length - 1] = { foto: "foto" };

  $.ajax({
    async: true,
    type: "POST",
    url: "Model/CrearUsuario.php",
    data: data,
    dataType: "json",
    success: function (data) {
      var json = JSON.parse(data);
      if (json["filas"] === 1) {
          /* atob => codifica string a base64 */
        $("#" + atob(srn)).attr("src", "imagenes/finger.png");
        $("#" + atob(srn) + "_texto").text("El sensor esta activado");
        showMessageBox("Usuario creado con exito", "success");
        $("#fingerPrint").css("display", "none");
      }
    },
  });
}

function cargar_push( ) { //:tipo lectura o escritura
  $.ajax({
    async: true,
    type: "POST",
    url: "Model/httpush.php",
    data: "&timestamp=" + timestamp, 
    dataType: "json",
    success: function (data) {
      var json = JSON.parse(JSON.stringify(data));
      console.log(json);
      // console.log(json["imgHuella"]);
      /* Retornamos lo que devueve el json */
      nombre = json["nombre_completo"];
      documento = json["documento"];
      // console.log(json["nombre"]);
      timestamp = json["timestamp"];
      imageHuella = json["imgHuella"];
      tipo = json["tipo"];
      id = json["id"];
      $("#" + id + "_status").text(json["statusPlantilla"]);
      $("#" + id + "_texto").text(json["texto"]);
      if (imageHuella !== null) {
        $("#" + id).attr("src", "data:image/png;base64," + imageHuella);
        if (tipo === "leer") {
          console.log(tipo);
          $("#documento").text(json["documento"]);
          $("#nombre").text(json["nombre"]);
        }
      }
      setTimeout("cargar_push( )", 1000);
    },
  });
}

function showMessageBox(mensaje, type) {
  var clas = "";
  var icono = "";
  switch (type) {
    case "success":
      clas = "mensaje_success";
      icono = "imagenes/success_16.png";
      break;
    case "warning":
      clas = "mensaje_warning";
      icono = "imagenes/warning_16.png";
      break;
    case "danger":
      clas = "mensaje_danger";
      icono = "imagenes/danger_16.png";
      break;
  }

  $("#mensaje").addClass(clas);
  $("#txtMensaje").html(mensaje);
  $("#imageMenssage").attr("src", icono);
  $("#mensaje").fadeIn(5);
  setTimeout(function () {
    $("#mensaje").fadeOut(1500);
  }, 3000);
}
