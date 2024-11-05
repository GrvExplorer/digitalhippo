export default function paymentLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="max-w-6xl mx-auto px-8 py-4">
      {children}
    </section>
  );
}