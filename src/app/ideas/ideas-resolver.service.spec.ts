import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { IdeaResolver, IdeaTagsResolver } from './ideas-resolver.service';

import { ModelService } from '../model.service';

import { Idea, Tag } from '../shared/types';

class ModelStubService {
  public async readIdea(_id): Promise<Idea> {
    return {
      id: '123456',
      title: 'test title',
      detail: 'test detail',
      creator: {
        username: 'test-user'
      }
    };
  }

  public async readIdeaTags(_id): Promise<Tag[]> {
    return [
      { tagname: 'tag0' },
      { tagname: 'tag1' },
      { tagname: 'tag2' }
    ];
  }
}

class ActivatedRouteSnapshotStub {
  params = {
    id: '123456'
  };
}

describe('IdeaResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IdeaResolver,
        { provide: ModelService, useClass: ModelStubService },
        { provide: ActivatedRouteSnapshot, useClass: ActivatedRouteSnapshotStub }
      ],
    });
  });

  it('should be created', inject([IdeaResolver], (service: IdeaResolver) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve with idea',
     inject([IdeaResolver, ActivatedRouteSnapshot], async (service: IdeaResolver, route: ActivatedRouteSnapshot) => {
    const idea = await service.resolve(route);

    expect(idea.id).toEqual('123456');
  }));
});

describe('IdeaTagsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IdeaTagsResolver,
        { provide: ModelService, useClass: ModelStubService },
        { provide: ActivatedRouteSnapshot, useClass: ActivatedRouteSnapshotStub }
      ],
    });
  });

  it('should be created', inject([IdeaTagsResolver], (service: IdeaTagsResolver) => {
    expect(service).toBeTruthy();
  }));

  it('should resolve with some tags',
     inject([IdeaTagsResolver, ActivatedRouteSnapshot], async (service: IdeaTagsResolver, route: ActivatedRouteSnapshot) => {
    const tags = await service.resolve(route);

    expect(tags.length).toEqual(3);
  }));
});
