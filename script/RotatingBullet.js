class RotatingBullet extends Bullet{
    orbit_center;
    orbit_radius;
    orbit_time;
    orbit_direction;
    angle;
    step;

    constructor(x, y, orbit_center, orbit_radius, orbit_time, orbit_direction){
        let rand = 1 + Math.random();
        super(rand, x, y, 0, 0, 5, 5, 1, orbit_center.type == "player" ? false : true);
        orbit_center.satellites[rand] = this;
        this.orbit_center = orbit_center;
        this.orbit_radius = orbit_radius;
        this.orbit_time = orbit_time;
        this.orbit_direction = orbit_direction;
        this.angle = Math.atan2(this.y - this.orbit_center.y, this.x - this.orbit_center.x);
        this.step = 2 * Math.PI / this.orbit_time * this.orbit_direction;
    }

    updatePosition(){
        let center = this.orbit_center;
        let radius = this.orbit_radius;
        this.angle += this.step;
       
        this.x = center.x + Math.round(radius * Math.cos(this.angle) * 1000) / 1000;
        this.y = center.y + Math.round(radius * Math.sin(this.angle) * 1000) / 1000;

        return true;
    }
}