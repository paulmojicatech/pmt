import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsToGetComponent } from './items-to-get.component';

describe('ItemsToGetComponent', () => {
  let component: ItemsToGetComponent;
  let fixture: ComponentFixture<ItemsToGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsToGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsToGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
