import styled, { keyframes } from 'styled-components';
import { font, palette, size } from 'styled-theme';
import { generateMedia } from 'styled-media-query';

const mq = generateMedia({
  mobile: '320px',
  tablet: '740px',
  desktop: '980px',
  wide: '1300px'
});

const TabButton = styled.button`
    display: flex;
    width: 100%;
    padding: 20px;
    outline: 0;
    text-align: left;
    align-items: center;
    justify-content: space-between;
    transition: color 0.3s ease, border-color 0.6s ease;
    border: 1px solid transparent;
    background: ${palette('grayscale', 2)};
    color: ${palette('grayscale', 1)};
    font-family: ${font('primary')};
    border-radius: ${size('tabRadius')};
    box-shadow: ${size('tabShadow')};
    font-weight: ${font('tabFontWeight')};

    &:hover,
     &:focus {
       color: ${palette('primary', 1)};
     }

     &:focus {
       border-color: ${palette('primary', 1)};
     }

    span {
      pointer-events: none;
    }
    
    svg {
      pointer-events: none;
      fill: ${palette('primary', 0)};
    }

    ${mq.greaterThan('tablet')`
      padding: 20px 25px;
    `}
  `;

const TabContainer = styled.div`
      margin-bottom: 15px;
    `;

const TabTitle = styled.h3`
      line-height: 22px;
      margin: 0;
      font-size: ${size('tabTitleDeviceFontSize')};
      
      ${mq.greaterThan('tablet')`
          font-size: ${size('tabTitleDesktopFontSize')};
      `};
    `;

const PanelContent = styled.div`
      padding: 0 15px;

      ${mq.greaterThan('tablet')`
        padding: 0 25px;
      `};
    `;

const slideDown = keyframes`
      0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0;
      }
      
      100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
  `;

const PanelText = styled.div`
      line-height: 21px;
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: ${size('panelDeviceFontSize')};
      animation: ${slideDown} 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      font-family: ${font('primary')};

      p {
        margin-top: 10px;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      ${mq.greaterThan('tablet')`
        line-height: 24px;
        margin-top: 20px;
        font-size: ${size('panelDesktopFontSize')};

        p {
          margin-top: 15px;
          margin-bottom: 15px;
        }
      `};
    `;

const OpenIcon = styled.svg`
  width: 10px;
  height: 10px;
  
  ${mq.greaterThan('tablet')`
      width: 20px;
      height: 20px;
  `};
`;

const CloseIcon = styled.svg`
  width: 10px;
  height: 2px;
  
  ${mq.greaterThan('tablet')`
     width: 20px;
     height: 4px;
  `};
`;

export {
  TabButton,
  TabContainer,
  TabTitle,
  PanelContent,
  PanelText,
  OpenIcon,
  CloseIcon
};
