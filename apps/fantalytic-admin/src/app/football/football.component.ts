import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { PositionTypes } from '@pmt/fantalytic-shared';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'pmt-football',
  standalone: true,
  imports: [
    CommonModule, 
    MatStepperModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.scss'],
})
export class FootballComponent implements OnInit {

  positionForm!: FormGroup;
  fileForm!: FormGroup;
  readonly POSITIONS = PositionTypes;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
      this.positionForm = this._fb.group({
        positionType: [null, Validators.required]
      });
      this.fileForm = this._fb.group({
        file: [null, Validators.required]
      });
  }
}
