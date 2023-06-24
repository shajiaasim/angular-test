import 'zone.js/dist/zone';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  BehaviorSubject,
  debounceTime,
  fromEvent,
  map,
  Observable,
  of,
} from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <br>

    <button #button> Click </button>

    <div>
      <input #text/>
    </div>

  `,
})
export class App {
  name = 'Angular';

  @ViewChild('button', { static: true }) button: ElementRef;
  @ViewChild('text', { static: true }) text: ElementRef;

  observable = of(1, 3, 3);

  observable2 = new Observable<string>((subscriber) => {
    subscriber.next('hi');
    subscriber.next('bye');
    subscriber.next('no');
  });

  subject = new BehaviorSubject<string>('');

  observer = {
    next: (x: any) => {
      console.log(x);
    },
  };

  ngOnInit() {
    this.subject.next('subject');
    this.subject.next('subject2');

    this.observable.subscribe(this.observer);
    this.observable2.subscribe(this.observer);
    this.subject.subscribe(this.observer);
  }

  ngAfterViewInit() {
    console.log(this.button);
    fromEvent<any>(this.button.nativeElement, 'click')
      .pipe(map((event) => event.target))
      .subscribe((res) => console.log(res));

    fromEvent<any>(this.text.nativeElement, 'keyup')
      .pipe(map((event) => event.target))
      .subscribe((res) => console.log(res));
  }
}

bootstrapApplication(App);
