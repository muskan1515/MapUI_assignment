 //Checking and calculating the intersection for the given data through 
//  /intersection endpoint using the RTree spatial way
 
 /**
       *
       * Check for intersection by converting these longitute
       *  and latitude coordinates to the plane coordinates
       *
       * @param {Object} line1 coordinates
       * @param {Object} line2 coordinates
       */
function checkIntersection(line1, line2) {
    const x1 = line1.coordinates[0][0];
    const y1 = line1.coordinates[0][1];
    const x2 = line1.coordinates[1][0];
    const y2 = line1.coordinates[1][1];

    const x3 = line2.coordinates[0][0];
    const y3 = line2.coordinates[0][1];
    const x4 = line2.coordinates[1][0];
    const y4 = line2.coordinates[1][1];

    // Line intersection formula
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // Check if lines intersect within their segments
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return true;
    }
    return false;
    
  }

   /**
       *
       * Insert and search through using RTree.
       *
       * @param {Object} lineString coordinates
       * @param {Object} line coordinates
       */

  module.exports = function findIntersections(lineString, lines) {

    const intersections = [];

    lines.forEach((line, index) => {
      rtree.insert(
        line,
        line.bbox[0],
        line.bbox[1],
        line.bbox[2],
        line.bbox[3]
      );
     
    });
    
    for (let i = 0; i < lineString.coordinates.length - 1; i++) {
      const p1 = lineString.coordinates[i];
      const p2 = lineString.coordinates[i + 1];
      const lineSegment = { coordinates: [p1, p2], bbox: [Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1]), Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1])] };
      const results = rtree.search(...lineSegment.bbox);
      results.forEach((result) => {
        if (checkIntersection(lineSegment, result.data)) {
          intersections.push(result.data);
        }
      });
    }
    return intersections;
  }