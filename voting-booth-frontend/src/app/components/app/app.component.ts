import { Component } from '@angular/core';
import {CandidacyService} from '../../services/candidacy/candidacy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Voting Booth';

  /**
   * The dependency injection of candidacy service is a way of
   * emulating an eager loading, as services are lazily loaded
   * by default.
   *
   * The APP_INITIALIZER token can be used, but to me, this method
   * is superior because of it's conforming appearance to the
   * rest of the framework
   *
   * @param candidacyService service responsible for populating candidate
   *   data
   */
  constructor(private candidacyService: CandidacyService) {}
}
