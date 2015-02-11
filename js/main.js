// @codekit-prepend "tipped.js"; 

// ----------------------------------------------------------------------------
// Tooltips

Tipped.create('[title]',{
	position: {
		target: 'bottomleft',
		tooltip: 'topleft'
	},
	skin: 'light',
	offset: { y: -10 }
});

// ----------------------------------------------------------------------------
// Other Religion

var $religion = $('#religion'),
	$religionSelect = $religion.find('select'),
	$religionOther = $('<input type="text" name="religion-oth" placeholder="Specify">');

// when the religion changes
$religionSelect.change(function(){
	console.log($religionSelect.val());

	// if it's Other
	if($religionSelect.val() === 'oth') {
		$religionSelect.after($religionOther);
	} else {
		$religionOther.remove();
	}
});



// ----------------------------------------------------------------------------
// Evaluate Math from a String

var evalmath = function(s){
    var total= 0, s= s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
    while(s.length){
        total+= parseFloat(s.shift());
    }
    return total;
};


// ----------------------------------------------------------------------------
// Ability Modifiers

var calcModifier = function(x){
	switch(x) {
		case 0:
		case 1:
			return -5;
		case 2:
		case 3:
			return -4;
		case 4:
		case 5:
			return -3;
		case 6:
		case 7:
			return -2;
		case 8:
		case 9:
			return -1;
		case 10:
		case 11:
			return 0;
		case 12:
		case 13:
			return 1;
		case 14:
		case 15:
			return 2;
		case 16:
		case 17:
			return 3;
		case 18:
		case 19:
			return 4;
		case 20:
		case 21:
			return 5;
		case 22:
		case 23:
			return 6;
		case 24:
		case 25:
			return 7;
		case 26:
		case 27:
			return 8;
		case 28:
		case 29:
			return 9;
		case 30:
		case 31:
			return 10;
		case 32:
		case 33:
			return 11;
		case 34:
		case 35:
			return 12;
		case 36:
		case 37:
			return 13;
		case 38:
		case 39:
			return 14;
		case 40:
		case 41:
			return 15;
		case 42:
		case 43:
			return 16;
		case 44:
		case 45:
			return 17;
		case 46:
		case 47:
			return 18;
		case 48:
		case 49:
			return 19;
		case 50:
		case 51:
			return 20;

		default:
			return 'error';
	}
};


// ----------------------------------------------------------------------------
// Ability Score

// function for totalling score
jQuery.fn.extend({
	updateAbilitiesTotal: function() {

		var $this = $(this),
			$total = $this.parent().parent().find('[data-total]');

		$this.on('input',function(){

			// set a new total for that ability
			var $parent = $this.parent().parent();

			// reset the total
			var total = 0;

			// find all other inputs for that skill
			$parent.find('[data-score]').each(function(){

				var $score = $(this);

				console.log($score.attr('name') + ': ' + $score.val());

				// if the field has a value
				if($score.val() !== '') {

					//console.log('val: ' + $score.val());

					//console.log('evalmath: ' + evalmath($score.val()));

					//console.log('parseInt: ' + parseInt(evalmath($score.val())));
					
					// find the new value
					total += parseInt(evalmath($score.val()), 10);

				}

			});

			//console.log('total: ' + total);



			// update display total
			$total.text(calcModifier(total));

		});
	}
});



// assign the math change event for abilities
$('#abilities').find('li').each(function(){

	var $this = $(this),
		$total = $this.find('[data-total]');

	$this.find('input').each(function(){

		// assign it to the update function
		$(this).updateAbilitiesTotal();

	});
});


// ----------------------------------------------------------------------------
// Save event

if (Modernizr.localstorage) {
	// window.localStorage is available!
	$('#form').on('submit',function(e){
		e.preventDefault();

		// CLEAN THIS DATA
		localStorage.setItem("character", $(this).serialize());
		console.log(localStorage.getItem('character'));
	});
	
} else {
	alert('your browser does not support saving!');
}

