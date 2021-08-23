import React, { useEffect, Suspense } from "react";
import AOS from "aos";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { layoutActions, signInActions } from "./components/redux-store/Store";
import LinkNavigation from "./components/Navigation/LinkNavigation";
import { buttonActions } from "./components/redux-store/button";
import {
  HomePageLink,
  FeatureLink,
  IntroductionLink,
  ScreenLink,
  AboutUsLink,
  BlogLink,
  BlogDetailLink,
  ADMIN,
  DASHBOARD_LINK,
  NOTFOUND_LINK,
  APP_INTRODUCTION,
  SEARCH,
} from "./components/link/link";
import TopButton from "./components/TopButton/TopButton";
import { adminInformation } from "./components/redux-store/Store";
import Progress from "./UI/Progress/Progess";
const RegisterPage = React.lazy(() => import("./components/Register/RegisterPage"));
const Home = React.lazy(() => import("./components/Pages/Home"));
const Blog = React.lazy(() => import("./components/Pages/Blog"));
const Signin = React.lazy(() => import("./components/Pages/Signin"));
const FeaturePage = React.lazy(() => import("./components/Pages/FeaturePage"));
const IntroductionPage = React.lazy(() => import("./components/Pages/IntroductionPage"));
const Screen = React.lazy(() => import("./components/Pages/Screen"));
const AboutUs = React.lazy(() => import("./components/Pages/AboutUs"));
const ChangingPost = React.lazy(() => import("./components/Dashboard/ChangingPost/ChangingPost"));
const Users = React.lazy(() => import("./components/Dashboard/Users/Users"));
const FormPost = React.lazy(() => import("./components/Dashboard/FormPost/FormPost"));
const BlogDetail = React.lazy(() => import("./components/Pages/BlogDetail"));
const NotFound = React.lazy(() => import("./components/404NotFound/NotFound"));
const AppIntroduction = React.lazy(() => import("./components/Pages/AppIntroduction"));
const MainDashBoard = React.lazy(() => import("./components/Pages/MainDashboard"));
const BlogDashboard = React.lazy(() => import("./components/Dashboard/BlogDashboard/BlogDashboard"));
const Register = React.lazy(() => import("./components/Dashboard/Register/Register"));
const UserDetail = React.lazy(() => import("./components/Dashboard/UserDetail/UserDetail"));
const SearchPage = React.lazy(() => import("./components/Pages/SearchPage"));
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
    const scrollUpTop = () => {
      const scrollY = window.pageYOffset;
      if (scrollY > 200) {
        dispatch(buttonActions.showUpHandler());
      } else {
        dispatch(buttonActions.removeHandler());
      }
    };
    window.addEventListener("scroll", scrollUpTop);
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const signIn = localStorage.getItem("isSignedIn");
    if (!signIn) {
      return;
    }
    dispatch(signInActions.SignIn(JSON.parse(signIn)));
    dispatch(adminInformation());
  }, [dispatch]);
  const isClicked = useSelector((state) => state.layout.isClicked);
  const toggleHandler = () => {
    dispatch(layoutActions.toggleLayout());
  };
  return (
    <>
      <Suspense fallback={<Progress/>}>
        <LinkNavigation toggle={toggleHandler} transform={isClicked} />
        <TopButton />
        <Switch>
          <Route path={HomePageLink} exact component={Home} />
          <Route path={ADMIN.ADMIN_BASIC} exact>
            <Home />
          </Route>
          <Route path={FeatureLink} component={FeaturePage} />
          <Route path={IntroductionLink} component={IntroductionPage} />
          <Route path={ScreenLink} component={Screen} />
          <Route path={AboutUsLink} component={AboutUs} />
          <Route path={BlogDetailLink} component={BlogDetail} />
          <Route path={NOTFOUND_LINK} component={NotFound} />
          <Route path={APP_INTRODUCTION} component={AppIntroduction} />
          <Route path={ADMIN.ADMIN_LOGIN} exact>
            <Signin />
          </Route>
          <Route path={ADMIN.ADMIN_REGISTER} component={RegisterPage} />
          <Route path={BlogLink} component={Blog} exact />
          <Route path={SEARCH} component={SearchPage} />
          {/* Dashboard Admin */}
          <Route path={DASHBOARD_LINK.DASHBOARD} component={MainDashBoard} />
          <Route path={DASHBOARD_LINK.BLOG} component={BlogDashboard} exact />
          <Route path={DASHBOARD_LINK.CREATE_BLOG} component={FormPost} />
          <Route
            path={DASHBOARD_LINK.NESTED_ROUTE.FIX_BLOG}
            component={ChangingPost}
          />
          <Route path={DASHBOARD_LINK.REGISTER} component={Register} />
          <Route path={DASHBOARD_LINK.USER} component={Users} exact />
          <Route
            path={DASHBOARD_LINK.NESTED_ROUTE.USER_DETAIL}
            component={UserDetail}
          />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Suspense>
    </>
  );
};

export default App;
