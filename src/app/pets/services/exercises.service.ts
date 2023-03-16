import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Exercise } from "../models/exercise.model";

@Injectable()
export class ExercisesService {
  apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) {}

  getAllExercises(petId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/${petId}/exercises/list`);
  }

  addExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(
      `${this.apiUrl}/${exercise.petId}/exercises`,
      exercise
    );
  }
}
