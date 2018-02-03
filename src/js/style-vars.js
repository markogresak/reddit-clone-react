export const defaultTextColor = '#111';
export const voteDefaultColor = '#C6C6C6';
export const voteUpColor = '#FF8B60';
export const voteDownColor = '#9494FF';
export const mutedTextColor = '#888';
export const linkColor = '#0074D9';
export const textBlockBackground = '#f7f7f7';
export const textBlockBorder = '#DDD';
export const dangerColor = '#e53935';
export const successColor = '#7CB342';
export const defaultBorderColor = '#E0E0E0';

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

export const ratingButtonsWidth = 50;
export const ratingButtonsTextSpacing = 6;

export const contentWidth = 960;
