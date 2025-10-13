import { json } from 'https://esm.sh/d3-fetch';
import { select } from 'https://esm.sh/d3-selection';
import * as d3 from 'https://esm.sh/d3-array';

// load dataset
const data = await json("https://raw.githubusercontent.com/hartjensen/SocialMediaAddiction/main/csvjson.json");

// group the data by country and average addiction score
const grouped = d3.rollups(
  data.filter(d => d.Country && d.Addicted_Score),
  v => d3.mean(v, d => +d.Addicted_Score),
  d => d.Country
);

// create svg
const svg = select("svg")
  .attr("width", 1000)
  .attr("height", 400);

// draw circles
svg.selectAll("circle")
  .data(grouped)
  .join("circle")
  .attr("cx", (d, i) => 60 + i * 70) 
  .attr("cy", 150)                   
  .attr("r", d => d[1] * 3)          
  .attr("fill", "purple");

// country labels
svg.selectAll("text")
  .data(grouped)
  .join("text")
  .attr("x", (d, i) => 60 + i * 70)
  .attr("y", 200)
  .attr("text-anchor", "middle")
  .attr("font-size", "10px")
  .text(d => d[0]);

// title
svg.append("text")
  .attr("x", 350)
  .attr("y", 30)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("font-weight", "bold")
  .text("Average Addiction Score by Country");