import {showModal} from './modal';

export function showWinnerModal(fighter) {

  const modal = {
    title: 'Win!',
    bodyElement: fighter.name
  }
  showModal(modal);

}
