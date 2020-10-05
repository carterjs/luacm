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
				}
				div {
					display: flex;
					align-items: center;
				}
				a, button {
					font-size: 1rem;
				}
				a {
					color: #eee;
					text-decoration: none;
					display: block;
					padding: 1rem;
				}
				a::after {
					content: ".md";
					color: #888;

				}
				button {
					background: transparent;
					color: #eee;
					border: none;
					padding: 0.25rem 0.5rem;
					margin-right: 0.5rem;
					cursor: pointer;
				}
				button:hover {
					background: rgba(255,255,255,0.1);
				}
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

			// Close the tab
			window.location.hash = "#";
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
