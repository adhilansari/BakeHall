import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  @Input() visible:boolean=false
  @Input() notFoundMessage:string='Nothing Found!'
  @Input() resentLinkText:string='Reset'
  @Input() resetLinkRoute:string='/'
}
