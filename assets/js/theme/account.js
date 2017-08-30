import CoreAccount from './core/Account';
import SelectWrapper from './global/select-wrapper';

export default class Account extends CoreAccount {
  selectWrapCallback($selectEl) {
    new SelectWrapper($selectEl);
  }
}
