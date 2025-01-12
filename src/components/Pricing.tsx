import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '0',
    features: [
      'Single landing page',
      'Basic templates',
      'Custom domain',
      'SSL certificate',
      'Basic analytics'
    ],
    buttonText: 'Get Started',
    highlighted: false
  },
  {
    name: 'Pro',
    price: '19',
    features: [
      'Multiple landing pages',
      'Premium templates',
      'Custom domain',
      'SSL certificate',
      'Advanced analytics',
      'Remove branding',
      'Priority support'
    ],
    buttonText: 'Start Pro Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: '49',
    features: [
      'Unlimited landing pages',
      'Custom templates',
      'Multiple domains',
      'SSL certificate',
      'Advanced analytics',
      'Remove branding',
      '24/7 Priority support',
      'API access',
      'Custom integrations'
    ],
    buttonText: 'Contact Sales',
    highlighted: false
  }
];

export const Pricing = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.highlighted ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              <div className="p-6 bg-white rounded-t-lg">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <button
                  className={`mt-8 w-full py-3 px-4 rounded-md shadow ${
                    plan.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8 bg-white rounded-b-lg">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 