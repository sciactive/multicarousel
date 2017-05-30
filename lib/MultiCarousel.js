var MultiCarousel = (function () { 'use strict';

var template = (function () {
  return {
    oncreate () {
      this.set({
        __transitioning: false,
        __timer: null,
        __width: null,
        __transition: null
      });
      const items = this.get("items");
      const count = this.get("count");
      this.set({__width: (100 / count)+"%"});
      for (let i = 0; i < items.length; i++) {
        this.refs.items.appendChild(items[i]);
        items[i].style.width = this.get("__width");
      }
      for (let i = 0; i < count; i++) {
        items[i].classList.add("active");
      }
      this.set({__transition: "left "+(this.get("transition") / 1000)+"s"});
      this.refs.items.style.left = "0";
      this.refs.items.style.transition = this.get("__transition");
      if (items.length <= count) {
        // Don't animate.
        this.set({__transitioning: true});
      } else {
        this.start();
      }
    },
    data () {
      return {
        delay: 1500,
        transition: 600,
        items: [],
        count: 5,
        controls: [
          'previous',
          'next',
          'pause',
          'start'
        ]
      }
    },
    methods: {
      next () {
        if (this.get("__transitioning")) return;
        this.set({__transitioning: true});
        const children = this.refs.items.children;
        let foundActive = false;
        let previous;
        // Find the first one marked active, then the first one not active.
        for (let i = 0; i < children.length; i++) {
          if (!foundActive && children[i].classList.contains("active")) {
            previous = children[i];
            foundActive = true;
            continue;
          }
          if (foundActive && !children[i].classList.contains("active")) {
            children[i].classList.add("active");
            break;
          }
        }
        this.refs.items.style.transition = this.get("__transition");
        this.refs.items.style.left = "-"+this.get("__width");
        // Wait the transition time, then move the previous element to the end.
        setTimeout((function() {
          previous.classList.remove("active");
          this.refs.items.style.transition = "";
          this.refs.items.style.left = "0";
          this.refs.items.appendChild(previous);
          this.set({__transitioning: false});
        }).bind(this), this.get("transition"));
      },
      previous () {
        if (this.get("__transitioning")) return;
        this.set({__transitioning: true});
        const children = this.refs.items.children;
        let previous = children[children.length - 1];
        previous.classList.add("active");
        this.refs.items.insertBefore(previous, children[0]);
        this.refs.items.style.transition = "";
        this.refs.items.style.left = "-"+this.get("__width");
        setTimeout((function(){
          this.refs.items.style.transition = this.get("__transition");
          this.refs.items.style.left = "0";
        }).bind(this), 0);
        // Wait the transition time.
        setTimeout((function() {
          // Find the last one marked active.
          for (let i = children.length - 1; i >= 0; i--) {
            if (children[i].classList.contains("active")) {
              children[i].classList.remove("active");
              break;
            }
          }
          this.refs.items.style.transition = "";
          this.set({__transitioning: false});
        }).bind(this), this.get("transition"));
      },
      pause () {
        clearInterval(this.get("__timer"));
        this.set({__timer: null});
      },
      start () {
        if (!this.get("__timer") && this.get("delay") > 0) {
          this.set({__timer: setInterval(this.next.bind(this), this.get("delay"))});
        }
      }
    }
  };
}());

function add_css () {
	var style = createElement( 'style' );
	style.id = "svelte-3181709530-style";
	style.textContent = "\n  [svelte-3181709530].multicarousel, [svelte-3181709530] .multicarousel {\n    position: relative;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n  [svelte-3181709530].previous, [svelte-3181709530] .previous, [svelte-3181709530].next, [svelte-3181709530] .next, [svelte-3181709530].pause, [svelte-3181709530] .pause, [svelte-3181709530].start, [svelte-3181709530] .start {\n    position: absolute;\n    cursor: pointer;\n    display: flex;\n    z-index: 1;\n    fill: #fff;\n  }\n  [svelte-3181709530].previous, [svelte-3181709530] .previous, [svelte-3181709530].next, [svelte-3181709530] .next {\n    width: 30px;\n    align-items: center;\n    height: 100%;\n  }\n  [svelte-3181709530].previous, [svelte-3181709530] .previous {\n    left: 0;\n    justify-content: flex-end;\n  }\n  [svelte-3181709530].next, [svelte-3181709530] .next {\n    right: 0;\n    justify-content: flex-start;\n  }\n  [svelte-3181709530].pause, [svelte-3181709530] .pause, [svelte-3181709530].start, [svelte-3181709530] .start {\n    width: 28px;\n    left: 50%;\n    margin-left: -14px;\n    height: 30px;\n    bottom: 0;\n    justify-content: center;\n    align-items: flex-start;\n  }\n  [svelte-3181709530].items, [svelte-3181709530] .items {\n    white-space: nowrap;\n    position: relative;\n  }\n  [svelte-3181709530].items > *, [svelte-3181709530] .items > * {\n    display: none;\n  }\n  [svelte-3181709530].items > *.active, [svelte-3181709530] .items > *.active {\n    display: inline-block;\n  }\n";
	appendNode( style, document.head );
}

function create_main_fragment ( state, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-3181709530', '' );
	div.className = "multicarousel";
	appendNode( createText( "\n  " ), div );

	var if_block = (state.controls.indexOf('previous') !== -1) && create_if_block( state, component );

	if ( if_block ) if_block.mount( div, null );
	var text_1 = createText( "\n  " );
	appendNode( text_1, div );

	var if_block_1 = (state.controls.indexOf('next') !== -1) && create_if_block_1( state, component );

	if ( if_block_1 ) if_block_1.mount( div, null );
	var text_2 = createText( "\n  " );
	appendNode( text_2, div );

	var if_block_2 = (state.__timer && state.controls.indexOf('pause') !== -1) && create_if_block_2( state, component );

	if ( if_block_2 ) if_block_2.mount( div, null );
	var text_3 = createText( "\n  " );
	appendNode( text_3, div );

	var if_block_3 = (!state.__timer && state.controls.indexOf('start') !== -1) && create_if_block_3( state, component );

	if ( if_block_3 ) if_block_3.mount( div, null );
	var text_4 = createText( "\n  " );
	appendNode( text_4, div );
	var div_1 = createElement( 'div' );
	appendNode( div_1, div );
	div_1.className = "items";
	component.refs.items = div_1;

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		update: function ( changed, state ) {
			if ( state.controls.indexOf('previous') !== -1 ) {
				if ( !if_block ) {
					if_block = create_if_block( state, component );
					if_block.mount( div, text_1 );
				}
			} else if ( if_block ) {
				if_block.destroy( true );
				if_block = null;
			}

			if ( state.controls.indexOf('next') !== -1 ) {
				if ( !if_block_1 ) {
					if_block_1 = create_if_block_1( state, component );
					if_block_1.mount( div, text_2 );
				}
			} else if ( if_block_1 ) {
				if_block_1.destroy( true );
				if_block_1 = null;
			}

			if ( state.__timer && state.controls.indexOf('pause') !== -1 ) {
				if ( !if_block_2 ) {
					if_block_2 = create_if_block_2( state, component );
					if_block_2.mount( div, text_3 );
				}
			} else if ( if_block_2 ) {
				if_block_2.destroy( true );
				if_block_2 = null;
			}

			if ( !state.__timer && state.controls.indexOf('start') !== -1 ) {
				if ( !if_block_3 ) {
					if_block_3 = create_if_block_3( state, component );
					if_block_3.mount( div, text_4 );
				}
			} else if ( if_block_3 ) {
				if_block_3.destroy( true );
				if_block_3 = null;
			}
		},

		destroy: function ( detach ) {
			if ( if_block ) if_block.destroy( false );
			if ( if_block_1 ) if_block_1.destroy( false );
			if ( if_block_2 ) if_block_2.destroy( false );
			if ( if_block_3 ) if_block_3.destroy( false );
			if ( component.refs.items === div_1 ) component.refs.items = null;

			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function create_if_block ( state, component ) {
	var div = createElement( 'div' );
	div.className = "previous";

	function click_handler ( event ) {
		component.previous();
	}

	addEventListener( div, 'click', click_handler );
	var svg = createSvgElement( 'svg' );
	appendNode( svg, div );
	setAttribute( svg, 'width', "28" );
	setAttribute( svg, 'height', "28" );
	setAttribute( svg, 'viewBox', "0 0 1792 1792" );
	setAttribute( svg, 'xmlns', "http://www.w3.org/2000/svg" );
	var defs = createSvgElement( 'defs' );
	appendNode( defs, svg );
	var filter = createSvgElement( 'filter' );
	appendNode( filter, defs );
	setAttribute( filter, 'id', "shadow" );
	setAttribute( filter, 'x', "0" );
	setAttribute( filter, 'y', "0" );
	setAttribute( filter, 'width', "200%" );
	setAttribute( filter, 'height', "200%" );
	var feOffset = createSvgElement( 'feOffset' );
	appendNode( feOffset, filter );
	setAttribute( feOffset, 'result', "offOut" );
	setAttribute( feOffset, 'in', "SourceAlpha" );
	setAttribute( feOffset, 'dx', "0" );
	setAttribute( feOffset, 'dy', "0" );
	var feGaussianBlur = createSvgElement( 'feGaussianBlur' );
	appendNode( feGaussianBlur, filter );
	setAttribute( feGaussianBlur, 'result', "blurOut" );
	setAttribute( feGaussianBlur, 'in', "offOut" );
	setAttribute( feGaussianBlur, 'stdDeviation', "10" );
	var feBlend = createSvgElement( 'feBlend' );
	appendNode( feBlend, filter );
	setAttribute( feBlend, 'in', "SourceGraphic" );
	setAttribute( feBlend, 'in2', "blurOut" );
	setAttribute( feBlend, 'mode', "normal" );
	var path = createSvgElement( 'path' );
	appendNode( path, svg );
	setAttribute( path, 'filter', "url(#shadow)" );
	setAttribute( path, 'd', "M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		destroy: function ( detach ) {
			removeEventListener( div, 'click', click_handler );

			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function create_if_block_1 ( state, component ) {
	var div = createElement( 'div' );
	div.className = "next";

	function click_handler ( event ) {
		component.next();
	}

	addEventListener( div, 'click', click_handler );
	var svg = createSvgElement( 'svg' );
	appendNode( svg, div );
	setAttribute( svg, 'width', "28" );
	setAttribute( svg, 'height', "28" );
	setAttribute( svg, 'viewBox', "0 0 1792 1792" );
	setAttribute( svg, 'xmlns', "http://www.w3.org/2000/svg" );
	var defs = createSvgElement( 'defs' );
	appendNode( defs, svg );
	var filter = createSvgElement( 'filter' );
	appendNode( filter, defs );
	setAttribute( filter, 'id', "shadow" );
	setAttribute( filter, 'x', "0" );
	setAttribute( filter, 'y', "0" );
	setAttribute( filter, 'width', "200%" );
	setAttribute( filter, 'height', "200%" );
	var feOffset = createSvgElement( 'feOffset' );
	appendNode( feOffset, filter );
	setAttribute( feOffset, 'result', "offOut" );
	setAttribute( feOffset, 'in', "SourceAlpha" );
	setAttribute( feOffset, 'dx', "0" );
	setAttribute( feOffset, 'dy', "0" );
	var feGaussianBlur = createSvgElement( 'feGaussianBlur' );
	appendNode( feGaussianBlur, filter );
	setAttribute( feGaussianBlur, 'result', "blurOut" );
	setAttribute( feGaussianBlur, 'in', "offOut" );
	setAttribute( feGaussianBlur, 'stdDeviation', "10" );
	var feBlend = createSvgElement( 'feBlend' );
	appendNode( feBlend, filter );
	setAttribute( feBlend, 'in', "SourceGraphic" );
	setAttribute( feBlend, 'in2', "blurOut" );
	setAttribute( feBlend, 'mode', "normal" );
	var path = createSvgElement( 'path' );
	appendNode( path, svg );
	setAttribute( path, 'filter', "url(#shadow)" );
	setAttribute( path, 'd', "M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		destroy: function ( detach ) {
			removeEventListener( div, 'click', click_handler );

			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function create_if_block_2 ( state, component ) {
	var div = createElement( 'div' );
	div.className = "pause";

	function click_handler ( event ) {
		component.pause();
	}

	addEventListener( div, 'click', click_handler );
	var svg = createSvgElement( 'svg' );
	appendNode( svg, div );
	setAttribute( svg, 'width', "28" );
	setAttribute( svg, 'height', "28" );
	setAttribute( svg, 'viewBox', "0 0 1792 1792" );
	setAttribute( svg, 'xmlns', "http://www.w3.org/2000/svg" );
	var defs = createSvgElement( 'defs' );
	appendNode( defs, svg );
	var filter = createSvgElement( 'filter' );
	appendNode( filter, defs );
	setAttribute( filter, 'id', "shadow" );
	setAttribute( filter, 'x', "0" );
	setAttribute( filter, 'y', "0" );
	setAttribute( filter, 'width', "200%" );
	setAttribute( filter, 'height', "200%" );
	var feOffset = createSvgElement( 'feOffset' );
	appendNode( feOffset, filter );
	setAttribute( feOffset, 'result', "offOut" );
	setAttribute( feOffset, 'in', "SourceAlpha" );
	setAttribute( feOffset, 'dx', "0" );
	setAttribute( feOffset, 'dy', "0" );
	var feGaussianBlur = createSvgElement( 'feGaussianBlur' );
	appendNode( feGaussianBlur, filter );
	setAttribute( feGaussianBlur, 'result', "blurOut" );
	setAttribute( feGaussianBlur, 'in', "offOut" );
	setAttribute( feGaussianBlur, 'stdDeviation', "10" );
	var feBlend = createSvgElement( 'feBlend' );
	appendNode( feBlend, filter );
	setAttribute( feBlend, 'in', "SourceGraphic" );
	setAttribute( feBlend, 'in2', "blurOut" );
	setAttribute( feBlend, 'mode', "normal" );
	var path = createSvgElement( 'path' );
	appendNode( path, svg );
	setAttribute( path, 'filter', "url(#shadow)" );
	setAttribute( path, 'transform', "translate(179.2 179.2) scale(0.8)" );
	setAttribute( path, 'd', "M1664 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45zm-896 0v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45z" );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		destroy: function ( detach ) {
			removeEventListener( div, 'click', click_handler );

			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function create_if_block_3 ( state, component ) {
	var div = createElement( 'div' );
	div.className = "start";

	function click_handler ( event ) {
		component.start();
	}

	addEventListener( div, 'click', click_handler );
	var svg = createSvgElement( 'svg' );
	appendNode( svg, div );
	setAttribute( svg, 'width', "28" );
	setAttribute( svg, 'height', "28" );
	setAttribute( svg, 'viewBox', "0 0 1792 1792" );
	setAttribute( svg, 'xmlns', "http://www.w3.org/2000/svg" );
	var defs = createSvgElement( 'defs' );
	appendNode( defs, svg );
	var filter = createSvgElement( 'filter' );
	appendNode( filter, defs );
	setAttribute( filter, 'id', "shadow" );
	setAttribute( filter, 'x', "0" );
	setAttribute( filter, 'y', "0" );
	setAttribute( filter, 'width', "200%" );
	setAttribute( filter, 'height', "200%" );
	var feOffset = createSvgElement( 'feOffset' );
	appendNode( feOffset, filter );
	setAttribute( feOffset, 'result', "offOut" );
	setAttribute( feOffset, 'in', "SourceAlpha" );
	setAttribute( feOffset, 'dx', "0" );
	setAttribute( feOffset, 'dy', "0" );
	var feGaussianBlur = createSvgElement( 'feGaussianBlur' );
	appendNode( feGaussianBlur, filter );
	setAttribute( feGaussianBlur, 'result', "blurOut" );
	setAttribute( feGaussianBlur, 'in', "offOut" );
	setAttribute( feGaussianBlur, 'stdDeviation', "10" );
	var feBlend = createSvgElement( 'feBlend' );
	appendNode( feBlend, filter );
	setAttribute( feBlend, 'in', "SourceGraphic" );
	setAttribute( feBlend, 'in2', "blurOut" );
	setAttribute( feBlend, 'mode', "normal" );
	var path = createSvgElement( 'path' );
	appendNode( path, svg );
	setAttribute( path, 'filter', "url(#shadow)" );
	setAttribute( path, 'transform', "translate(179.2 179.2) scale(0.8)" );
	setAttribute( path, 'd', "M1576 927l-1328 738q-23 13-39.5 3t-16.5-36v-1472q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z" );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		destroy: function ( detach ) {
			removeEventListener( div, 'click', click_handler );

			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function MultiCarousel ( options ) {
	options = options || {};
	this.refs = {};
	this._state = assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;
	if ( !document.getElementById( "svelte-3181709530-style" ) ) add_css();

	this._fragment = create_main_fragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );

	if ( options._root ) {
		options._root._renderHooks.push( template.oncreate.bind( this ) );
	} else {
		template.oncreate.call( this );
	}
}

assign( MultiCarousel.prototype, template.methods, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set,
 	_flush: _flush
 });

MultiCarousel.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

MultiCarousel.prototype.teardown = MultiCarousel.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.destroy( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement ( name ) {
	return document.createElement( name );
}

function insertNode ( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function setAttribute ( node, attribute, value ) {
	node.setAttribute( attribute, value );
}

function detachNode ( node ) {
	node.parentNode.removeChild( node );
}

function createText ( data ) {
	return document.createTextNode( data );
}

function appendNode ( node, target ) {
	target.appendChild( node );
}

function addEventListener ( node, event, handler ) {
	node.addEventListener( event, handler, false );
}

function removeEventListener ( node, event, handler ) {
	node.removeEventListener( event, handler, false );
}

function createSvgElement ( name ) {
	return document.createElementNS( 'http://www.w3.org/2000/svg', name );
}

function assign ( target ) {
	for ( var i = 1; i < arguments.length; i += 1 ) {
		var source = arguments[i];
		for ( var k in source ) target[k] = source[k];
	}

	return target;
}

function dispatchObservers ( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( differs( newValue, oldValue ) ) {
			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}
}

function get ( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire ( eventName, data ) {
	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) return;

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this, data );
	}
}

function observe ( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.post : this._observers.pre;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) group[ key ].splice( index, 1 );
		}
	};
}

function on ( eventName, handler ) {
	if ( eventName === 'teardown' ) return this.on( 'destroy', handler );

	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) handlers.splice( index, 1 );
		}
	};
}

function set ( newState ) {
	this._set( assign( {}, newState ) );
	this._root._flush();
}

function _flush () {
	if ( !this._renderHooks ) return;

	while ( this._renderHooks.length ) {
		this._renderHooks.pop()();
	}
}

function differs ( a, b ) {
	return ( a !== b ) || ( a && ( typeof a === 'object' ) || ( typeof a === 'function' ) );
}

return MultiCarousel;

}());