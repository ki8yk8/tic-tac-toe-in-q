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

	draw(canvas, object) {
		const change = {};

		// if change has theta 1 and theta 2 then, directly draw
		// if change has X, Y then compute inverse kinematics then draw
		if (object.theta1) {
			change.theta1 = object.theta1 * -1;
			change.theta2 = object.theta2 * -1;
		} else {
			const [x, y] = [object.X, object.Y];
			const theta2 = this.compute_theta2(x, y);
			const theta1 = this.compute_theta1(x, y);

			change.theta1 = theta1[0] * -1;
			change.theta2 = theta2[0] * -1;
		}

		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const [width, height] = [canvas.width, canvas.height / 2];

		// drawing the base
		ctx.fillStyle = "red";
		ctx.fillRect((width - 100) / 2, height - 25, 100, 25);

		// drawing the first link
		const end_point = this.draw_link(
			ctx,
			(width - 100) / 2,
			height - 25,
			this.l1,
			change.theta1
		);
		this.draw_link(
			ctx,
			end_point[0],
			end_point[1],
			this.l2,
			change.theta2,
			change.theta1,
			"blue"
		);
	}

	draw_link(ctx, start, end, length, theta, prev_theta = 0, color = "black") {
		const [end_x, end_y] = [
			start + Math.cos(theta + prev_theta) * length,
			end + Math.sin(theta + prev_theta) * length,
		];

		ctx.beginPath();
		ctx.moveTo(start, end);
		ctx.lineTo(end_x, end_y);
		ctx.strokeStyle = color;
		ctx.lineWidth = 10;
		ctx.lineCap = "round";
		ctx.stroke();

		return [end_x, end_y];
	}
}

const canvas = document.getElementById("robotic-arm");
const input_X = document.getElementById("input-X");
const input_Y = document.getElementById("input-Y");

const two_planer_arm = new TwoPlanarArm(70, 100);
two_planer_arm.draw(canvas, {
	X: 100,
	Y: 100,
})

input_X.addEventListener("change", handleReferenceChange);
input_Y.addEventListener("change", handleReferenceChange);

function handleReferenceChange() {
	two_planer_arm.draw(canvas, {
		X: input_X.value,
		Y: input_Y.value,
	});
}

