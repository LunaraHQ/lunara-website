import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  // Example: Plausible analytics
  useEffect(() => {
    window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {/* SEO & performance scripts */}
      <Script
        strategy="afterInteractive"
        src="https://plausible.io/js/plausible.js"
        data-domain="lunara.com"
      />
      {/* Chat widget (e.g. Intercom) */}
      <Script
        id="intercom"
        strategy="afterInteractive"
      >{`
        window.intercomSettings = { app_id: "your_app_id" };
        (function(){var w=window;var ic=w.Intercom;
        if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}
        else{var d=document;var i=function(){i.c(arguments)};i.q=[];
        i.c=function(args){i.q.push(args)};w.Intercom=i;
        function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;
        s.src='https://widget.intercom.io/widget/your_app_id';
        var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}
        if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      `}</Script>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
