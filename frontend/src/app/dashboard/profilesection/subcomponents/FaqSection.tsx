const FAQSection = () => {
  const css = {
    answer: "mb-[1rem]",
    question: "mb-[.6rem] text-lg opacity-[.8] font-semibold",
  };

  // FAQ data stored as an array of objects
  const faqData = [
    {
      question: "What happens when I update my email address (or mobile number)?",
      answer:
        "Your login email id (or mobile number) changes, likewise. You’ll receive all account-related communication on your updated email address.",
    },
    {
      question: "Will my Bomboo account be updated with the new email address?",
      answer:
        "It happens as soon as you confirm the verification code sent to your email.",
    },
  ];

  return (
    <div className="p-4 border-b">
      <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
      <div className="text-sm text-gray-dark">
        {faqData.map((faq, index) => (
          <div key={index} className="mb-4">
            <p className={css.question}>{faq.question}</p>
            <p className={css.answer}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
