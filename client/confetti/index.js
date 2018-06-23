import PropTypes from 'prop-types';
import React from 'react';
import sizeMe from 'react-sizeme';
import ReactConfetti from 'react-confetti';

const Confetti = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(
  class Example extends React.PureComponent {
    render() {
      return (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <ReactConfetti {...this.props.size} />
        </div>
      );
    }
  }
);

export default Confetti;
