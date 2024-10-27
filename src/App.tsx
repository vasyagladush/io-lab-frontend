import { NotificationContainer } from "./components/notification/NotificationContainer";
import { UserContextProvider } from "./contexts/UserContextProvider";
import { Outlet } from "react-router-dom";
import flowbiteTheme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Flowbite theme={{ theme: flowbiteTheme }}>
          <>
            {/* <ThemeProvider theme={defaultTheme}> */}
            {/* <ModalManager>
                <DialogManager> */}
            <Outlet />
            {/* </DialogManager>
              </ModalManager> */}
            <NotificationContainer />
            {/* </ThemeProvider> */}
          </>
        </Flowbite>
      </UserContextProvider>
    </div>
  );
}

export default App;
