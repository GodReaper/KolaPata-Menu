// RestroMenu.tsx

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronUp } from "lucide-react"
import Image from "next/image"
import { menuCategories } from "@/constants/menuCategories" 

export default function RestroMenu() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToCategory = (index: number) => {
    setActiveCategory(index)
    const element = document.getElementById(`category-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative h-screen bg-gray-100 p-4">
      <ScrollArea className="h-[calc(100vh-2rem)] rounded-md border">
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Our Menu</h1>
          {menuCategories.map((category, index) => (
            <div key={index} id={`category-${index}`} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600">₹{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="absolute bottom-6 right-6">
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-full w-12 h-12 p-0"
        >
          <ChevronUp className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </Button>
        {isMenuOpen && (
          <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-lg p-2">
            {menuCategories.map((category, index) => (
              <Button
                key={index}
                onClick={() => scrollToCategory(index)}
                variant="ghost"
                className="block w-full text-left mb-1"
              >
                {category.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
