"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    name: "Dr. Sonali Choudhary",
    review:
      "I had a wonderful experience with Dr. Navneet Agrawal. He is not only highly skilled and professional but also very polite and patient-friendly. The clinic is excellent and highly recommended.",
    rating: 5,
  },
  {
    name: "Pushpendra Singh",
    review:
      "I recently had the pleasure of visiting Dr. Navneet Agrawal for dental care, and I must say, it was an exceptional experience. Dr. Agrawal is not only highly skilled and knowledgeable but also incredibly patient and understanding.",
    rating: 5,
  },
  {
    name: "Ranu Jain",
    review:
      "Exceptional Dental Care for Kids! I had a wonderful experience at Dr. Navneet Agrawal's clinic for my 6-year-old. The staff was courteous and efficient, making the entire process seamless.",
    rating: 5,
  },
  {
    name: "Patient Feedback",
    review:
      "Nice behavior with excellent work. Will provide the desired result at the end of your treatment. Thanks doctors for the exceptional care.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-gradient-to-b from-white to-background overflow-hidden">
      <Container>
        <SectionHeading
          title="What Our Patients Say"
          subtitle="Real reviews from real patients. Our commitment to excellence speaks through their experiences."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              name={t.name}
              review={t.review}
              rating={t.rating}
              avatar={`/images/reviews/${i % 4}.jpg`}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
