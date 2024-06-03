export interface SpaceModel {
    space_id: string;
    speaker: string[];
    listener: string[];
    created_at: Date;
    updated_at?: Date;
}