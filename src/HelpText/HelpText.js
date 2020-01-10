import React, {
  Component
} from 'react';

class HelpText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needhelp: true
    };
  }

  render() {
    let display;
    if (this.state.needhelp) {
      display = (
        <div className="HelpText_text">
          <p>
            Hi There! Morkit helps you
            sell and buy your stuff.
          </p>
          <p>
            Go to your inventory in the
            menu to start adding stuff!
          </p>
          <p>
            Check out other people's
            stuff here.
          </p>
          <p>
            Go to your messages to
            respond to people checking
            out your stuff. Morkit
            thinks about messages
            differently. You get to see
            when someone is asking about
            your stuff but this isn't a
            messenger. Make sure you
            accept/ reject their
            inquiries
          </p>
        </div>
      );
    } else {
      display = null;
    }
    return (
      <div className="HelpText">
        <button
          type="button"
          onClick={e =>
            this.setState({
              needhelp: !this.state
                .needhelp
            })
          }
        >
          {this.state.needhelp
            ? 'Hide Help'
            : 'Show Help'}
        </button>
        {display}
      </div>
    );
  }
}

export default HelpText;
