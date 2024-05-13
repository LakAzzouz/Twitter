import { v4 } from "uuid"

type SpaceProperties = {
    spaceId: string
    speaker: string[]
    listener: string[]
    createAt: Date
}

export class Space {
    props: SpaceProperties

    constructor(spaceProperties: SpaceProperties){
        this.props = spaceProperties
    }

    static create(props: {speaker: string[], listener: string[]}): Space{
        const space = new Space({
            spaceId: v4(),
            speaker: props.speaker,
            listener: props.listener,
            createAt: new Date()
        })
        return space
    }

    update(newSpeaker: string[], newListener: string[]): Space{
        this.props.speaker = [...this.props.speaker, ...newSpeaker],
        this.props.listener = [...this.props.listener, ...newListener]
        return this
    }
}