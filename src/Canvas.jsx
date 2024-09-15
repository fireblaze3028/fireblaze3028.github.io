import React, {useRef, useEffect, useState} from 'react'

function Canvas() {
    const canvasRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    let hue = 0;
    let hueClock = 0;

    const circleSize = 25;
    const lineThickness = 8;
    let circleColour = `hsl(${hue}, 70%, 50%)`;
    const lineColour = "#ffffff";

    let circlePositions = [];
    let circleVelocities = [];
    var circleAmount = Math.floor(window.innerWidth * window.innerHeight * (100/(2560*1200)));

    const maxVelocity = 0.1;

    let previousTime = Date.now();

    let canvas;
    let context;

    function initCanvas() {
        circlePositions = [];
        circleVelocities = [];
        for (var i = 0; i < circleAmount; i++) {
            circlePositions.push([Math.random() * window.innerWidth, Math.random() * window.innerHeight]);
            circleVelocities.push([maxVelocity * Math.random() - maxVelocity / 2, maxVelocity * Math.random() - maxVelocity / 2]);
        }

        
    }

    function drawCanvas() {
        // fill with black
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        context.lineWidth = lineThickness;
        for (var i = 0; i < circleAmount; i++) {
            drawCircle(circlePositions[i][0], circlePositions[i][1]);
            checkWithinScreen(i);
            var minIndex = findMinDistance(i);
            drawLine(circlePositions[i][0], circlePositions[i][1], circlePositions[minIndex][0], circlePositions[minIndex][1]);
            circlePositions[i][0] += circleVelocities[i][0] * (Date.now() - previousTime);
            circlePositions[i][1] += circleVelocities[i][1] * (Date.now() - previousTime);
        }
        hueClock += Date.now() - previousTime;
        previousTime = Date.now();
        if (hueClock >= 100) {
            hueClock = 0;
            hue++;
        }
        circleColour = `hsl(${hue}, 70%, 50%)`;
    }

    function checkWithinScreen(i) {
        if (circlePositions[i][0] > window.innerWidth) {
            circleVelocities[i][0] *= -1;
            circlePositions[i][0] = window.innerWidth;
        }
        if (circlePositions[i][0] < 0) {
            circleVelocities[i][0] *= -1;
            circlePositions[i][0] = 0;
        }
        if (circlePositions[i][1] > window.innerHeight) {
            circleVelocities[i][1] *= -1;
            circlePositions[i][1] = window.innerHeight;
        }
        if (circlePositions[i][1] < 0) {
            circleVelocities[i][1] *= -1;
            circlePositions[i][1] = 0;
        }
    }

    function findMinDistance(index) {
        var distance = 99999999999;
        var minIndex = -1;

        for (var i = 0; i < circleAmount; i++) {
            if (i == index) {
                continue;
            }
            // no square root since we are comparing distances which doesnt require a sqrt to do, much faster
            var currDistance = (circlePositions[i][0] - circlePositions[index][0]) * (circlePositions[i][0] - circlePositions[index][0]) +
            (circlePositions[i][1] - circlePositions[index][1]) * (circlePositions[i][1] - circlePositions[index][1]);
            if (currDistance < distance) {
                distance = currDistance;
                minIndex = i;
            }
        }

        return minIndex;
    }

    function drawLine(x1, y1, x2, y2) {
        context.strokeStyle = lineColour;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }

    function drawCircle(x, y) {
        context.fillStyle = circleColour;
        context.strokeStyle = circleColour;
        context.beginPath();
        context.arc(x, y, circleSize, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        canvas = canvasRef.current;
        context = canvas.getContext('2d');
        // our animation caps at 30 fps
        const animation = setInterval(() => window.requestAnimationFrame(drawCanvas), 33);
        initCanvas();

        return () => {
          window.removeEventListener("resize", handleResize);
          clearInterval(animation);
        }
    }, []);

    function handleResize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        circleAmount = Math.floor(window.innerWidth * window.innerHeight * (100/(2560*1200)));
        initCanvas();
    }

    return <canvas className='bg' ref={canvasRef} width={width} height={height} ></canvas>
}

export default Canvas;