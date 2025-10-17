import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (code: string) => boolean;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = onLogin(code);
    if (success) {
      setIsTransitioning(true);
    } else {
      setError('Código de acceso incorrecto');
      setCode('');
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 transition-opacity duration-1000 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img
              src="/logo_getsetweb.png"
              alt="GetSetWeb Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-4xl font-light text-white mb-2 tracking-wide">GetSetWeb</h1>
          <p className="text-[#d4d4d4]">Sistema de Acceso Ejecutivo</p>
        </div>

        <div className="backdrop-blur-sm bg-[#1a1a1a]/50 border border-[#FFD700]/20 rounded-2xl p-8 shadow-2xl shadow-[#FFD700]/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="access-code" className="block text-sm font-medium text-[#d4d4d4] mb-2">
                Código de Acceso
              </label>
              <input
                id="access-code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border-2 border-[#FFD700]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:shadow-lg focus:shadow-[#FFD700]/30 transition-all duration-300"
                placeholder="Ingrese su código"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 animate-shake">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0a0a0a] font-bold rounded-lg hover:shadow-lg hover:shadow-[#FFD700]/50 transform hover:scale-105 transition-all duration-300"
            >
              Acceder al Dashboard
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
