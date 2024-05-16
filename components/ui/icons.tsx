import CircleHalfStrokeSolidRotated from '@/public/icons/circle-half-stroke-solid-rotated.svg'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number | undefined
}

function generate(Component: React.ComponentType<React.SVGProps<SVGSVGElement>>) {
  return function Icon({ className, ...props }: IconProps) {
    return <Component className={className} {...props} />
  }
}

export const IconCircleHalfStrokeSolidRotated = generate(CircleHalfStrokeSolidRotated)
