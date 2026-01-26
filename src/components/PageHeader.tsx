import { motion } from "framer-motion";

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader = ({ badge, title, subtitle, backgroundImage }: PageHeaderProps) => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-secondary blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary blur-3xl"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 text-secondary font-body text-sm font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                {badge}
              </span>
            </motion.div>
          )}
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`heading-display-lg mb-6 ${backgroundImage ? 'text-cream' : 'text-primary'}`}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`body-display-md max-w-2xl mx-auto leading-relaxed ${backgroundImage ? 'text-cream/90' : 'text-foreground'}`}
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent"
          />
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent opacity-60" />
    </section>
  );
};

export default PageHeader;
