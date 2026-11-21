const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Renders WhatsApp markdown to safe HTML for the preview. */
export function renderWhatsApp(text: string) {
  let h = escape(text);
  h = h.replace(/```([\s\S]+?)```/g, '<code class="rounded bg-black/5 px-1 font-mono text-[13px]">$1</code>');
  h = h.replace(/(^|[\s(])\*(\S(?:[^*\n]*\S)?)\*(?=[\s).,!?:;]|$)/gm, '$1<strong>$2</strong>');
  h = h.replace(/(^|[\s(])_(\S(?:[^_\n]*\S)?)_(?=[\s).,!?:;]|$)/gm, '$1<em>$2</em>');
  h = h.replace(/(^|[\s(])~(\S(?:[^~\n]*\S)?)~(?=[\s).,!?:;]|$)/gm, '$1<s>$2</s>');
  h = h.replace(/^&gt; (.*)$/gm, '<span class="block border-l-4 border-black/20 pl-2 text-black/60">$1</span>');
  h = h.replace(/^[-*] (.*)$/gm, '<span class="block pl-1">• $1</span>');
  return h.replace(/<\/span>\n/g, '</span>').replace(/\n/g, '<br/>');
}
