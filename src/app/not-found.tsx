import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black bg-gradient-to-r from-[#d4a843] to-[#e8c76a] bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Page introuvable</h1>
        <p className="text-[#a3a3a3] mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-[#d4a843] to-[#b8912e] text-black font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-[rgba(255,255,255,0.08)] text-white rounded-xl hover:border-[#d4a843]/30 transition-all"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
