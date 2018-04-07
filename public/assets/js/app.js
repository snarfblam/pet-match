
function displayError(title, message) {
    $('#modal-error-message').text(title);
    $('#modal-error-details').text(message || '');
    displayModal('.modal-content-error');
}

function displayModal(modalSelector) {
    var $modal = $('.modal');
    $modal.children().each(function () {
        $(this).hide();
    })

    $(modalSelector).show();
    $modal.show();

    $(document.body).addClass('fixed');
}

function hideModal() {
    $('.modal').hide();
    $(document.body).removeClass('fixed');
}


$(document).ready(function () {
    $('#event-input-submit').on('click', function (e) {
        e.preventDefault();

        var eventData = {
            name: $('#event-input-name').val(),
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
            // alert(response.status);
            if (response.status == 'inserted') {
                window.location.href = '/eventDetails?id=' + response.value.id;
            } else {
                // alert("Error. Do something here.");
                displayError('Error submitting event', response.error.message || response.error.msg || response.error || 'unknown error' );
            }
        });
    });

    $('.event-edit-ok').on('click', function (e) {
        e.preventDefault();

        var eventData = {
            name: $('#event-input-title').val(),
            date: $('#event-input-date').val(),
            address1: $('#event-input-address-1').val(),
            address2: $('#event-input-address-2').val(),
            city: $('#event-input-city').val(),
            state: $('#event-input-state').val(),
            zip: $('#event-input-zip').val(),
            description: $('#event-input-description').val(),
            link: $('#event-input-link').val(),
        }

        $.ajax({
            url: "/api/editInfo/" + $('#event-input-id').val(),
            method: "PUT",
            data: eventData
        }).then(function (response) {
            // alert(response.status);
            if (response.status == 'updated') {
                window.location.reload();
            } else {
                displayError('Error submitting event', response.error.message || response.error.msg || response.error || 'unknown error' );
            }
        });
    });

    $('.event-input').css({ display: 'none' });
    $('.event-edit-cancel').css({ display: 'none' });
    $('.event-edit-ok').css({ display: 'none' });

    $('.event-edit-btn').on('click', function (e) {
        $('.event-input').css({ display: 'initial' });
        $('.event-text').css({ display: 'none' });

        $('.event-edit-btn').css({ display: 'none' });
        $('.event-edit-cancel').css({ display: 'initial' });
        $('.event-edit-ok').css({ display: 'initial' });
    });
    $('.event-edit-cancel').on('click', function (e) {
        $('.event-input').css({ display: 'none' });
        $('.event-text').css({ display: 'block' });

        $('.event-edit-btn').css({ display: 'initial' });
        $('.event-edit-cancel').css({ display: 'none' });
        $('.event-edit-ok').css({ display: 'none' });
    });

    $('#error-ok').on('click', function () { hideModal(); })
    $('#message-ok').on('click', function () { hideModal(); })
    $('.modal').on('click', function () { hideModal(); })
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
