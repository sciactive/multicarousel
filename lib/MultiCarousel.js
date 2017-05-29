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
        count: 5
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
	style.id = "svelte-1289226447-style";
	style.textContent = "\n  [svelte-1289226447].multicarousel, [svelte-1289226447] .multicarousel {\n    position: relative;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n  [svelte-1289226447].previous, [svelte-1289226447] .previous, [svelte-1289226447].next, [svelte-1289226447] .next {\n    position: absolute;\n    cursor: pointer;\n    width: 30px;\n    font-size: 20px;\n    font-family: \"Arial Narrow\", Arial, sans-serif;\n    font-weight: 900;\n    color: #fff;\n    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);\n    display: flex;\n    align-items: center;\n    height: 100%;\n    z-index: 1;\n    transform: scaleY(3);\n  }\n  [svelte-1289226447].previous, [svelte-1289226447] .previous {\n    left: 0;\n    justify-content: flex-end;\n  }\n  [svelte-1289226447].next, [svelte-1289226447] .next {\n    right: 0;\n    justify-content: flex-start;\n  }\n  [svelte-1289226447].items, [svelte-1289226447] .items {\n    white-space: nowrap;\n    position: relative;\n  }\n  [svelte-1289226447].items > *, [svelte-1289226447] .items > * {\n    display: none;\n  }\n  [svelte-1289226447].items > *.active, [svelte-1289226447] .items > *.active {\n    display: inline-block;\n  }\n";
	appendNode( style, document.head );
}

function create_main_fragment ( state, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-1289226447', '' );
	div.className = "multicarousel";
	var div_1 = createElement( 'div' );
	appendNode( div_1, div );
	div_1.className = "previous";

	function click_handler ( event ) {
		component.previous();
	}

	addEventListener( div_1, 'click', click_handler );
	appendNode( createText( "<" ), div_1 );
	appendNode( createText( "\n  " ), div );
	var div_2 = createElement( 'div' );
	appendNode( div_2, div );
	div_2.className = "next";

	function click_handler_1 ( event ) {
		component.next();
	}

	addEventListener( div_2, 'click', click_handler_1 );
	appendNode( createText( ">" ), div_2 );
	appendNode( createText( "\n  " ), div );
	var div_3 = createElement( 'div' );
	appendNode( div_3, div );
	div_3.className = "items";
	component.refs.items = div_3;

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},

		destroy: function ( detach ) {
			removeEventListener( div_1, 'click', click_handler );
			removeEventListener( div_2, 'click', click_handler_1 );
			if ( component.refs.items === div_3 ) component.refs.items = null;

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
	if ( !document.getElementById( "svelte-1289226447-style" ) ) add_css();

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

function appendNode ( node, target ) {
	target.appendChild( node );
}

function addEventListener ( node, event, handler ) {
	node.addEventListener( event, handler, false );
}

function removeEventListener ( node, event, handler ) {
	node.removeEventListener( event, handler, false );
}

function createText ( data ) {
	return document.createTextNode( data );
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