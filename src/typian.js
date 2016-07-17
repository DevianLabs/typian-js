; (function (plug) { plug(window.jQuery, window, document); }
(function ($, window, document, undefined) {

  'use strict';
	var plugin = 'typian',
		  namespacePlugin = 'typian';

	//constructor
	function Plugin(el, opts) {
    this.default = this.opts
    this.opts = opts;
    this.el = el;
    this.$el = $(this.el);

    this.text = this.opts.text;
    this.textArray = this.text.split('');
    this.textPart = '';
    this.timer = 0;

    this.init();
	};

	// Methods
	$.extend(Plugin.prototype, {
		init: function () {
      this._animate();
		},

    //public methods

    //private _methods
		_animate: function() {
      var that = this;

      if(that.textArray.length > 0) {
        that.textPart += that.textArray.shift();
        that.$el.html(that.textPart);
      }
      else {
        clearTimeout(that.timer);
      return false;
      }

      that.timer = setTimeout(function(){
        that._animate();
      }, that.opts.delay);
    }
	});

	// Single instance
	// Prevents multiple instances
	$.fn[plugin] = function (options) {
		var returns = undefined, instance = undefined;

		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
			if (!$.data(this, namespacePlugin)) {
				$.data(this, namespacePlugin, new Plugin(this, options));
			}
			});
		}
		else {
		if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			this.each(function () {
				instance = $.data(this, namespacePlugin);
				if (instance instanceof Plugin) {
					if (typeof instance[options] === 'function') {
						returns = instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
					}
					else {
						instance._callback('onError', ['Unknow method'])
					}
				}
				else {
					throw 'error: null object';
				}
			});
			return returns !== undefined ? returns : this;
		}
		else {
			throw 'error: illegal';
		}
		}
	};

	// Default config
	$.fn[plugin].defaults = {

    //show cursor
    cursor: true,

    //pipe, underscore, terminal
    cursortype: 'underscore',

    //delay between words
    delay: 200,

    //text type
    text: 'typing...'
	};
})
);
