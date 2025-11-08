import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  imports: [JsonPipe, ReactiveFormsModule],
  selector: 'app-home',
  standalone: true,
  templateUrl: '../sections.home.html',
})
export class HomeComponent{
  emailForm: FormGroup = this.fb.group({
    name: '',
    email: '',
    title: ''
  });
  constructor(private fb: FormBuilder) {
  }

  isSending = false;

  submit() {
    emailjs.init('8PEIfE1PrNOrjAz47');
    const serviceID = 'service_0ny1wlr';   
    const templateID = 'template_hr0jkws'; 

    emailjs.send(serviceID, templateID, {
      name: this.emailForm.value.name,
      email: this.emailForm.value.email,
      title: this.emailForm.value.title
    }).then(() => {
      this.isSending = false;
      alert('✅ Email Sent Successfully!');
      this.emailForm =  this.fb.group({name: '',email: '', title: ''});
    }).catch((err) => {
      this.isSending = false;
      alert('❌ Failed to send: ' + JSON.stringify(err));
    });
  }
}