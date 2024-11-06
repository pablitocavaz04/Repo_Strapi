import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBaseRepository,SearchParams } from '../intefaces/base-repository.interface';
import { API_URL_TOKEN, REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { Model } from '../../models/base.model';
import { IBaseMapping } from '../intefaces/base-mapping.interface';
import { Paginated } from '../../models/paginated.model';

@Injectable({
    providedIn: 'root'
})
export class BaseRepositoryHttpService<T extends Model> implements IBaseRepository<T> {

    constructor(
        protected http: HttpClient,
        @Inject(API_URL_TOKEN) protected apiUrl: string,
        @Inject(RESOURCE_NAME_TOKEN) protected resource: string,
        @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping: IBaseMapping<T>
    ) {
        this.apiUrl = apiUrl;
    }

    getAll(page: number, pageSize: number, filters: SearchParams): Observable<T[] | Paginated<T>> {
        return this.http.get<any>(`${this.apiUrl}/${this.resource}`, { params: { _page: page.toString(), _limit: pageSize.toString() } })
            .pipe(map(res => this.mapping.getPaginated(page, pageSize, res.meta.pagination.pageCount, res.data)));
    }

    getById(id: string): Observable<T | null> {
        return this.http.get<any>(`${this.apiUrl}/${this.resource}/${id}`)
            .pipe(map(res => this.mapping.getOne(res.data)));
    }

    add(entity: T): Observable<T> {
        return this.http.post<any>(`${this.apiUrl}/${this.resource}`, { data: this.mapping.setAdd(entity) })
            .pipe(map(res => this.mapping.getAdded(res.data)));
    }

    update(id: string, entity: T): Observable<T> {
        return this.http.put<any>(`${this.apiUrl}/${this.resource}/${id}`, { data: this.mapping.setUpdate(entity) })
            .pipe(map(res => this.mapping.getUpdated(res.data)));
    }

    delete(id: string): Observable<T> {
        return this.http.delete<any>(`${this.apiUrl}/${this.resource}/${id}`)
            .pipe(map(res => this.mapping.getDeleted(res.data)));
    }
}
