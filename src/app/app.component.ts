import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { PoemCoupletFocusService } from './shared/poem-couplet-focus.service';
import { Stanza } from './shared/stanza.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  showText = false;
  poem: Stanza[] = [
    {
      type: 'couplet',
      line1: '',
      line2: ''
    }
  ];

  constructor(
    private focusService: PoemCoupletFocusService
  ) { }

  ngOnInit() {
    this.focusService.focusedCoupletIndex$.subscribe((coupletIndex) => {
      this.addCoupletIfNone(coupletIndex);
    });
  }

  addCoupletIfNone(coupletIndex: number) {
    if (coupletIndex > this.poem.length - 1) {
      this.addCouplet();
      this.focusService.focusCouplet(coupletIndex);
    }
  }

  addCouplet() {
    const newCouplet = this.createNewCouplet();
    this.poem.push(newCouplet);
  }

  createNewCouplet(): Stanza {
    const newCouplet: Stanza = {
      type: 'couplet',
      line1: '',
      line2: ''
    };
    return newCouplet;
  }

  toggleShowText() {
    this.showText = !this.showText;
  }

  onShowText() {
    this.showText = true;
  }

}
