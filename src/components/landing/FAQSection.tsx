
import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I get started with Alignify?",
      answer: "Simply download the app from Google Play or the App Store, follow the setup guide, and start using Alignify instantly."
    },
    {
      question: "Can I customize Alignify's responses to fit my needs?",
      answer: "Yes! Alignify supports extensive customization options to tailor responses and workflows to your specific requirements."
    },
    {
      question: "What types of tasks can Alignify assist with?",
      answer: "Alignify can help with data visualization, dashboard creation, analytics, reporting, and collaborative data storytelling."
    },
    {
      question: "Is Alignify available in multiple languages?",
      answer: "Currently Alignify supports English with plans to expand to additional languages in future updates."
    },
    {
      question: "What kind of support is available if I encounter issues?",
      answer: "We provide comprehensive support through documentation, community forums, and direct customer service channels."
    },
    {
      question: "Can AI cancel my subscription?",
      answer: "You have full control over your subscription and can cancel anytime through your account settings."
    },
    {
      question: "Can Alignify generate images?",
      answer: "Yes, Alignify can help generate visual elements and charts for your data visualization needs."
    }
  ];

  return (
    <section id="faq" className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Have Questions?</h2>
          <p className="text-xl text-gray-400">
            Our FAQ section covers everything you need to know about Alignify, from setup and customization to troubleshooting and support. Find quick, helpful answers to make integrating Alignify into your website seamless and hassle-free.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
              <CollapsibleTrigger className="w-full p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 text-left hover:bg-gray-900/50 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <Plus className={`w-5 h-5 transform transition-transform ${openFaq === index ? 'rotate-45' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                <div className="pt-4">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
