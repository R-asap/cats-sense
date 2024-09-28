'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Globe, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

const languages = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en': 'English',
  'fr': 'Français'
} as const

type LanguageCode = keyof typeof languages

type Translation = {
  title: string
  categories: string[]
  explore: string
}

const translations: Record<LanguageCode, Translation> = {
  'zh-CN': {
    title: "猫的感觉",
    categories: ["猫砂", "猫粮", "冻干"],
    explore: "探索产品"
  },
  'zh-TW': {
    title: "貓的感覺",
    categories: ["貓砂", "貓糧", "凍乾"],
    explore: "探索產品"
  },
  'en': {
    title: "Cat's Sense",
    categories: ["Cat Litter", "Cat Food", "Freeze-Dried Treats"],
    explore: "Explore Products"
  },
  'fr': {
    title: "Le Sens du Chat",
    categories: ["Litière pour Chat", "Nourriture pour Chat", "Friandises Lyophilisées"],
    explore: "Explorer les Produits"
  }
}

export function CatsSenseComponent() {
  const [lang, setLang] = useState<LanguageCode>('en')
  const t = translations[lang]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">{t.title}</h1>
          <nav className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                <Globe className="w-5 h-5" />
                <span>{languages[lang]}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                {(Object.entries(languages) as [LanguageCode, string][]).map(([code, name]) => (
                  <button
                    key={code}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100"
                    onClick={() => setLang(code)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <button className="text-gray-600 hover:text-purple-600">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-purple-800 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600">{t.explore}</p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={`https://source.unsplash.com/400x300/?cat,${category.toLowerCase()}`}
                alt={category}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">{category}</h3>
                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                  {t.explore}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="bg-purple-800 text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 {t.title}. {t.explore}</p>
        </div>
      </footer>
    </div>
  )
}
