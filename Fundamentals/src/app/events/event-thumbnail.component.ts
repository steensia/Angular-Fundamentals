import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'event-thumbnail',
    template: `
        <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
            <h2>{{event?.name}}</h2>
            <div>Date: {{event?.date}}</div>
            <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
                Time: {{event?.time}}
                <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
                <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
                <span *ngSwitchDefault>(Normal Start)</span>
            </div>
            <div>Price: \${{event?.price}}</div>
            <div *ngIf="event?.location">
                <span>Location: {{event?.location?.address}}</span>
                <span class="pad-left"> {{event?.location?.city}}, {{event?.location?.country}}</span>
            </div>
            <div  *ngIf="event?.onlineUrl"> 
                Online URL: {{event?.onlineUrl}} 
            </div>
        </div>
    `,
    styles: [`
        .thumbnail { min-height: 210px; }
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
    `]
})

export class EventThumbnailComponent {
    @Input() event:any

    // getStartTimeClass(){
    //     Option #1
    //     const isEarlyStart = this.event && this.event.time === '8:00 am'
    //     return {green: isEarlyStart, bold: isEarlyStart}

    //     Option #2
    //     if(this.event && this.event.time === '8:00 am')
    //         return 'green bold'
    //     return ''

    //     Option #3
    //     if(this.event && this.event.time === '8:00 am')
    //         return ['green', 'bold']
    //     return []

    //     Option #4
    //     return this.event && this.event.time === '8:00 am' ? 'green bold' : ''

    //     Option #5
    //     return this.event && this.event.time === '8:00 am' ?  {color: '#003300', 'font-weight': 'bold' } : {}
    // }
    
    getStartTimeStyle(){
        // Option #1
        // if(this.event && this.event.time === '8:00 am')
        //     return { color: '#00300', 'font-weight': 'bold' }
        // return {}

        // Option #2
        return this.event && this.event.time === '8:00 am' ?  {color: '#003300', 'font-weight': 'bold' } : {}
    }
}
