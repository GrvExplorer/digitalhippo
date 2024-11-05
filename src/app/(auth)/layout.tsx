export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen items-center justify-center">
      {children}
    </section>
  );
}
