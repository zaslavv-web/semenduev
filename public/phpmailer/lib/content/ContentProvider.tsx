import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type SiteContent, type SectionKey } from "./defaults";

type Ctx = {
  content: SiteContent;
  loaded: boolean;
  refresh: () => Promise<void>;
};

const ContentCtx = createContext<Ctx>({
  content: defaultContent,
  loaded: false,
  refresh: async () => {},
});

function mergeSection<K extends SectionKey>(key: K, dbValue: unknown): SiteContent[K] {
  if (dbValue && typeof dbValue === "object") {
    return { ...defaultContent[key], ...(dbValue as object) } as SiteContent[K];
  }
  return defaultContent[key];
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("site_content").select("section, data");
    if (error) {
      setLoaded(true);
      return;
    }
    const next = { ...defaultContent };
    for (const row of data ?? []) {
      const key = row.section as SectionKey;
      if (key in defaultContent) {
        (next as Record<string, unknown>)[key] = mergeSection(key, row.data);
      }
    }
    setContent(next);
    setLoaded(true);
  };

  useEffect(() => {
    load();
    const ch = supabase
      .channel("site_content_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_content" },
        () => {
          load();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  return (
    <ContentCtx.Provider value={{ content, loaded, refresh: load }}>
      {children}
    </ContentCtx.Provider>
  );
}

export function useContent() {
  return useContext(ContentCtx).content;
}

export function useSection<K extends SectionKey>(key: K): SiteContent[K] {
  return useContext(ContentCtx).content[key];
}
