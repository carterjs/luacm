/** The simple wrapper for page content */
class File extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
				}
            </style>
            <slot></slot>
        `;

		if (!this.id) {
			throw new Error("Editor pages must have an ID");
		}
	}
}

customElements.define("editor-file", File);
