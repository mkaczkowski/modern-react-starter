import React from "react";
import PropTypes from "prop-types";
import "./Header.sass";

class Header extends React.Component {
  static defaultProps = {
    items: []
  };

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    )
  };

  state = {
    selectedItem: undefined
  };

  componentDidMount() {
    console.debug("Hi! Header here 👍");
  }

  changeItem = event => {
    const selectedItem = event.currentTarget.name;
    this.setState({ selectedItem });
  };

  render() {
    const { items } = this.props;
    const { selectedItem } = this.state;

    return (
      <header>
        {items.length > 0
          ? items.map(item =>
              <button
                key={item.name}
                name={item.name}
                onClick={this.changeItem}
                className={selectedItem === item.name ? "active" : ""}
              >
                {item.name.toUpperCase()}
              </button>
            )
          : "no items , sorry 🤡"}
      </header>
    );
  }
}

export default Header;
