/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicesPriceDollarServiceService } from './ServicesPriceDollarService.service';

describe('Service: ServicesPriceDollarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicesPriceDollarServiceService]
    });
  });

  it('should ...', inject([ServicesPriceDollarServiceService], (service: ServicesPriceDollarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
