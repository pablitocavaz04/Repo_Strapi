// src/app/core/repositories/repository.factory.ts
import { FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { Person } from '../models/person.model';
import { Group } from '../models/group.model';
import { 
    GROUPS_API_URL_TOKEN, 
    GROUPS_REPOSITORY_MAPPING_TOKEN, 
    GROUPS_REPOSITORY_TOKEN, 
    GROUPS_RESOURCE_NAME_TOKEN, 
    PEOPLE_API_URL_TOKEN, 
    PEOPLE_REPOSITORY_MAPPING_TOKEN, 
    PEOPLE_REPOSITORY_TOKEN, 
    PEOPLE_RESOURCE_NAME_TOKEN 
} from './repository.tokens';
import { IBaseMapping } from './intefaces/base-mapping.interface';
import { Model } from '../models/base.model';

export function createHttpRepository<T extends Model>(
  http: HttpClient,
  apiUrl: string,
  resource: string,
  mapping: IBaseMapping<T>
): IBaseRepository<T> {
  return new BaseRepositoryHttpService<T>(http, apiUrl, resource, mapping);
}

// Configuración de fábrica para People con Strapi
export const PeopleRepositoryFactory: FactoryProvider = {
  provide: PEOPLE_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL: string, resource: string, mapping: IBaseMapping<Person>) => {
    return createHttpRepository<Person>(http, apiURL, resource, mapping);
  },
  deps: [HttpClient, PEOPLE_API_URL_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN]
};

// Configuración de fábrica para Groups con Strapi
export const GroupsRepositoryFactory: FactoryProvider = {
  provide: GROUPS_REPOSITORY_TOKEN,
  useFactory: (http: HttpClient, apiURL: string, resource: string, mapping: IBaseMapping<Group>) => {
    return createHttpRepository<Group>(http, apiURL, resource, mapping);
  },
  deps: [HttpClient, GROUPS_API_URL_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, GROUPS_REPOSITORY_MAPPING_TOKEN]
};
