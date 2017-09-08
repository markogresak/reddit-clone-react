export const voteDefaultColor = '#C6C6C6';
export const voteUpColor = '#FF8B60';
export const voteDownColor = '#9494FF';
export const mutedTextColor = '#888';
export const linkColor = '#0074D9';

export function getColorBasedOnRating(userRating) {
  if (userRating === 0) {
    return voteDefaultColor;
  }
  return userRating > 0 ? voteUpColor : voteDownColor;
}

export const textSmSize = 12;
export const textXsSize = 10;

export const postsListSpacing = 20;
export const postHeight = 50;
export const postSpacing = 15;

export const postRatingWidth = 50;
export const postRatingTextSpacing = 6;
