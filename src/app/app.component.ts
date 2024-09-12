import { Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { RegisterComponent } from 'src/accounts/register/register.component';
// import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private _resolve: ComponentFactoryResolver, private _injector: Injector) {}
  ngOnInit() {
    const factory = this._resolve.resolveComponentFactory(RegisterComponent);
    const component = factory.create(this._injector);
    component.instance.text = 'Custom text';
    component.changeDetectorRef.detectChanges();

    // const swal = require('sweetalert');
    // swal({
    //   content: component.location.nativeElement
    // }).then(() => {
    //   component.destroy();
    // });
    
  }
  
  title = 'angular-ekart';
  
}

