export const LogType = {
    SKILL:    1 << 0,
    ACTION:   1 << 1,
    ITEM:     1 << 2,
    DIALOGUE: 1 << 3,
    SYSTEM:   1 << 4
};

export class EventLog {
    constructor({
        container,
        rowHeight = 22,
        overscan = 20
    }) {
        this.container = container;
        this.rowHeight = rowHeight;
        this.overscan = overscan;

        this.events = [];
        this.visibleNodes = new Map();

        // true when viewing the newest entries
        this.followTail = true;

        this.viewport = document.createElement("div");
        this.viewport.style.position = "relative";
        this.viewport.style.width = "100%";

        this.content = document.createElement("div");
        this.content.style.position = "absolute";
        this.content.style.top = "0";
        this.content.style.left = "0";
        this.content.style.right = "0";
        this.content.style.width = "100%";

        this.viewport.appendChild(this.content);
        this.container.appendChild(this.viewport);

        this.container.addEventListener("scroll", () => {
            const threshold = 5;

            this.followTail =
                this.container.scrollTop +
                this.container.clientHeight >=
                this.container.scrollHeight - threshold;

            this.render();
        });
    }

    append(type, text) {
        const event = { type, text };

        this.events.push(event);

        this.viewport.style.height =
            `${this.events.length * this.rowHeight}px`;

        this.render();

        // Follow new entries only if the user was
        // already looking at the bottom.
        if (this.followTail) {
            this.container.scrollTop =
                this.container.scrollHeight;
        }
    }

    render() {
        const scrollTop = this.container.scrollTop;
        const height = this.container.clientHeight;

        const first =
            Math.max(
                0,
                Math.floor(scrollTop / this.rowHeight) -
                this.overscan
            );

        const last =
            Math.min(
                this.events.length,
                Math.ceil(
                    (scrollTop + height) /
                    this.rowHeight
                ) + this.overscan
            );

        const needed = new Set();

        for (let row = first; row < last; row++) {
            needed.add(row);

            let node = this.visibleNodes.get(row);

            if (!node) {
                node = document.createElement("div");

                node.style.position = "absolute";
                node.style.left = "0";
                node.style.right = "0";
                node.style.height =
                    `${this.rowHeight}px`;

                this.content.appendChild(node);

                this.visibleNodes.set(row, node);
            }

            const event = this.events[row];

            node.style.transform =
                `translateY(${row * this.rowHeight}px)`;

            node.textContent = event.text;
        }

        for (const [row, node] of this.visibleNodes) {
            if (!needed.has(row)) {
                node.remove();
                this.visibleNodes.delete(row);
            }
        }
    }
}