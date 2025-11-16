import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ER</span>
              </div>
              <span className="text-white font-bold text-xl">EXTERNAL RP</span>
            </div>
            <p className="text-gray-400 text-sm">
              Server GTA SAMP Roleplay terbaik di Indonesia dengan fitur modern dan komunitas yang ramah.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/players" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Players
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-gray-400 text-sm mb-2">
              Server IP: <span className="text-sky-400 font-mono">samp.externalrp.com:7777</span>
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Discord: <span className="text-sky-400">discord.gg/externalrp</span>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 EXTERNAL ROLEPLAY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
