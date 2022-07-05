import { TestBed } from '@angular/core/testing';

import { PageViewerService } from './page-viewer.service';

describe('PageViewerService', () => {
  let service: PageViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
