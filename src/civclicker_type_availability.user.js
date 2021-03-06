// ==UserScript==
// @name          CivClicker Type Availability Display
// @version       1.0.0
// @namespace     http://www.clarkrasmussen.com/
// @description   See how many of a specific type of character you have the resources to make.
// @include       http://dhmholley.co.uk/*
//
// ==/UserScript==

const VERSION = "1.0.0";

window.addEventListener('load', function() {
	exec(function () {
		// write out our elements
		var use_rows = ['tannergroup', 'blacksmithgroup', 'apothecarygroup', 'clericgroup', 'soldiergroup', 'cavalrygroup'];
                for (var n = 0; row = n < document.getElementById('jobs').getElementsByTagName('tr').length; n++) {
        		var row_id = document.getElementById('jobs').getElementsByTagName('tr')[n].getAttribute('id');
			if (use_rows.indexOf(row_id) > -1) {
				document.getElementById('jobs').getElementsByTagName('tr')[n].getElementsByTagName('td')[6].innerHTML += '&nbsp;(<span id="' + row_id.replace('group', 'Available') + '">0</span>)';
			}
                }

		// do the check every second
		setInterval(function () {
			update_availability();
		}, 1000);

		function update_availability () {
			document.getElementById('tannerAvailable').innerHTML = prettify(tannery.total - (population.tanners + population.tannersIll));
			document.getElementById('blacksmithAvailable').innerHTML = prettify(smithy.total - (population.blacksmiths + population.blacksmithsIll));
			document.getElementById('apothecaryAvailable').innerHTML = prettify(apothecary.total - (population.apothecaries + population.apothecariesIll));
			document.getElementById('clericAvailable').innerHTML = prettify(temple.total - (population.clerics + population.clericsIll));
			document.getElementById('soldierAvailable').innerHTML = prettify((barracks.total * 10) - (population.soldiers + population.soldiersIll + population.soldiersParty));
			document.getElementById('cavalryAvailable').innerHTML = prettify((stable.total * 10) - (population.cavalry + population.cavalryIll + population.cavalryParty));
		}
	});
});

function exec (fn) {
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
}