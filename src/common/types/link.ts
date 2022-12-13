import { LinkProps } from "next/link";

export interface InternalLink extends LinkProps {
  label: string;
}
