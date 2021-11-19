import boxen from "boxen";

export function initial() {
	console.log(
		boxen("-- -- * Devondemand Generator * -- --", {
			padding: 1,
			margin: 1,
			borderStyle: "classic",
			borderColor: "blue",
			backgroundColor: "magenta",
		})
	);
	console.log("Welcome to Devondemand Generator...\n\n");
};
export function end(options) {
	console.log(
		boxen(
			"To Start the Development Server Run: \n\ncd ../" +
				options.appName +
				"\n" +
				(options.technology === "Pure React" ? "yarn start" : "yarn dev"),
			{ padding: 0, margin: 1, borderStyle: "classic", borderColor: "blue" }
		)
	);
};


