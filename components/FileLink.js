import { HashDependant } from "./HashDependant.js";

/** A file link for the editor's explorer */
class FileLink extends HashDependant {
	constructor() {
		super();

		this.shadowRoot.innerHTML = `
            <style>
                :host {
					display: block;
				}
				a::before {
					content: "md";
					color: #800;
					margin-right: 0.5rem;
					font-size: 0.8rem;
				}
				a {
					color: #eee;
					text-decoration: none;
					display: block;
					line-height: 2;
					text-indent: 0.5rem;
				}
				:host([active="true"]) a {
					background: var(--main-bg, #000);
                }
                :host([active="true"]) a::after {
					content: " ";
					text-indent: 0;
					float: right;
					white-space: pre;
					border-right: 2px solid #ff0;
                }
            </style>
            <a><slot></slot></a>
        `;

		this.a = this.shadowRoot.querySelector("a");
	}

	/**
	 * Override superclass method - update anchor to contain new href
	 * @param {string} name attribute name
	 * @param {string} oldValue previous value
	 * @param {string} newValue new value
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		// superclass reacts to href and updates active attribute
		super.attributeChangedCallback(name, oldValue, newValue);

		switch (name) {
			case "href":
				// Just update the anchor to have this new href
				this.a.href = newValue;
		}
	}
}

customElements.define("editor-file-link", FileLink);
