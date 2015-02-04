define(function (require) {

	var tpl = require("text!templates/story.tpl"),
		template = _.template(tpl);

	return Backbone.View.extend({

		el: '.wrapper',

		initialize : function(attrs) {
			this.options = attrs;
		},

		events : {
			'click .fa-fast-forward': 'endStory',
			'click .fa-facebook': 'shareFacebook',
			'click .fa-twitter': 'shareTwitter',
			'click .fa-refresh': function(){
				Backbone.history.loadUrl();
				return false;
			}
		},

		shareTwitter : function(){
			var self = this;

			ga('send', 'event', 'social', 'twitter', self.storyID);

		},

		shareFacebook : function(e){
			var self = this;

			e.preventDefault();

			FB.ui({
				method: 'feed',
				link: 'http://www.theforceimagined.com/#story/' + self.storyID,
				picture: 'http://www.theforceimagined.com/_includes/images/ogimage.jpg',
				name: 'The Force Imagined',
				description: self.snippetFB
			}, function(response){

			});

			ga('send', 'event', 'social', 'facebook', self.storyID);

		},

		render : function () {
			var self = this;

			self.storyID = self.options[1];

			Parse.Cloud.run('getStory', {storyID: self.storyID}, {
				success: function(results) {

  					var story = results[0].attributes.story;

  					self.snippetFB = story.substring(0,200) + "...";

  					self.snippetTwitter = encodeURIComponent(story.substring(0,80) + "...");

  					story = story.replace(new RegExp('\r?\n', 'g'), '<br />');

  					var url = encodeURIComponent("http://www.theforceimagined.com/#story/" + results[0].id);


  					var shareTwitter = "http://twitter.com/share?text=" + self.snippetTwitter + "&url=" + url + "&hashtags=starwars,theforceimagined"

  					$("#stars1, #stars2, #stars3, footer").fadeOut(1500);

  					var mobile = false;

  					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

  						mobile = true;

					}

  					self.$el.html(template({
  						story: story,
  						id: results[0].id,
  						shareTwitter: shareTwitter,
  						mobile: mobile
  					}));

  					ga('send', 'pageview', "/story/" + results[0].id);

  					var $el = $(".starwars"),
  						audio = $el.find('audio').get(0);

  					$(audio).bind('playing', $.proxy(function() {

  						$el.addClass("animate").show();

    				}));

    				if(mobile){

    					$(".fa-play").click(function(e){

    						e.preventDefault();

    						$(this).remove();

    						$(".fa-fast-forward").show();

    						audio.play();

    						ga('send', 'event', 'story', 'play', self.storyID);

    					});

    				} else {

    					$(".fa-fast-forward").show();

    					ga('send', 'event', 'story', 'play', self.storyID);

    					audio.play();

    				}

  					

  					$(audio).bind('ended', $.proxy(function() {
      					
  						self.endStory();

    				}));

	  			},
				error: function(error) {
	    			console.log(error);

	    			Backbone.history.navigate('/', {trigger: true});
	    			
	  			}
			});


			return this;

		},

		endStory : function(e){
			var self = this;

			if(e){
				e.preventDefault();
				ga('send', 'event', 'story', 'skip', self.storyID);
			}

			$(".starwars").remove();

			$(".post-play, #stars1, #stars2, #stars3, footer").fadeIn(1500);

			ga('send', 'pageview', "/story/" + self.storyID + "/post-play");

		}

	});

});