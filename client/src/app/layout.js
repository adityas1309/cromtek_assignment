// app/layout.js or app/layout.tsx

export const metadata = {
  title: 'Avalanche Token Trade',
  description: 'Buy and sell tokens using MetaMask on Avalanche Fuji testnet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
