import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth.service';
import { Idea, Tag } from '../../shared/types';

@Component({
  selector: 'app-read-idea',
  templateUrl: './read-idea.component.html',
  styleUrls: ['./read-idea.component.scss']
})
export class ReadIdeaComponent implements OnInit {

  public idea: Idea;
  public ideaTags: Tag[];
  public canEdit = false;


  constructor(private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(({ idea, ideaTags }: { idea: Idea, ideaTags: Tag[] }) => {
      // initialize data
      this.idea = idea;
      this.ideaTags = ideaTags;
      // check whether user can edit the idea
      this.canEdit = this.auth.username === this.idea.creator.username;
    });
  }

}
