import { Component, Input } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bias',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './bias.component.html',
  styleUrl: './bias.component.scss'
})
export class BiasComponent {
  @Input() data: string = "";

  constructor(
    private apiService: ApiService
  ) {
  }

  /**
   * 
   * @param event 
   */
  public inputValidator(event: any) {
    const pattern = /^[a-z]/;   
    if (!pattern.test(event.target.value)) {
      // invalid character, prevent input
      event.target.value = event.target.value.replace(/[^a-z]/g, "");

    }    
  }

  /**
   * 
   * @param event 
   */
  public inputKeypress(event: any) {
    if (event.key === "Enter") {
      event.target.blur();
      event.preventDefault();
      this.apiService.setBias(this.data).subscribe((data: any) => {
        this.data = "";
      });
    }  
  }
}
