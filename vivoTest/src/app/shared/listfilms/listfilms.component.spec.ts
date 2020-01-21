import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfilmsComponent } from './listfilms.component';

describe('ListfilmsComponent', () => {
  let component: ListfilmsComponent;
  let fixture: ComponentFixture<ListfilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
