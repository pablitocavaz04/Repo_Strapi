// src/app/core/models/group.model.ts
import { Model } from "./base.model";

export interface Group extends Model {
    name: string;
    picture?: string; // Imagen opcional del grupo
}
