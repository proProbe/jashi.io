import React from "react";
import Relay from "react-relay";

class EnglishContainer extends React.Component {
  render() {
    let {english} = this.props;
    return (
      <div>
        {/*<p>
          {english.number}
        </p>*/}
        <p>
          {english.tags}
        </p>
        <p>
          {english.meaning}
        </p>
      </div>
    )
  }
}

EnglishContainer = Relay.createContainer(EnglishContainer, {
  fragments: {
    english: () => Relay.QL`
      fragment on English {
        meaning,
        tags,
        number
      }
    `
  }
});

export default EnglishContainer;
