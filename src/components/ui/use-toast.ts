
import { toast } from "sonner"

// Re-export toast from sonner for backward compatibility
export { toast }

// Create a useToast hook that uses sonner
export const useToast = () => {
  return {
    toast,
    toasts: [] // sonner handles toast state internally
  }
}
