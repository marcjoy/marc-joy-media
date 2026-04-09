import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  slug: string;
  className?: string;
  children: ReactNode;
};

/** Navigates to a character page and stores document scrollY for ScrollToTop restore on Back. */
export function KemetopolisCharacterNavLink({ slug, className, children }: Props) {
  const navigate = useNavigate();
  const href = `/kemetopolis/${slug}`;

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(href, { state: { kemetopolisScrollY: window.scrollY } });
      }}
    >
      {children}
    </a>
  );
}
