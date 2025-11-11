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

  deletePollution(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette pollution ?')) {
      this.pollutionService.deletePollution(id).subscribe({
        next: () => {
          this.pollutions$ = this.pollutionService.getPollutions();
        },
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }
}

