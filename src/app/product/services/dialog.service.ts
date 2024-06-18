import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private showDialogSource = new Subject<any>();
  showDialog$ = this.showDialogSource.asObservable();

  private hideDialogSource = new Subject<void>();
  hideDialog$ = this.hideDialogSource.asObservable();

  constructor() { }

  showDialog(title: string, message: string) {
    this.showDialogSource.next({ title, message });
  }

  hideDialog() {
    this.hideDialogSource.next();
  }
}
