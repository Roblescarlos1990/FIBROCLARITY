import intake from "../CLIENT-INTAKE.json";
import type { CSSProperties } from "react";
import type { SeasonKey } from "./OakScene";
import type { Lens } from "./content";

export type FoundationLens = {
  key: SeasonKey;
  lens: Lens;
  label: string;
  season: string;
  number: string;
};

export type FoundationNavigation = {
  label: string;
  target: string;
};

type FoundationCssProperties = CSSProperties & {
  "--foundation-primary": string;
  "--foundation-secondary": string;
  "--foundation-accent": string;
  "--foundation-silver": string;
};

const services = Object.values(intake.services);
const lenses = (intake.publication.lenses as FoundationLens[]).map(
  (lens, index) => ({
    ...lens,
    label: services[index] || lens.label,
  }),
);
const navigation =
  intake.publication.primary_navigation as FoundationNavigation[];

export const foundation = {
  ...intake,
  publication: {
    ...intake.publication,
    lenses,
    primary_navigation: navigation,
  },
  cssProperties: {
    "--foundation-primary": intake.branding.primary_color,
    "--foundation-secondary": intake.branding.secondary_color,
    "--foundation-accent": intake.branding.accent_color,
    "--foundation-silver": intake.branding.silver_color,
    } as FoundationCssProperties,
};

export const foundationServices = services;
