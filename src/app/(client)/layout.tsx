import ClientBottomNav from "@/components/layout/ClientBottomNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="max-w-lg mx-auto">{children}</main>
      <ClientBottomNav />
    </div>
  );
}
