import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-add-utilisateur',
  imports: [ReactiveFormsModule],
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent {
  utilisateurForm: FormGroup;

  constructor(private fb: FormBuilder, private utilisateurService: UtilisateurService, private router: Router) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.utilisateurForm.valid) {
      this.utilisateurService.addUtilisateur(this.utilisateurForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Erreur lors de la création de l\'utilisateur: ' + err.message);
        }
      });
    }
  }
}
