import { useCallback } from "react";
import { useLeadDialog, type LeadKind } from "./LeadDialogProvider";

/**
 * Возвращает функцию-генератор props для CTA-кнопок.
 * При клике открывает попап нужного вида (checklist или diagnostic).
 *
 * Использование:
 *   const ctaProps = useCtaProps();
 *   <a {...ctaProps("diagnostic")}>Записаться</a>
 *
 * Для обратной совместимости старые хэш-ссылки тоже распознаются:
 *   "#contacts" / "/contact"  → diagnostic
 *   "#checklist"              → checklist
 */
export function useCtaProps() {
  const { openLead } = useLeadDialog();
  return useCallback(
    (target?: LeadKind | string) => {
      let kind: LeadKind = "diagnostic";
      if (target === "checklist" || target === "diagnostic") {
        kind = target;
      } else if (typeof target === "string" && target.includes("checklist")) {
        kind = "checklist";
      }
      return {
        href: "#",
        onClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
          e.preventDefault();
          openLead(kind);
        },
      };
    },
    [openLead]
  );
}
