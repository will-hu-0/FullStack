import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">Player</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Management</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;