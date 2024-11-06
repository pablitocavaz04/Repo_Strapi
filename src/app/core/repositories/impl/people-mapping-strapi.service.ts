import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Person } from "../../models/person.model";

export interface PersonRaw {
    id: string;
    name: string;
    surname: string;
    email: string;
    gender: string;
    birthday: string;
    group?: { id: string, name: string };  // Relación con el grupo
}

@Injectable({
    providedIn: 'root'
})
export class PeopleMappingStrapi implements IBaseMapping<Person> {
    toGenderMapping: any = {
        Masculino: 'male',
        Femenino: 'female',
        Otros: 'other'
    };

    fromGenderMapping: any = {
        male: 'Masculino',
        female: 'Femenino',
        other: 'Otros'
    };

    setAdd(data: Person): PersonRaw {
        return {
            name: data.name,
            surname: data.surname,
            email: data.email ?? '',
            gender: this.toGenderMapping[data.gender],
            birthday: data.birthday,
            group: data.groupId ? { id: data.groupId, name: '' } : undefined
        };
    }

    setUpdate(data: Person): Partial<PersonRaw> {
        return {
            name: data.name,
            surname: data.surname,
            email: data.email,
            gender: this.toGenderMapping[data.gender],
            birthday: data.birthday
        };
    }

    getPaginated(page: number, pageSize: number, pages: number, data: PersonRaw[]): Paginated<Person> {
        return {
            page,
            pageSize,
            pages,
            data: data.map(d => this.getOne(d))
        };
    }

    getOne(data: PersonRaw): Person {
        return {
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            birthday: data.birthday,
            groupId: data.group?.id,
            gender: this.fromGenderMapping[data.gender],
        };
    }

    getAdded(data: PersonRaw): Person {
        return this.getOne(data);
    }

    getUpdated(data: PersonRaw): Person {
        return this.getOne(data);
    }

    getDeleted(data: PersonRaw): Person {
        return this.getOne(data);
    }
}
