/**
 * Company Logo Components - Premium Edition
 *
 * Icon-only SVG logos for trusted companies section
 * Consistent sizing and modern, clean design
 */

export const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="currentColor"/>
  </svg>
);

export const MicrosoftLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <rect x="6" y="6" width="18" height="18" fill="currentColor"/>
    <rect x="26" y="6" width="18" height="18" fill="currentColor"/>
    <rect x="6" y="26" width="18" height="18" fill="currentColor"/>
    <rect x="26" y="26" width="18" height="18" fill="currentColor"/>
  </svg>
);

export const AmazonLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <path d="M35.958 35.834c-6.617 4.883-16.237 7.489-24.502 7.489C4.644 43.323 0 39.883 0 39.883c-.659-.489-.069-1.156.721-.777 8.308 4.884 18.582 7.822 29.196 7.822 7.156 0 15.026-1.489 22.254-4.556 1.093-.467 2.009.721.787 1.462z" fill="currentColor"/>
    <path d="M38.902 32.394c-.845-1.086-5.594-.514-7.724-.257-.645.079-.745-.489-.164-.898 3.782-2.662 9.986-1.893 10.706-.999.72.895-.186 7.089-3.724 10.045-.546.465-1.067.217-.825-.401.802-2.045 2.608-6.604 1.73-7.49z" fill="currentColor"/>
    <path d="M36.5 18H11.5C10.672 18 10 18.672 10 19.5v9c0 .828.672 1.5 1.5 1.5h25c.828 0 1.5-.672 1.5-1.5v-9c0-.828-.672-1.5-1.5-1.5z" fill="currentColor"/>
    <path d="M6 30c0 3.314 2.686 6 6 6h24c3.314 0 6-2.686 6-6" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const AppleLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <path d="M38.347 31.614c-.863 1.97-1.281 2.85-2.395 4.593-1.558 2.433-3.756 5.463-6.476 5.486-2.423.021-3.017-1.544-6.3-1.524-3.281.02-3.937 1.549-6.359 1.527-2.72-.023-4.787-2.771-6.347-5.204-4.356-6.798-4.817-14.778-2.128-19.018 1.907-3.007 4.934-4.77 7.726-4.77 2.874 0 4.68 1.547 7.055 1.547 2.303 0 3.704-1.549 7.025-1.549 2.508 0 5.202 1.362 7.112 3.716-6.254 3.434-5.238 12.381.687 15.196z" fill="currentColor"/>
    <path d="M31.482 8.943c1.414-1.781 2.455-4.254 2.065-6.776-2.097.107-4.646 1.476-6.157 3.305-1.351 1.638-2.461 4.161-2.03 6.594 2.273.063 4.614-1.302 6.122-3.123z" fill="currentColor"/>
  </svg>
);

export const MetaLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm10.5 28.5c-.828 0-1.5-.672-1.5-1.5v-8c0-2.206-1.794-4-4-4s-4 1.794-4 4v8c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-8c0-2.206-1.794-4-4-4s-4 1.794-4 4v8c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V18c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v.5c1.138-1.145 2.714-1.858 4.463-1.858 1.749 0 3.324.713 4.463 1.858C23.638 17.355 25.213 16.642 26.962 16.642c1.749 0 3.324.713 4.463 1.858V18c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v13.5c0 .828-.672 1.5-1.5 1.5-.414 0-.789-.168-1.061-.439z" fill="currentColor"/>
  </svg>
);

export const NetflixLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12">
    <path d="M18.462 6.667L24 24.943l5.538-18.276h6.795v34.666h-6.154V18.481l-5.538 18.852h-4.282L14.82 18.48v20.853H8.667V6.667h9.795z" fill="currentColor"/>
  </svg>
);

// Company data with logo components
export const TRUSTED_COMPANIES = [
  { name: "Google", logo: GoogleLogo },
  { name: "Microsoft", logo: MicrosoftLogo },
  { name: "Amazon", logo: AmazonLogo },
  { name: "Apple", logo: AppleLogo },
  { name: "Meta", logo: MetaLogo },
  { name: "Netflix", logo: NetflixLogo },
] as const;
