import { TestBed } from '@angular/core/testing';

import { TareasGlobalesService } from './tareas-globales.service';

describe('TareasGlobalesService', () => {
  let service: TareasGlobalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasGlobalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
