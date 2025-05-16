// pages/features/[slug].js
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import LoadingSpinner from "../../components/LoadingSpinner";
import MarketingFeature from "../../components/MarketingFeature";

export async function getServerSideProps({ req, params }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  return {
    props: {
      isLoggedIn: !!user,
      slug: params.slug,
    },
  };
}

export default function FeaturePage({ isLoggedIn, slug }) {
  const router = useRouter();
  const [FeatureComponent, setFeatureComponent] = useState(null);

  // Not logged in → show marketing
  if (!isLoggedIn) {
    return <MarketingFeature slug={slug} />;
  }

  // Logged in → dynamically load the in-app stub
  useEffect(() => {
    import(`../../components/features/${slug}`)
      .then((mod) => setFeatureComponent(() => mod.default))
      .catch(() => router.replace("/dashboard"));
  }, [slug]);

  if (!FeatureComponent) {
    return <LoadingSpinner />;
  }
  return <FeatureComponent />;
}
