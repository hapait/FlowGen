import React, { Component, useRef } from "react";

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "nothing" };
        this.x = this.x.bind(this);
        this.clicker = this.clicker.bind(this);
    }
    clicker(){
        this.setState({text: "clicked"});
    }
    x() {
        this.setState({ text: "clicked" });
        var p1x = parseFloat(document.getElementById("au").getAttribute("cx"));
        var p1y = parseFloat(document.getElementById("au").getAttribute("cy"));
        var p2x = parseFloat(document.getElementById("sl").getAttribute("cx"));
        var p2y = parseFloat(document.getElementById("sl").getAttribute("cy"));

        // mid-point of line:
        var mpx = (p2x + p1x) * 0.5;
        var mpy = (p2y + p1y) * 0.5;

        // angle of perpendicular to line:
        var theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

        // distance of control point from mid-point of line:
        var offset = 30;

        // location of control point:
        var c1x = mpx + offset * Math.cos(theta);
        var c1y = mpy + offset * Math.sin(theta);

        // show where the control point is:
        var c1 = document.getElementById("cp");
        c1.setAttribute("cx", c1x);
        c1.setAttribute("cy", c1y);

        // construct the command to draw a quadratic curve
        var curve = "M" + p1x + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + p2y;
        var curveElement = document.getElementById("curve");
        curveElement.setAttribute("d", curve);
    }
    render() {
        return (
            <div>
                <svg width="240" height="160">
                    <circle id="au" class="spot" cx="200" cy="50" r="4"></circle>
                    <circle id="sl" class="spot" cx="100" cy="100" r="4"></circle>
                    <circle id="cp" class="spot2" cx="0" cy="0" r="4"></circle>
                    <path id="curve" d="M0 0" stroke="green" stroke-width="4" stroke-linecap="round" fill="transparent"></path>
                </svg>
                <button type="button" onClick={this.x}>Click</button>
                <h1>{this.state.text}</h1>
            </div>
        );
    }
}