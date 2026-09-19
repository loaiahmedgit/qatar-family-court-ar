import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight } from "lucide-react";
import type { SiteLanguage } from "../contexts/LanguageContext";
import type { FamilyServiceGroup } from "../data/familyServices";
import { familyServiceEnglishCopy } from "../data/familyServicesEnglish";

type ServiceGroupContentProps = {
  group: FamilyServiceGroup;
  language: SiteLanguage;
};

export function ServiceGroupContent({
  group,
  language,
}: ServiceGroupContentProps) {
  const isEnglish = language === "en";
  const sections = group.sections ?? [
    {
      id: `${group.id}-items`,
      title: "",
      description: "",
      services: group.services ?? [],
    },
  ];

  return (
    <div className="quf-service-sections">
      {sections.map(section => {
        const sectionCopy = isEnglish
          ? familyServiceEnglishCopy[section.id]
          : section;
        return (
          <section
            id={section.id}
            className="quf-service-subgroup"
            key={section.id}
          >
            {group.sections ? (
              <header>
                <h2>{sectionCopy.title}</h2>
                <p>{sectionCopy.description}</p>
              </header>
            ) : null}
            <div className="quf-service-list">
              {section.services.map(service => {
                const serviceCopy = isEnglish
                  ? familyServiceEnglishCopy[service.id]
                  : service;
                return (
                  <a
                    className="quf-service-row"
                    key={service.id}
                    href={service.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="quf-service-identity">
                      <strong>{serviceCopy.title}</strong>
                    </span>
                    <p>{serviceCopy.description}</p>
                    {isEnglish ? (
                      <ArrowRight
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={ArrowLeft02Icon}
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
