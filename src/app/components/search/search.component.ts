import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private router: Router){}

  doSearch(value: string){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
  debounceTimeOperator(){
    let searchBox = document.getElementById('search')!;

    let keyup$ = fromEvent(searchBox, 'keyup');

    keyup$
    .pipe(
      map((i:any) => i.currentTarget.value),
      debounceTime(500)
    )
    .subscribe(console.log)
  }
  ngOnInit(): void {
    this.debounceTimeOperator()
  }
}
