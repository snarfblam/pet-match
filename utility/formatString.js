module.exports = function () {

    var str = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1, arguments.length);
    
    return str.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};