import React from 'react';
import _get from 'lodash/get';

const WithLoading = fields => Component => {
  return class extends React.Component {
    componentWillMount = () => {
      let state = {};
      let toCall = [];
      Object.entries(fields).forEach(([field, method]) => {
        state = {
          ...state,
          [field]: {
            fn: param => {
              toCall.push([field, param]);
            },
            isLoading: false
          }
        };
      });
      this.setState({ ...state, toCall });
    };

    componentDidMount = () => {
      let state = {};
      Object.entries(fields).forEach(([field, method]) => {
        const fn = _get(this._child, method, () => {});
        state = {
          ...state,
          [field]: {
            ...this.state[field],
            fn: params =>
              this.setState(
                {
                  [field]: {
                    ...this.state[field],
                    isLoading: true
                  }
                },
                () =>
                  fn(params)(() => {
                    this.setState({
                      [field]: {
                        ...this.state[field],
                        isLoading: false
                      }
                    });
                  })
              )
          }
        };
      });
      this.setState({ ...state }, () => {
        if (this.state.toCall.length > 0) {
          this.state.toCall.forEach(([method, param]) => {
            this.state[method].fn(param);
          });
        }
      });
    };

    render() {
      const { toCall, ...state } = this.state;
      return (
        <Component
          ref={child => {
            this._child = child;
          }}
          {...this.props}
          {...state}
        />
      );
    }
  };
};

export default WithLoading;