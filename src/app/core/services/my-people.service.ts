import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Person } from "../models/person.model";
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

export interface PersonRaw {
    id: string;
    attributes: {
        name: string;
        surname: string;
        email: string;
        gender: string;
        birthday: string;
        group: {
            data: {
                id: string;
                attributes: {
                    name: string;
                };
            };
        };
    };
}

@Injectable({
    providedIn: 'root'
})
export class MyPeopleService {

    private apiUrl: string = "http://localhost:1337/api/people";

    constructor(private http: HttpClient) {}

    getAll(page: number, pageSize: number): Observable<Paginated<Person>> {
        return this.http.get<PaginatedRaw<PersonRaw>>(`${this.apiUrl}?populate=group&pagination[page]=${page}&pagination[pageSize]=${pageSize}`).pipe(
            map(res => {
                return {
                    page: res.meta.pagination.page,
                    pageSize: res.meta.pagination.pageSize,
                    pages: res.meta.pagination.pageCount,
                    data: res.data.map<Person>((d: PersonRaw) => {
                        return {
                            id: d.id,
                            name: d.attributes.name,
                            surname: d.attributes.surname,
                            email: d.attributes.email,
                            gender: d.attributes.gender,
                            birthday: new Date(d.attributes.birthday),
                            group: d.attributes.group?.data ? {
                                id: d.attributes.group.data.id,
                                name: d.attributes.group.data.attributes.name
                            } : undefined
                        };
                    })
                };
            })
        );
    }
}
