import { Component } from '@angular/core';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.scss'
})
export class GenerateComponent {
  constructor(
    private apiService: ApiService
  ) {
  }

  public generate(): void {
    this.apiService.generate().subscribe((data: any) => {
      
    });
  }
}
