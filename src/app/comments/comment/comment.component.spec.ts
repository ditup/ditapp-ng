import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MomentModule } from 'angular2-moment';

import { CommentComponent } from './comment.component';
import { EditorOutputComponent } from 'app/shared/editor-output/editor-output.component';
import { UserSmallStubComponent } from 'app/shared/user-small/user-small.component';
import { AuthService } from 'app/auth.service';

class AuthStubService { }

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentComponent,
        EditorOutputComponent,
        UserSmallStubComponent
      ],
      imports: [
        MomentModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthStubService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = { id: '0123', content: 'test content', creator: { username: 'test' }, created: 1234 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
