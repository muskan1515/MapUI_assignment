
define(['./Branch', './type'], function(Branch, type) {


    "use strict";
  
    function accumulate(acc, ob) {
      acc.push(ob);
      return acc;
    }
  
  
    return type({
  
      /**
       *
       * Create a new RTree.
       *
       * @param {Object} [configuration]
       * @param {Number} [configuration.branchingFactor=16] branching factor of the tree. A node will be split when it has more children than the branching factor. Must be at least 3.
       * @constructor
       * @name RTree
       */
      constructor: function RTree(configuration) {
        configuration = configuration || {};
        this._branchingFactor = (configuration.branchingFactor >= 3) ? configuration.branchingFactor : 16;
        this._root = null;
        this._size = 0;
      },
  
      /**
       *
       * Return the k nearest objects from the tree.
       *
       * @param {Number} x x coordinate of search position
       * @param {Number} y y coordinate of search position
       * @param {Number} k=1 how many
       * @returns {Array} the results. This may be less than k if the size of the tree is smaller than k.
       * @memberOf RTree#
       * @function
       */
      nearestNeighbours: (function() {
        var results;
  
        function collect(e) {
          results.push(e);
        }
  
        return function(x, y, k) {
          k = k || 1;
          results = [];
          if (this._root) {
            this._root._knn(x, y, k, collect);
          }
          return results;
        };
      }()),
  
  
      _growTree: function(node1, node2) {
        var newRoot = new Branch(node1.l, node1.b, node1.w, node1.h, this._branchingFactor);
        newRoot._addChild(node1);
        newRoot._addChild(node2);
        newRoot.depth = this._root.depth + 1;//keep track of depth (debugging purposes only)
        this._root = newRoot;
      },
  
      /**
       * Draws the rtree to a html5 canvas 2d context (debug only).
       * @param {context2d} context2d HTML5 canvas 2d context
       * @function
       * @memberOf RTree#
       * @private
       */
      draw: function(context2d) {
        if (this._root) {
          this._root.draw(context2d);
        }
      },
  
      /**
       * Gets the number of object in the tree.
       * @return {Number} the number of elements in the tree.
       * @function
       * @memberOf RTree#
       */
      size: function() {
        return this._size;
      },
  
      /**
       * Apply the callback to each object that interacts with the rectangle.
       * @param {Number} x the x coordinate of the rectangle
       * @param {Number} y the y coordinate of the rectangle
       * @param {Number} w the width of the rectangle
       * @param {Number} h the height of the rectangle
       * @param {Function} action called for each element interacting with the retangle
       * @function
       * @memberOf RTree#
       */
      forEachInRectangle: function(x, y, w, h, action) {
        if (this._root) {
          this._root._search(x, y, w, h, action);
        }
      },
  
      /**
       * Apply the map function to each object that interacts with the retangle and add it to the result.
  
       * @param {Number} x the x coordinate of the rectangle
       * @param {Number} y the y coordinate of the rectangle
       * @param {Number} w the width of the rectangle
       * @param {Number} h the height of the rectangle
       * @param {Function} map called for each element, returns a mapped object/value.
       * @returns {Array} collection with all mapped values.
       * @function
       * @memberOf RTree#
       */
      mapInRectangle: (function() {
        var mapfunc, maps;
        var mapSpool = function(it) {
          maps.push(mapfunc(it));
        };
        return function(x, y, w, h, func) {
          maps = [];
          mapfunc = func;
          this.forEachInRectangle(x, y, w, h, mapSpool);
          return maps;
        };
      }()),
  
      /**
       * Fold collection into single value.
       *
       * @param {Object} object element to add
       * @param {Number} x the x coordinate of the rectangle
       * @param {Number} y the y coordinate of the rectangle
       * @param {Number} w the width of the rectangle
       * @param {Number} h the height of the rectangle
       * @param {Function} fold a reduce function, taking two arguments, the accumulator and an object interacting with the search retangle.
       * @param {Object} [initial] initial accumulator
       * @returns {Object} accumulated value
       *
       * @memberOf RTree#
       * @function
       *
       */
      reduceInRectangle: (function() {
        var folder, accum, i;
        var reduceSpool = function(val) {
          accum = (i === 0 && typeof accum === 'undefined' ) ? val :
                  folder(accum, val);
          i += 1;
          return accum;
        };
        return function(x, y, w, h, fold, initial) {
          accum = initial;
          folder = fold;
          i = 0;
          this.forEachInRectangle(x, y, w, h, reduceSpool);
          return accum;
        };
      }()),
  
  
      /**
       *
       * Search the RTree.
       *
       * @param {Number} x the x coordinate of the rectangle
       * @param {Number} y the y coordinate of the rectangle
       * @param {Number} w the width of the rectangle
       * @param {Number} h the height of the rectangle* @returns {Array} objects interaction with the search retangle
       * @returns {Array} the object which interact with the search rectangle
       * @memberOf RTree#
       */
      search: function(x, y, w, h) {
        console.log("search",x,y,w,h);
        return this.reduceInRectangle(x, y, w, h, accumulate, []);
      },
  
      /**
       *
       * Add an object to the RTree.
       * @param {Object} object element to add
       * @param {Number} x the x coordinate of the rectangle
       * @param {Number} y the y coordinate of the rectangle
       * @param {Number} w the width of the rectangle
       * @param {Number} h the height of the rectangle
       * @function
       * @memberOf RTree#
       */
      insert: function(object, x, y, w, h) {
        console.log("insert",x,y,w,h)
        if (!this._root) {
          this._root = new Branch(x, y, w, h, this._branchingFactor);
          this._root.leaf = true;
        }
        this._root._insert(object, x, y, w, h, this);
        this._size += 1;
      },
  
  
      /**
       * Remove the object from the RTree
       *
       * @param {Object} object the object to remove
       * @param {Number} x corresponding x of the object
       * @param {Number} y corresponding y of the object
       * @param {Number} w corresponding w of the object
       * @param {Number} h corresponding h of the object
       *
       * @memberOf RTree#
       * @function
       */
      remove: function(object, x, y, w, h) {
        var removed = this._root._remove(object, x, y, w, h, this);
        if (removed) {
          this._size -= 1;
        }
      }
  
  
    });
  
  });