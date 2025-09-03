"use client";

import { motion } from 'framer-motion';

const stats = [
  { label: 'Messages delivered', value: '50M+', suffix: '' },
  { label: 'Uptime', value: '99.9', suffix: '%' },
  { label: 'Setup time', value: '<5', suffix: ' min' },
  { label: 'Support response', value: '24/7', suffix: '' },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-primary/5 dark:bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-muted-foreground text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}