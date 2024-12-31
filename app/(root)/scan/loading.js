'use client';
import styled from 'styled-components';

const LoadingScreen = () => {
  return (
    <Wrapper className='grid place-items-center h-[calc(100vh-64px)] p-20'>
      <div className='size-[150px] relative'>
        <span className='bg-primary' />
        <span className='bg-primary' />
        <span className='bg-primary' />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  span {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    animation: chase 2s infinite;
  }

  span:nth-child(2) {
    animation-delay: 0.7s;
  }
  span:nth-child(3) {
    animation-delay: 1.4s;
  }

  @keyframes chase {
    0% {
      top: 0;
      left: 0;
    }
    12.5% {
      top: 0;
      left: 50%;
    }
    25% {
      top: 0;
      left: 50%;
    }
    37.5% {
      top: 50%;
      left: 50%;
    }
    50% {
      top: 50%;
      left: 50%;
    }
    62.5% {
      top: 50%;
      left: 0;
    }
    75% {
      top: 50%;
      left: 0;
    }
    87.5% {
      top: 0;
      left: 0;
    }
    100% {
      top: 0;
      left: 0;
    }
  }
`;

export default LoadingScreen;
