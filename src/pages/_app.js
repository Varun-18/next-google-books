import styles from "@styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "@src/store";
import { ThemeProvider } from "@material-tailwind/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
