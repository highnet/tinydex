export class StringBuilder {
	// Initialize an empty array to store the classes
	private classes: string[] = [];

	// Method to add a class or an array of classes to the classes array
	add(className: string | string[]): StringBuilder {
		if (Array.isArray(className)) {
			// If className is an array, loop through each element and add it to the classes array
			className.forEach((name) => {
				if (typeof name === "string" && name.trim().length > 0) {
					this.classes.push(name.trim());
				}
			});
		} else if (typeof className === "string" && className.trim().length > 0) {
			// If className is a string, add it to the classes array
			this.classes.push(className.trim());
		}

		// Return the StringBuilder object to allow for chaining
		return this;
	}

	// Method to convert the classes array to a string with each class separated by a space
	toString(): string {
		return this.classes.join(" ");
	}
}
