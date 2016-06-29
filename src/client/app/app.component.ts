import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'sd-app',
  moduleId: module.id,
  viewProviders: [HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {}
