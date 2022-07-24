import { useState, useEffect } from "react";
import { AppWrapper } from "../context/state";
import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading && <Loader />;
}
function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout>
        <Loading />
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  );
}

export default MyApp;
