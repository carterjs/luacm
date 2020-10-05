/** An abstract class for elements that depend on the location hash */
export class HashDependant extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		// Refresh active state on hash change
		window.addEventListener("hashchange", this.setActive.bind(this));
	}

	/** Refresh the active attribute based on hash and href */
	setActive() {
		this.setAttribute("active", location.hash === this.getAttribute("href"));
	}

	/** Specify which attributes to listen for changes on */
	static get observedAttributes() {
		return ["href", "active"];
	}

	/**
	 * React to changes in the observed attributes (defined above)
	 * @param {string} name the attribute name
	 * @param {string} oldValue the previous value of the attribute
	 * @param {string} newValue the new value of the attribute
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case "href":
				// Set the active value according to this new href value
				this.setActive();
			default:
				// Reflect attribute changes in properties
				this[name] = newValue;
		}
	}
}
