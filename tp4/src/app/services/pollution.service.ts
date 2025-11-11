import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pollution } from '../models/pollution.model';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private apiUrl = 'https://templateweb-latest-00ck.onrender.com';
  private pollutions$ = new BehaviorSubject<Pollution[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Pollution[]>(`${this.apiUrl}/api/pollution`).subscribe(data => {
      this.pollutions$.next(data);
    });
  }

  public getPollutions(): Observable<Pollution[]> {
    return this.pollutions$.asObservable();
  }

  public addPollution(pollution: Pollution): void {
    const currentPollutions = this.pollutions$.getValue();
    pollution.id = currentPollutions.length + 1;
    this.pollutions$.next([...currentPollutions, pollution]);
  }

  public getOne(id: number): Observable<Pollution> {
    return this.pollutions$.pipe(
      map(list => list.find(p => p.id === id) as Pollution)
    );
  }

  public updatePollution(id: number, updated: Pollution): void {
    const pollutions = this.pollutions$.getValue();
    const index = pollutions.findIndex(p => p.id === id);

    if (index !== -1) {
      pollutions[index] = { ...updated, id };
      this.pollutions$.next([...pollutions]);
    }
  }

  public deletePollution(id: number): void {
    const pollutions = this.pollutions$.getValue();
    const newList = pollutions.filter(p => p.id !== id);
    this.pollutions$.next(newList);
  }


}
