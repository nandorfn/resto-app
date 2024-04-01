// eslint-disable-next-line import/no-extraneous-dependencies
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import RestaurantDB from '../src/scripts/data/database';
import LikeButtonInitiator from '../src/scripts/utils/fav-btn-initiator';

describe('Delete Favorite Restaurants', () => {
  const addButtonContainer = () => {
    document.body.innerHTML = '<div id="fav-btn__container" class="w-full"></div>';
  };

  beforeEach(async () => {
    addButtonContainer();
    await RestaurantDB.putResto({ id: 1 });
  });

  afterEach(async () => {
    await RestaurantDB.deleteResto(1);
  });

  it('should display delete from favorites= btn when its added', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="delete from favorite"]')).toBeTruthy();
  });
  it('should not display delete from favorites btn when its has been added', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="add to favorite"]')).toBeFalsy();
  });

  it('should be able to remove favorite restaurant', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {
        id: 1,
      },
    });

    document.querySelector('[aria-label="delete from favorite"]').dispatchEvent(new Event('click'));

    expect(await RestaurantDB.getAllResto()).toEqual([]);
  });

  it('shouldnt throw an error when user click delete from fav. if its restaurant isnt in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {
        id: 1,
      },
    });
    await RestaurantDB.deleteResto(1);
    document.querySelector('[aria-label="delete from favorite"]').dispatchEvent(new Event('click'));

    expect(await RestaurantDB.getAllResto()).toEqual([]);
  });
});
