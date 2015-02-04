define(function (require) {

	var tpl = require("text!templates/index.tpl"),
		template = _.template(tpl);

	return Backbone.View.extend({

		el: '.wrapper',

		initialize : function(attrs) {
			this.options = attrs;
		},

		render : function () {

			this.$el.html(template());

			return this;

		},

		events : {
			'submit form': 'generateStory',
			'keyup textarea': 'characterCount'
		},

		characterCount : function(e){

			var limit = 1250,
				count = $("textarea").val().length;

			if(limit <= count){
				
				$(".character-count").addClass("warning");

			} else {

				$(".character-count").removeClass("warning");

			}

			$(".character-count span").text(limit - count);

		},

		generateStory : function(e){
			e.preventDefault();

			if($("textarea[name='story']").val().length < 10){

				alert("Enter a story, you must.");

				$("textarea[name='story']").focus();

				return false;

			}

			var Stories = Parse.Object.extend("Stories");
			var story = new Stories();

			story.save({
				story: $("textarea[name='story']").val(),
				author: $("input[name='name']").val(),
				twitter: $("input[name='twitter']").val(),
			}, {
				success: function(response) {

					Backbone.history.navigate('story/' + response.id, {trigger: true});

				},
				error: function(response) {

					console.log(response);

					alert("Sorry, something went wrong. We'll look into it.");

				}
			});

		}

	});

});