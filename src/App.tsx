import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryProvider } from "@/provider/queryProvider";
import { routers } from "@/routes/routes";
import Layout from "@/components/Layout";
import { StreamTheme } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

function App() {
  return (
    <QueryProvider>
      <StreamTheme className="default-font">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {routers.map((route) => (
                <Route
                  key={route.id}
                  path={route.href}
                  element={route.element}
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StreamTheme>
    </QueryProvider>
  );
}

export default App;
