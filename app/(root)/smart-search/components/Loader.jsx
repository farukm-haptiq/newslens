'use client';
import styled from 'styled-components';

const Loader = () => {
  return (
    <Wrapper>
      <div
        className={`
            my-8
            flex
            justify-center
            items-center
            gap-x-1
          `}
      >
        <span className='s1'></span>
        <span className='s2'></span>
        <span className='s3'></span>
        <span className='s4'></span>
        <span className='s5'></span>
        <span className='s6'></span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  span {
    width: 10px;
    height: 70px;
    background: white;
    animation: loader 1s ease-in-out infinite;
  }

  span:nth-child(1) {
    background: green;
  }
  span:nth-child(2) {
    background: yellow;
    animation-delay: 0.1s;
  }

  span:nth-child(3) {
    background: blue;
    animation-delay: 0.2s;
  }
  span:nth-child(4) {
    background: orange;
    animation-delay: 0.3s;
  }
  span:nth-child(5) {
    background: cyan;
    animation-delay: 0.4s;
  }
  span:nth-child(6) {
    background: pink;
    animation-delay: 0.5s;
  }
  @keyframes loader {
    0% {
      transform: scaleY(0.1);
    }
    35% {
      transform: scaleY(1);
    }
    60% {
      transform: scaleY(0.1);
    }
    100% {
      transform: scaleY(0.1);
    }
  }
`;

export default Loader;
