import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PollutionService } from '../services/pollution.service';
import { switchMap } from 'rxjs';
import { Pollution } from '../models/pollution.model';

@Component({
  selector: 'app-edit-pollution',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-pollution.component.html',
  styleUrls: ['./edit-pollution.component.css']
})
export class EditPollutionComponent {
  pollutionForm: FormGroup;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pollutionService: PollutionService) {
    this.pollutionForm = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      lieu: ['', Validators.required],
      latitude: [
        null,
        [Validators.required, Validators.min(-90), Validators.max(90)]
      ],
      longitude: [
        null,
        [Validators.required, Validators.min(-180), Validators.max(180)]
      ],
      photo: ['']
    });
  }

  id!: number;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.id = Number(params.get('id'));
        return this.pollutionService.getOne(this.id);
      })
    ).subscribe(pollution => {
      this.pollutionForm.patchValue(pollution!);
    });
  }

  onSubmit(): void {
    this.pollutionService.updatePollution(this.id, this.pollutionForm.value as Pollution);
    this.router.navigate(['/pollutions']);
  }
}
