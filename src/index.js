import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store, persistor } from './redux/store';
import routes from './routers/routes';
import ResponsiveAppBar from './components/appBar/AppBar';
import Footer from './components/footer/footer';
import Loading from './components/loading/Loading';
import './index.css';

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
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<Loading />}>
            <ResponsiveAppBar />
            <RouterProvider router={router}></RouterProvider>
            <Footer />
          </Suspense>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
