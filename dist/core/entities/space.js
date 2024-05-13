"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = void 0;
const uuid_1 = require("uuid");
class Space {
    constructor(spaceProperties) {
        this.props = spaceProperties;
    }
    static create(props) {
        const space = new Space({
            spaceId: (0, uuid_1.v4)(),
            speaker: props.speaker,
            listener: props.listener,
            createAt: new Date()
        });
        return space;
    }
    update(newSpeaker, newListener) {
        this.props.speaker = [...this.props.speaker, ...newSpeaker],
            this.props.listener = [...this.props.listener, ...newListener];
        return this;
    }
}
exports.Space = Space;
//# sourceMappingURL=space.js.map