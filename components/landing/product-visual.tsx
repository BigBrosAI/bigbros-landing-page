import type { ProductVisual as V } from '@/lib/catalog';
import { HeroPhone } from '@/components/landing/hero-phone';
import { InboxDemo } from '@/components/landing/inbox-demo';
import { CampaignDemo } from '@/components/landing/campaign-demo';
import { FlowEditorDemo } from '@/components/landing/dashboard-showcase';
import { AdsVisual, AnalyticsVisual, ApiVisual, EmailVisual, FormsVisual, JourneyVisual } from '@/components/landing/product-visuals';

export function ProductVisual({ visual }: { visual: V }) {
  switch (visual) {
    case 'phone':
      return <HeroPhone />;
    case 'inbox':
      return <InboxDemo />;
    case 'campaign':
      return <CampaignDemo />;
    case 'flow':
      return <FlowEditorDemo />;
    case 'api':
      return <ApiVisual />;
    case 'ads':
      return <AdsVisual />;
    case 'forms':
      return <FormsVisual />;
    case 'email':
      return <EmailVisual />;
    case 'journey':
      return <JourneyVisual />;
    case 'analytics':
      return <AnalyticsVisual />;
  }
}
