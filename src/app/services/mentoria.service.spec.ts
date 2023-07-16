import { TestBed } from '@angular/core/testing';

import { MentoriaService } from './mentoria.service';

describe('MentoriaService', () => {
  let service: MentoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
