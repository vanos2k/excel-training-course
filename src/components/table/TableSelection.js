export class TableSelection {
  static selectedClassName = 'selected';
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.group.push($el);
    $el.focus().addClass(TableSelection.selectedClassName);
    this.current = $el;
    return this;
  }

  deSelect() {
    this.group.forEach(el => el.removeClass(TableSelection.selectedClassName));
    this.group = [];
    return this;
  }

  selectGroup($group = []) {
    this.group = $group;
    this.group.forEach($el => $el.addClass(TableSelection.selectedClassName));
  }
}
