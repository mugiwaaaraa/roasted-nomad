'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

// ─── Types ────────────────────────────────────────────────────────────────────

interface MenuItem {
  name: string
  description?: string
  price: string
  note?: string
}

interface MenuSection {
  id: string
  title: string
  subtitle?: string
  items: MenuItem[]
}

// ─── Menu Data ────────────────────────────────────────────────────────────────

const SECTIONS: MenuSection[] = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    items: [
      { name: 'Eggs Benedict', description: 'Two soft-poached eggs, choice of ham, bacon or sautéed spinach on toasted open-faced croissant, house made hollandaise, cubed hashbrowns', price: '$20' },
      { name: 'The Classic', description: 'Two eggs, bacon/ham/breakfast sausage, cubed hashbrowns, marble rye toast', price: '$17' },
      { name: 'Chicken and Waffles', description: 'Belgium waffles with chicken fried in house-made batter, soft basted egg, hot honey sauce, cubed hashbrowns', price: '$24' },
      { name: 'T&T Breakfast Sandwich', description: 'Bell peppers and onions scrambled with eggs, bacon, cheese, lettuce, tomato, garlic aioli on toasted City Bread marble rye, cubed hashbrowns', price: '$18.75' },
      { name: 'Huevos Rancheros', description: 'Soft basted eggs, Catalina\'s house made salsa on two crispy tortillas, feta, sour cream drizzle, refried beans, avocado', price: '$18' },
      { name: 'The Brandon Brisket', description: 'BBQ brisket burnt ends, two soft poached eggs, cubed hashbrowns, bell peppers, onions, spicy aioli', price: '$24' },
    ],
  },
  {
    id: 'sweet',
    title: 'Sweet Stuff',
    items: [
      { name: 'Caramel Blueberry Banana Pancakes', description: 'Three fluffy blueberry pancakes, sliced bananas, house-made caramel sauce, whipped cream', price: '$19' },
      { name: 'Pumpkin French Toast', description: 'Brioche French toast, house-made pumpkin schmear, caramel sauce, candied pecans, pumpkin seeds, whipped cream', price: '$19' },
      { name: 'Overnight Oats', description: 'Oats soaked in oat milk with maple, vanilla, chia seeds, cinnamon, berries, almonds, toasted coconut, cinnamon sugar. Served cold.', price: '$16.50' },
    ],
  },
  {
    id: 'toast',
    title: 'Toasted Nomad',
    items: [
      { name: 'Smoked Salmon Toast', description: 'Multigrain sourdough, dill cream cheese, smoked salmon, two soft poached eggs, cucumber, red onion, feta', price: '$21' },
      { name: 'Mushroom Toast', description: 'Multigrain sourdough, whipped feta, sautéed mushrooms, two soft poached eggs, avocado, pickled onions', price: '$19' },
      { name: 'Smashed Avocado and Eggs', description: 'Multigrain sourdough, avocado, two soft poached eggs, cherry tomatoes, feta, balsamic drizzle', price: '$19' },
    ],
  },
  {
    id: 'soup',
    title: "Soup N' Salad",
    items: [
      { name: 'Caesar Salad', description: 'Fresh romaine, Caesar dressing, bacon bits, parmesan, house-made croutons', price: '$16', note: 'Add garlic toast +$4 · Add grilled chicken breast +$7.50' },
      { name: 'The Nomad Salad', description: 'Mixed greens, sweet potato, sliced radish, crispy honey chickpeas, pumpkin seeds, feta, honey mustard vinaigrette', price: '$17', note: 'Add grilled chicken breast +$7.50' },
      { name: 'Harvest Salad', description: 'Mixed greens, roasted beets, feta, red onion, avocado, candied pecans, maple balsamic vinaigrette', price: '$17' },
      { name: 'Soup', description: 'Ask your server about the soup of the day', price: '$9' },
      { name: 'Soup, Salad & Garlic Toast', description: 'Soup of the day, side Caesar or mixed green salad, garlic toast', price: '$19', note: 'Upgrade to Nomad or Harvest Salad +$3.50' },
    ],
  },
  {
    id: 'handhelds',
    title: 'Handhelds',
    subtitle: 'Served with choice of soup, salad (mixed greens or caesar) or house-cut fries',
    items: [
      { name: 'The Nomad Burger', description: 'Two smash patties, bacon, sautéed mushrooms, mozzarella, caramelized onions, pickles, garlic aioli on brioche bun', price: '$24', note: 'Add over easy egg +$2 · Add side of gravy +$2' },
      { name: 'The Reuben', description: 'Corned beef prepared in house, sauerkraut, caramelized onions, white cheddar, thousand island on toasted marble rye', price: '$21' },
      { name: 'Vegan Curry Cauli Wrap', description: 'Fried cauliflower, carrots, bell peppers, onion, cucumber, crispy fried onions, vegan pesto mayo', price: '$20' },
      { name: 'Cranberry Chicken Ciabatta', description: 'Grilled chicken breast, mozzarella, pickled onions, bacon, mixed greens, Sudha\'s house-made cranberry sauce, spicy aioli on grilled ciabatta', price: '$21' },
      { name: 'Thai Peanut Crunch Chicken Burger', description: 'Chicken fried in house-made batter, Thai peanut sauce, coleslaw, garlic aioli on brioche bun', price: '$23' },
      { name: 'Brisket Grilled Cheese', description: 'BBQ brisket burnt ends, cheddar cheese, garlic aioli, pickles on grilled marble rye', price: '$24' },
    ],
  },
  {
    id: 'coffee',
    title: 'Coffee & Tea',
    subtitle: 'Add oat milk +$0.75 · Add flavour shot +$0.75 (vanilla, caramel, hazelnut, lavender) · Decaf espresso available',
    items: [
      { name: 'Drip Coffee', description: 'DeLuca\'s French Roast. Decaf available.', price: '$4' },
      { name: 'Latte', description: 'Hot or iced', price: '$5.25' },
      { name: 'Cappuccino', price: '$4.75' },
      { name: 'Americano', price: '$4.25' },
      { name: 'Mexican Mocha', price: '$6' },
      { name: 'Aussie Style Coffee', description: 'Chocolate OR vanilla ice cream', price: '$7' },
      { name: 'Affogato', description: 'Chocolate OR vanilla ice cream', price: '$6.25' },
      { name: 'Pumpkin Spice Latte', price: '$6.75' },
      { name: 'Sugar Cookie Latte', description: 'Contains almond syrup', price: '$6.75' },
      { name: 'Peppermint White Mocha', description: 'Contains a gingerbread cookie', price: '$6.75' },
      { name: 'Tea', price: '$4' },
      { name: 'Matcha Latte', description: 'Hot or iced', price: '$6' },
      { name: 'Iced Strawberry Matcha', price: '$7' },
      { name: 'Chai Latte', description: 'Hot or iced', price: '$6' },
      { name: 'Lavender London Fog', price: '$6' },
      { name: 'Mexican Hot Chocolate', price: '$5' },
      { name: 'Cookies n\' Cream White Hot Chocolate', price: '$6' },
      { name: 'Hot Apple Cider', description: 'Cinnamon, apple, lemon, star anise', price: '$6' },
      { name: 'Pumpkin Chai Latte', price: '$6.50' },
    ],
  },
  {
    id: 'zeroproof',
    title: 'Zero Proof',
    subtitle: 'Non-alcoholic',
    items: [
      { name: 'Citrus Berry Spritz', description: 'Zero proof orange liqueur, berry syrup, strawberry puree, lemon juice & soda', price: '$8.50' },
      { name: 'Spicy Sunrise Splash', description: 'Zero proof citrus jalapeño liqueur, raspberry jam, mango juice, pineapple juice', price: '$8.50' },
      { name: 'Virgin Caesar', description: 'Clamato, pickle juice, HP sauce, garnish, tobasco, worcestershire', price: '$8' },
      { name: 'Zero Proof Wine', description: 'Red or White', price: '$8.50' },
      { name: 'Zero Proof Cider/Beer', description: 'Bulwark Apple Cider / Peroni Beer', price: '$7' },
    ],
  },
  {
    id: 'refreshers',
    title: 'Refreshers',
    subtitle: 'Non-alcoholic',
    items: [
      { name: 'Pop', description: 'Pepsi, Diet Pepsi, 7-UP, brisk iced tea, gingerale, rootbeer', price: '$4' },
      { name: 'Juice', description: 'Apple, orange, grapefruit, pineapple, cranberry, mango', price: '$4' },
      { name: 'Flavoured Lemonade', description: 'Raspberry, Watermelon or Passionfruit', price: '$5.75' },
      { name: 'Blue Raspberry Matcha Lemonade', price: '$6' },
      { name: 'Rootbeer Float', price: '$6.50' },
    ],
  },
  {
    id: 'cocktails',
    title: 'Cocktails',
    items: [
      { name: 'Butler\'s Bailey\'s Latte', description: 'Bailey\'s liqueur, vanilla syrup, cinnamon, dbl espresso', price: '$13' },
      { name: 'Spiked Hot Apple Cider', description: 'Apple cider, spiced rum OR cherry whisky, cinnamon, lemon, apple star anise', price: '$13' },
      { name: 'Caesar', description: 'Vodka OR Gin, garnish, Clamato, pickle juice, HP sauce, tobasco, worcestershire', price: '$13' },
      { name: 'NV Espresso Martini', description: 'DBL Espresso, vodka, Kahlua, vanilla syrup, Mexican Chocolate Garnish', price: '$15' },
      { name: 'Peach Long Island', description: 'Long island mix, peach schnapps, pepsi, lime juice', price: '$14' },
      { name: 'Aperol Spritz', description: 'Aperol, Prosecco, zero proof orange liqueur, soda', price: '$15' },
      { name: 'Red or White Wine Sangria', description: 'Peach schnapps, apricot brandy, red wine, assorted juices, soda', price: '$14' },
      { name: 'Rum-Kissed Cider Sangria', description: 'White wine, spiced rum, apple cider, gingerale, cinnamon', price: '$14' },
      { name: 'Classic Mimosa', description: 'Prosecco, orange juice or grapefruit', price: '$11.50' },
      { name: 'Pineapple Peach Mimosa', description: 'Prosecco, peach schnapps, pineapple juice', price: '$13.50' },
      { name: '"Agata have one!" Mimosa', description: 'Apricot brandy, Prosecco, grapefruit juice', price: '$13.50' },
      { name: 'Mango Malibu Mimosa', description: 'Prosecco, malibu, mango juice', price: '$13.50' },
      { name: 'Peach Mango Mimosa', description: 'Prosecco, peach schnapps, mango juice', price: '$13.50' },
      { name: 'Cherry Cranberry Mimosa', description: 'Prosecco, cherry whisky, cranberry juice', price: '$13.50' },
    ],
  },
  {
    id: 'wine',
    title: 'Wine',
    items: [
      { name: 'House Red', price: '$10 / $14 / $38' },
      { name: 'House White', price: '$10 / $14 / $38' },
      { name: 'Prosecco', price: '$10' },
    ],
  },
  {
    id: 'beer',
    title: 'Beer & Cider',
    items: [
      { name: 'Import', description: 'Corona, Stella Artois', price: '$8' },
      { name: 'Local', description: 'LBJ 1919 Pale Ale, Nonsuch Belgium Blonde, Kilter Juicy IPA', price: '$8.75' },
      { name: 'Cider', description: 'Lost Craft Cider (Apple)', price: '$9' },
    ],
  },
  {
    id: 'kids',
    title: 'Kids Menu',
    subtitle: 'All kids meals $11 — includes choice of milk, chocolate milk, OJ, apple juice, Pepsi, 7-Up or iced tea',
    items: [
      { name: 'Little Classic', description: 'Scrambled eggs, fruit cup, choice of bacon/ham/sausage', price: '$11' },
      { name: 'Pancakes', description: 'Two pancakes with choice of bacon/ham/sausage or fruit cup', price: '$11' },
      { name: 'Chicken Fingers', description: 'Three chicken fingers, honey dill, house cut fries', price: '$11' },
      { name: 'Cheeseburger', description: 'Brioche bun, smash patty, cheddar, pickles, house cut fries', price: '$11' },
      { name: 'Grilled Cheese', description: 'Bothwell cheddar on marble rye, house cut fries', price: '$11' },
    ],
  },
]

