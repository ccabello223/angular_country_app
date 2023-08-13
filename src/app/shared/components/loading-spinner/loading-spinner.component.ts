import { Component } from '@angular/core';

@Component({
  selector: 'shared-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styles: [
    `
      .spinner-container{
        align-items:center;
        background-color: black;
        border-radius: 20px;
        bottom: 15px;
        color: white;
        display: flex;
        padding: 5px 10px;
        position: fixed;
        right: 15px;
      }

      span{
        margin-left: 5px;
      }
    `
  ]
})
export class LoadingSpinnerComponent {

}
