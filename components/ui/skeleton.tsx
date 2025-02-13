import clsx from 'clsx'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('bg-fg/5 animate-pulse', className)} {...props} />
}

export { Skeleton }
