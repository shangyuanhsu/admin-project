import { Provider } from 'react-redux';
import { store } from './stores';
import { AppRoutes } from './routes';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      {/* ScrollToTop must be inside RouterProvider, but AppRoutes provides the RouterProvider.
          Wait, ScrollToTop uses useLocation, so it must be rendered INSIDE a Router context.
          
          Since AppRoutes defines the RouterProvider internally via createBrowserRouter, 
          we cannot place ScrollToTop here in App.tsx because it's outside the Router context.
          
          We need to refactor AppRoutes to include ScrollToTop inside the router, or
          wrap the content differently.
          
          Actually, with createBrowserRouter (Data Router), the best place is to create a Layout Route 
          that wraps everything, or just add it to the root of the route definitions.
       */}
       <AppRoutes />
    </Provider>
  );
}

export default App;
