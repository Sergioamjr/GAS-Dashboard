//@flow

import * as React from "react";
import PageWrapper from "../../components/PageWrapper";

type Props = {};
type State = {
  data: {
    results: any
  },
  isFetching: boolean,
  hasError: boolean
};

const stateDefault = {
  data: {},
  isFetching: false,
  hasError: false
};

// To review later
// Breakdown view in components
// review flow error in value

class Home extends React.Component<Props, State> {
  state = {
    ...stateDefault
  };

  render() {
    return (
      <PageWrapper title="Início">
        <p>sda</p>
      </PageWrapper>
    );
  }
}

export default Home;
