import { Space } from "../../../core/entities/space";
import { SpaceModel } from "../models/SpaceModel";
import { Mapper } from "./Mapper";

export class SqlSpaceMapper implements Mapper<SpaceModel, Space> {
  toDomain(raw: SpaceModel): Space {
    const space = new Space({
      spaceId: raw.space_id,
      speaker: raw.speaker,
      listener: raw.listener,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at
    });
    return space;
  }
  fromDomain(data: Space): SpaceModel {
    const spaceModel: SpaceModel = {
        space_id: data.props.spaceId,
        speaker: data.props.speaker,
        listener: data.props.listener,
        created_at: data.props.createdAt
    }
    return spaceModel
  }
}
