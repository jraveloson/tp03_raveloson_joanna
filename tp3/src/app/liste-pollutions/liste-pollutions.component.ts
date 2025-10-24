import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PollutionService } from '../services/pollution.service';
import { Pollution } from '../models/pollution.model';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { TypePipe } from '../type.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-pollutions',
  standalone: true,
  templateUrl: './liste-pollutions.component.html',
  styleUrls: ['./liste-pollutions.component.css'],
  imports: [CommonModule, RouterLink, TypePipe, FormsModule]
})
export class ListePollutionsComponent implements OnInit {
  pollutions$!: Observable<Pollution[]>;
  selectedType: string = '';

  constructor(private pollutionService: PollutionService, private router: Router) { }

  ngOnInit(): void {
    this.pollutions$ = this.pollutionService.getPollutions();
  }

  public addPollution(pollution: Pollution): void {
    this.pollutionService.addPollution(pollution);
  }

  delete(id: number) {
    this.pollutionService.deletePollution(id);
    this.router.navigate(['/pollutions']);
  }

}