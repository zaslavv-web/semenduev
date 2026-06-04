import { useCallback } from "react";

/**
 * Helper: returns props for CTA links/buttons.
 * Если href указывает на якорь #contacts — заменяем на переход
 * на отдельную страницу /contact.
 */
export function useCtaProps() {
  return useCallback((href?: string) => {
    if (href && href.startsWith("#contacts")) {
      return { href: "/contact" };
    }
    return { href: href ?? "#" };
  }, []);
}
