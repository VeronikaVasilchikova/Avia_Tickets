import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Init select
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelectInstace(elem) {
  return M.FormSelect.getInstance(elem);
}

// Init Autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstace(elem) {
  return M.Autocomplete.getInstance(elem);
}

// Init Date picker
const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {
  showClearBtn: true,
  format: 'yyyy-mm',
});

export function getDatepickerInstace(elem) {
  return M.Datepicker.getInstance(elem);
}

// Init Dropdown
var dropdownTrigger = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(dropdownTrigger);

export function getDropdownInstace(elem) {
  return M.Dropdown.getInstance(elem);
}