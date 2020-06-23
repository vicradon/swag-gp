import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

export const MediaQueryContext = React.createContext();
export const useMedia = () => React.useContext(mediaQueryContext);

const MediaQueryProvider = ({ children }) => {
  const initialState = {
    sm: false,
    md: false,
    lg: false,
    xl: false
  };
  const [state, setState] = React.useState(initialState);
  return (
    <MediaQueryContext.Provider
      value={state}
    >
      <Media
        queries={{
          // sm: '(max-width: 480px)',
          // md: '(max-width: 768px)',
          // lg: '(max-width: 992px)',
          // xl: '(max-width: 1200px)'
          sm: { maxWidth: 480 },
          md: { maxWidth: 768 },
          lg: { maxWidth: 992 },
          xl: { maxWidth: 1200 }
        }}
      >
        {(matches) => {
          if (matches.sm) {
            setState({ ...initialState, sm: true });
          } else if (matches.md) {
            setState({ ...initialState, md: true });
          } else if (matches.lg) {
            setState({ ...initialState, lg: true });
          } else if (matches.xl) {
            setState({ ...initialState, xl: true });
          }
          return {children}
        }}
      </Media>
    </MediaQueryContext.Provider>
  );
};

MediaQueryProvider.propTypes = {
  children: PropTypes.array
};

export default MediaQueryProvider;
