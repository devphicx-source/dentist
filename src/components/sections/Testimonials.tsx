"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    name: "Priya Sharma",
    review:
      "I was terrified of dental treatments, but Dr. Kumar made me feel completely at ease. My smile makeover turned out absolutely beautiful. Highly recommend!",
    rating: 5,
  },
  {
    name: "Amit Patel",
    review:
      "Got dental implants done here and the results are incredible. The whole process was painless and the staff was extremely professional. Best clinic in the city!",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    review:
      "The teeth whitening procedure took only 45 minutes and the results were amazing! My teeth are several shades brighter. The clinic is so clean and modern.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    review:
      "Had a root canal done without any pain whatsoever. Dr. Kumar's expertise is unmatched. The advanced equipment they use really makes a difference.",
    rating: 5,
  },
  {
    name: "Meera Joshi",
    review:
      "My Invisalign journey has been smooth and comfortable. The team tracks my progress carefully and the results are already showing. Love this place!",
    rating: 4,
  },
  {
    name: "Vikram Singh",
    review:
      "From emergency treatment to regular checkups, DentaCare has been our family's go-to clinic for 3 years. The quality of care is consistently excellent.",
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
