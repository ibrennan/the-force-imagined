
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("getStory", function(request, response) {

	Parse.Cloud.useMasterKey();

	var storyID = request.params.storyID;

	var Stories = Parse.Object.extend("Stories");
	var query = new Parse.Query(Stories);

	query.equalTo("objectId", storyID);

	query.find({
		success: function(results) {

			if(results.length === 0){

				response.error(error);

			} else {

				results[0].increment("viewCount");

				results[0].save(null, {
					success: function(story) {
						response.success(results);
					},
					error: function(item, error) {
						response.error(error);
					}
				});

			}

		},
		error: function(error) {

			response.error(error);

		}
	});

});
