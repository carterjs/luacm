import "./File.js";
import "./FileLink.js";
import "./Tab.js";

/** The root element for the editor layout */
class Editor extends HTMLElement {

	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					--main-bg: #101320;
					--darker-bg: rgba(0,0,0,0.5);
					--darkest-bg: rgba(0,0,0,0.3);
					--lighter-bg: rgba(255,255,255,0.05);
					display: flex;
					flex-direction: column;
					min-height: 100vh;
					margin: 0;
					overflow: hidden;
					background: var(--main-bg, #000);
					color: #fff;
				}
				::slotted(*) {
					display: none;
				}
				::slotted(*:target) {
					display: block;
				}

				header {
					background: var(--lighter-bg);
					grid-area: header;
				}
			
				header h1 {
					text-align: center;
					margin: 0;
					padding: 0.5rem;
					font-size: 1rem;
				}

				#filesContainer {
					background: #080808;
					background: var(--darker-bg, #000);
				}

				#filesContainer small {
					font-weight: bold;
					display: block;
					padding: 1rem;
					font-size: 1rem;
				}

				main {
					flex: auto;
					grid-area: content;
				}

				footer {
					display: flex;
					background: #222;
					grid-area: footer;
				}

				#tabs {
					display: none;
					background: var(--darker-bg);
				}
				@media screen and (min-width: 960px) {
					:host {
						display: grid;
						grid-template-areas: "header header" "files content" "footer footer";
						grid-template-columns: 200px auto;
						grid-template-rows: min-content auto min-content;
					}
					#tabs {
						display: block;
					}
				}
				
			</style>
            <header>
                <h1>${this.title || "Editor"}</h1>
            </header>
			<nav id="filesContainer">
				<small>Explore</small>
				<div id="files"></div>
			</nav>
			<main>
				<div id="tabs"></div>
				<slot></slot>
            </main>
            <footer>
                <small>&copy; ${new Date().getFullYear()} ${this.title}</small>
            </footer>
        `;

		window.addEventListener("hashchange", () => {
			this.selectFile(window.location.hash.slice(1));
		});

		this.files = this.shadowRoot.getElementById("files");
		this.tabs = this.shadowRoot.getElementById("tabs");

		this.getFiles();

		this.selectFile(window.location.hash.slice(1));
	}

	/** Read files from DOM, render file list */
	getFiles() {
		// Clear files
		this.files.innerHTML = "";
		this.tabs.innerHTML = "";

		const files = this.querySelectorAll("editor-file");

		files.forEach((child) => {
			const file = document.createElement("editor-file-link");
			file.setAttribute("href", "#" + child.id);
			file.innerText = child.id;

			// this.openTab(child.id);

			this.files.appendChild(file);
		});
	}

	/**
	 * Select a file to be displayed
	 * 	Called automatically when hash changes
	 * @param {string} id the id of the file to select
	 */
	selectFile(id) {
		// No id given, default to the last tab
		if (!id) {
			if (this.lastSelectedFile) {
				this.selectTab(this.lastSelectedFile, false);
			} else {
				const nextTab = this.shadowRoot.querySelector("editor-tab:last-child");
				if (nextTab) {
					window.location.hash = nextTab.href;
				} else {
					console.log("(No tabs selected)");
				}
			}
			return;
		} else {
			this.lastSelectedFile = this.selectedFile;
			this.selectedFile = undefined;
		}

		// Set the last selected file

		this.selectTab(id);
	}

	openTab(id) {
		// Display tabs properly
		let tab = this.shadowRoot.querySelector(`editor-tab[href="#${id}"]`);
		if (!tab) {
			// Tab is closed, but we want to open it
			tab = document.createElement("editor-tab");
			tab.setAttribute("href", "#" + id);
			tab.innerText = id;

			this.tabs.appendChild(tab);
		}

		return tab;
	}

	selectTab(id, autoOpen = true) {
		// Display tabs properly
		let tab = this.shadowRoot.querySelector(`editor-tab[href="#${id}"]`);
		if (tab) {
			// Tab is open, set it active
			window.location.hash = tab.href;
			// tab.setAttribute("active", true);
		} else if (autoOpen) {
			tab = this.openTab(id);
			window.location.hash = tab.href;
		}

		return tab;
	}
}

customElements.define("editor-root", Editor);
