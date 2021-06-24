import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  api_url = 'http://localhost:4000/get_weather'
  title = 'weather-app';
  submitted = false;
  formStatus = true;
  angForm: FormGroup;
  responseApi: any;
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  };
  
  createForm() {
    this.angForm = this.fb.group({
       cityName: ['', Validators.required ],
	   language: ['', Validators.required ]
    });
  };
  
  ngOnInit(): void {};
  
  onSubmit(){
	this.submitted = true;  
    if (this.angForm.invalid) {
	  this.formStatus = false;	
      return;
    }
	
	this.formStatus = true;	
	const controls = this.angForm.controls;  
	
	var global = this;
	$.get(this.api_url+'?cityName='+controls.cityName.value+'&language='+controls.language.value,function(data){
		
		let view_data = JSON.parse(data);
		global.responseApi = view_data
		console.log('this.responseApi',global.responseApi);
	});
  };
}
