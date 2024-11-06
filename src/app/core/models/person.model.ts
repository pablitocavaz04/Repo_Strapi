// src/app/core/models/person.model.ts
import { Model } from "./base.model";

export interface Person extends Model {
    birthday: string;
    name: string;
    surname: string;
    age?: number;
    email?: string; // TODO: Quitar interrogación si el email es obligatorio en el futuro
    gender: string;
    picture?: {
        large: string;
        thumbnail: string;
    };
    groupId?: string; // ID del grupo al que pertenece la persona
}
