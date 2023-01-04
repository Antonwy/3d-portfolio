const customStyles = {
  colors: {
    background: '#0c0b0c',
    primary: '#E08700',
  },
};

export const backgroundColor = customStyles.colors.background;
export const primaryColor = customStyles.colors.primary;

export const setOpacity = (hex, alpha) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, '0')}`;
