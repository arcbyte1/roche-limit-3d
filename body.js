class Body {

    constructor(pos, vel) {

        this.pos = pos;
        this.vel = vel;
        this.acc = createVector();
        this.r = 5;

    }

    update = function() {

        // ===== Calculating Gravity ===== //

        let F = p5.Vector.mult(this.pos, -1); // Find the vector pointing towards the origin.
        let d = this.pos.mag() / 3; // Find its magnitude, which is the distance.
                                    // The division by 3 is to simply scale the distance in the simulation.

        let mag = 10**7/d**2; // Find the magnitude of the force due to gravity.
                              // Here mass of the attracting body is 10**7 units of mass, and G = 1.

        F.setMag(mag); // Set the unit vector to have the calculated force magnitude.

        if (d < 70) F.setMag(0); // Set the force to zero if the object comes too close to 
                                 // the attracting body, to avoid dividing by zero error.

        // =============================== //

        // ===== Handling Collisions ===== //

        for (let i = 0; i < n; i++) {

            let distance = p5.Vector.sub(this.pos, bodies[i].pos).mag(); // Find distance between two bodies.

            if (distance < this.r) { // If the distance is less than their radii, they are colliding.

                let velocity = p5.Vector.add(this.vel, bodies[i].vel); // Find the total final velocity as the vector
                                                                       // sum of the two velocities.

                let v = velocity.mag() / 2;

                this.vel.set(velocity.setMag(v));      // Set the velocity of both particles as half
                bodies[i].vel.set(velocity.setMag(v)); // the total final velocity.

            }

        }

        // =============================== //

        this.acc.set(F); // Set the acceleration equal to the calculated force. (since mass of each object is 1 units)
        this.vel.add(p5.Vector.mult(this.acc, dt)); // Add the acceleration to the velocity of the body.
        this.pos.add(p5.Vector.mult(this.vel, dt)); // Add the velocity to the position of the body.

    }

    render = function() {

        translate(this.pos);
        noStroke();
        fill(200);

        // velocity
        let green = color(0, 255, 0);
        let red = color(255, 0, 0);
        let v = map(this.vel.mag(), 350, 500, 0, 1);
        let c1 = lerpColor(green, red, v);
        // fill(c1);

        // height
        let white = color(255, 255, 255);
        let blue = color(0, 0, 255);
        let h = map(abs(this.pos.y), 0, 75, 0, 1);
        let c2 = lerpColor(white, blue, h);
        // fill(c2);

        sphere(4);
        translate(p5.Vector.mult(this.pos, -1));

    }

};