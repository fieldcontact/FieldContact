$(document).ready(function () {
    LoadForms();
    $('.viewDetails').off('click').on('click', function () {
        alert();
    });
})


var LoadForms = function () {
    var dt = $("#serviceReports").DataTable();
    dt.destroy();

    var oTable = $("#serviceReports").dataTable({
        "paging": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]],
        "serverSide": true,
        "columns": [{ data: "CompanyName", "bSortable": true },
        { data: "EmployeeName", "bSortable": true },
        { data: "StarttDate", "bSortable": true },
        { data: "EnddDate", "bSortable": true },
        { data: "ServisTipi", "bSortable": true },
        { data: "View", "bSortable": false }],
        "sAjaxSource": "/Report/GetForms?" + Date(),
        "fnServerData": function (sSource, aoData, fnCallback) {
            $.getJSON(sSource, aoData).done(function (data) {
                fnCallback(data);
                $('.viewDetails').off('click').on('click', function () {
                    RequestToServerJson
                    alert();
                });
                $(".viewButton").off("click").on("click", function () {
                    var row = $(this).closest("tr");
                    var data = oTable.fnGetData(row);
                    data.Operation = null;

                    RequestToServerJson()
                })
            })
        }


    });
}


var RequestToServerJson = function (url, id, successFunction, failFunction) {
    try {
        $.get(url, id, function (data, status, jqXHR) {

        }, "json").fail(function (e) {

        }).always(function () {
            failFunction();
        });

    } catch (e) {

    }
}