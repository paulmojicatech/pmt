import { PmtFormControlType } from '../../pmt-simple-form/models/pmt-simple-form.interface';

export type PmtInputType = Omit<PmtFormControlType, 'checkbox' | 'list'>;
