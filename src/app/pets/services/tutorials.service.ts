import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TutorialCategory } from "../models/tutorial-category.model";
import { Tutorial } from "../models/tutorial.model";

@Injectable()
export class TutorialsService {
  apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) {}

  getTutorialsByCategory(
    petId: number,
    category: TutorialCategory
  ): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(
      `${this.apiUrl}/${petId}/tutorials?tutorialCategory=${category}`
    );
  }
}
