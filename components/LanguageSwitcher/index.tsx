"use client";


import { useLocale } from "@/app/hook/useLocale";
import { Button } from "@heroui/button";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  if (!setLocale) return null; 

  const toggleLanguage = () => {
    setLocale(locale === "pt-BR" ? "en-US" : "pt-BR");
  };

  return (
    <Button size="sm" onPress={toggleLanguage} variant="flat">
      {locale === "pt-BR" ? "English" : "Português"}
    </Button>
  );
}
