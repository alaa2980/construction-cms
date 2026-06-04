// resources/js/Components/UI/Button.jsx
import { motion } from "framer-motion";
import { cn } from "@/Utils/cn";

export default function Button({ 
    children, 
    variant = "primary", 
    className, 
    type = "button", 
    ...props 
}) {
    // Define base button styles (semi-sharp edges, bold font, and centering)
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-bold tracking-wide transition-colors duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

    // Define button variants based on the visual identity
    const variants = {
        primary: "bg-gold text-charcoal-dark hover:bg-gold-light focus:ring-gold",
        secondary: "bg-charcoal text-white hover:bg-charcoal-light focus:ring-charcoal",
        outline: "border-2 border-gold text-gold hover:bg-gold hover:text-charcoal-dark focus:ring-gold",
    };

    return (
        <motion.button
            type={type}
            className={cn(baseStyles, variants[variant], className)}
            // تأثيرات Framer Motion عند الضغط والمرور
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}