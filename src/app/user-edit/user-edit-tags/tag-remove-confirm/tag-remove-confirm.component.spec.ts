import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRemoveConfirmComponent } from './tag-remove-confirm.component';

describe('TagRemoveConfirmComponent', () => {
  let component: TagRemoveConfirmComponent;
  let fixture: ComponentFixture<TagRemoveConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagRemoveConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagRemoveConfirmComponent);
    component = fixture.componentInstance;
    // default userTag
    component.userTag = { user: { username: '' }, tag: { tagname: '' }, story: '', relevance: 1 };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
