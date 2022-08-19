export type ToastProps = {
  toastOpen: boolean;
  toastMessage: string;
  toastSeverity: 'success' | 'error';
  handleToastClose: () => void;
};
