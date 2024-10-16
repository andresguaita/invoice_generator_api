export class DIANService {
    public static async submitInvoice(invoice: any): Promise<{ success: boolean }> {
      const randomFailure = Math.random() < 0.3; 
      if (randomFailure) {
        return { success: false };
      }
      return { success: true };
    }
  }
  