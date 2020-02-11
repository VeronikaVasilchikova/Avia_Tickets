import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';
import favoriteUI from './views/favorite';

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  const form = formUI._form;
  const ticket = ticketsUI.container;
  let objOfFavorite;

  if(localStorage.getItem('newObj')) {
    objOfFavorite = JSON.parse(localStorage.getItem('newObj'));
  } else {
    objOfFavorite = {};
  }

  favoriteUI.renderFavorites(Object.values(objOfFavorite));

  // Events
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  ticket.addEventListener('click', e => {
    const obj = {};
    if(e.target.className.includes('add-favorite')) {
      e.preventDefault();
      let array = e.target.parentNode.children;
      obj._id = e.target.parentNode.dataset.id;
      obj.logo = array[0].children[0].src;
      obj.origin = array[1].children[0].children[0].textContent;
      obj.destination = array[1].children[1].children[1].textContent;
      obj.departure_at = array[2].children[0].textContent;
      obj.price = array[2].children[1].textContent;
      obj.transfers = array[3].children[0].textContent.split(': ')[1];
      obj.flight_number = array[3].children[1].textContent.split(': ')[1];
      objOfFavorite[obj._id] = obj;
      localStorage.setItem('newObj', JSON.stringify(objOfFavorite));
      favoriteUI.renderFavorites(Object.values(objOfFavorite));
    }
  });

  favoriteUI.dropdownContent.addEventListener('click', onDeleteHandler);

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });
    ticketsUI.renderTickets(locations.lastSearch);
  }

  function deleteTicket(id) {
    const isConfirm = confirm('Are you sure you want to delete this ticket?');
    if(!isConfirm) return isConfirm;
    delete objOfFavorite[id];
    localStorage.setItem('newObj', JSON.stringify(objOfFavorite));
    return isConfirm;
  }

  function deleteTicketFromHtml(confirmed, el) {
    if(!confirmed) return;
    el.remove();
  }

  function onDeleteHandler({ target }) {
    if(target.classList.contains('waves-effect')) {
      const parent = target.closest('[data-id]');
      const id = parent.dataset.id;
      const confirmed = deleteTicket(id);
      deleteTicketFromHtml(confirmed, parent);
    }
  }
});