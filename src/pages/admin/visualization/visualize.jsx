// App.js

import React, { useContext, useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import jsonData from "./clubs.json";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/data/myContext";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { collection, doc, onSnapshot, query } from "firebase/firestore";

function Visualize() {
  const context = useContext(myContext);
  const { mode } = context;

  //  Barchart for Clubs Category

  const [categoryCounts, setCategoryCounts] = useState({});
  const [tooltip, setTooltip] = useState({});

  useEffect(() => {
    // Count the occurrences of each category
    const counts = {};
    jsonData.clubs.forEach((club) => {
      if (Array.isArray(club.category)) {
        club.category.forEach((category) => {
          counts[category] = (counts[category] || 0) + 1;
        });
      } else {
        counts[club.category] = (counts[club.category] || 0) + 1;
      }
    });

    setCategoryCounts(counts);
  }, []);

  useEffect(() => {
    // D3 code to build the bar chart
    const data = Object.entries(categoryCounts);

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    d3.select("#bar-chart").selectAll("*").remove();

    const svg = d3
      .select("#bar-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d[0]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[1])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(0) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        const clubNames = jsonData.clubs
          .filter((club) =>
            Array.isArray(club.category)
              ? club.category.includes(d[0])
              : club.category === d[0]
          )
          .map((club) => club.name);
        setTooltip({ category: d[0], count: d[1], clubNames: clubNames });
      })
      .on("mouseout", () => {
        setTooltip({});
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(d3.max(data, (d) => d[1])));

    // Tooltip
    const tooltipDiv = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg.on("mousemove", (event) => {
      tooltipDiv
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 15 + "px");
    });
  }, [categoryCounts, jsonData.clubs]);

  // Pie Chart for events with category count

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const eventsCollectionRef = collection(fireDB, "events"); // Reference the "events"
    const eventsQuery = query(eventsCollectionRef); // Create a query for the collection

    const unsubscribe = onSnapshot(eventsQuery, (querySnapshot) => {
      // Process the data and calculate the category counts
      const categoryCounts = {};
      querySnapshot.forEach((doc) => {
        const category = doc.data().category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      // Prepare the data for the pie chart
      const pieData = Object.keys(categoryCounts).map((category) => ({
        category,
        count: categoryCounts[category],
      }));

      // D3 pie chart creation
      const width = 600;
      const height = 400;
      const radius = Math.min(width, height) / 2;

      const color = d3
        .scaleOrdinal()
        .domain(pieData.map((d) => d.category))
        .range(d3.schemeCategory10);

      const pie = d3.pie().value((d) => d.count);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs = pie(pieData);

      svg.selectAll("*").remove();

      svg
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 3 + 20}, ${height / 2})`)
        .selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("fill", (d) => color(d.data.category))
        .attr("d", arc);

      // Add category labels to the pie chart segments
      svg
        .select("g")
        .selectAll("text")
        .data(arcs)
        .enter()
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text((d) => `${d.data.category} (${d.data.count})`);


      // Create a separate section for color-coded labels below the pie chart
      const labels = svg
        .append("g")
        .attr("transform", `translate(${width / 2 + 140}, ${height / 2})`); // Position the labels beside the pie chart

      const labelItems = labels
        .selectAll(".label-item")
        .data(pieData)
        .enter()
        .append("g")
        .attr("class", "label-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`); // Adjust the positioning based on the number of categories

      labelItems
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d, i) => color(pieData[i].category));

      labelItems
        .append("text")
        .attr("x", 15)
        .attr("y", 10)
        .text((d, i) => pieData[i].category)
        .style("fill", "grey");
    });
    return () => unsubscribe();
  }, []);

  // Barchart for Interest1 -

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const interestsCollectionRef = collection(fireDB, "interests"); // Reference the "interests" collection in Firestore
    const interestsQuery = query(interestsCollectionRef); // Create a query for the collection

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create the SVG element if it doesn't exist
    if (svg.select("g").empty()) {
      const svgElement = svg
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set the flag to indicate that the SVG element has been created
      svgElement.attr("id", "barchart-interest1");
    }

    const unsubscribe = onSnapshot(interestsQuery, (querySnapshot) => {
      // Process the data and calculate the interest1 counts
      const interest1Counts = {};
      querySnapshot.forEach((doc) => {
        const interest1 = doc.data().interest1;
        interest1Counts[interest1] = (interest1Counts[interest1] || 0) + 1;
      });

      // 'interest1Counts' now contains the frequency of each interest1 value
      console.log(interest1Counts);

      // Set the dimensions and margins of the graph
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create the SVG element
      const svg = d3
        .select("#barchart-interest1") // Assuming svgRef is a reference to the SVG element
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X scale
      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);

      // Y scale
      const y = d3.scaleLinear().range([height, 0]);
      const yAxis = svg.append("g").attr("class", "myYaxis");

      // Parse the data
      const data = Object.entries(interest1Counts).map(([category, count]) => ({
        category,
        count,
      }));

      // X axis
      x.domain(data.map((d) => d.category));
      xAxis.call(d3.axisBottom(x));

      // Y axis
      y.domain([0, d3.max(data, (d) => d.count)]);
      yAxis.call(
        d3
          .axisLeft(y)
          .ticks(d3.max(data, (d) => d.count))
          .tickFormat(d3.format("d"))
      );

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.category))
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.count))
        .attr("fill", "#69b3a2");
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Barchart for Interest2 -

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const interestsCollectionRef2 = collection(fireDB, "interests"); // Reference the "interests" collection in Firestore
    const interestsQuery2 = query(interestsCollectionRef2); // Create a query for the collection

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create the SVG element if it doesn't exist
    if (svg.select("g").empty()) {
      const svgElement = svg
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set the flag to indicate that the SVG element has been created
      svgElement.attr("id", "barchart-interest2");
    }

    const unsubscribe = onSnapshot(interestsQuery2, (querySnapshot) => {
      // Process the data and calculate the interest1 counts
      const interest2Counts = {};
      querySnapshot.forEach((doc) => {
        const interest2 = doc.data().interest2;
        interest2Counts[interest2] = (interest2Counts[interest2] || 0) + 1;
      });

      // 'interest1Counts' now contains the frequency of each interest1 value
      console.log(interest2Counts);

      // Set the dimensions and margins of the graph
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create the SVG element
      const svg = d3
        .select("#barchart-interest2") // Assuming svgRef is a reference to the SVG element
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X scale
      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);

      // Y scale
      const y = d3.scaleLinear().range([height, 0]);
      const yAxis = svg.append("g").attr("class", "myYaxis");

      // Parse the data
      const data = Object.entries(interest2Counts).map(([category, count]) => ({
        category,
        count,
      }));

      // X axis
      x.domain(data.map((d) => d.category));
      xAxis.call(d3.axisBottom(x));

      // Y axis
      y.domain([0, d3.max(data, (d) => d.count)]);
      yAxis.call(
        d3
          .axisLeft(y)
          .ticks(d3.max(data, (d) => d.count))
          .tickFormat(d3.format("d"))
      );

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.category))
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.count))
        .attr("fill", "#69b3a2");
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Barchart for Interest3 -

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const interestsCollectionRef3 = collection(fireDB, "interests"); // Reference the "interests" collection in Firestore
    const interestsQuery3 = query(interestsCollectionRef3); // Create a query for the collection

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create the SVG element if it doesn't exist
    if (svg.select("g").empty()) {
      const svgElement = svg
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set the flag to indicate that the SVG element has been created
      svgElement.attr("id", "barchart-interest2");
    }

    const unsubscribe = onSnapshot(interestsQuery3, (querySnapshot) => {
      // Process the data and calculate the interest1 counts
      const interest3Counts = {};
      querySnapshot.forEach((doc) => {
        const interest3 = doc.data().interest3;
        interest3Counts[interest3] = (interest3Counts[interest3] || 0) + 1;
      });

      // 'interest1Counts' now contains the frequency of each interest1 value
      console.log(interest3Counts);

      // Set the dimensions and margins of the graph
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create the SVG element
      const svg = d3
        .select("#barchart-interest3") // Assuming svgRef is a reference to the SVG element
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X scale
      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);

      // Y scale
      const y = d3.scaleLinear().range([height, 0]);
      const yAxis = svg.append("g").attr("class", "myYaxis");

      // Parse the data
      const data = Object.entries(interest3Counts).map(([category, count]) => ({
        category,
        count,
      }));

      // X axis
      x.domain(data.map((d) => d.category));
      xAxis.call(d3.axisBottom(x));

      // Y axis
      y.domain([0, d3.max(data, (d) => d.count)]);
      yAxis.call(
        d3
          .axisLeft(y)
          .ticks(d3.max(data, (d) => d.count))
          .tickFormat(d3.format("d"))
      );

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.category))
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.count))
        .attr("fill", "#69b3a2");
    });

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div>
        <div className="flex justify-around mb-10">
          <div>
            <h2
              className="mt-4 mb-2 ml-4 font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Category wise Student-Clubs
            </h2>
            <div
              id="bar-chart"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              {tooltip.category && (
                <div className="tooltip">
                  <p>Category: {tooltip.category}</p>
                  <p>Count: {tooltip.count}</p>
                  <p>Clubs: {tooltip.clubNames.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2
              className="mt-4 mb-2 ml-4 font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Category wise Events{" "}
            </h2>
            <svg ref={svgRef} />
          </div>
        </div>
        <div className="flex justify-around">
          <div>
            <h2
              className="mt-4 mb-2 ml-4 font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Category wise First Interest of Students{" "}
            </h2>
            <div
              id="barchart-interest1"
              style={{ color: mode === "dark" ? "white" : "" }}
            ></div>
          </div>
          <div>
            <h2
              className="mt-4 mb-2 ml-4 font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Category wise Second Interest of Students{" "}
            </h2>
            <div
              id="barchart-interest2"
              style={{ color: mode === "dark" ? "white" : "" }}
            ></div>
          </div>
          <div>
            <h2
              className="mt-4 mb-2 ml-4 font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Category wise Domain Interests of Students{" "}
            </h2>
            <div
              id="barchart-interest3"
              style={{ color: mode === "dark" ? "white" : "" }}
            ></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Visualize;
