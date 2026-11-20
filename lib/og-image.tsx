import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = 'BigBrosAI — Free WhatsApp Business API & AI Chatbot Platform';

/** 1200×630 share card in flat brand colours (no gradients). */
export async function renderOgImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo-black.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0B2E23', padding: '64px 72px', color: '#fff' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={330} height={98} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Grow your business on WhatsApp</div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: '#4ADE80' }}>with AI that never sleeps.</div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 26, color: '#D1FADF' }}>
          {['Official WhatsApp Business API', 'Live chat', 'AI chatbots', 'WhatsApp Pay'].map((t) => (
            <div key={t} style={{ display: 'flex', border: '2px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '10px 22px' }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize
  );
}
