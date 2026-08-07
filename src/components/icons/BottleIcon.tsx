import { forwardRef, type SVGProps } from "react";

const BottleIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function BottleIcon(props, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 240 600"
        aria-label="Símbolo del cuello de botella de Norte Studio"
        {...props}
      >
        <path
          id="ns-bottle-body"
          d="M120,20
             C129,20 132,25 132,40
             L132,170
             C132,200 150,210 175,240
             C195,265 195,270 195,290
             L195,540
             C195,565 185,575 165,578
             L75,578
             C55,575 45,565 45,540
             L45,290
             C45,270 45,265 65,240
             C90,210 108,200 108,170
             L108,40
             C108,25 111,20 120,20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <rect id="ns-neck-bbox" x={95} y={18} width={50} height={160} opacity={0} />
        <circle id="ns-neck-focus" cx={120} cy={100} r={2} opacity={0} />
      </svg>
    );
  }
);

export default BottleIcon;
