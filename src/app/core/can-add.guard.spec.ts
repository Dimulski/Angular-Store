import { TestBed, async, inject } from '@angular/core/testing';

import { CanAddGuard } from './can-add.guard';

describe('CanAddGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanAddGuard]
    });
  });

  it('should ...', inject([CanAddGuard], (guard: CanAddGuard) => {
    expect(guard).toBeTruthy();
  }));
});
