export const metadata = {
  title: "BrandingHopes | Full stack software, SaaS and website agency",
  description:
    "BrandingHopes builds custom software, SaaS products and websites. Get a free project quote within one working day.",
};

// export const metadata = {
//   title: "BrandingHopes | Full stack software, SaaS and website agency",
//   description:
//     "BrandingHopes builds custom software, SaaS products and websites. Get a free project quote within one working day.",
//   icons: {
//     icon: "/favicon.png",
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
