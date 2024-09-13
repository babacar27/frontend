import { TestBed } from '@angular/core/testing';

import { DeclarationServiceService } from './declaration-service.service';

describe('DeclarationServiceService', () => {
  let service: DeclarationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclarationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
