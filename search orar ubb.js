// ==UserScript==
// @name         Seach orar
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  UBB didn't leave 90s, making their sites without a goddamn search bar
// @author       Paul Forgaci
// @match        http://www.cs.ubbcluj.ro/files/orar/2016-2/tabelar/I1.html
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==


function search_input(input, inputs) {
    $('tr').each(function(index) {
        $(this).find('td').each(function() {
            var patt = new RegExp(".*" + input + ".*", "i");
            if (patt.test(this.innerText)) {
                var inp = $(this).parent();
                inputs.push(inp);
            }
        });
    });
}


function sort_inputs(inputs) {
    var ok = false;
    while (!ok) {
        ok = true;
        for (var i = 0; i < inputs.length - 1; ++i) {
            var a = window.days.indexOf(inputs[i][0].children[0].innerText);
            var b = window.days.indexOf(inputs[i + 1][0].children[0].innerText);
            if (a > b) {
                var o = inputs[i];
                inputs[i] = inputs[i + 1];
                inputs[i + 1] = o;
                ok = false;
            } else if (a === b && parseInt(inputs[i][0].children[1].innerText) > parseInt(inputs[i + 1][0].children[1].innerText)) {
                var gol = inputs[i];
                inputs[i] = inputs[i + 1];
                inputs[i + 1] = gol;
                ok = false;
            }
        }
    }
}

function display_inputs(inputs) {
    var whole ='<table border="1" cellspacing="0" cellpadding="0"><tbody>';
    for (var i = 0; i < inputs.length; ++i)
        whole += inputs[i][0].outerHTML;
    whole += '</tbody></table>';
    $('center')[0].innerHTML = whole;
}


(function() {
    'use strict';

    window.days = ["Luni", "Marti", "Miercuri", "Joi", "Vineri"];
    window.allofit = $('center')[0].innerHTML;
    var input;
    var inputs;
    $('body').append('<input id="searchbar" style="position: fixed; top: 0; right: 0px;">');
    $('#searchbar').keyup(function (e) {
        if (e.which === 13) { // on enter key press
            input = $('#searchbar').val();
            inputs = [];
            $('#searchbar').val("");
        	search_input(input, inputs);
            sort_inputs(inputs);
            display_inputs(inputs);
        }
        if (e.which === 27) { // on esc key press
            $('center')[0].innerHTML = window.allofit;
        }
    });
})();
