// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
import { LikeButton, LikedButton } from '../../components/molecules/fav-btn';
import RestaurantDB from '../data/database';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;
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
    const likeButton = this._likeButtonContainer.querySelector('#likeBtn');
    likeButton.addEventListener('click', async () => {
      try {
        await RestaurantDB.putResto(this._resto);
        this._renderButton();
      } catch (error) {
        Swal.fire({
          text: 'Failed added to favorites list',
          position: 'top-right',
          showConfirmButton: false,
          toast: true,
          icon: 'error',
          timer: 2000,
        });
      }
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = LikedButton();
    const likeButton = this._likeButtonContainer.querySelector('#likedBtn');
    likeButton?.addEventListener('click', async () => {
      try {
        await RestaurantDB.deleteResto(this._resto.id);
        this._renderButton();
      } catch (error) {
        Swal.fire({
          text: 'Failed to delete from favorites list',
          position: 'top-right',
          showConfirmButton: false,
          toast: true,
          timer: 2000,
          icon: 'error',
        });
      }
    });
  },
};

export default LikeButtonInitiator;
