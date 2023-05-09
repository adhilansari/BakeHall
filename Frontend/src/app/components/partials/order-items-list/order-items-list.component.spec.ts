import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsListComponent } from './order-items-list.component';

describe('OrderItemsListComponent', () => {
  let component: OrderItemsListComponent;
  let fixture: ComponentFixture<OrderItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
