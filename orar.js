var subjects = [];
var types = [];
var good_types = ["Luni", "Marti", "Miercuri", "Joi", "Vineri"];
window.read = 0;
window.allofit = '';

window.reading = function() {
	var subject = prompt('Subject: ').trim();
	var type = prompt('Type: ').trim();
	if (window.read === 0) {
		window.allofit = document.body.innerHTML;
		window.read = 1;
	}
	if (type === "" || subject === "") {
		throw new Error("Search stopped.");
	}
	return [subject, type];
}

window.search_subject = function() {
    $('tr').each(function(index) {
        $(this).find('td').each(function() {
			var patt = new RegExp(".*" + subject + ".*", "i");
			if (patt.test(this.innerText))
            {
                var subj = $(this).parent();
				subjects.push(subj);
            }
        });
    });
}

window.search_types = function() {
	$('tr').each(function(index) {
        $(this).find('td').each(function() {
            var patt = new RegExp(".*" + type + ".*", "i");
			if (patt.test(this.innerText))
            {
                var subj = $(this).parent();
				types.push(subj);
            }
        });
    });
}

var params = ["", ""];
$.when(params = reading()).done(search_subject(params[0])).done(function(){
    var whole = '<table border="1" cellspacing="0" cellpadding="0"><tbody>';
    for (var i = 0; i < subjects.length; i++)
        whole += subjects[i][0].outerHTML;
    whole += '</tbody></table>';
    document.body.innerHTML = whole;
}).done(search_types(params[1])).done(function() {
	var ok = false;
	while (!ok) {
		ok = true;
		for (var i = 0; i < types.length - 1; i++) {
			var a = good_types.indexOf(types[i][0].children[0].innerText);
			var b = good_types.indexOf(types[i + 1][0].children[0].innerText);
			if (a > b) {
				var o = types[i];
				types[i] = types[i + 1];
				types[i + 1] = o;
				ok = false;
			} else if (a === b && parseInt(types[i][0].children[1].innerText) > parseInt(types[i + 1][0].children[1].innerText)) {
				var gol = types[i];
				types[i] = types[i + 1];
				types[i + 1] = gol;
				ok = false;
			}
		}
	}
}).done(function() {
	var whole ='<table border="1" cellspacing="0" cellpadding="0"><tbody>';
	for (var i = 0; i < types.length; i++)
        whole += types[i][0].outerHTML;
	whole += '</tbody></table>';
    document.body.innerHTML = whole;
});