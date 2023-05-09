import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchKey:string=''
  constructor(activatedRoute:ActivatedRoute,private router:Router){
    activatedRoute.params.subscribe((params=>{
      if(params.searchKey) this.searchKey=params.searchKey;
    }))
  }

  search(key:string){
    if(key=='') this.router.navigateByUrl('/')
    if(key) this.router.navigateByUrl('/search/'+key)
  }

}
