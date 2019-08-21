import React, { Fragment, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { mainTheme } from './styles/theme';
import { TabButton } from './styles/main';
import Panel from './Panel';
import Tab from './Tab';
import Icons from './Icons';


function getInitialState(props) {
  const { active, config } = props;
  const initialState = {};

  if (active !== null){
    const index = isNaN(active) ? parseInt(active, 10) : active;

    if (index <= config.context.accordions.length && index >= 0){
      initialState[index] = true;
      initialState.tab = index;
    }
  }

  return initialState;
}

export default function Accordion(props) {
  const { multiple, collapsible } = props;
  const [openSections, setOpenSections] = useState(() => getInitialState(props));

  const tabs = [];
  const isMultiple = multiple === 'true' || multiple === true;
  let isCollapsible = collapsible === 'true' || collapsible === true;

  if (isMultiple) isCollapsible = true;

  function onTabClick(e, i, isSelected) {
    const { open, close } = props;
    const panel = document.querySelector(`[aria-labelledby="${e.nativeEvent.target.id}"]`);

    if (isMultiple) {
      setOpenSections({
        ...openSections,
        [i]: !isSelected,
        tab: i
      });
    } else {
      if (openSections[i] !== isSelected){
        setOpenSections({
          [i]: !isSelected,
          tab: i
        });
      }
    }

    if (!isSelected) {
      if (open) open(e, panel);
    } else {
      if (isCollapsible) {
        if (close) close(e, panel);
      }
    }
  }

  function onKeyDown(e) {
    const key = e.key;

    switch (key) {
    case 'ArrowUp':
    case 'ArrowDown':
      const index = tabs.indexOf(e.target);
      const direction = (key === 'ArrowDown' || key === 'PageDown') ? 1 : -1;
      const length = tabs.length;
      const newIndex = (index + length + direction) % length;

      tabs[newIndex].focus();

      e.preventDefault();
      break;
    case 'Home':
    case 'End':
      const nextIndex = (key === 'Home') ? 0 : tabs.length - 1;

      tabs[nextIndex].focus();

      e.preventDefault();
      break;
    }
  }

  const accordions = props.config.context.accordions.map((data, i) => {
    const titleId = `accordion-title-${data.uuidContent}`;
    const panelId = `accordion-panel-${data.uuidTab}`;
    const isSelected = !!openSections[i];
    const isDisabled = !isCollapsible && isSelected;

    const panelData = {
      panelId,
      titleId,
      isSelected,
      content: data.content
    };

    return (
      <Fragment key={i}>
        <Tab isSelected={isSelected}>
          <TabButton
            onKeyDown={e => onKeyDown(e)}
            onClick={e => onTabClick(e, i, isSelected)}
            id={titleId}
            disabled={data.disabled}
            ref={el => {
              if (el) tabs.push(el);
            }}
            aria-expanded={isSelected}
            aria-disabled={isDisabled}
            aria-controls={panelId}
            type="button">

            <span dangerouslySetInnerHTML={{ __html: data.title }} />

            <Icons isSelected={isSelected} />
          </TabButton>
        </Tab>

        <Panel {...panelData} />
      </Fragment>
    )
  });

  return (
    <ThemeProvider theme={mainTheme}>
      <Fragment>
        { accordions }
      </Fragment>
    </ThemeProvider>
  );
}

Accordion.defaultProps = {
  open: null,
  close: null,
  multiple: false,
  collapsible: false
};

Accordion.propTypes = {
  config: PropTypes.object.isRequired,
  open: PropTypes.func,
  close: PropTypes.func,
  multiple: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  collapsible: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};
