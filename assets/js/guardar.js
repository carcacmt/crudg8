var endpoint = "http://129.151.122.66:8080/api/Departamento"
$(document).ready(function () {
    //  postDepartamento()
    $("#alerta").hide()
    $("#guardar").click(function () {
        postDepartamento()
    })
})

function postDepartamento() {

    let departamento = {
        id_dep: $("#id_dep").val(),
        nomdep: $("#nomdep").val(),
        startDate: $("#startDate").val(),
        endDate: $("#endDate").val()
    }

    console.log(departamento)

    $.ajax({

        url: endpoint + "/save",
        type: 'POST',
        data: JSON.stringify(departamento),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {
            console.log(data.status)
            let mensaje = ""
            if (data.status == "201") {
                mensaje = "Guardo Departamento con Exito"
            }
            else {
                mensaje = "problemas al Guardar en BD consulte con el Administrador"
            }
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            limpiar()

        }

    })
}


function limpiar() {
        $("#id_dep").val(""),
        $("#nomdep").val(""),
        $("#startDate").val(""),
        $("#endDate").val("")
}