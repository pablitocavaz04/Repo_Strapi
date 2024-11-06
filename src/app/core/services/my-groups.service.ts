import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Group } from "../models/group.model";
import { Paginated } from "../models/paginated.model";

export interface PaginatedRaw<T> {
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
    data: T[];
}

export interface GroupRaw {
    id: string;
    attributes: {
        name: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class MyGroupsService {

    private apiUrl: string = "http://localhost:1337/api/groups";

    constructor(private http: HttpClient) {}

    getAll(page: number, pageSize: number): Observable<Paginated<Group>> {
        return this.http.get<PaginatedRaw<GroupRaw>>(`${this.apiUrl}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`).pipe(
            map(res => {
                return {
                    page: res.meta.pagination.page,
                    pageSize: res.meta.pagination.pageSize,
                    pages: res.meta.pagination.pageCount,
                    data: res.data.map<Group>((d: GroupRaw) => {
                        return {
                            id: d.id,
                            name: d.attributes.name
                        };
                    })
                };
            })
        );
    }
}
