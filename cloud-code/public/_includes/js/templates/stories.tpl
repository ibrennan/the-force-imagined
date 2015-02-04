<div class="scroll">

	<header>
		<a href="/">
			<h1 class="logo">Star Wars: The Force Awakens | Fan generated intro content</h1>
		</a>
	</header>
	<div class="view stories">

		<div class="grid">

			<div class="grid-12">
				<p>The Force is strong, here are the top 20 most viewed stories.</p>
			</div>

			<% _.each(articles, function(article) { %>
				<article class="grid-3">
					<div class="inner">
						<a href="<%= article.url %>">
							<%= article.title %>
							<p><%= article.author %></p>
						</a>
						<a href="<%= article.url %>" class="fa fa-play-circle" title="Play"></a>
						<a href="#" class="fa fa-file-text" title="Read" data-id="<%= article.id %>"></a>
					</div>
				</article>
			<% }) %>

			<div class="offset-4 grid-4">
				<a class="btn" href="#" style="text-align: center">Create your own story</a>
			</div>

		</div><!-- .grid -->

		<div class="story-overlay">
			<div class="scroll">

			</div>
		</div><!-- .story-overlay -->

	</div><!-- .stories -->
	<footer>
	    <p>Created with the force, by <a href="http://www.twitter.com/nannerb">@nannerb</a> and <a href="http://www.twitter.com/misterbhatt">@misterbhatt</a></p>
	</footer>
</div>