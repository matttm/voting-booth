import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

function handleError(err: HttpErrorResponse, snackbar: MatSnackBar) {
  let message = '';
  const status = err.status;
  if (status === 503) {
    message = 'We are experiencing difficulties';
  } else if (status === 401) {
    message = 'Login before voting';
  }
  snackbar
    .open(message, null, {duration: 6000})
    .afterDismissed().subscribe(() => this.form.reset());
}
