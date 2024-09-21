import { Component } from '@angular/core';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-bias',
  standalone: true,
  imports: [

  ],
  templateUrl: './bias.component.html',
  styleUrl: './bias.component.scss'
})
export class BiasComponent {
  public bias: string = "";

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
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter" && this.bias.length === 1) {
      // Cancel the default action, if needed
      event.preventDefault();
      this.apiService.setBias(this.bias);
    }  
  }
}
