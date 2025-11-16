'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

export default function Home() {
  const [stats, setStats] = useState({
    players: 0,
    maxPlayers: 500,
    onlinePlayers: 0,
  });

  useEffect(() => {
    const targetPlayers = 347;
    let current = 0;
    const interval = setInterval(() => {
      if (current < targetPlayers) {
        current += Math.ceil(targetPlayers / 50);
        if (current > targetPlayers) current = targetPlayers;
        setStats(prev => ({ ...prev, onlinePlayers: current }));
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: 'Roleplay Realistis',
      description: 'Sistem roleplay yang mendalam dengan berbagai pekerjaan dan faction',
      gradient: 'from-sky-400 to-blue-500',
    },
    {
      title: 'Ekonomi Dinamis',
      description: 'Sistem ekonomi yang seimbang dengan berbagai cara untuk menghasilkan uang',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Komunitas Aktif',
      description: 'Komunitas yang ramah dan aktif dengan event rutin setiap minggu',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Update Berkala',
      description: 'Fitur baru dan perbaikan bug secara berkala untuk pengalaman terbaik',
      gradient: 'from-pink-500 to-red-500',
    },
  ];

  const jobs = [
    'Police Officer',
    'Medic',
    'Mechanic',
    'Taxi Driver',
    'Bus Driver',
    'Trucker',
    'Fisherman',
    'Miner',
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-black to-black"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-sky-500/20 border border-sky-500/50 rounded-full text-sky-400 text-sm font-semibold mb-6">
              🎮 Server Online - {stats.onlinePlayers}/{stats.maxPlayers} Players
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            EXTERNAL
            <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              ROLEPLAY
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Bergabunglah dengan server GTA SAMP Roleplay terbaik di Indonesia. 
            Pengalaman roleplay yang realistis dan komunitas yang ramah menanti Anda!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-sky-500/50"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/shop"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold text-lg transition-all border border-white/20"
            >
              Lihat Shop
            </Link>
          </div>

          <div className="inline-block px-6 py-3 bg-black/50 backdrop-blur-sm rounded-lg border border-sky-500/30">
            <p className="text-gray-300">
              Server IP: <span className="text-sky-400 font-mono font-bold">samp.externalrp.com:7777</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kenapa Pilih <span className="text-sky-400">EXTERNAL RP?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Fitur-fitur unggulan yang membuat pengalaman bermain Anda lebih seru
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-sky-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg mb-4 flex items-center justify-center`}>
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Berbagai <span className="text-sky-400">Pekerjaan</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Pilih pekerjaan yang sesuai dengan karakter Anda
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 hover:border-sky-500/50 transition-all text-center group hover:transform hover:scale-105"
              >
                <p className="text-white font-semibold group-hover:text-sky-400 transition-colors">
                  {job}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-2xl p-12 border border-sky-500/30 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Siap Memulai Petualangan?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Daftar sekarang dan dapatkan bonus $5,000 untuk memulai perjalanan roleplay Anda!
            </p>
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-sky-500/50"
            >
              Daftar Gratis Sekarang
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
