import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PmtMobileToolbarModule } from '@pmt/pmt-common-angular-components';

import { CurrentListComponent } from './current-list.component';

describe('CurrentListComponent', () => {
  let component: CurrentListComponent;
  let fixture: ComponentFixture<CurrentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, PmtMobileToolbarModule],
      declarations: [CurrentListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
