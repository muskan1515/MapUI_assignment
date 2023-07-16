//imported all the required modules
const express = require('express');
const bodyParser = require('body-parser');
const turf = require('@turf/turf');
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();

//For acheiving less time and more accurate using spatial tree RTree 
//for using RTree we require these modules
// const {RTree2d}=require('./RTree2d');
// const rtree=new RTree2d();
// const {findIntersections}=require('./spatial_calculation');


const app = express();
//as the lineString would be of higher range hence 5mb would work fine
//for huge data for json object
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//Here before getting to POST endpoint of intersection the data need to pass from this
//middleware to check if the request is autheticated means have the specified bearer token
const authenticate = (req, res, next) => {
    const authHeader=req.headers.authorization;
  
    //if header token is not there than 
    if(!authHeader)
     res.status(403).send(" authentication header are missing");

    //if its not matching to the SECRET_TOKEN then
    if(String(process.env.SECRET_TOKEN)!==String(authHeader))
    res.status(403).send(" authentication header are malformed");
    else
      next();
};

  
//This is endpoint which will result for getting the all the 
//possible intersection between lineString and line
app.post('/intersections', authenticate, (req, res) => {
  
    const  linestring  = req.body.lineString;
    const scatteredLines = req.body.lines;
     
    const isValidLinestring = String(linestring.type) === 'LineString';
    
    //if the provided lineString is not of geoJSON format or empty
    if (!isValidLinestring || linestring==={}) {
      return res.status(403).json({ error: 'Invalid linestring' });
    }
  
    //if the provided line is not of geoJSON format or empty
    if(scatteredLines===[] || scatteredLines.length<2) {
        return res.status(403).json({ error: 'Invalid scatteredLines' });
    }
   
    //Using spatial Rtree for calculation
    // const lineString={
    //   "coordinates":linestring.coordinates
    // };
    // let lines=[];
    // for(let i=0;i<scatteredLines.length;i++){
    //   const bbox=[scatteredLines[i].line.coordinates[0][0],
    //               scatteredLines[i].line.coordinates[0][1],
    //               scatteredLines[i].line.coordinates[1][0],
    //               scatteredLines[i].line.coordinates[1][1]];
    //   lines.push({
    //     "coordinates":scatteredLines[i].line.coordinates,
    //     "bbox":bbox
    //   });
    // }
    // const intersections = findIntersections(lineString, lines);

//Using turf.lineIntersect
  let intersections = [];
  let count=0;

  
  const line_string=turf.lineString(linestring.coordinates);

   //if the coordinates are invalid for lineString
  if(!line_string)
  {
    res.status(403).send("Invalid lineString");
  } 

  for (let i = 0; i <scatteredLines.length; i++) {
    const line =turf.lineString(scatteredLines[i].line.coordinates);
    
    //if the coordinates are invalid for line
    if(!line)
    {
     continue;
    }

    var isIntersecting = turf.lineIntersect(line_string, line);

    //if the intersection happen
      if (isIntersecting.features.length > 0) {
        count+=1; 
        intersections.push({
          id: `L${i+1}`,
          point: isIntersecting.features[0].geometry.coordinates
        });
      }
    } 
    return res.json(intersections);

  
});

const port = process.env.PORT; 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

