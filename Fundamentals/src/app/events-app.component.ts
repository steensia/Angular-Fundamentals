import { Component } from '@angular/core';

@Component({
  selector: 'events-app',
  template: `
    <navbar></navbar>
    <events-list></events-list>
  `
})
export class EventsAppComponent {
  title = 'ng-fundamentals';
}
