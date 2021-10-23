var endpoint = "http://129.151.122.66:8080/api/Departamento"
$(document).ready(function () {
    $("#alerta").hide()
    getDepartamento()
    $("#actualizar").click(function () {

        putDepartamento()

    })
})

function getDepartamento() {

    $.ajax({

        url: endpoint + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.length == 0) {
                $("#tabla").hide()
                $("#alertareg").show()
            }
            else {
                $("#alertareg").hide()
                let registro = ""
                $.each(data, function (index, departamento) {
                    registro += "<tr>" +
                        "<td>" + departamento.id_dep + "</td>" +
                        "<td>" + departamento.nomdep + "</td>" +
                        "<td>" + departamento.startDate + "</td>" +
                        "<td>" + departamento.endDate + "</td>" +
                        "<td>" +
                        "<button class='btn btn-warning' data-toggle='modal' data-target='#myModal'" +
                        "onclick=\"ver('" + departamento.id_dep + "','" + departamento.nomdep + "','" + departamento.startDate + "','" + departamento.endDate + "')\"" +
                        ">Actualizar</button>" +
                        "<button class='btn btn-danger ml-1'  " +
                        "onclick=\"eliminar('" + departamento.id_dep + "')\"" +
                        ">Eliminar</button>" +
                        "</td>"
                    "</tr>"

                })

                $("#tbody").html(registro)
            }

        }

    })
}



function ver(id_dep, nomdep, startDate, endDate) {
    let ds = new Date(startDate)
    let de = new Date(endDate)
    $("#id_dep").val(id_dep)
    $("#nomdep").val(nomdep)
    $("#startDate").val(ds.toISOString().slice(0, 16))
    $("#endDate").val(de.toISOString().slice(0, 16))
}


function putDepartamento() {

    let departamento = {
        id_dep: $("#id_dep").val(),
        nomdep: $("#nomdep").val(),
        startDate: $("#startDate").val(),
        endDate: $("#endDate").val()
    }


    $.ajax({

        url: endpoint + "/update",
        type: 'PUT',
        data: JSON.stringify(departamento),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {
            console.log(data.status)
            let mensaje = ""
            if (data.status == "201") {
                mensaje = "Actualizo Departamento con Exito"
            }
            else {
                mensaje = "problemas al Guardar en BD consulte con el Administrador"
            }
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            getDepartamento()
        }

    })
}




function eliminar(id) {

    $.ajax({

        url: endpoint + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {
            getDepartamento()
        }

    })
}