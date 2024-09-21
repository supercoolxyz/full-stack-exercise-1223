import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';

import { BiasComponent } from './components/bias/bias.component';
import { GenerateComponent } from './components/generate/generate.component';
import { GridComponent } from './components/grid/grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    BiasComponent,
    GenerateComponent,
    GridComponent
  ],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  grid: Array<string> | undefined;
  code: string | undefined;

  private updateHandle: any = null;

  constructor(
    private apiService: ApiService
  ) {
  }

  /**
   * 
   */
  ngOnInit() {
    this.updateHandle = setInterval(this.update.bind(this), 1000);    
    this.update();
  }

  /**
   * 
   */
  ngOnDestroy() {
    clearInterval(this.updateHandle);
  }

  /**
   * 
   */
  private update(): void {
    this.apiService.getGrid().subscribe((data: Array<string>) => {
      this.grid = data;
    });

    this.apiService.getCode().subscribe((data: string) => {
      this.code = data;
    });

  }
}

