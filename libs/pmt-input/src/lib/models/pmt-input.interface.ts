export type PmtFormControlType =
  | 'text'
  | 'tel'
  | 'number'
  | 'email'
  | 'checkbox'
  | 'list';

export type PmtInputType = Omit<PmtFormControlType, 'checkbox' | 'list'>;
