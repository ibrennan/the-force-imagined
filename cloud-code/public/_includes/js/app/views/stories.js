define(function (require) {

	var template = _.template( require("text!templates/stories.tpl") );

	return Backbone.View.extend({

		el: '.wrapper',

		initialize : function(attrs) {
			this.options = attrs;
		},

		events : {
			'click .fa-file-text': 'previewStory',
			'click .story-overlay .fa-times': 'closeOverlay',
			'click .fa-facebook': 'shareFacebook',
			'click .fa-twitter': 'shareTwitter'
		},

		closeOverlay : function(e){

			e.preventDefault();

			$(".story-overlay").fadeOut(300);

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

		previewStory : function(e){
			var self = this;

			e.preventDefault();

			var id = $(e.target).attr("data-id");

			self.storyID = self.results[id].id;

			self.snippetFB = self.results[id].attributes.story.substring(0,200) + "...";

			self.snippetTwitter = encodeURIComponent(self.results[id].attributes.story.substring(0,80) + "...");

			var url = encodeURIComponent("http://www.theforceimagined.com/#story/" + self.storyID);

			var shareTwitter = "http://twitter.com/share?text=" + self.snippetTwitter + "&url=" + url + "&hashtags=starwars,theforceimagined"

			$(".story-overlay .scroll").html("<p>" + self.results[id].attributes.story + "</p><p class='author'>" + self.results[id].attributes.author + "</p><a class='btn fa fa-facebook' href='#'>Share on Facebook</a><a  class='btn fa fa-twitter' href='" + shareTwitter + "' target='_blank'>Share on Twitter</a><a href='#' title='Close' class='fa fa-times'>Close</a>");

			$(".story-overlay").fadeIn(300);

		},

		render : function () {
			var self = this;

			var Stories = Parse.Object.extend("Stories");
			var query = new Parse.Query(Stories);


			query.descending("viewCount");

			query.limit(50); 

			query.find({
				success: function(results) {
					var articles = [];

					self.results = results;

					for (var i = 0; i < results.length; i++) { 

						if(articles.length < 20){
							var object = results[i];

							var title = object.attributes.story.substring(0,100) + "....";

							if(title.length > 40){

								var author = object.attributes.author;

								if(author.length < 2){
									author = "";
								}

								var twitter = object.attributes.twitter;

								if(twitter.length < 2){
									twitter = "";
								}

								articles.push({
									title: title,
									url: "#story/" + object.id,
									author: author,
									twitter: twitter,
									id: i
								});

							}
						}

					}

					self.$el.html(template({
						articles: articles
					}));

					ga('send', 'pageview', "/stories");
					
				},
				error: function(error) {
					console.log(error);
				}
			});

			return this;

		}

	});

});