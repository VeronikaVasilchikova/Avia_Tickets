import { getDropdownInstace } from '../plugins/materialize';

class FavoriteUI {
  constructor(getDropdownInstace) {
    this.dropdownContent = document.querySelector('.dropdown-content');
    this.trigger = document.querySelector('.dropdown-trigger');
    this.dropdownTrigger = getDropdownInstace(this.trigger);
  }

  renderFavorites(favorites) {
    this.dropdownContent.innerHTML = '';
    let fragment = '';

    favorites.forEach(item => {
      const template = FavoriteUI.favoriteTemplate(item);
      fragment += template;
    });
    this.dropdownContent.insertAdjacentHTML('afterbegin', fragment);
  }

  static favoriteTemplate(favorite) {
    return `
    <div class="favorite-item  d-flex align-items-start" data-id="${favorite._id}">
      <img
        src="${favorite.logo}"
        class="favorite-item-airline-img"
      />
      <div class="favorite-item-info d-flex flex-column">
        <div
          class="favorite-item-destination d-flex align-items-center"
        >
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${favorite.origin}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${favorite.destination}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${favorite.departure_at}</span>
          <span class="ticket-price ml-auto">${favorite.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${favorite.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${favorite.flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
          >Delete</a
        >
      </div>
    </div>
    `;
  }
}

const favoriteUI = new FavoriteUI(getDropdownInstace);

export default favoriteUI;
