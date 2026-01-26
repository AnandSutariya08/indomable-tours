import { motion } from "framer-motion";

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader = ({ badge, title, subtitle, backgroundImage }: PageHeaderProps) => {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background" />
        </div>
      )}
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-body text-sm font-medium mb-6"
            >
              {badge}
            </motion.span>
          )}
          <h1 className={`heading-display-lg mb-6 ${backgroundImage ? 'text-cream' : 'text-primary'}`}>
            {title}
          </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`body-display-md max-w-2xl mx-auto ${backgroundImage ? 'text-cream/90' : 'text-foreground'}`}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
