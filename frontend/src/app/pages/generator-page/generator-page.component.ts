import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { BiasComponent } from './../../components/bias/bias.component';
import { CodeComponent } from './../../components/code/code.component';
import { GenerateComponent } from './../../components/generate/generate.component';
import { GridComponent } from './../../components/grid/grid.component';

import { ApiService } from './../../../services/api.service';
import { WebSocketService } from '../../../services/web-socket.service';

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
  grid: Array<string> = [];
  code: string = "";
  bias: string = "";

  private updateHandle: any = null;
  private updatePage: Subscription | undefined;

  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService
  ) {
  }

  /**
   * 
   */
  ngOnInit() {
    this.updatePage = this.webSocketService.ebUpdateGeneratorPage.subscribe((data: any) => {
      this.grid = data.grid;
      this.code = data.code;
    });

    this.updateHandle = setInterval(this.update.bind(this), 1000);
    this.update();
  }

  /**
   * 
   */
  ngOnDestroy() {
    if(this.updatePage) {
      this.updatePage.unsubscribe();
    }

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
