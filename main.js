function setup() { 

	canvas = createCanvas(600, 600, WEBGL);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    imageMode(CENTER);
    rectMode(CENTER);
    camera(2000, 0, 0);
    // createEasyCam();

    // ========== //

        bodies = []; n = 2000;
        for (let i = 0; i < n; i++) {

            let center = createVector(0, 0, 500); // 0 0 500
            let pos = p5.Vector.add(center, p5.Vector.random3D().setMag(100));

            bodies[i] = new Body(
                pos,
                createVector(400, 0, 0)
            );

        }

    // ========== //

}

function draw() { 
    
    background(10);
    // lights();
    rotateX(frameCount / 10**2.5);
    rotateY(frameCount / 10**2.5);
    rotateZ(frameCount / 10**2.5);
    rotateZ(90 * PI/180);
    dt = deltaTime * 10**-3;
    dt = 0.08;

    // ========== //

        noFill();
        stroke(255);
        strokeWeight(2);
        box(1000);

        noStroke();
        fill(255);
        cylinder(1, 1000);

        noFill(255);
        stroke(255);
        strokeWeight(1);
        sphere(50);

        for (let i = 0; i < n; i++) {

            bodies[i].update();
            bodies[i].render();

        }

    // ========== //
	
}

function mouseClicked() {

    // saveCanvas();

}