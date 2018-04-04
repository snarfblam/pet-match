$(document).ready(function () {
    
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
