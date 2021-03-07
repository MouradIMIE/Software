import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SongPageComponent } from './songPage.component';



describe('LoginComponent', () => {
  let component: SongPageComponent;
  let fixture: ComponentFixture<SongPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});