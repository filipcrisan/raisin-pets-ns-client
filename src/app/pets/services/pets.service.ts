import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pet } from "../models/pet.model";
import { TutorialCategory } from "../models/tutorial-category.model";
import { Tutorial } from "../models/tutorial.model";

@Injectable()
export class PetsService {
  apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) {}

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/list`);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  editPet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(this.apiUrl, pet);
  }

  deletePet(id: number): Observable<Pet> {
    return this.http.delete<Pet>(`${this.apiUrl}/${id}`);
  }

  getTutorialsByCategory(
    petId: number,
    category: TutorialCategory
  ): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(
      `${this.apiUrl}/${petId}/tutorials?tutorialCategory=${category}`
    );
  }
}
