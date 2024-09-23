import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BiasComponent } from './../../components/bias/bias.component';
import { CodeComponent } from './../../components/code/code.component';
import { GenerateComponent } from './../../components/generate/generate.component';
import { GridComponent } from './../../components/grid/grid.component';

import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-generator-page',
  standalone: true,
  imports: [
    FormsModule,
    BiasComponent,
    CodeComponent,
    GenerateComponent,
    GridComponent
  ],
  templateUrl: './generator-page.component.html',
  styleUrl: './generator-page.component.scss'
})
export class GeneratorPageComponent {
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
