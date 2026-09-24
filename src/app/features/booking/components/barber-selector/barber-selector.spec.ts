import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberSelectorComponent } from './barber-selector';

describe('BarberSelector', () => {
  let component: BarberSelectorComponent;
  let fixture: ComponentFixture<BarberSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarberSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
