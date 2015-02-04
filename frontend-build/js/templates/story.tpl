<div class="view story">

	<% if(mobile) { %>
		<a class="btn fa fa-play" href="#">Play</a>
	<% } %>

	<article class="starwars">
		<audio preload="auto" preload>
			<source src="_includes/sounds/opening.ogg" type="audio/ogg" />
			<source src="_includes/sounds/opening.mp3" type="audio/mpeg" />
		</audio>

		<div class="animation">

			<section class="intro">
				A long time ago in a galaxy far,<br> far away....
			</section>

			<section class="titles">
				<div>
					<p>
						<%= story %>
					</p>
				</div>
			</section>

			<section class="logo">
				<img src="_includes/images/logo.png" />
			</section>
		</div>
	</article>

	<div class="post-play">
		<div class="scroll">
			<div class="grid">
				<div class="grid-6 offset-3">
					<div class="social">
						<a class="btn fa fa-facebook" href="#">Share on Facebook</a>

						<a  class="btn fa fa-twitter" href="<%= shareTwitter %>" target="_blank">Share on Twitter</a>
					</div><!-- .social -->

					<div><a class="fa fa-refresh" href="#story/<%= id %>">Play Again</a></div>
					
					<div><a class="btn" href="#">Create your own story</a></div>

					<div><a class="stories" href="#stories">View the most popular stories</a></div>
				</div>
			</div>
		</div>
	</div>

	<a href="#" class="fa fa-fast-forward">Skip</a>

</div>