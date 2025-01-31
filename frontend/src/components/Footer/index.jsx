// components/Footer.js
import Link from 'next/link';
import Newsletter from './NewsLetter';


const footerLinks = {
  SHOP: [
    { name: 'Our Story', href: '/our-story' },
    { name: 'Visit Melbourne Studio', href: '/melbourne' },
    { name: 'Visit Sydney Studio', href: '/sydney' },
    { name: 'Visit Brisbane Studio', href: '/brisbane' },
    { name: 'Design', href: '/design' },
    { name: 'How Davici Works', href: '/how-it-works' },
  ],
  HELP: [
    { name: 'Contact & FAQ', href: '/faq' },
    { name: 'Track Your Order', href: '/track-order' },
    { name: 'Shipping & Delivery', href: '/shipping' },
    { name: 'Visit Brisbane Studio', href: '/brisbane' },
    { name: 'Interest Free Finance', href: '/finance' },
    { name: 'Cipmoney', href: '/cipmoney' },
  ],
  SERVICES: [
    { name: 'Assembly Guides', href: '/guides' },
    { name: 'Furniture Packages & Fitouts', href: '/packages' },
    { name: 'Trade Programme', href: '/trade' },
    { name: 'Sale', href: '/sale' },
    { name: 'New Designs', href: '/new' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ],
  CONNECT: [
    { name: 'Twitter', href: '/twitter' },
    { name: 'Facebook', href: '/facebook' },
    { name: 'Instagram', href: '/instagram' },
    { name: 'Pinterest', href: '/pinterest' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Contact', href: '/contact' },
  ],
};

const paymentMethods = [
  { name: '2CO', image: '/2co.png' },
  { name: 'PayPal', image: '/images/footer/social-links/paypal.jpeg' },
  { name: 'Mastercard', image: '/mastercard.png' },
  { name: 'JCB', image: '/jcb.png' },
  { name: 'Western Union', image: '/western-union.png' },
];

const Footer = () => {
  return (
    <footer className="bg-white">
  <Newsletter/>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-blue-300 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              © 2025 - Copyright 
              <Link href="/privacy" className="ml-4 hover:text-gray-700">Privacy</Link>
              <Link href="/terms" className="ml-4 hover:text-gray-700">Terms</Link>
              <Link href="/promo-terms" className="ml-4 hover:text-gray-700">
                *Promo T&Cs Apply (view here)
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
            <img src="/images/footer/social-links/payment.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;