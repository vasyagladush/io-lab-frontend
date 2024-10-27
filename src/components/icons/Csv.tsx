import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgCsv = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    width={49}
    height={50}
    viewBox="4 0 30 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.281 13.158v32.894A3.954 3.954 0 0 1 34.321 50H3.961A3.954 3.954 0 0 1 0 46.052V3.948A3.954 3.954 0 0 1 3.96 0h21.12l13.201 13.158Z"
      fill="#8EACF4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.28 12.421v1.638H27.49c-2.235 0-3.265-1.813-3.265-4.048V0h1.634l12.422 12.421Z"
      fill="#3360C8"
    />
    <path
      d="M13.514 33.641c1.229 0 2.22-.447 2.867-1.257l-1.2-1.086c-.42.505-.933.781-1.571.781-1.096 0-1.858-.762-1.858-1.904 0-1.143.762-1.905 1.858-1.905.638 0 1.152.276 1.571.78l1.2-1.085c-.648-.81-1.638-1.257-2.867-1.257-2.114 0-3.666 1.438-3.666 3.467 0 2.028 1.552 3.466 3.666 3.466ZM19.49 33.641c1.981 0 2.953-.99 2.953-2.152 0-2.457-3.781-1.695-3.781-2.714 0-.334.285-.6 1.076-.6.58 0 1.21.171 1.848.514l.58-1.4c-.657-.381-1.552-.581-2.419-.581-1.98 0-2.952.971-2.952 2.162 0 2.476 3.79 1.705 3.79 2.762 0 .324-.304.543-1.085.543-.772 0-1.61-.267-2.2-.657l-.62 1.39c.63.438 1.715.733 2.81.733ZM28.209 26.841l-1.848 4.343-1.81-4.343h-2.037l2.847 6.667h1.857l2.858-6.667h-1.867Z"
      fill="#fff"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgCsv);
export default ForwardRef;