const NAV_LINKS = [
  { label: 'Breakfast', id: 'breakfast' },
  { label: 'Sweet Stuff', id: 'sweet' },
  { label: 'Toasted Nomad', id: 'toast' },
  { label: "Soup & Salad", id: 'soup' },
  { label: 'Handhelds', id: 'handhelds' },
  { label: 'Coffee & Tea', id: 'coffee' },
  { label: 'Cocktails', id: 'cocktails' },
  { label: 'Kids', id: 'kids' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ItemRow({ item }: { item: MenuItem }) {
  const isMobile = useIsMobile()

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: isMobile ? '4px' : '24px',
      padding: '14px 0',
      borderBottom: '1px solid rgba(44,24,16,0.08)',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-playfair-display)',
          fontWeight: 700,
          fontSize: '1.05rem',
          color: '#2C1810',
          margin: '0 0 4px 0',
        }}>
          {item.name}
        </p>
        {item.description && (
          <p style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '13px',
            color: '#2C1810',
            opacity: 0.55,
            lineHeight: 1.55,
            margin: 0,
          }}>
            {item.description}
          </p>
        )}
        {item.note && (
          <p style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '12px',
            color: '#C17D3C',
            fontStyle: 'italic',
            margin: '4px 0 0 0',
          }}>
            {item.note}
          </p>
        )}
      </div>
      <p style={{
        fontFamily: 'var(--font-playfair-display)',
        fontWeight: 600,
        fontSize: '1rem',
        color: '#C17D3C',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        margin: isMobile ? '4px 0 0 0' : 0,
      }}>
        {item.price}
      </p>
    </div>
  )
}

function FadeSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MenuPage() {
  const isMobile = useIsMobile()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#F5EFE6' }}>
      {/* Floating nav — transparent, over hero */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 16px' : '0 40px',
        height: '64px',
      }}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Roasted Nomad"
            width={120}
            height={36}
            style={{ objectFit: 'contain', height: '36px', width: 'auto', filter: 'brightness(0) invert(1)' }}
          />
        </Link>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-inter-var)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            opacity: 0.75,
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
        >
          ← Back to Home
        </Link>
      </header>

      {/* Hero banner */}
      <div style={{ position: 'relative', zIndex: 0, height: isMobile ? '35vh' : '45vh', overflow: 'hidden' }}>
        <Image
          src="/images/interior-dining.jpg"
          alt="Roasted Nomad interior"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,10,5,0.5)' }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}>
          <Image
            src="/logo.png"
            alt="Roasted Nomad"
            width={200}
            height={60}
            style={{ objectFit: 'contain', height: '50px', width: 'auto', filter: 'brightness(0) invert(1)' }}
          />
          <h1 style={{
            fontFamily: 'var(--font-playfair-display)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: 900,
            fontStyle: 'italic',
            color: '#FFFFFF',
            margin: 0,
          }}>
            The Menu
          </h1>
        </div>
      </div>

      {/* Sticky section nav */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#F5EFE6',
        borderBottom: '1px solid #E8D5B7',
        padding: isMobile ? '0 16px' : '0 40px',
        display: 'flex',
        gap: isMobile ? '0' : '32px',
        overflowX: 'auto',
      }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={{
                fontFamily: 'var(--font-inter-var)',
                fontSize: isMobile ? '10px' : '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#2C1810',
                opacity: 0.5,
                textDecoration: 'none',
                padding: isMobile ? '12px 10px' : '14px 16px',
                flexShrink: 0,
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
            >
              {link.label}
            </a>
          ))}
      </nav>

      {/* Menu content */}
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: isMobile ? '40px 16px 80px' : '60px 40px 100px' }}>
        {SECTIONS.map((section) => (
          <FadeSection key={section.id}>
            <section
              id={section.id}
              style={{ marginBottom: '64px', scrollMarginTop: '80px' }}
            >
              <h2
                id={
                  section.id === 'breakfast' ? 'brunch' :
                  section.id === 'coffee' ? 'coffee' :
                  section.id === 'cocktails' ? 'cocktails' :
                  undefined
                }
                style={{
                  fontFamily: 'var(--font-playfair-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 900,
                  color: '#2C1810',
                  margin: '0 0 8px 0',
                  lineHeight: 1.1,
                }}
              >
                {section.title}
              </h2>
              <div style={{ width: '48px', height: '2px', background: '#C17D3C', marginBottom: '12px' }} />
              {section.subtitle && (
                <p style={{
                  fontFamily: 'var(--font-inter-var)',
                  fontSize: '13px',
                  color: '#2C1810',
                  opacity: 0.55,
                  fontStyle: 'italic',
                  marginBottom: '8px',
                }}>
                  {section.subtitle}
                </p>
              )}
              <div>
                {section.items.map((item) => (
                  <ItemRow key={item.name} item={item} />
                ))}
              </div>
            </section>
          </FadeSection>
        ))}
      </main>
    </div>
  )
}
