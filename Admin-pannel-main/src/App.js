import Mainbody from './components_admin/AdminLayout';
import './App.css';
import Login from './Pages_admin/Login';
import WebBody from './components/WebBody';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Icons from './pages/Icons';
import Interfaceicon from './pages/Interfaceicon';
import Topicon from './pages/Topicon';
import Animatedicons from './pages/Animatedicons';
import Pack from './pages/Pack';
import Topanimatedicon from './pages/Topanimatedicon';
import Support from './pages/Support';
import BlackFill from './pages/BlackFill';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';

//admin pages
import AdminLayout from './components_admin/AdminLayout'
import Dashboard from './components_admin/Dashboard';
import Icon from './Pages_admin/Icon';
import Animatedicon from './Pages_admin/Animatedicon';
import Category from './Pages_admin/Category';
import Interface from './Pages_admin/Interface';
import UserLayout from './components/UserLayout';
import { Analytics } from "@vercel/analytics/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PopularIcon from './Pages_admin/PopularIcon';
import PopularCategory from './Pages_admin/PopularCategory';
import Searchicons from './pages/Searchicons';
import UserLayoutWithout from './components/UserLayoutWithout';

function App() {
  return (
    <div>

      <Router>
        <Switch>

          <Route exact path='/'>
            <UserLayout>
              <WebBody />
            </UserLayout>
          </Route>

          <Route path='/icons'>
            <UserLayout>
              <Icons />
            </UserLayout>

          </Route>
          <Route path='/interface-icons'>
            <UserLayout>
              <Interfaceicon />
            </UserLayout>

          </Route>
          <Route path='/animated-icons'>
            <UserLayout>
              <Animatedicons />
            </UserLayout>

          </Route>
          <Route path="/most-downloads">
            <UserLayoutWithout>
              <Topicon />
            </UserLayoutWithout>
          </Route>

          {/* Search */}

          <Route path="/search-icon">
            <UserLayoutWithout>
              <Searchicons />
            </UserLayoutWithout>
          </Route>

          <Route path="/pack">
            <UserLayout>
              <Pack />
            </UserLayout>
          </Route>

          <Route path="/topanimatedicon">
            <UserLayout>
              <Topanimatedicon />
            </UserLayout>
          </Route>

          <Route path="/contact-us">
            <UserLayout>
              <Contact />
            </UserLayout>
          </Route>

          <Route path="/support">
            <UserLayout>
              <Support />
            </UserLayout>
          </Route>

          <Route path="/faqs">
            <UserLayout>
              <Faqs />
            </UserLayout>
          </Route>

          <Route path="/back-fill">
            <UserLayout>
              <BlackFill />
            </UserLayout>
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route exact path="/admin" >
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </Route>

          <Route path="/admin/icons/icon">
            <AdminLayout>
              <Icon />
            </AdminLayout>
          </Route>

          <Route path="/admin/popular-icon/icon">
            <AdminLayout>
              <PopularIcon />
            </AdminLayout>
          </Route>

          <Route path="/admin/popular-icon/category">
            <AdminLayout>
              <PopularCategory />
            </AdminLayout>
          </Route>

          <Route path="/admin/icons/animated-icon">
            <AdminLayout>
              <Animatedicon />
            </AdminLayout>
          </Route>

          <Route path="/admin/icons/interface-Icon">
            <AdminLayout>
              <Interface />
            </AdminLayout>
          </Route>

          <Route path="/admin/category">
            <AdminLayout>
              <Category />
            </AdminLayout>
          </Route>

        </Switch>

      </Router>
      <Analytics />
    </div>
  );
}

export default App;
