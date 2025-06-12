export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="text-lg">Page non trouvée</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Retour à l'accueil
      </a>
    </div>
  );
}