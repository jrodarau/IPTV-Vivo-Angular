import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function(){
        $('.modal').modal();
      });
  }

}
