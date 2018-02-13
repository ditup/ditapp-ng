import { Component, Input, OnInit } from '@angular/core';

import { Comment, Idea } from 'app/shared/types';
import { ModelService } from 'app/model.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: Comment[];
  @Input() primary: Idea;

  constructor(private model: ModelService) { }

  ngOnInit() {
  }

  async submitComment(comment: Comment) {
    const newComment = await this.model.addCommentTo({ type: 'ideas', id: this.primary.id }, comment);
    this.comments.push(newComment);
  }

}

/**
 * Stub component for testing
 */
@Component({ selector: 'app-comments', template: '' })
export class CommentsStubComponent {
  @Input() comments;
  @Input() primary;
}
