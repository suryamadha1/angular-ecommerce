import { Component, OnInit } from '@angular/core';
import { debounceTime, from, fromEvent, interval, map, mergeMap, of, take, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-practice-operators',
  templateUrl: './practice-operators.component.html',
  styleUrls: ['./practice-operators.component.css']
})
export class PracticeOperatorsComponent implements OnInit {
  // map
  constructor(){}
  arr = [1,2,3];
  fromArr$ = from(this.arr);
  ngOnInit(): void {
    this.mergeMapOp()
    // this.mapOperator();
    // this.debounceTimeOperator();
  }

  mapOperator(){
    console.log('map example')
    this.fromArr$ = this.fromArr$.pipe(map(val => val*10))
    this.fromArr$.subscribe((val) => console.log(val))
  }

  mergeMapOp(){
    const letters = of('a', 'b', 'c');
    const timer$ = timer(5000);
    const result = letters.pipe(
      mergeMap(x => interval(1000).pipe(map(i => x+i))),
      takeUntil(timer$)
    );
    result.subscribe(x => console.log(x));
  }

}
