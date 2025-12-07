import { TestBed } from '@angular/core/testing';

import { GpsServ } from './gps.serv';

describe('GpsServ', () => {
  let service: GpsServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpsServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
