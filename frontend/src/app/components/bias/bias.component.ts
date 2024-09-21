import { Component } from '@angular/core';

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
}
