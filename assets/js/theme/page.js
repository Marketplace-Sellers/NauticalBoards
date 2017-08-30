import $ from 'jquery';

import PageManager from '../pageManager';
import 'vanilla-fitvids/jquery.fitvids';

export default class Page extends PageManager {
  constructor() {
    super();
    $('.rte').fitVids();
  }
}
