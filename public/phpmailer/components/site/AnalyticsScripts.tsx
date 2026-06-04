import { useEffect } from "react";
import { useSection } from "@/lib/content/ContentProvider";

function injectScript(id: string, content: string, src?: string, async = true) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  if (src) {
    s.src = src;
    s.async = async;
  } else {
    s.text = content;
  }
  document.head.appendChild(s);
}

function injectHtml(id: string, html: string, target: "head" | "body" = "head") {
  if (typeof document === "undefined" || !html.trim()) return;
  if (document.getElementById(id)) return;
  const wrap = document.createElement("div");
  wrap.id = id;
  wrap.style.display = "contents";
  wrap.innerHTML = html;
  // Re-create <script> tags so they execute
  wrap.querySelectorAll("script").forEach((old) => {
    const n = document.createElement("script");
    for (const a of Array.from(old.attributes)) n.setAttribute(a.name, a.value);
    n.text = old.textContent || "";
    old.replaceWith(n);
  });
  (target === "head" ? document.head : document.body).appendChild(wrap);
}

export function AnalyticsScripts() {
  const a = useSection("analytics");

  useEffect(() => {
    if (!a) return;

    // Yandex Metrika
    if (a.yandexMetrikaId) {
      injectScript(
        "ym-init",
        `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();for (var j=0; j<document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${a.yandexMetrikaId}', 'ym');
        ym(${a.yandexMetrikaId}, 'init', { defer:true, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`
      );
    }

    // Google Tag Manager
    if (a.googleTagManagerId) {
      injectScript(
        "gtm-init",
        `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})
        (window,document,'script','dataLayer','${a.googleTagManagerId}');`
      );
    }

    // Google Analytics 4 / Google Ads (gtag.js)
    const gtagIds = [a.googleAnalyticsId, a.googleAdsId].filter(Boolean);
    if (gtagIds.length > 0) {
      injectScript("gtag-src", "", `https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`);
      injectScript(
        "gtag-init",
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        ${gtagIds.map((id) => `gtag('config', '${id}');`).join("\n")}`
      );
    }

    // VK Pixel
    if (a.vkPixelId) {
      injectScript(
        "vk-pixel",
        `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,
        t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){VK.Retargeting.Init("${a.vkPixelId}"),VK.Retargeting.Hit()},
        document.head.appendChild(t)}();`
      );
    }

    // Top.Mail.Ru
    if (a.topMailRuId) {
      injectScript(
        "tmr-init",
        `var _tmr = window._tmr || (window._tmr = []);
        _tmr.push({id: "${a.topMailRuId}", type: "pageView", start: (new Date()).getTime()});
        (function (d, w, id) { if (d.getElementById(id)) return; var ts = d.createElement("script");
        ts.type = "text/javascript"; ts.async = true; ts.id = id;
        ts.src = "https://top-fwz1.mail.ru/js/code.js";
        var f = function () { var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s); };
        if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
        })(document, window, "tmr-code");`
      );
    }

    // Facebook Pixel
    if (a.facebookPixelId) {
      injectScript(
        "fb-pixel",
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${a.facebookPixelId}'); fbq('track', 'PageView');`
      );
    }

    // Custom HTML
    if (a.customHeadHtml) injectHtml("custom-head-html", a.customHeadHtml, "head");
    if (a.customBodyHtml) injectHtml("custom-body-html", a.customBodyHtml, "body");
  }, [a]);

  return null;
}
