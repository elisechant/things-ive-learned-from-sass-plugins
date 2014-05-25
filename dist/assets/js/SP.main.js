/*! things-ive-learned-from-sass-plugins Sunday, May 25th, 2014, 2:17:12 PM* Copyright (c) 2014 elisechant; */

var SP = SP || (window.SP = {});


(function($, d) {

	"use strict";


	SP.Slides = {

		/**
		 * Start the class
		 */
		initialize: function() {
			var me = this;

			$(d).on('ready', $.proxy(me.initReveal, me));

		},

		/**
		 * Initialise reveal.js
		 */
		initReveal: function() {

			if (window && window.Reveal) {
				Reveal.initialize({
					controls: true,
					progress: true,
					history: true,
					center: true,

					theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
					transition: Reveal.getQueryHash().transition || 'linear', // default/cube/page/concave/zoom/linear/fade/none

					// Parallax scrolling
					// parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
					// parallaxBackgroundSize: '2100px 900px',

					// Optional libraries used to extend on reveal.js
					dependencies: [
						{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
						{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
						{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
						{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
						{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
						{ src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
					]
				});
			}

		}

	};


	// execute
	$($.proxy(SP.Slides.initialize, SP.Slides));

})(jQuery, document);
