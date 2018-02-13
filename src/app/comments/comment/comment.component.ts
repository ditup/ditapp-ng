import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from 'app/auth.service';
import { Comment } from 'app/shared/types';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  public isDeleteDisplayed = false;

  constructor(private auth: AuthService) { }

  get isCreatorMe() {
    return this.comment.creator.username === this.auth.username;
  }

  ngOnInit() {
  }

  askReallyDelete(really: boolean) {
    this.isDeleteDisplayed = really;
  }

  deleteComment() {
    console.log('TODO delete comment');
  }

}

/**
 * Stub component
 */
@Component({ selector: 'app-comment', template: '' })
export class CommentStubComponent {
  @Input() comment;
}
