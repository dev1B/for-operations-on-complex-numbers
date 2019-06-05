import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Complex } from 'mathjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  result: string;
  operation: '+' | '-' | '*' | '/' = '+';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      'real-part-1': ['', Validators.required],
      'imaginary-part-1': ['', Validators.required],
      'real-part-2': ['', Validators.required],
      'imaginary-part-2': ['', Validators.required],
    });
    this.form.valueChanges.subscribe(() => this.calc());
  }

  onChangeSelect() {
    this.calc();
  }

  calc() {
    if (this.form.valid) {
      const a: Complex = math.complex({
        re: this.form.controls['real-part-1'].value,
        im: this.form.controls['imaginary-part-1'].value,
      } as any);
      const b: Complex = math.complex({
        re: this.form.controls['real-part-2'].value,
        im: this.form.controls['imaginary-part-2'].value,
      } as any);

      let result;

      switch (this.operation) {
        case '+': {
          result = math.add(a, b);
          break;
        }
        case '-': {
          result = math.subtract(a, b);
          break;
        }
        case '*': {
          result = math.multiply(a, b);
          break;
        }
        case '/': {
          result = math.divide(a, b);
          break;
        }
      }
      this.result = result.format();
    } else {
      this.result = '';
    }
  }

}
