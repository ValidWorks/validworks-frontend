import React, { useEffect, memo } from 'react';

const withPageTitle = (title, Component) => () => {
  const Memoized = memo(Component);

  useEffect(() => {
    document.title = title;
  }, []);
  return <Memoized />;
};

export default withPageTitle;