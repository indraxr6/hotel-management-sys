import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
import Users from './pages/Users';
import RoomTypes from './pages/RoomTypes';
import RoomTypeDetail from './pages/RoomTypeDetail';
import RoomList from './pages/RoomList';
import CheckOrder from './pages/CheckOrder';
import AddTransaction from './pages/AddTransaction';
import TransactionDetail from './pages/TransactionDetail';
import withRoleGuard from './helpers/roleGuard';
import RoomTypesAdd from './pages/RoomTypesAdd';
import NotFound from './pages/NotFound';
import RoomTypesEdit from './pages/RoomTypesEdit';
import RoomAdd from './pages/RoomAdd';
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
    path: '/transaction/add',
    component: <AddTransaction/>
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
    path: '/room/add',
    component: <RoomAdd/>
  },
  {
    path: '/room-types',
    component: <RoomTypes/>
  },
  {
    path: '/room-types/:id',
    component: <RoomTypeDetail/>
  },
  {
    path: '/room-types/add',
    component: <RoomTypesAdd/>
  },
  {
    path: '/room-types/edit/:id',
    component: <RoomTypesEdit/>
  },
  {
    path: '/transaction/:id',
    component: <TransactionDetail/>
  },
  {
    path: '/check-order',
    component: <CheckOrder/>,
    title: 'Check Order'
  },
  {
    path: '',
    component: <NotFound/>,
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