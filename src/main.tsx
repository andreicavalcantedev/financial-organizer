import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {RootLayout} from './layouts/RootLayout';
import {Home} from './pages/Home';
import {AllTransactions} from './pages/AllTransactions';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element: <Home />},
      {path: 'transactions', element: <AllTransactions />},
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
