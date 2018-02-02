import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../auth.service';
import { ModelService } from '../../model.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { Idea, Tag, TagList } from '../../shared/types';

@Component({
  selector: 'app-update-idea',
  templateUrl: './update-idea.component.html',
  styleUrls: ['./update-idea.component.scss']
})
export class UpdateIdeaComponent implements OnInit {

  public canEdit: boolean;
  public idea: Idea;
  public ideaTags: TagList;
  public isFormDisabled = false;

  constructor(private auth: AuthService,
              private model: ModelService,
              private notify: NotificationsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(({ idea, ideaTags }: { idea: Idea, ideaTags: Tag[] }) => {
      this.idea = idea;
      this.ideaTags = new TagList(ideaTags);
      this.canEdit = this.auth.username === this.idea.creator.username;
    });
  }

  async onSubmitIdea(submittedIdea: Idea) {
    // disable the form
    this.isFormDisabled = true;

    // update the idea
    submittedIdea.id = this.idea.id;
    await this.model.updateIdea(submittedIdea);

    // notify about success
    this.notify.info('Idea was successfully updated.');

    // redirect to idea page
    await this.router.navigate(['idea', this.idea.id]);

    // enable the form again
    this.isFormDisabled = false;
  }

  async addTag(tag: Tag) {
    // add tag to list and disable it
    try {
      this.ideaTags.add(tag.tagname);
    } catch (e) {
      this.notify.error(`Tag ${tag.tagname} is already added.`);
      return;
    }

    const tagInList = this.ideaTags.find(tag.tagname);
    tagInList['disabled'] = true;
    // save the tag to database
    await this.model.addIdeaTag(this.idea.id, tag.tagname);
    // enable tag
    delete tagInList['disabled'];
    // notify
    this.notify.info(`Tag successfully added.`);
  }

  async createAddTag(tag: Tag) {
    // create tag
    await this.model.createTag(tag);
    // add tag
    await this.addTag(tag);
  }

  async removeTag(tag: Tag) {
    // disable tag in list
    this.ideaTags.find(tag.tagname)['disabled'] = true;
    // remove tag from api
    await this.model.removeIdeaTag(this.idea.id, tag.tagname);
    // remove tag from list
    this.ideaTags.remove(tag.tagname);
    // notify
    this.notify.info(`Tag successfully removed.`);
  }
}
