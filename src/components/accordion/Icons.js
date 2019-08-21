import React, { Fragment, memo } from 'react';
import { OpenIcon, CloseIcon } from './styles/main';

const Icons = memo(({
  isSelected
}) => {
  return (
    <Fragment>
      <OpenIcon hidden={isSelected} role="img" viewBox="0 0 20 20">
        <use xlinkHref="#show-more"/>
      </OpenIcon>
      <CloseIcon hidden={!isSelected} role="img" viewBox="0 0 20 4">
        <use xlinkHref="#show-less"/>
      </CloseIcon>
    </Fragment>
  );
});

export default Icons;
