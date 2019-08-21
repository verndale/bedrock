import React, { memo } from 'react';
import { PanelContent, PanelText } from './styles/main';

const Panel = memo(({
  panelId,
  isSelected,
  titleId,
  content
}) => {
  return (
    <PanelContent
      id={panelId}
      role="tabpanel"
      hidden={!isSelected}
      aria-labelledby={titleId}>

      <PanelText dangerouslySetInnerHTML={{ __html: content }} />
    </PanelContent>
  );
});

export default Panel;
