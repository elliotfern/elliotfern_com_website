declare module "react-ga4" {
    interface GAOptions {
      debugMode?: boolean;
      gaOptions?,
    }
  
    interface EventParams {
      category: string;
      action: string;
      label?: string;
      value?: number;
    }
  
    export function initialize(trackingId: string, options?: GAOptions): void;
    export function event(params: EventParams): void;
    export function pageview(path: string): void;
    export function set(fields: Record<string, unknown>): void;
  }
  