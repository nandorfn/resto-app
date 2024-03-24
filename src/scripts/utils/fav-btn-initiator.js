import { LikeButton, LikedButton } from '../../components/molecules/fav-btn';
import RestaurantDB from '../data/database';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;
    console.log(this._likeButtonContainer);
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const resto = await RestaurantDB.getResto(id);
    return !!resto;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = LikeButton();
    console.log(this._likeButtonContainer);

    try {
      const likeButton = this._likeButtonContainer.querySelector('#likeBtn');
      likeButton?.addEventListener('click', async () => {
        await RestaurantDB.putResto(this._resto);
        this._renderButton();
      });
    } catch (error) {
      console.log(error);
    }
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = LikedButton();
    try {
      const likeButton = this._likeButtonContainer.querySelector('#likedBtn');
      likeButton?.addEventListener('click', async () => {
        await RestaurantDB.deleteResto(this._resto.id);
        this._renderButton();
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default LikeButtonInitiator;
