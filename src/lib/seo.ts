import { useEffect } from "react";

export function setPageSEO({ title, description, path }: { title: string; description: string; path?: string }) {
  useEffect(() => {
    const fullTitle = `${title} | Piyush’s Relm`;
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    const href = path ?? window.location.pathname;
    link.setAttribute('href', href);
  }, [title, description, path]);
}
