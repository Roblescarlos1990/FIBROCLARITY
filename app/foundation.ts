import intake from "../CLIENT-INTAKE.json";
import type { CSSProperties } from "react";

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
const navigation =
  intake.publication.primary_navigation as FoundationNavigation[];

export const foundation = {
  ...intake,
  publication: {
    ...intake.publication,
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
