import React from 'react';

import PrimaryNav from './PrimaryNav';
import Subnav from './Subnav';

const Navbar = () => (
  <header>
    <PrimaryNav />
    <Subnav />
  </header>
);

export default Navbar;

// const Navbar = () => (
//   <header>
//     <div className="header-main">
//       <div className="header-item">
//         <Link to="/">Brand</Link>
//       </div>
//     </div>
//     <div className="header-secondary">
//       <div className="header-item">
//         <Link to="/new" />
//       </div>
//       <div className="header-item">
//         <CategoryList />
//         <SortOrderList />
//       </div>
//     </div>
//   </header>
// );

// export default Navbar;
