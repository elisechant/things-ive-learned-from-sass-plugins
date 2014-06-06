/*! things-ive-learned-from-sass-plugins Friday, June 6th, 2014, 11:56:40 AM* Copyright (c) 2014 elisechant; */

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
//					width: '100%',
//					height: 700,

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
