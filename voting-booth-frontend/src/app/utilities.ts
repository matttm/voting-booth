import {environment} from '../environments/environment';
import {MatSnackBar} from '@angular/material';

/**
 * Open a snackbar styled to be failure
 *
 * @param snackbar the snackbar object
 * @param errorMap object whose entries map statuses to message be
 * displayed in the snackbar
 * @param status status returned from the error
 * @param cb function to be called after the snackbar opens
 */
export function openFailureSnackbar(
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
  }).afterOpened().subscribe(cb);
}

/**
 * Open a snackbar styled to be success
 *
 * @param snackbar the snackbar object
 * @param message text to be displayed in the snackbar
 * @param cb function to be called after snackbar is opened
 */
export function openSuccessSnackbar(
  snackbar: MatSnackBar,
  message: string,
  cb: any
) {
  snackbar.open(message, null, {
    duration: environment.snackbarDurationMS,
    panelClass: ['success-snackbar']
  }).afterOpened().subscribe(cb);
}
