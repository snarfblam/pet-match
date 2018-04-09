var chai = require('chai');
var expect = chai.expect;
var mocha = require('mocha');
var cap = require('chai-as-promised');

var formatString = require('./utility/formatString');
var formatDate = require('./utility/formatDate');
// var dotenv = require('dotenv').config();
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
// const models = require('./models');
// const config = require('./config/config');

describe('formatString', () => {
    it('should properly insert by index', function (done) {
        try {
            expect(formatString('{0} {1} {2}', 'zero', 'one', 'two')).to.equal('zero one two');
            done();
        } catch (e) {
            done(e);
        }
    });
});

describe('formatDate', () => {
    it('should properly format to M/D/YYYY H:MM AM/PM', function (done) {
        var d = new Date("Sun Apr 08 2018 23:09:00 GMT-0400 (Eastern Daylight Time)");
        try {
            console.log(d.getHours);
            console.log(formatDate(d));
            expect(formatDate(d)).to.equal('4/8/2018 11:09 pm');
            done();
        } catch (e) {
            done(e);
        }

    });
});

describe('login', () => {
    it('should proceed to google login', function (done) {
        this.timeout(30000);
        nightmare
            .goto('http://localhost:8080')
            .click('a[href="/auth/google/auth?then=/"]')
            .wait('#view_container', 1000)
            .then(() => {
                return done();
            })
    });

    it('should not allow unlogged users to add events', function (done) {
        this.timeout(30000);
        nightmare
            .goto('http://localhost:8080')
            .click('a[href="/events"]')
            .click('a[href="/addEvent"]')
            .wait('a[href="/login"]', 1000)
            .then(() => {
                return done();
            })

    });
});

// var titleCase = function (x) {
//     if (typeof x != 'string') throw Error('bad');

//     var parts = x.split(' ');
//     var capitalParts = parts.map(function (part) {
//         if (part.length >= 1) {
//             return part.charAt(0).toUpperCase() + part.substr(1);
//         } else {
//             return part;
//         }
//     });

//     return capitalParts.join(' ');
// }

// describe('models', () => {
//     it('should connect and sync', (done) => {
//         var connect = models.sequelize.sync({ force: false });
//         // doSomethingAsync().should.eventually.equal("foo").notify(done);
//         connect.should.not.throw().notify(done);
//         connect.then(() => console.log('didit'));
//         connect.catch((e) => console.log(e));
//     });
// });

// // console.log(expect);
// describe('titleCase', function () {
//     it('throws if not string', function () {
//         expect(titleCase.bind(null, 1)).throws();
//         expect(titleCase.bind(null, [])).throws();
//         expect(titleCase.bind(null, null)).throws();
//     });
//     it('produces "A B C DeF" from "a b c deF', function () {
//         expect(titleCase('a b c deF'))
//             .equals('A B C DeF');
//     });
//     it('preserves spaces, e.g. "  x  yf  z z" -> "  X  Yf  Z Z"', function () {
//         expect(titleCase('  x  y  z z'))
//             .equals('  X  Y  Z Z');
//     });
//     it('does not understand whitespace beyond spaces', function () {
//         expect(titleCase('a\tt'))
//             .not.equals('A\tT');
//     });
// });