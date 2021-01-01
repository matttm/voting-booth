import {environment} from '../environments/environment';
import {MatSnackBar} from '@angular/material';

export function handleError(
  snackbar: MatSnackBar,
  errorMap: any,
  status: number,
  cb: any
) {
  let message = errorMap[status];
  if (!message) {
    message = 'Unhandled Error';
  }
  snackbar.open(message, null, {
    duration: environment.snackbarDurationMS,
    panelClass: ['failure-snackbar']
  }).afterDismissed().subscribe(cb);
}
