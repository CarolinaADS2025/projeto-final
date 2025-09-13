import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoCrud } from './projeto-crud';

describe('ProjetoCrud', () => {
  let component: ProjetoCrud;
  let fixture: ComponentFixture<ProjetoCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetoCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetoCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
