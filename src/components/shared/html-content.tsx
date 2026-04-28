import { cn } from "@/lib/utils";

interface HtmlContentProps {
  html: string | undefined;
  className?: string;
}

/**
 * A reusable component to render HTML content from the backend.
 * It automatically strips inline style attributes to prevent backend styles from overriding frontend design.
 * It also applies a 'html-content' class for global typography styling.
 */
export const HtmlContent = ({ html, className }: HtmlContentProps) => {
  if (!html) return null;

  // Regex to remove 'style' attributes from tags
  // This handles style="...", style='...', and variations with spaces
  const cleanHtml = html.replace(/style\s*=\s*['"][^'"]*['"]/gi, "");

  return (
    <div
      className={cn("html-content", className)}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

export default HtmlContent;
