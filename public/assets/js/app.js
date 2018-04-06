$(document).ready(function () {
    $('#event-input-submit').on('click', function (e) {
        e.preventDefault();

        var eventData = {
            date: $('#event-input-datetime').val(),
            address1: $('#event-input-address1').val(),
            address2: $('#event-input-address2').val(),
            city: $('#event-input-city').val(),
            state: $('#event-input-state').val(),
            zip: $('#event-input-zip').val(),
            description: $('#event-input-description').val(),
            link: $('#event-input-link').val(),
        }

        $.ajax({
            url: "/api/editInfo",
            method: "POST",
            data: eventData
        }).then(function (response) {
            alert(response.status);
        });
    })
});

/* handlebars should render an object in the form of:
    var pmClientData = {
        registerData?: {
            
        }      
    }
*/

/** @constructor */
function PmClient() {
    var registerPage = $('#new-user-submit').length != 0;

    if (registerPage) {
        initRegisterPage();
    }
} { // Methods
    PmClient.prototype.initRegisterPage = function () {
        
    }
}
