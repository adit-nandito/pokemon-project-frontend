import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Footer from './components/footer/footer';
import store from './redux/store';
import routes from './routers/routes';
import './index.css';
import ResponsiveAppBar from './components/appBar/AppBar';
import Loading from './components/loading/Loading';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#3A3B3C'
    }
  }
});

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <ResponsiveAppBar />
          <RouterProvider router={router}></RouterProvider>
          <Footer />
        </Suspense>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
