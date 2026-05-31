export function stripHtml(htmlString: string): string {
  if (!htmlString) return '';
  return htmlString.replace(/<[^>]*>/g, '');
}
