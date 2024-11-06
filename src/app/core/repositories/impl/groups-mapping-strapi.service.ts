import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Group } from "../../models/group.model";

export interface GroupRaw {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class GroupsMappingStrapi implements IBaseMapping<Group> {
    setAdd(data: Group): Partial<GroupRaw> {
        return { name: data.name };
    }

    setUpdate(data: Group): Partial<GroupRaw> {
        return { name: data.name };
    }

    getPaginated(page: number, pageSize: number, pages: number, data: GroupRaw[]): Paginated<Group> {
        return {
            page,
            pageSize,
            pages,
            data: data.map(d => this.getOne(d))
        };
    }

    getOne(data: GroupRaw): Group {
        return {
            id: data.id,
            name: data.name
        };
    }

    getAdded(data: GroupRaw): Group {
        return this.getOne(data);
    }

    getUpdated(data: GroupRaw): Group {
        return this.getOne(data);
    }

    getDeleted(data: GroupRaw): Group {
        return this.getOne(data);
    }
}
