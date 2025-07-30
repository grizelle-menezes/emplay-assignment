import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCard } from './delete-card';


describe('DeleteCard', () => {
  let component: DeleteCard;
  let fixture: ComponentFixture<DeleteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
