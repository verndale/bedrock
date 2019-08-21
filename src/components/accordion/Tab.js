import React, { memo } from 'react'
import { TabContainer, TabTitle } from './styles/main';

const Tab = memo(({
  children,
  isSelected
}) => {
  return (
    <TabContainer role="tab" aria-selected={isSelected}>
      <TabTitle>
        { children }
      </TabTitle>
    </TabContainer>
  )
});

export default Tab;
