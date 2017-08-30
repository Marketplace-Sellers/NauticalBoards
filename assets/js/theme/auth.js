import CoreAuth from './core/Auth';
import SelectWrapper from './global/select-wrapper';

export default class Auth extends CoreAuth {
  selectWrapCallback($selectEl) {
    new SelectWrapper($selectEl);
  }
}
