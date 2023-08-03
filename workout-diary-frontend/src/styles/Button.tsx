import React from "react";
import styled, {css} from "styled-components";



interface Props {
    size?: 'l' | 's',
    active?: boolean,
}

 const Button = styled.button<Props>`
  background-color: inherit;
  width: 110px;
  max-height: 80px;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  padding: 5px;
  margin: 10px;
  transition: scale .2s linear;

  ${props => {
    switch (props.size) {
      case 'l':
        return css`
          width: 140px;
          height: 50px;
          font-size: 24px;
          line-height: 24px;
        `
      case 's':
        return css`
          width: 40px;
          height: 25px;
          font-size: 14px;
          line-height: 14px;
        `
    }
  }}
  ${props => {
    if (props.active) {
      return css`
        border-bottom: #424242 3px solid;
        scale: 1.2;
      `
    }
  }}
  &:hover {
    scale: 1.2;
  }
`

export default Button;