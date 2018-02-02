import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ReadIdeaComponent } from './read-idea.component';
import { EditorOutputComponent } from '../../shared/editor-output/editor-output.component';
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../auth.service';

@Component({ selector: 'app-vote', template: '' })
class VoteStubComponent { }

@Component({ selector: 'app-tag-list', template: '' })
class TagListStubComponent {
  @Input() tags;
}

class AuthStubService {
  username = 'user';
}

class ActivatedRouteStub {
  data = Observable.of({
    idea: { id: '123', creator: { username: 'user' } },
    ideaTags: []
  });
}

describe('ReadIdeaComponent', () => {
  let component: ReadIdeaComponent;
  let fixture: ComponentFixture<ReadIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorOutputComponent,
        ReadIdeaComponent,
        TagListStubComponent,
        VoteStubComponent,
      ],
      imports: [
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthStubService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
