export const siteConfig = {
  name: "Border Radius Generator",
  title: "Border Radius Generator - Visual CSS Border Radius Editor",
  description:
    "Create beautiful CSS border-radius values with an interactive visual editor. Adjust individual corners, use presets, and copy CSS instantly.",
  url: "https://border-radius-generator.tools.jagodana.com",
  ogImage: "/opengraph-image",

  headerIcon: "Box",
  brandAccentColor: "#8b5cf6",

  keywords: [
    "border-radius",
    "css border-radius generator",
    "border radius css",
    "rounded corners css",
    "css border radius tool",
  ],
  applicationCategory: "DeveloperApplication",

  themeColor: "#7c3aed",

  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/border-radius-generator",
    website: "https://jagodana.com",
  },

  footer: {
    about:
      "Border Radius Generator is a free visual CSS tool that helps you create perfect rounded corners for your web designs. Adjust each corner individually or use presets to get started quickly.",
    featuresTitle: "Features",
    features: [
      "Interactive visual corner editing",
      "Advanced 8-value syntax support",
      "One-click CSS copy",
      "Ready-made presets",
    ],
  },

  hero: {
    badge: "Free CSS Tool",
    titleLine1: "Visual CSS",
    titleGradient: "Border Radius Generator",
    subtitle:
      "Design beautiful rounded corners with an interactive visual editor. Adjust each corner individually, pick from presets, and copy production-ready CSS in one click.",
  },

  featureCards: [
    {
      icon: "🎨",
      title: "Visual Editor",
      description:
        "See your border-radius changes in real-time on a live preview box.",
    },
    {
      icon: "⚡",
      title: "Instant Presets",
      description:
        "Jump-start with pill, circle, squircle, blob, and more built-in presets.",
    },
    {
      icon: "📋",
      title: "Copy & Go",
      description:
        "One-click copy of production-ready CSS you can drop straight into your code.",
    },
  ],

  relatedTools: [
    {
      name: "CSS Box Shadow Generator",
      url: "https://css-box-shadow-generator.tools.jagodana.com",
      icon: "🔲",
      description: "Create beautiful CSS box shadows visually.",
    },
    {
      name: "CSS Grid Generator",
      url: "https://css-grid-generator.tools.jagodana.com",
      icon: "📐",
      description: "Build CSS Grid layouts with a visual editor.",
    },
    {
      name: "CSS Flexbox Playground",
      url: "https://css-flexbox-playground.tools.jagodana.com",
      icon: "📦",
      description: "Learn and experiment with CSS Flexbox properties.",
    },
    {
      name: "Gradient Generator",
      url: "https://gradient-generator.tools.jagodana.com",
      icon: "🌈",
      description: "Create beautiful CSS gradients with a visual editor.",
    },
    {
      name: "Color Palette Explorer",
      url: "https://color-palette-explorer.tools.jagodana.com",
      icon: "🎭",
      description: "Extract color palettes from any image.",
    },
    {
      name: "Theme Contrast Checker",
      url: "https://theme-contrast-checker.tools.jagodana.com",
      icon: "🔍",
      description: "Check color contrast for WCAG accessibility.",
    },
  ],

  howToSteps: [
    {
      name: "Adjust Corners",
      text: "Use the sliders to set the border-radius for each corner individually, or link them to change all at once.",
      url: "",
    },
    {
      name: "Try Presets",
      text: "Click a preset button like Pill, Circle, or Blob to instantly apply popular border-radius patterns.",
      url: "",
    },
    {
      name: "Copy CSS",
      text: "Click the copy button to copy the generated CSS border-radius value to your clipboard, ready to paste into your code.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M",

  faq: [
    {
      question: "What is CSS border-radius?",
      answer:
        "CSS border-radius is a property that rounds the corners of an element's outer border edge. You can set it as a single value for all corners, or specify each corner individually.",
    },
    {
      question: "What is the 8-value border-radius syntax?",
      answer:
        "The 8-value syntax uses a slash (/) to separate horizontal and vertical radii: border-radius: TL TR BR BL / TL TR BR BL. This lets you create elliptical corners for more complex shapes.",
    },
    {
      question: "How do I make a circle with border-radius?",
      answer:
        "Set border-radius to 50% on a square element. If the element is not square, 50% will create an ellipse instead.",
    },
    {
      question: "What units can I use for border-radius?",
      answer:
        "You can use px, em, rem, %, vw, vh, and other CSS length units. Percentages are relative to the element's dimensions — horizontal radii use the width, vertical radii use the height.",
    },
  ],

  pages: {
    "/": {
      title: "Border Radius Generator - Visual CSS Border Radius Editor",
      description:
        "Create beautiful CSS border-radius values with an interactive visual editor. Adjust individual corners, use presets, and copy CSS instantly.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
