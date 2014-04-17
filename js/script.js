var spredfast = {

	// updates leaderboard with new standings
	updateLeaderboard: function (leaderboardId, newStandings, currentStandings, options) {
		var defaults = $.extend({
			template: '#template-item-individual',
			itemHeight: 50
		}, options);
		// set height of leaderboard
		$(leaderboardId).css({'height' : newStandings.length * defaults.itemHeight + 'px'});
		// loop throught new standings
		for (var i = 0; i < newStandings.length; i++) {
			// element to update/create
			var el = {};
			// update current standings
			if ($.inArray(newStandings[i].name, currentStandings) != -1) {
				// reuse existing html element if already present
				el = $(leaderboardId).children().eq($.inArray(newStandings[i].name, currentStandings)).detach();
				// remove item from current position in standings
				currentStandings.splice($.inArray(newStandings[i].name, currentStandings), 1);
			} else {
				// create new html element if not present
				el = $.parseHTML($(defaults.template).html());
				// offset positioning off leaderboard for animation on load
				$(el).css({'top': $(leaderboardId).height() + 'px'});
			}
			// add item to current position in standings
			currentStandings.splice(i, 0, newStandings[i].name);
			// update content in element
			$(el).find('.name').html(newStandings[i].name);
			$(el).find('.countValue').html(newStandings[i].count);
			// add template to leaderboard in it's proper location
			if ($(leaderboardId).children().eq(i).length > 0) {
				$(el).insertBefore($(leaderboardId).children().eq(i))
			} else {
				$(leaderboardId).append(el);        
			}
		}
		// set positioning of new leaderboard standings
		spredfast.setPlacement($(leaderboardId).children(), defaults.itemHeight);
	},

	// sets the placement for all standings currently on the leaderboard
	setPlacement: function (items, height) {
		for (var i = 0; i < items.length; i++) {
			// element to place
			var el = items[i];
			// animate to new position
			if (parseInt($(el).css('top')) != height * i) {
				$(el).addClass('moving').css({'z-index': items.length-i}).animate({'top': height * i + 'px'}, 500, 'swing', function () {
					$(this).removeClass('moving');
				});
			}
		}
	}

}

// start the poller for the leaderboard
leaderboardPoller.start();

