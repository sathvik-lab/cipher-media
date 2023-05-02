// import React, { useEffect } from 'react';
// import { Link, Route, Router, useLocation } from 'react-router-dom';

// const NavBar = () => {
//     const location = useLocation();

//     useEffect(() => {
//         const header = document.querySelector('h1');
//         const text = header.textContent.toLowerCase();
//         let color;

//         if (text === 'about') {
//             color = '#16A085';

//         }
//         else if (text === 'projects') {

//             color = '#E74C3C';

//         }
//         else if (text === 'contacts') {

//             color = '#2980B9';

//         }
//         else {

//             color = '#F1C40F';

//         }

//         document.documentElement.style.setProperty('--color-home', color);
//     }, [location]);

//     return (
//         <div className="App">
//             <nav className="Navbar">
//                 <h2>btf</h2>
//                 <ul>
//                     <li>
//                         <Link to="/about">about</Link>
//                     </li>
//                     <li>
//                         <Link to="/projects">projects</Link>
//                     </li>
//                     <li>
//                         <Link to="/contacts">contacts</Link>
//                     </li>
//                 </ul>
//             </nav>

//             {/* <Switch> */}
//             <Router >

//                 <Route exact path="/">
//                     <h1>Home</h1>
//                 </Route>
//                 <Route path="/about">
//                     <h1>About</h1>
//                 </Route>
//                 <Route path="/projects">
//                     <h1>Projects</h1>
//                 </Route>
//                 <Route path="/contacts">
//                     <h1>Contacts</h1>
//                 </Route>
//             </Router>
//             {/* </Switch> */}
//         </div>
//     );
// };

// export default NavBar;
