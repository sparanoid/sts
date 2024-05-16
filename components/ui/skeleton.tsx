import clsx from 'clsx'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('animate-pulse rounded-md bg-text/5', className)} {...props} />
}

export { Skeleton }
