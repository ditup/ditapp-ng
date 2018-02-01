import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idea } from '../../shared/types';
import { ModelService } from '../../model.service';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.scss']
})
export class CreateIdeaComponent implements OnInit {

  public idea: Idea = { id: '', title: '', detail: '' };

  constructor(private model: ModelService,
              private router: Router) { }

  ngOnInit() {
  }

  /**
   * What should happen when the new idea is submitted
   * (received event from idea-form component)
   */
  async onSubmitIdea(idea: Idea) {
    // send request to server
    const newIdea: Idea = await this.model.createIdea(idea);

    // @TODO notify about success

    // redirect to idea page
    await this.router.navigate(['idea', newIdea.id]);
  }

}
