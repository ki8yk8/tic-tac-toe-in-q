const to_radian = (degree) => (degree * Math.PI) / 180;
const to_degree = (radian) => (radian * 180) / Math.PI;

// for two bar linkage; Base to Joint 1 (l1, theta1; T1) -> Joint 1 to End Affector (l2, theta2; T2)
class TwoPlanarArm {
	constructor(l1, l2) {
		this.l1 = l1;
		this.l2 = l2;
	}

	compute_theta2(x, y) {
		const c =
			(Math.pow(x, 2) +
				Math.pow(y, 2) -
				Math.pow(this.l1, 2) -
				Math.pow(this.l2, 2)) /
			(2 * this.l1 * this.l2);
		const [f, b] = [Math.sqrt(1 - Math.pow(c, 2)), c];

		return [Math.atan2(-f, b), Math.atan2(f, b)];
	}

	compute_theta1(x, y) {
		const theta2 = this.compute_theta2(x, y);

		return [
			Math.atan2(y, x) -
				Math.atan2(
					this.l2 * Math.sin(theta2[0]),
					this.l1 + this.l2 * Math.cos(theta2[0])
				),
			Math.atan2(y, x) -
				Math.atan2(
					this.l2 * Math.sin(theta2[1]),
					this.l1 + this.l2 * Math.cos(theta2[1])
				),
		];
	}
}
