$(document).ready(function () {
    $(".companySelection").change(function () {
        var selectedID = $(".companySelection").val()

        $.ajax({
            type: "GET",
            url: "/Report/CompanySelection?ID=" + selectedID + "&requestDate=" + Date(),
            contentType: "aplication/json: charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#companyAdress").empty();
                $("#companyAdress").append(data.Address);
                $('#companyEmployee1').prop("disabled", false);
                $('.companyEmployee2').prop("disabled", false);

                $.ajax({
                    type: "GET",
                    url: "/Report/CompEmpSelection?ID=" + selectedID + "&requestDate=" + Date(),
                    contentType: "aplication/json: charset=utf-8",
                    dataType: "json",
                    success: function (newData) {
                        var jsonData = newData;
                       
                        $("#companyEmployee1").select2({
                            placeholder: "Firma Çalışanı Seçimi",
                            data: newData
                            //ajax: {
                            //    url: "/Report/CompEmpSelection?ID=" + selectedID + "&requestDate=" + Date(),
                            //    processResults: function (data) {
                            //        loadedData = data;
                            //        return {
                            //            results: data.items

                            //        };
                            //    }
                            //}


                            //formatResult: format,
                            //formatSelection: format,
                            //escapeMarkup: function (m) { return m; }
                        });
                    }
                })

                //$('.js-example-data-ajax').select2({
                //    ajax: {
                //        url: '/Report/',
                //        dataType: 'json'
                //        // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
                //    }
                //});

                var loadedData;
                $("#companyEmployee1").select2({
                    placeholder: "Firma Çalışanı Seçimi",
                    ajax: {
                        url: "/Report/CompEmpSelection?ID=" + selectedID + "&requestDate=" + Date(),
                        processResults: function (data) {
                            loadedData = data;
                            return {
                                results: data.items

                            };
                        }
                    }


                    //formatResult: format,
                    //formatSelection: format,
                    //escapeMarkup: function (m) { return m; }
                });
                //function format(compEmployees) {

                //}


                //$.ajax({
                //    type: "GET",
                //    url: "/Report/CompanySelection?ID=" + selectedID + "&requestDate=" + Date(),
                //    contentType: "aplication/json: charset=utf-8",
                //    dataType: "json",
                //    success: function (data) {

                //        for (var i = 0; i < data.CompanyEmployees; i++) {
                //            $('companyEmployee1').append('<option value=' + data.CompanyEmployees.ID + '">"' + data.CompanyEmployees.Name + '"');
                //        }
                //    }
                //})


                //$('.js-example-data-ajax').select2({
                //    tags: [],
                //    ajax: {
                //        url: "/Report/CompEmpSelection?ID=" + selectedID + "&requestDate=" + Date(),
                //        dataType: "json",
                //        data: function (term) {
                //            return {
                //                term: term
                //            };
                //        },
                //        results: function (data) {
                //            return {
                //                results: $.map(data, function (item) {
                //                    return {
                //                        text: item.CompanyEmployees.Name,
                //                        value: item.CompanyEmployees.ID
                //                    }
                //                })
                //            };
                //        }
                //    }
                //});



                //for (var i = 0; i < data.CompanyEmployees; i++) {
                //    $('companyEmployee1').append('<option value=' + data.CompanyEmployees.ID + '">"' + data.CompanyEmployees.Name + '"');
                //}

            }
        })
    })

    $("#saveForm").off('click').on('click', function () {
        var ariza = ($("input[name='arizaServis']").is(":checked")) ? "true" : "false";
        var bakim = ($("input[name='bakim']").is(":checked")) ? "true" : "false";
        var delivering = ($("input[name='teslim']").is(":checked")) ? "true" : "false";
        var devreyeAlma = ($("input[name='devreyeAlma']").is(":checked")) ? "true" : "false";
        var educate = ($("input[name='educat']").is(":checked")) ? "true" : "false";
        var firsMaint = ($("input[name='bakim1']").is(":checked")) ? "true" : "false";
        var isFree = ($("input[name='ucretli']").is(":checked")) ? "true" : "false";
        var meeting = ($("input[name='toplanti']").is(":checked")) ? "true" : "false";
        var secondMaint = ($("input[name='bakim2']").is(":checked")) ? "true" : "false";
        var supervice = ($("input[name='supervision']").is(":checked")) ? "true" : "false";
        var thirdMaint = ($("input[name='bakim3']").is(":checked")) ? "true" : "false";
        var warrantied = ($("input[name='HVAC']").is(":checked")) ? "true" : "false";
        var compId = $(".companySelection").val()
        var data = {
            IsArıza: ariza,
            IsBakım: bakim,
            IsDelivering: delivering,
            IsDevreyeAlma: devreyeAlma,
            IsEducate: educate,
            IsFirsManint: firsMaint,
            IsFree: isFree,
            IsMeeting: meeting,
            IsSecondMaint: secondMaint,
            IsSupervice: supervice,
            IsThirdMaint: thirdMaint,
            IsWarrantied: warrantied,
            CompanyID: compId,
            JobDescription: $("#jobDesc").val(),
            ServiceDetails: $("#serviceDetails").val()
        }

        RequestToServerJson("/Report/SaveServiceForm?requestDate=" + Date(), data, function () {

        }, function () {

        });
    })

});



var RequestToServerJson = function (url, jsonData, successFunction, failFunction) {
    try {
        App.blockUI({ target: "body", boxed: true, zIndex: 9999, message: "yükleniyor" })
        $.post(url, { Data: jsonData }, function (data, textStatus, jqXHR) {
            if (data.Status === 1) {
                toastr.success(data.Message, "İşlem")
                successFunction();
            }
            if (data.Status === 2) {
                toastr.error(data.Message, "İşlem")
            }
        }, "json").fail(function (e) {
            failFunction();
        }).always(function () {
            window.setTimeout(function () {
                App.unblockUI();
            }, 1000);
        })
    } catch (e) {

    }
}