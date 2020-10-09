import { HashDependant } from "./HashDependant.js";

/** An editor tab */
class Tab extends HashDependant {
	constructor() {
		super();

		this.shadowRoot.innerHTML = `
            <style>
				:host {
					display: inline-block;
					border-right: 1px solid var(--main-bg, #111);
					transition: all 100ms ease-in-out;
				}
				:host(:hover) {
					background: var(--lighter-bg);
				}
				div {
					display: flex;
					align-items: center;
				}
				a, button {
					font-size: 1rem;
					outline: none;
				}
				a {
					color: #eee;
					text-decoration: none;
					display: block;
					padding: 1rem 0.5rem 1rem 1rem;
				}
				a::after {
					content: ".md";
					color: #888;

				}
				button {
					background: transparent;
					color: #ddd;
					border: none;
					padding: 0.25rem 0.5rem;
					margin-right: 0.5rem;
					cursor: pointer;
					font-size:  1.5rem;
					font-weight: light;
				}
				/* button:hover {
					background: var(--lighter-bg);
				} */
				:host([active="true"]) {
					background: var(--main-bg, #000);
				}
			</style>
			<div>
				<a><slot></slot></a>
				<button>&times;</button>
			</div>
        `;

		this.a = this.shadowRoot.querySelector("a");

		this.shadowRoot.querySelector("button").addEventListener("click", () => {
			// Hide the tab
			const parent = this.parentElement;
			parent.removeChild(this);

			if (this.getAttribute("active") === "true") {
				// Close the tab
				window.location.hash = "#";
			}
		});
	}

	/**
	 * Extends superclass method - update anchor href value
	 * @param {string} name attribute name
	 * @param {string} oldValue previous value
	 * @param {string} newValue new value
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);

		switch (name) {
			case "href":
				this.a.href = newValue;
				break;
		}
	}
}

customElements.define("editor-tab", Tab);
