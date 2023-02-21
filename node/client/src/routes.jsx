import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
import Users from './pages/Users';
import RoomTypes from './pages/RoomTypes';
import RoomList from './pages/RoomList';
// import OrderPage from './pages/OrderPage';


const routes = [
  {
    path: '/',
    exact: true,
    component: <LandingPage/>
  },
  {
    path: '/login',
    component: <Login/>
  },
  {
    path: '/register',
    component: <Register/>
  },
  {
    path: '/dashboard',
    component: <Dashboard/>
  },
  {
    path: '/transaction',
    component: <Transaction/>
  },
  {
    path: '/users',
    component: <Users/>
  },
  {
    path: '/room-list',
    component: <RoomList/>
  },
  {
    path: '/room-types',
    component: <RoomTypes/>
  },
//   {
//     path: '/order',
//     component: OrderPage
//   },
//   {
//     path: '/logout',
//     component: Logout
//   },
];

export default routes;