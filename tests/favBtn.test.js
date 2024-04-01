// eslint-disable-next-line import/no-extraneous-dependencies
import {
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import RestaurantDB from '../src/scripts/data/database';
import LikeButtonInitiator from '../src/scripts/utils/fav-btn-initiator';

describe('Add to Favorite Restaurant', () => {
  const addButtonContainer = () => {
    document.body.innerHTML = '<div id="fav-btn__container" class="w-full"></div>';
  };

  beforeEach(() => {
    addButtonContainer();
  });
  it('should show the add to favorite button, when the resto didnt exist at list fav', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="add to favorite"]')).toBeTruthy();
  });

  it('should not show the delete from favorite button, when the resto didnt exist at list fav', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="delete from favorite"]')).toBeFalsy();
  });

  it('should be able to add favorite resto', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {
        id: 1,
      },
    });

    document.querySelector('#likeBtn').dispatchEvent(new Event('click'));
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    const resto = await RestaurantDB.getResto(1);
    expect(resto).toEqual({ id: 1 });

    await RestaurantDB.deleteResto(1);
  });

  it('should not add a resto again when its already added', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {
        id: 1,
      },
    });

    await RestaurantDB.putResto({ id: 1 });

    document.querySelector('#likeBtn').dispatchEvent(new Event('click'));
    expect(await RestaurantDB.getAllResto()).toEqual([{ id: 1 }]);

    await RestaurantDB.deleteResto(1);
  });

  it('should not add a resto when its has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#fav-btn__container'),
      resto: {},
    });

    document.querySelector('#likeBtn').dispatchEvent(new Event('click'));
    expect(await RestaurantDB.getAllResto()).toEqual([]);
  });
});
