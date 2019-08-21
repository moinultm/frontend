
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Injectable({
  providedIn: 'root'
})

export class CommonService {

constructor(private modalService: NgbModal) {}

public openModal(content:any) {
  return this.modalService.open(content);
}




}
