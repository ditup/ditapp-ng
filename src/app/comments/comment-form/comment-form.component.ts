import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Comment } from 'app/shared/types';
import { EditorComponent } from 'app/shared/editor/editor.component';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  public commentForm: FormGroup;

  @Input() submitButtonText = 'Submit';
  @Input() disabled = false;

  @Output() submitComment = new EventEmitter<Comment>();

  @ViewChild('editor') editor: EditorComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', [
        Validators.maxLength(1024),
        Validators.pattern(/\S/),
        Validators.required
      ]]
    });
  }

  public onSubmit() {
    this.submitComment.emit(this.commentForm.value);
    this.commentForm.reset();
    this.editor.clear();
  }
}

@Component({ selector: 'app-comment-form', template: '' })
export class CommentFormStubComponent {
}
