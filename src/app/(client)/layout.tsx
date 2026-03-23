import ClientBottomNav from "@/components/layout/ClientBottomNav";
import AuthGuard from "@/components/layout/AuthGuard";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background pb-20">
        <main className="max-w-lg mx-auto">{children}</main>
        <ClientBottomNav />
      </div>
    </AuthGuard>
  );
}
