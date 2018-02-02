import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ModelService } from '../model.service';
import { Idea, Tag } from '../shared/types';

@Injectable()
export class IdeaResolver implements Resolve<Idea> {

  constructor(private model: ModelService) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<Idea> {
    const id: string = route.params['id'];
    return await this.model.readIdea(id);
  }
}

@Injectable()
export class IdeaTagsResolver implements Resolve<Tag[]> {

  constructor(private model: ModelService) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<Tag[]> {
    const id: string = route.params['id'];
    return await this.model.readIdeaTags(id);
  }
}

@Injectable()
export class IdeasWithMyTagsResolver implements Resolve<Idea[]> {

  constructor(private model: ModelService) { }

  async resolve(): Promise<Idea[]> {
    return await this.model.findIdeasWithMyTags();
  }
}
