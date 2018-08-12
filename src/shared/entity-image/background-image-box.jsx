// @flow

import styled from "styled-components";
import AnimationBox from "shared/animation-box";

const StyledBox = styled(AnimationBox)`
  background: url("${props => encodeURI(props.imageSrc)}") no-repeat;
  background-size: cover;
  background-position: center;
`;

export default StyledBox;
