class RotatingEnemy extends Enemy{
	orbitCenter;
	radius;
	orbitTime;
	orbitDirection;
	step;
	angle;

	constructor(orbitCenter, radius, orbitTime, x, y, orbitDirection, hp){
		let rand = Math.random();
		super("satellite", rand, x, y, 0, 0, 20, 20, hp);
		this.orbitCenter = orbitCenter;
		this.radius = radius;
		this.orbitTime = orbitTime;
		this.orbitDirection = orbitDirection;
		this.angle = Math.atan2(this.y - this.orbitCenter.y, this.x - this.orbitCenter.x);
		this.step = 2 * Math.PI / this.orbitTime * this.orbitDirection;
	
		Enemy.list[rand] = this;
		orbitCenter.minions[rand] = this;
	}

	updatePosition(){
		let center = this.orbitCenter;
		let radius = this.radius;
		this.angle += this.step;

		this.x = center.x + Math.round(radius * Math.cos(this.angle) * 1000) / 1000;
		this.y = center.y + Math.round(radius * Math.sin(this.angle) * 1000) / 1000;
		
		return true;
	}
}
